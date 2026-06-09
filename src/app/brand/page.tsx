import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageSchema } from "@/components/seo/PageSchema";
import { Swatch } from "@/components/colors/Swatch";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brand — Identity Kit",
  description:
    "The Delowar Hossain identity system: logomark, wordmark, lockups, the peach diamond, colour, typography and downloadable banners. Built for the MMXXVII edition.",
  alternates: { canonical: `${site.url}/brand` },
};

// Every downloadable mark lives in /public/brand and is served at /brand/<file>.
// The page route itself is exactly /brand, so the assets never collide with it.
type Asset = {
  file: string;
  name: string;
  note: string;
  size: string;
  surface?: "dark" | "light";
  aspect?: string;
};

const marks: Asset[] = [
  { file: "logomark.svg", name: "Primary logomark", note: "DH monogram fused with the peach diamond. The default mark.", size: "512 × 512", aspect: "1 / 1" },
  { file: "logomark-ink.svg", name: "Logomark · light", note: "Inverted for paper and light email headers.", size: "512 × 512", surface: "light", aspect: "1 / 1" },
  { file: "monogram.svg", name: "Monogram tile", note: "Square mark for avatars, app icons and favicons.", size: "256 × 256", aspect: "1 / 1" },
  { file: "avatar.svg", name: "Social avatar", note: "1:1 profile mark — reads at 48px.", size: "400 × 400", aspect: "1 / 1" },
];

const wordmarks: Asset[] = [
  { file: "wordmark.svg", name: "Wordmark", note: "“Delowar Hossain.” — Newsreader italic, peach period.", size: "1180 × 220", aspect: "1180 / 220" },
  { file: "lockup-horizontal.svg", name: "Horizontal lockup", note: "Mark · divider · wordmark + role. The signature lockup.", size: "1440 × 360", aspect: "1440 / 360" },
  { file: "lockup-stacked.svg", name: "Stacked lockup", note: "Centered — for covers, intros and the email banner.", size: "800 × 760", aspect: "800 / 760" },
  { file: "signature.svg", name: "Signature", note: "Sacramento script in peach, with the closing flourish.", size: "1300 × 220", aspect: "1300 / 220" },
];

const banners: Asset[] = [
  { file: "banner-x.svg", name: "X / Twitter header", note: "Avatar + UI safe areas respected.", size: "1500 × 500", aspect: "1500 / 500" },
  { file: "banner-linkedin.svg", name: "LinkedIn cover", note: "Lockup held centre-right of the photo overlap.", size: "1584 × 396", aspect: "1584 / 396" },
  { file: "banner-email.svg", name: "Email header", note: "Survives a 50% downscale to 600px.", size: "1200 × 360", aspect: "1200 / 360" },
];

const print: Asset[] = [
  { file: "business-card-front.svg", name: "Business card · front", note: "Monogram, wordmark, role. 3.5 × 2 in.", size: "1050 × 600", aspect: "1050 / 600" },
  { file: "business-card-back.svg", name: "Business card · back", note: "Contact block — email, domain, socials.", size: "1050 × 600", aspect: "1050 / 600" },
  { file: "poster.svg", name: "Editorial poster", note: "A-series statement piece, 1 : 1.414.", size: "1190 × 1684", surface: "dark", aspect: "1190 / 1684" },
];

const swatches: { name: string; hex: string; token: string }[] = [
  { name: "Ink 950", hex: "#070708", token: "ink.950" },
  { name: "Ink 900", hex: "#0c0c0c", token: "ink.900" },
  { name: "Warm white", hex: "#efece9", token: "warmwhite" },
  { name: "Paper", hex: "#f3efe9", token: "paper" },
  { name: "Peach", hex: "#e3bfb4", token: "peach" },
  { name: "Electric", hex: "#cdfa00", token: "electric" },
];

const typefaces: { role: string; family: string; cls: string; specimen: string; note: string }[] = [
  { role: "Display", family: "Newsreader", cls: "font-serif italic", specimen: "Delowar Hossain.", note: "Headlines, the wordmark, editorial pull-quotes. Tight tracking, italic for the mark." },
  { role: "Interface", family: "Inter", cls: "font-sans", specimen: "Creative Developer", note: "Labels, eyebrows, body. UPPERCASE + wide tracking for markers." },
  { role: "Meta", family: "JetBrains Mono", cls: "font-mono", specimen: "25.10°N · 89.02°E", note: "Coordinates, code, commit hashes, tabular numerals." },
  { role: "Signature", family: "Sacramento", cls: "font-script", specimen: "Delowar Hossain", note: "Reserved for the footer signature mark. One weight, peach." },
];

