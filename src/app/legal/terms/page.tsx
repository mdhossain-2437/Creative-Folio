import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The plain-English terms for engaging with this studio.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="§ Legal — Terms"
        title="Terms"
        italic="& Conditions."
        description="A clear, low-jargon summary of how I work with clients. The full contract is signed per project."
      />
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <ol className="space-y-8 font-serif text-lg leading-relaxed text-warmwhite/80">
          <li>
            <strong className="text-warmwhite">Engagement:</strong> Project work
            begins with a signed Statement of Work. Retainers run on monthly cycles.
          </li>
          <li>
            <strong className="text-warmwhite">Payment:</strong> 50% deposit on
            sign-off, balance on delivery. Retainers invoiced on the 1st of each
            month, net-15.
          </li>
          <li>
            <strong className="text-warmwhite">IP transfer:</strong> Ownership of
            deliverables transfers to the client on full payment. The studio
            retains the right to display the work in its portfolio.
          </li>
          <li>
            <strong className="text-warmwhite">Confidentiality:</strong> Mutual NDA
            available on request. Trade secrets stay between us.
          </li>
          <li>
            <strong className="text-warmwhite">Termination:</strong> Either party
            can terminate with 14 days’ notice. Time-spent fees apply.
          </li>
        </ol>
      </article>
    </>
  );
}
