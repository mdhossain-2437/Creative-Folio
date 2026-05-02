import { site } from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "Delowar",
  url: site.url,
  jobTitle: "Creative Developer & UI/UX Designer",
  description: site.tagline,
  email: `mailto:${site.email}`,
  image: `${site.url}/og.svg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Joypurhat",
    addressRegion: "Rajshahi",
    addressCountry: "BD",
  },
  worksFor: {
    "@type": "Organization",
    name: site.studio,
    url: site.url,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Project inquiries",
    email: site.email,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Bengali"],
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
    "Editorial Typography",
    "Motion Design",
    "Design Systems",
  ],
  knowsLanguage: ["en", "bn"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — Creative Developer Portfolio (${site.editionShort})`,
  url: site.url,
  description: site.tagline,
  inLanguage: "en",
  copyrightYear: site.year,
  copyrightHolder: { "@type": "Person", name: site.name },
  author: { "@type": "Person", name: site.name, url: site.url },
  publisher: { "@type": "Organization", name: site.studio, url: site.url },
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.studio,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/og.svg`,
  founder: { "@type": "Person", name: site.name },
  foundingDate: `${site.yearStarted}-01-01`,
  sameAs: site.socials.map((s) => s.href),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