const glyphs = ["§", "◊", "◌", "↗", "◇", "¶", "—", "MMXXVII"];

function AssetCard({ asset }: { asset: Asset }) {
  const light = asset.surface === "light";
  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-900 transition-colors hover:border-warmwhite/35">
      <div
        className="flex items-center justify-center p-6"
        style={{
          background: light ? "#f3efe9" : "#0c0c0c",
          aspectRatio: asset.aspect ?? "16 / 9",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/brand/${asset.file}`}
          alt={asset.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 border-t border-warmwhite/10 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-serif text-xl tracking-tight text-warmwhite">{asset.name}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">{asset.size}</span>
        </div>
        <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{asset.note}</p>
        <div className="mt-2 flex items-center gap-4">
          <a
            href={`/brand/${asset.file}`}
            download
            data-cursor="hover"
            data-cursor-label="SVG"
            className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-peach hover:text-warmwhite"
          >
            Download SVG <span aria-hidden>↓</span>
          </a>
          <a
            href={`/brand/${asset.file}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="OPEN"
            className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-warmwhite/55 hover:text-warmwhite"
          >
            Open <span aria-hidden>↗</span>
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 border-b border-warmwhite/15 pb-8 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{eyebrow}</p>
        <h2 className="mt-3 break-words font-serif text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.96] tracking-tighter">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="md:col-span-5 max-w-xl self-end font-sans text-base leading-relaxed text-warmwhite/70">
          {intro}
        </p>
      )}
    </div>
  );
}

