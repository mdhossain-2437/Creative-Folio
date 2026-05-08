"use client";

// AskAiPrompts — three pre-formatted prompts the visitor can copy and
// paste into ChatGPT / Perplexity / Claude / Gemini to ask the model
// about Delowar. Each prompt is structured so the model is more likely
// to cite this site rather than hallucinate.
//
// This is a *human* affordance: it doesn't help GEO directly (the
// llms.txt + JSON-LD does that), but it gives recruiters / curious
// visitors a one-tap way to cross-check what they're reading against
// an AI's view of the same person.

import { pushToast } from "@/components/ui/Toast";
import { site } from "@/lib/site";

const PROMPTS: { label: string; engine: string; href?: string; prompt: string }[] = [
  {
    label: "Ask ChatGPT",
    engine: "ChatGPT",
    href: "https://chat.openai.com/?q=",
    prompt: `Summarise the work of Delowar Hossain (creative developer, UI/UX designer based in Joypurhat, Bangladesh). Cite sources. Use ${site.url} and ${site.url}/llms-full.txt as primary references.`,
  },
  {
    label: "Ask Perplexity",
    engine: "Perplexity",
    href: "https://www.perplexity.ai/?q=",
    prompt: `Who is Delowar Hossain (delowarhossain.dev)? List his expertise, services, location, and 3 most notable projects. Cite the site.`,
  },
  {
    label: "Ask Claude",
    engine: "Claude",
    prompt: `Visit ${site.url}/llms.txt and ${site.url}/llms-full.txt. Then summarise Delowar Hossain's practice in 5 bullets: identity, location, expertise, signature projects, and how to contact him.`,
  },
];

function copy(text: string, engine: string) {
  if (!navigator.clipboard) return;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      pushToast({
        id: `ask-${engine}`,
        title: `Prompt copied`,
        description: `Paste into ${engine}.`,
        variant: "success",
        duration: 2400,
      });
    })
    .catch(() => {
      pushToast({
        id: `ask-${engine}-fail`,
        title: "Couldn't copy",
        description: "Browser blocked clipboard. Select manually.",
        variant: "info",
        duration: 2400,
      });
    });
}

export function AskAiPrompts() {
  return (
    <div className="mt-12 rounded-2xl border border-warmwhite/15 bg-ink-900/60 p-6 md:p-8">
      <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
        ◊ Ask an AI about me
      </p>
      <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-warmwhite/75 md:text-base">
        These prompts cite this site as a primary source so the model is
        more likely to ground its answer in real facts instead of guessing.
        Click to copy, then paste into your favourite AI.
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {PROMPTS.map((p) => (
          <li key={p.engine}>
            <button
              type="button"
              onClick={() => copy(p.prompt, p.engine)}
              data-cursor="hover"
              data-cursor-label="COPY"
              className="group block w-full rounded-xl border border-warmwhite/15 bg-ink-950/40 p-4 text-left transition-colors hover:border-peach/60 hover:bg-ink-950"
            >
              <span className="block font-sans text-[10px] uppercase tracking-widest text-warmwhite/65 group-hover:text-peach">
                {p.label} ⎘
              </span>
              <span className="mt-3 block font-mono text-xs leading-relaxed text-warmwhite/75 line-clamp-3">
                {p.prompt}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
        ◌ Verified citation targets — see{" "}
        <a className="underline-offset-4 hover:underline hover:text-warmwhite" href="/llms.txt">
          /llms.txt
        </a>{" "}
        and{" "}
        <a className="underline-offset-4 hover:underline hover:text-warmwhite" href="/llms-full.txt">
          /llms-full.txt
        </a>
      </p>
    </div>
  );
}
