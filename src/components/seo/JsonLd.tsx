import { site } from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Creative Developer & UI/UX Designer",
  description: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Joypurhat",
    addressCountry: "BD",
  },
  sameAs: site.socials.map((s) => s.href),
  knowsAbout: [
    "WebGL",
    "Three.js",
    "GLSL Shaders",
    "GSAP",
    "Next.js",
    "Creative Development",
    "UI/UX Design",
    "Art Direction",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — Creative Developer Portfolio`,
  url: site.url,
  description: site.tagline,
  author: { "@type": "Person", name: site.name },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