export default function BrandPage() {
  return (
    <>
      <PageSchema
        path="/brand"
        name="Brand — Identity Kit"
        description="The Delowar Hossain identity system: logomark, wordmark, lockups, the peach diamond, colour, typography and downloadable banners."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Brand", href: "/brand" },
        ]}
      />

      <PageHero
        eyebrow="§ 05 — Brand"
        title="The brand"
        italic="system."
        description="One identity, end to end — the logomark, the wordmark, the peach diamond, the ink palette and the type that carry the studio across screens, social and print. Every mark below is downloadable, on the exact tokens this site is built from."
        meta={[
          { label: "Marks", value: String(marks.length + wordmarks.length) },
          { label: "Banners", value: String(banners.length) },
          { label: "Accent", value: "Peach" },
          { label: "Edition", value: site.editionShort },
        ]}
      />

      {/* Identity / positioning */}
      <section className="border-b border-warmwhite/15 bg-ink-900 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">◊ Positioning</p>
            <h3 className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.12] text-warmwhite/90">
              Editorial first. The accent never leads.
            </h3>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 gap-8 font-sans text-base leading-relaxed text-warmwhite/70 md:grid-cols-2 md:text-lg">
            <p>
              The identity reads like a design annual, not a product page: deep ink, generous
              negative space, a single warm accent, and type doing the heavy lifting. The voice is
              confident, precise and calm — crafted sentences, no hype, no emoji.
            </p>
            <p>
              <span className="text-peach">Peach</span> appears only as punctuation — the trailing
              period, the diamond, an eyebrow, a link. <span className="text-warmwhite">Electric</span>{" "}
              is rarer still: a live dot, a focus ring. Everything else is ink and warm white at three
              honest opacities.
            </p>
          </div>
        </div>
      </section>

      {/* Logomark + monogram */}
      <section className="border-b border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="01 — Logomark & monogram"
            title="The mark."
            intro="A DH monogram fused with the 45° peach diamond. Keep clear-space of one diamond-width on every side; never recolour, rotate, or stretch it."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {marks.map((a) => (
              <AssetCard key={a.file} asset={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Wordmark + lockups */}
      <section className="border-b border-warmwhite/15 bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="02 — Wordmark & lockups"
            title="The name, set."
            intro="“Delowar Hossain.” is always Newsreader italic with a peach period. Pair it with the mark using the lockups — don’t rebuild the spacing by hand."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {wordmarks.map((a) => (
              <AssetCard key={a.file} asset={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Colour */}
      <section className="border-b border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="03 — Colour"
            title="Ink, warm white, peach."
            intro="The working set. Click any swatch to copy its hex. The full token table with on-ink contrast lives on the Colors page."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {swatches.map((s) => (
              <Swatch key={s.token} name={s.name} hex={s.hex} token={s.token} />
            ))}
          </div>
          <a
            href="/colors"
            data-cursor="hover"
            data-cursor-label="VIEW"
            className="mt-10 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-peach hover:text-warmwhite"
          >
            Full palette + contrast <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {/* Typography */}
      <section className="border-b border-warmwhite/15 bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="04 — Typography"
            title="Four voices."
            intro="A serif for display, a grotesque for interface, a mono for meta, and one script held back for the signature alone."
          />
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-warmwhite/15 bg-warmwhite/10 md:grid-cols-2">
            {typefaces.map((t) => (
              <li key={t.family} className="flex flex-col gap-4 bg-ink-950 p-8 md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">{t.role}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">{t.family}</span>
                </div>
                <span className={`${t.cls} text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] text-warmwhite`}>
                  {t.specimen}
                </span>
                <p className="font-sans text-sm leading-relaxed text-warmwhite/65">{t.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Motifs */}
      <section className="border-b border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="05 — Motifs"
            title="The editorial language."
            intro="Section markers, the diamond, hairlines and the Roman-numeral year. Used sparingly, they make any surface read as the studio."
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-warmwhite/15 bg-ink-900">
                <div
                  className="absolute h-px w-full bg-warmwhite/15"
                  style={{ top: "50%" }}
                  aria-hidden
                />
                <span
                  aria-hidden
                  className="block h-24 w-24 bg-peach"
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-warmwhite/55">
                The peach diamond — a square at 45°
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="flex flex-wrap gap-3">
                {glyphs.map((g) => (
                  <li
                    key={g}
                    className="flex min-w-[72px] items-center justify-center rounded-xl border border-warmwhite/15 bg-ink-900 px-5 py-6 font-serif text-2xl text-warmwhite/85"
                  >
                    {g}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-warmwhite/70">
                Markers number sections (§ 01, § 02). Glyphs punctuate, never decorate. The hairline
                rule is warm white at 12% — the quietest line in the system, and the most used.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banners */}
      <section className="border-b border-warmwhite/15 bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="06 — Social & email banners"
            title="Cover art."
            intro="Drop-in covers for X, LinkedIn and the email campaign — each composed around its platform’s safe areas."
          />
          <div className="grid grid-cols-1 gap-6">
            {banners.map((a) => (
              <AssetCard key={a.file} asset={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Print + poster */}
      <section className="border-b border-warmwhite/15 bg-ink-950 py-20 md:py-28">
        <div className="mx-auto max-w-[1640px] px-6 md:px-10">
          <SectionHead
            eyebrow="07 — Print & poster"
            title="On paper."
            intro="The card and the A-series poster carry the same system into print — ink, peach, and a great deal of restraint."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {print.map((a) => (
              <AssetCard key={a.file} asset={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Downloads / resources */}
      <section className="bg-ink-900 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">◌ Resources</p>
            <h3 className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.12]">
              The full kit.
            </h3>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-warmwhite/70">
              Marks, banners, the brand book and the email campaign templates — all in the
              repository. Press <span className="font-mono text-warmwhite">D</span> on any card to
              download its SVG.
            </p>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 gap-3 font-sans text-base md:grid-cols-2">
            {[
              { k: "Brand book — BRANDKIT.md", href: `${site.repo}/blob/main/BRANDKIT.md`, ext: true },
              { k: "Asset index — README", href: "/brand/README.md", ext: true },
              { k: "Email campaign templates", href: `${site.repo}/tree/main/emails`, ext: true },
              { k: "All brand assets (repo)", href: `${site.repo}/tree/main/public/brand`, ext: true },
              { k: "Colour tokens + contrast", href: "/colors", ext: false },
              { k: "Colophon — how it’s built", href: "/colophon", ext: false },
            ].map((r) => (
              <li key={r.k} className="border-t border-warmwhite/15 pt-4">
                <a
                  href={r.href}
                  {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  data-cursor="hover"
                  data-cursor-label="OPEN"
                  className="flex items-baseline justify-between gap-3 text-warmwhite hover:text-peach"
                >
                  <span className="font-serif text-xl tracking-tight">{r.k}</span>
                  <span aria-hidden className="font-sans text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
