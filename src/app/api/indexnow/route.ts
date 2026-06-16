// /api/indexnow — POST endpoint that forwards new / changed URLs to the
// IndexNow API. IndexNow is supported by Bing, Yandex, Seznam, Naver
// and Yep (Brave), so a single POST notifies the whole non-Google
// search ecosystem in one round-trip.
//
// Usage from a deploy hook or cron:
//   curl -X POST https://2027.delowarhossain.dev/api/indexnow \
//     -H 'content-type: application/json' \
//     -d '{"urls": ["https://2027.delowarhossain.dev/journal/new-post"]}'
//
// Or with no body to ping the homepage + sitemap:
//   curl -X POST https://2027.delowarhossain.dev/api/indexnow
//
// We deliberately allow anonymous POSTs because IndexNow itself is
// authenticated by the keyLocation file. The worst-case spam is "an
// already-public URL gets re-crawled by Bing", which is harmless.

import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Match the same fallback chain as /indexnow.txt so the protocol works
  // out-of-the-box. Override via Vercel env when rotating.
  const DEFAULT_KEY = "fd368c2ed2b146b08786d891a327f465";
  const key = process.env.NEXT_PUBLIC_INDEXNOW_KEY ?? DEFAULT_KEY;

  let urls: string[] = [site.url, `${site.url}/sitemap.xml`];
  try {
    const body = (await req.json()) as { urls?: string[] };
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls.filter(
        (u) => typeof u === "string" && u.startsWith(site.url),
      );
    }
  } catch {
    // empty / non-JSON body — fall through to default urls
  }

  if (urls.length === 0) {
    return NextResponse.json({ ok: false, error: "No same-host URLs to submit." }, { status: 400 });
  }

  const payload = {
    host: site.domain,
    key,
    keyLocation: `${site.url}/indexnow.txt`,
    urlList: urls,
  };

  // Bing's indexnow endpoint fans out to Yandex / Seznam / Naver / Yep
  // for us; we only have to ping one.
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return NextResponse.json(
    {
      ok: res.ok,
      status: res.status,
      submitted: urls.length,
      host: site.domain,
    },
    { status: res.ok ? 200 : 502 },
  );
}

export function GET() {
  return NextResponse.json({
    ok: true,
    note: "POST to this endpoint with { urls: [...] } to notify IndexNow. See https://www.indexnow.org/.",
    keyLocation: `${site.url}/indexnow.txt`,
  });
}
