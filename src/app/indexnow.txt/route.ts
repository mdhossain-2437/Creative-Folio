// IndexNow key file. IndexNow is the open protocol that Bing, Yandex,
// Seznam, Naver, and Yep use to receive instant URL-changed pings —
// faster than waiting for re-crawl. Google does not yet participate but
// has not deprecated either.
//
// Setup:
//   1. Set NEXT_PUBLIC_INDEXNOW_KEY in your Vercel project env (any
//      8–128 character hex string; generate one at
//      https://www.bing.com/indexnow#implementation ).
//   2. Bing / Yandex will GET https://delowarhossain.dev/indexnow.txt
//      and verify the body equals the key.
//   3. The /api/indexnow endpoint pings the IndexNow API on demand
//      passing this same URL as `keyLocation`.

import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const key = process.env.NEXT_PUBLIC_INDEXNOW_KEY;
  if (!key) {
    // Don't 404 (Bing treats that as misconfigured). Return a placeholder
    // so the file exists and the protocol-validation step succeeds even
    // before the env var is set.
    return new NextResponse(
      "indexnow-key-not-configured-yet",
      {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      },
    );
  }
  return new NextResponse(key, {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
