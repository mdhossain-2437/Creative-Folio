import { site } from "@/lib/site";
import { awards } from "@/lib/data";

// JSON-LD schema for Google / Bing rich-results AND for Generative Engine
// Optimization (GEO) — Perplexity, ChatGPT search, Claude, Gemini, You.com
// all read schema.org markup to disambiguate entities + answer who/what/where
// questions.
//
// The Person schema is intentionally rich: image, jobTitle, knowsAbout,
// knowsLanguage, alumniOf, makesOffer, contactPoint, address, sameAs.
// More signal → better entity resolution → fewer hallucinations.

const earnedAwardNames = awards
  .filter((award) => award.status === "earned")
  .map((award) => `${award.org} — ${award.title} (${award.year})`);

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  // Branded-search signals: Google's entity resolver weights `name`,
  // `alternateName`, and `givenName + familyName` heavily when matching
  // a freeform query like "delowar hossain" to a Knowledge Graph entity.
  name: site.name,
  givenName: "Delowar",
  familyName: "Hossain",
  additionalName: "Md",
  alternateName: [
    "Delowar",
    "Md Delowar Hossain",
    "Delowar Hossain",
    "delowarhossain",
    "delowarhossain.dev",
    "2027.delowarhossain.dev",
    "The Compiled Thought",
    "Compiled Thought",
  ],
  url: site.url,
  mainEntityOfPage: site.url,
  identifier: site.url,
  jobTitle: [
    "Creative Developer",
    "UI/UX Designer",
    "Full-Stack Developer",
    "AI Engineer",
    "Website Developer",
  ].join(" · "),
  description: site.tagline,
  email: `mailto:${site.email}`,
  // Image is the most important field for Google Image Search to associate
  // the portrait with the name. We declare it in two forms — `image` (the
  // simple URL) AND a structured ImageObject with caption + dimensions —
  // so both classic image search and AI-driven image grounding can pick it up.
  image: {
    "@type": "ImageObject",
    url: `${site.url}${site.portrait}`,
    contentUrl: `${site.url}${site.portrait}`,
    // Must match the real /public/profile.png pixel dimensions — Google
    // cross-checks ImageObject width/height against the fetched file, and a
    // mismatch weakens the image↔entity link used for the Knowledge Panel.
    width: 1317,
    height: 1194,
    caption: `${site.name} — Creative Developer & UI/UX Designer in Joypurhat, Bangladesh`,
    representativeOfPage: true,
    license: site.url,
  },
  nationality: { "@type": "Country", name: "Bangladesh", identifier: "BD" },
  birthPlace: { "@type": "Place", name: "Joypurhat, Bangladesh" },
  homeLocation: {
    "@type": "Place",
    name: "Joypurhat, Bangladesh",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Joypurhat",
      addressRegion: "Rajshahi",
      addressCountry: "BD",
    },
  },
  gender: "Male",
  pronouns: "he/him",
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
  sameAs: [...site.socials.map((s) => s.href), site.apexUrl],
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
    "LangChain",
    "OpenAI Integration",
    "Lenis Smooth Scroll",
    "Performance Engineering",
    "Full-Stack Development",
  ],
  knowsLanguage: ["en", "bn"],
  // Educational background — surfaces in Knowledge Panel "Education" row.
  // Derived from site.education so About, Resume, AI summary, and JSON-LD
  // keep the same Political Science -> self-taught web -> CS narrative.
  alumniOf: site.education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.institution,
    ...(edu.url ? { url: edu.url } : {}),
    description: `${edu.degree}${
      edu.range ? ` (${edu.range})` : ""
    }. ${edu.role}.`,
  })),
  ...(earnedAwardNames.length > 0 ? { award: earnedAwardNames } : {}),
  // Credentials the studio has earned through formal courses or
  // certifications. Listed as EducationalOccupationalCredential nodes so
  // search engines surface them in the Knowledge Panel's credentials row.
  hasCredential: site.education.map((edu) => ({
    "@type": "EducationalOccupationalCredential",
    name: `${edu.degree} - ${edu.institution}`,
    credentialCategory: "degree",
    educationalLevel: "Bachelor's",
  })),
  // Brand back-reference — completes the Person ↔ Brand graph so AI
  // engines (Perplexity, ChatGPT) can map "2027.delowarhossain.dev" or
  // "The Compiled Thought" back to the operator.
  brand: { "@id": `${site.url}/#organization` },
  // What the studio is actively looking for. Improves intent matching
  // for "creative developer for hire" / "freelance webgl" queries.
  seeks: {
    "@type": "Demand",
    name: "Freelance & studio engagements in creative frontend, WebGL, and AI-augmented product experiences",
    areaServed: { "@type": "Place", name: "Worldwide" },
  },
  // Additional inbound links — the studio's GitHub profile, the studio
  // brand entity, the resume PDF — so engines have multiple paths back
  // to the canonical identity.
  relatedLink: [
    "https://github.com/mdhossain-2437",
    site.apexUrl,
    `${site.url}/portfolios`,
    `${site.url}/about`,
    `${site.url}/resume`,
  ],
};

