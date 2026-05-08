import { site } from "@/lib/site";

// JSON-LD schema for Google / Bing rich-results AND for Generative Engine
// Optimization (GEO) — Perplexity, ChatGPT search, Claude, Gemini, You.com
// all read schema.org markup to disambiguate entities + answer who/what/where
// questions.
//
// The Person schema is intentionally rich: image, jobTitle, knowsAbout,
// knowsLanguage, alumniOf, makesOffer, contactPoint, address, sameAs.
// More signal → better entity resolution → fewer hallucinations.

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  givenName: "Delowar",
  familyName: "Hossain",
  alternateName: ["Delowar", "Md Delowar Hossain"],
  url: site.url,
  jobTitle: "Creative Developer & UI/UX Designer",
  description: site.tagline,
  email: `mailto:${site.email}`,
  image: {
    "@type": "ImageObject",
    url: `${site.url}${site.portrait}`,
    width: 1326,
    height: 1147,
    caption: `${site.name} — portrait`,
  },
  nationality: { "@type": "Country", name: "Bangladesh" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Joypurhat",
    addressRegion: "Rajshahi",
    addressCountry: "BD",
  },
  workLocation: {
    "@type": "Place",
    name: site.location,
  },
  worksFor: {
    "@type": "Organization",
    name: site.studio,
    url: site.url,
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Creative Developer",
    occupationLocation: { "@type": "City", name: "Joypurhat, Bangladesh" },
    skills: [
      "WebGL",
      "Three.js",
      "GLSL Shaders",
      "GSAP",
      "Next.js",
      "React",
      "TypeScript",
      "UI/UX Design",
      "Creative Frontend Engineering",
      "Generative AI Integration",
    ].join(", "),
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Project inquiries",
    email: site.email,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: site.socials.map((s) => s.href),
  subjectOf: {
    "@type": "DigitalDocument",
    name: `${site.name} — Resume (${site.editionShort})`,
    url: `${site.url}${site.resume}`,
    encodingFormat: "application/pdf",
  },
  knowsAbout: [
    "Creative Frontend Development",
    "WebGL",
    "Three.js",
    "GLSL Shaders",
    "GSAP",
    "Next.js",
    "React",
    "TypeScript",
    "UI/UX Design",
    "Art Direction",
    "Editorial Typography",
    "Motion Design",
    "Design Systems",
    "Generative AI Integration",
    "Lenis Smooth Scroll",
  ],
  knowsLanguage: ["en", "bn"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: `${site.name} — Creative Developer Portfolio (${site.editionShort})`,
  url: site.url,
  description: site.tagline,
  inLanguage: "en",
  copyrightYear: site.year,
  copyrightHolder: { "@id": `${site.url}/#person` },
  author: { "@id": `${site.url}/#person` },
  publisher: { "@id": `${site.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.studio,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/og.svg`,
  image: `${site.url}${site.portrait}`,
  founder: { "@id": `${site.url}/#person` },
  foundingDate: `${site.yearStarted}-01-01`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Joypurhat",
    addressRegion: "Rajshahi",
    addressCountry: "BD",
  },
  sameAs: site.socials.map((s) => s.href),
};

// ProfilePage schema is the strongest hint to Google + Bing that this site
// is *about* a person (vs a brand). Rolling it up here keeps it discoverable.
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  inLanguage: "en",
  name: `${site.name} — Creative Developer & UI/UX Designer`,
  description: site.tagline,
  mainEntity: { "@id": `${site.url}/#person` },
  about: { "@id": `${site.url}/#person` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${site.url}${site.portrait}`,
  },
  dateModified: `${site.year}-01-01`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
