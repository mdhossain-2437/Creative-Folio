import { site } from "@/lib/site";

// Page-level WebPage + BreadcrumbList JSON-LD helper.
//
// Why: every primary route needs (a) a BreadcrumbList so Google can render
// the breadcrumb rich-result and form sitelinks, and (b) a WebPage node
// that links back to the global Person + WebSite + Organization graph in
// `JsonLd.tsx` via stable @id refs.
//
// Drop one of these into any page that doesn't already ship its own
// page-level schema (slug pages handle their own BlogPosting /
// SoftwareSourceCode / etc).
//
//   <PageSchema
//     path="/about"
//     name="About — Delowar Hossain"
//     description="..."
//     crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
//   />
//
// Server component — emits two <script type="application/ld+json"> tags
// inline. No client JS, no hydration cost.

type Crumb = { name: string; href: string };

export function PageSchema({
  path,
  name,
  description,
  crumbs,
  primaryImage,
}: {
  path: string;
  name: string;
  description?: string;
  crumbs: Crumb[];
  primaryImage?: string;
}) {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const webPage: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: { "@id": `${site.url}#website` },
    about: { "@id": `${site.url}#person` },
    inLanguage: "en",
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
  if (description) webPage.description = description;
  if (primaryImage) {
    webPage.primaryImageOfPage = {
      "@type": "ImageObject",
      url: primaryImage.startsWith("http")
        ? primaryImage
        : `${site.url}${primaryImage}`,
    };
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
