import { expect, test, type APIRequestContext } from "@playwright/test";

const ORIGIN = "http://localhost:3000";

function validPayload(overrides: Record<string, string> = {}) {
  return {
    website: "",
    timestamp: String(Date.now() - 2_000),
    name: "Delowar Hossain",
    email: "delowar@example.com",
    company: "The Compiled Thought",
    url: "https://example.com/brief",
    services: "Web Design, WebGL",
    budget: "$5k — $15k",
    message:
      "I need an editorial portfolio system with high-performance animation and a clear launch path.",
    turnstileToken: "",
    ...overrides,
  };
}

async function postContact(
  request: APIRequestContext,
  payload: unknown,
  ip: string,
  headers: Record<string, string> = {},
) {
  return request.post("/api/contact", {
    data: payload,
    headers: {
      Origin: ORIGIN,
      "x-forwarded-for": ip,
      ...headers,
    },
  });
}

test.describe("contact API hardening", () => {
  test("accepts a valid contact inquiry through the test transport", async ({
    request,
  }) => {
    const response = await postContact(request, validPayload(), "203.0.113.10");

    expect(response.status()).toBe(202);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("silently accepts honeypot submissions without sending", async ({
    request,
  }) => {
    const response = await postContact(
      request,
      validPayload({ website: "https://spam.example" }),
      "203.0.113.11",
    );

    expect(response.status()).toBe(202);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("rejects malformed JSON payloads", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: Buffer.from("{", "utf8"),
      headers: {
        Origin: ORIGIN,
        "content-type": "application/json",
        "x-forwarded-for": "203.0.113.12",
      },
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      code: "invalid_json",
      message: "Invalid JSON payload.",
    });
  });

  test("rejects oversized payloads before parsing", async ({ request }) => {
    const response = await postContact(
      request,
      validPayload({ message: "x".repeat(10_000) }),
      "203.0.113.13",
    );

    expect(response.status()).toBe(413);
    expect(await response.json()).toEqual({
      ok: false,
      code: "payload_too_large",
      message: "Message payload is too large.",
    });
  });

  test("fails safely when email delivery env vars are missing", async ({
    request,
  }) => {
    const response = await postContact(
      request,
      validPayload(),
      "203.0.113.14",
      { "x-contact-test-missing-env": "1" },
    );

    expect(response.status()).toBe(503);
    expect(await response.json()).toEqual({
      ok: false,
      code: "email_unavailable",
      message: "Contact email is not configured.",
    });
  });

  test("rejects failed optional Turnstile verification", async ({ request }) => {
    const response = await postContact(
      request,
      validPayload({ turnstileToken: "bad-token" }),
      "203.0.113.15",
      { "x-contact-test-turnstile": "1" },
    );

    expect(response.status()).toBe(403);
    expect(await response.json()).toEqual({
      ok: false,
      code: "turnstile_failed",
      message: "Challenge verification failed.",
    });
  });
});
