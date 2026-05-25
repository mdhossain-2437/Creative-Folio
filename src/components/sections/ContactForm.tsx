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
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <Field label="Your name" name="name" placeholder="Delowar Hossain" required />
        <Field label="Email address" name="email" type="email" placeholder="hello@studio.com" required />
        <Field label="Company / Studio" name="company" placeholder="The Compiled Thought" />
        <Field label="Project URL or brief" name="url" placeholder="https://…" />
      </div>

      <fieldset>
        <legend className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◊ What do you need
        </legend>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => {
            const isOn = picked.has(s);
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => toggle(s)}
                  aria-pressed={isOn}
                  className={`rounded-full border px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                    isOn
                      ? "border-warmwhite bg-warmwhite text-ink-900"
                      : "border-warmwhite/20 text-warmwhite/80 hover:border-warmwhite"
                  }`}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◊ Budget range
        </legend>
        <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4" role="radiogroup" aria-label="Budget range">
          {budgets.map((b) => {
            const isOn = budget === b;
            return (
              <li key={b}>
                <button
                  type="button"
                  onClick={() => setBudget(b)}
                  role="radio"
                  aria-checked={isOn}
                  className={`w-full rounded-md border px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${
                    isOn
                      ? "border-warmwhite bg-warmwhite/15 text-warmwhite"
                      : "border-warmwhite/15 text-warmwhite/65 hover:border-warmwhite"
                  }`}
                >
                  {b}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="block font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
          ◊ Project details
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Tell me what you’re building, the audience, the vibe, the rough timeline…"
          className="mt-3 w-full resize-none rounded-md border border-warmwhite/15 bg-transparent px-4 py-3 font-sans text-base leading-relaxed text-warmwhite placeholder:text-warmwhite/30 transition-colors focus:border-warmwhite focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
        />
      </div>

      <div className="flex flex-col items-start gap-4 border-t border-warmwhite/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
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
            aria-disabled={state === "submitting"}
            data-cursor="view"
            data-cursor-label="SEND"
            className="rounded-full bg-warmwhite px-6 py-3.5 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
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
      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-peach">
            *
          </span>
        )}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-warmwhite placeholder:text-warmwhite/30 transition-colors focus:border-warmwhite focus:outline-none focus-visible:border-peach"
      />
    </label>
  );
}
