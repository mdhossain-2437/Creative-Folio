"use client";

import { FormEvent, useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";

const services = ["Web Design", "UI/UX", "Logo & Branding", "Webflow", "Framer", "WebGL", "AI Integration", "Other"];
const budgets = ["< $5k", "$5k — $15k", "$15k — $30k", "$30k+"];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "sent">("idle");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<string>(budgets[1]);

  const toggle = (s: string) => {
    setPicked((p) => {
      const n = new Set(p);
      n.has(s) ? n.delete(s) : n.add(s);
      return n;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div className="rounded-md border border-warmwhite/15 bg-ink-950 p-10">
        <p className="font-sans text-[10px] uppercase tracking-widest text-peach">◌ Sent</p>
        <h3 className="mt-6 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[0.96] tracking-tightest">
          Thanks — got it.
        </h3>
        <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-warmwhite/65">
          I&apos;ll reply within 48 hours, weekdays. Until then, sit with the
          shader hero, click around the lab, or read a journal post.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Delowar Hossain" required />
        <Field label="Email address" name="email" type="email" placeholder="hello@studio.com" required />
        <Field label="Company / Studio" name="company" placeholder="The Compiled Thought" />
        <Field label="Project URL or brief" name="url" placeholder="https://…" />
      </div>

      <div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">◊ What do you need</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => toggle(s)}
                className={`rounded-full border px-4 py-2 font-sans text-[11px] uppercase tracking-widest transition-colors ${
                  picked.has(s)
                    ? "border-warmwhite bg-warmwhite text-ink-900"
                    : "border-warmwhite/25 text-warmwhite/80 hover:border-warmwhite"
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">◊ Budget range</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {budgets.map((b) => (
            <li key={b}>
              <button
                type="button"
                onClick={() => setBudget(b)}
                className={`w-full rounded-md border px-4 py-3 font-sans text-[11px] uppercase tracking-widest ${
                  budget === b
                    ? "border-warmwhite bg-warmwhite/10 text-warmwhite"
                    : "border-warmwhite/15 text-warmwhite/65 hover:border-warmwhite"
                }`}
              >
                {b}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
          ◊ Project details
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me what you’re building, the audience, the vibe, the rough timeline…"
          className="mt-3 w-full resize-none rounded-md border border-warmwhite/15 bg-transparent px-4 py-4 font-sans text-base text-warmwhite placeholder:text-warmwhite/30 focus:border-warmwhite focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between border-t border-warmwhite/10 pt-6">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
          By sending you agree to our minimal{" "}
          <a href="/legal/privacy" className="text-warmwhite underline-offset-4 hover:underline">
            privacy policy
          </a>
          .
        </p>
        <Magnetic>
          <button
            type="submit"
            disabled={state === "submitting"}
            data-cursor="view"
            data-cursor-label="SEND"
            className="rounded-full bg-warmwhite px-7 py-4 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach disabled:opacity-60"
          >
            {state === "submitting" ? "Sending…" : "Send Inquiry"}
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/45">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-3 font-serif text-xl text-warmwhite placeholder:text-warmwhite/30 focus:border-warmwhite focus:outline-none"
      />
    </label>
  );
}
