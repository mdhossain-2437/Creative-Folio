import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/privacy" },
  title: "Privacy Policy",
  description: "How this site handles your data — short, plain, honest.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="§ Legal — Privacy"
        title="Privacy"
        italic="Policy."
        description="Short version: this site stores nothing about you. Long version below."
      />
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="space-y-6 font-serif text-lg leading-relaxed text-warmwhite/80">
          <p>
            <strong className="text-warmwhite">Last updated:</strong> April 27, 2026.
          </p>
          <h2 className="font-serif text-3xl tracking-tighter text-warmwhite">1. Data we collect</h2>
          <p>
            The site is statically generated and does not set tracking cookies. We use
            privacy-first analytics that aggregate anonymous traffic patterns — no
            user identification.
          </p>
          <h2 className="font-serif text-3xl tracking-tighter text-warmwhite">2. Forms</h2>
          <p>
            When you submit the contact form, the message and any contact details
            you include are emailed directly to {`<hello@delowarhossain.dev>`}.
            We retain inquiries for up to 12 months purely to maintain a project
            history. The form also checks the request origin, uses a honeypot,
            applies a small rate limit, and may verify Cloudflare Turnstile if
            that protection is enabled.
          </p>
          <h2 className="font-serif text-3xl tracking-tighter text-warmwhite">3. Third parties</h2>
          <p>
            Fonts are self-hosted from this site. Hosting and aggregate analytics
            are provided by Vercel; contact email delivery is provided by Resend.
            These providers may log standard request data per their own policies.
          </p>
          <h2 className="font-serif text-3xl tracking-tighter text-warmwhite">4. Your rights</h2>
          <p>
            You can ask us to delete any inquiry-related information by writing to
            the email above. We will respond within 14 days.
          </p>
        </div>
      </article>
    </>
  );
}