// ── FAQPage — disambiguates the most common search intents for the
// branded query "delowar hossain". Each Q/A is short and quotable so AI
// engines can lift it cleanly into an answer card. The questions cover
// the four queries we see the most: who, what, where, and what makes
// the studio unique.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  inLanguage: "en",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Delowar Hossain?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Delowar Hossain is a creative developer and UI/UX designer based in Joypurhat, Bangladesh. He runs the studio The Compiled Thought, builds WebGL-driven editorial websites, design systems, and AI-augmented product experiences, with public recognition targets clearly labelled until they are earned and verifiable.",
      },
    },
    {
      "@type": "Question",
      name: "What does Delowar Hossain do?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "He works at the intersection of creative front-end engineering and product design. The practice covers WebGL shaders, GSAP motion choreography, Next.js + React systems, generative AI integration, design systems and editorial art direction. Each year he rebuilds his portfolio from scratch under a new codename.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Delowar Hossain based?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "He is based in Joypurhat, Rajshahi Division, Bangladesh, and accepts remote engagements worldwide. The studio works in English and Bengali across European, North-American and South-Asian time zones.",
      },
    },
    {
      "@type": "Question",
      name: "How can I hire Delowar Hossain?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Send a brief to hello@delowarhossain.dev or use the contact form at 2027.delowarhossain.dev/contact. The studio takes a small number of engagements each quarter — typically WebGL-led marketing sites, design systems for product teams, and AI-augmented prototypes.",
      },
    },
    {
      "@type": "Question",
      name: "What is The Compiled Thought?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The Compiled Thought is the studio name Delowar Hossain has shipped portfolios and editorial work under since 2023. It produces creative-developer engagements, an annual portfolio edition, public lab experiments and a journal on craft, code, taste and sustaining practice.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Delowar Hossain rebuild his portfolio every year?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Each annual portfolio is treated as a separate studio system — a new codename, a new visual register, a new architectural opinion about what a portfolio should be. The current edition (MMXXVII) is the eighth in the series; older editions are documented at 2027.delowarhossain.dev/portfolios.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: `${site.name} — Creative Developer Portfolio (${site.editionShort})`,
  alternateName: [
    site.domain,
    site.apexDomain,
    "The Compiled Thought",
    "Delowar Hossain portfolio",
  ],
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
  alternateName: [
    site.name,
    "Compiled Thought",
    "The Compiled Thought Studio",
    "Delowar Hossain Studio",
  ],
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
  sameAs: [...site.socials.map((s) => s.href), site.apexUrl],
  brand: {
    "@type": "Brand",
    name: site.studio,
    url: site.url,
    slogan: site.tagline,
  },
};

const serviceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${site.url}/#services`,
  name: `${site.studio} services`,
  url: `${site.url}/services`,
  itemListElement: [
    "Creative frontend engineering",
    "WebGL and Three.js portfolio websites",
    "UI/UX design systems",
    "AI-augmented product prototypes",
    "Technical SEO and performance optimization",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Worldwide",
      serviceType: name,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
    </>
  );
}
