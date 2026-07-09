import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HONEYPOT_FIELD = "website";
const MAX_PAYLOAD_BYTES = 8 * 1024;
const MAX_SUBMISSIONS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const allowedServices = new Set([
  "Web Design",
  "UI/UX",
  "Logo & Branding",
  "Webflow",
  "Framer",
  "WebGL",
  "AI Integration",
  "Other",
]);

const allowedBudgets = new Set([
  "< $5k",
  "$5k - $15k",
  "$5k — $15k",
  "$15k - $30k",
  "$15k — $30k",
  "$30k+",
]);

const rateLimitBuckets = new Map<string, number[]>();

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  url: string;
  services: string[];
  budget: string;
  message: string;
  timestamp: number | null;
  turnstileToken: string;
};

type ContactErrorCode =
  | "bad_origin"
  | "email_unavailable"
  | "invalid_json"
  | "invalid_payload"
  | "payload_too_large"
  | "rate_limited"
  | "turnstile_failed";

type ParseResult =
  | { ok: true; payload: ContactPayload; honeypot: false }
  | { ok: true; honeypot: true }
  | { ok: false; code: ContactErrorCode; message: string };

function jsonResponse(
  status: number,
  body: { ok: boolean; code?: ContactErrorCode; message?: string },
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(
  source: Record<string, unknown>,
  key: string,
  maxLength: number,
): string {
  const value = source[key];
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isValidHttpUrl(value: string): boolean {
  if (!value) return true;

  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeServiceList(value: string): string[] {
  return value
    .split(",")
    .map((service) => service.trim())
    .filter((service) => allowedServices.has(service));
}

function normalizeBudget(value: string): string {
  if (!value) return "";
  return allowedBudgets.has(value) ? value.replaceAll("—", "-") : "";
}

function parseContactPayload(rawBody: string): ParseResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return {
      ok: false,
      code: "invalid_json",
      message: "Invalid JSON payload.",
    };
  }

  if (!isRecord(parsed)) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Invalid contact payload.",
    };
  }

  if (readString(parsed, HONEYPOT_FIELD, 200)) {
    return { ok: true, honeypot: true };
  }

  const name = readString(parsed, "name", 90);
  const email = readString(parsed, "email", 160).toLowerCase();
  const company = readString(parsed, "company", 120);
  const url = readString(parsed, "url", 320);
  const services = normalizeServiceList(readString(parsed, "services", 320));
  const budget = normalizeBudget(readString(parsed, "budget", 80));
  const message = readString(parsed, "message", 3000);
  const turnstileToken = readString(parsed, "turnstileToken", 2048);
  const timestampValue = Number(readString(parsed, "timestamp", 32));
  const timestamp = Number.isFinite(timestampValue) ? timestampValue : null;

  if (name.length < 2 || name.length > 90) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Please enter a valid name.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Please enter a valid email address.",
    };
  }

  if (!isValidHttpUrl(url)) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Please enter a valid URL.",
    };
  }

  if (message.length < 10 || message.length > 3000) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Please provide 10-3000 characters of project detail.",
    };
  }

  if (timestamp && timestamp > Date.now() + 60_000) {
    return {
      ok: false,
      code: "invalid_payload",
      message: "Invalid form timestamp.",
    };
  }

  return {
    ok: true,
    honeypot: false,
    payload: {
      name,
      email,
      company,
      url,
      services,
      budget,
      message,
      timestamp,
      turnstileToken,
    },
  };
}

function getRequestIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitBuckets.get(key) ?? []).filter(
    (time) => time > windowStart,
  );

  if (recent.length >= MAX_SUBMISSIONS_PER_HOUR) {
    rateLimitBuckets.set(key, recent);
    return false;
  }

  recent.push(now);
  rateLimitBuckets.set(key, recent);

  if (rateLimitBuckets.size > 500) {
    for (const [bucketKey, timestamps] of rateLimitBuckets) {
      const liveTimestamps = timestamps.filter((time) => time > windowStart);
      if (liveTimestamps.length) rateLimitBuckets.set(bucketKey, liveTimestamps);
      else rateLimitBuckets.delete(bucketKey);
    }
  }

  return true;
}

function getAllowedOrigins(request: Request): Set<string> {
  const origins = new Set<string>();
  const addOrigin = (value: string) => {
    try {
      origins.add(new URL(value).origin);
    } catch {
      // Ignore malformed deployment metadata.
    }
  };

  addOrigin(site.url);
  addOrigin(site.apexUrl);

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    const proto =
      request.headers.get("x-forwarded-proto") ??
      (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
    addOrigin(`${proto}://${host}`);
  }

  if (process.env.NODE_ENV !== "production") {
    addOrigin("http://localhost:3000");
    addOrigin("http://127.0.0.1:3000");
  }

  return origins;
}

function hasAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;

  try {
    return getAllowedOrigins(request).has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function getEmailConfig(request: Request) {
  const testMode = process.env.CONTACT_ROUTE_TEST_MODE === "1";
  const forceMissingConfig =
    testMode && request.headers.get("x-contact-test-missing-env") === "1";

  if (forceMissingConfig) return null;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return null;

  return { apiKey, to, from, testMode };
}

function getTurnstileSecret(request: Request): string | undefined {
  const testMode = process.env.CONTACT_ROUTE_TEST_MODE === "1";
  if (testMode && request.headers.get("x-contact-test-turnstile") === "1") {
    return "test-turnstile-secret";
  }

  return process.env.TURNSTILE_SECRET_KEY;
}

async function verifyTurnstile(
  request: Request,
  token: string,
): Promise<boolean> {
  const secret = getTurnstileSecret(request);
  if (!secret) return true;

  if (!token) return false;

  if (secret === "test-turnstile-secret") {
    return token === "test-turnstile-pass";
  }

  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);

  const ip = getRequestIp(request);
  if (ip !== "unknown") form.set("remoteip", ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: form,
    });
    const result = (await response.json()) as unknown;
    return isRecord(result) && result.success === true;
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
}

function formatContactText(payload: ContactPayload): string {
  return [
    "New portfolio inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`,
    `Project URL: ${payload.url || "Not provided"}`,
    `Services: ${payload.services.join(", ") || "Not specified"}`,
    `Budget: ${payload.budget || "Not specified"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function formatContactHtml(payload: ContactPayload): string {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "Not provided"],
    ["Project URL", payload.url || "Not provided"],
    ["Services", payload.services.join(", ") || "Not specified"],
    ["Budget", payload.budget || "Not specified"],
  ];

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #111827; line-height: 1.55;">
      <h1 style="font-size: 20px; margin: 0 0 18px;">New portfolio inquiry</h1>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="text-align: left; width: 140px; padding: 8px 0; color: #6b7280; font-weight: 600;">${escapeHtml(label)}</th>
                  <td style="padding: 8px 0;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size: 14px; margin: 0 0 8px; color: #6b7280;">Message</h2>
      <div style="white-space: pre-wrap; border-top: 1px solid #e5e7eb; padding-top: 16px;">${escapeHtml(
        payload.message,
      )}</div>
    </div>
  `;
}

async function sendContactEmail(
  config: NonNullable<ReturnType<typeof getEmailConfig>>,
  payload: ContactPayload,
) {
  if (config.testMode) {
    return { id: "contact_test_message" };
  }

  const resend = new Resend(config.apiKey);
  const subjectSource =
    payload.services[0] || payload.company || "Portfolio inquiry";
  const subject = `New inquiry: ${subjectSource}`.replace(/[\r\n]+/g, " ");

  const result = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject,
    text: formatContactText(payload),
    html: formatContactHtml(payload),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return jsonResponse(403, {
      ok: false,
      code: "bad_origin",
      message: "Request origin is not allowed.",
    });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse(413, {
      ok: false,
      code: "payload_too_large",
      message: "Message payload is too large.",
    });
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_PAYLOAD_BYTES) {
    return jsonResponse(413, {
      ok: false,
      code: "payload_too_large",
      message: "Message payload is too large.",
    });
  }

  const parsed = parseContactPayload(rawBody);
  if (!parsed.ok) {
    const status = parsed.code === "invalid_json" ? 400 : 422;
    return jsonResponse(status, {
      ok: false,
      code: parsed.code,
      message: parsed.message,
    });
  }

  if (parsed.honeypot) {
    return jsonResponse(202, { ok: true });
  }

  const rateLimitKey = getRequestIp(request);
  if (!checkRateLimit(rateLimitKey)) {
    return jsonResponse(429, {
      ok: false,
      code: "rate_limited",
      message: "Too many submissions. Please try again later.",
    });
  }

  const turnstileOk = await verifyTurnstile(request, parsed.payload.turnstileToken);
  if (!turnstileOk) {
    return jsonResponse(403, {
      ok: false,
      code: "turnstile_failed",
      message: "Challenge verification failed.",
    });
  }

  const emailConfig = getEmailConfig(request);
  if (!emailConfig) {
    return jsonResponse(503, {
      ok: false,
      code: "email_unavailable",
      message: "Contact email is not configured.",
    });
  }

  try {
    await sendContactEmail(emailConfig, parsed.payload);
    return jsonResponse(202, { ok: true });
  } catch (error) {
    console.error("Contact form email delivery failed", error);
    return jsonResponse(503, {
      ok: false,
      code: "email_unavailable",
      message: "Contact email is temporarily unavailable.",
    });
  }
}
