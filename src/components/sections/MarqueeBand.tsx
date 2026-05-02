import { Marquee } from "@/components/ui/Marquee";

export function MarqueeBand() {
  return (
    <section className="border-y border-warmwhite/15 bg-ink-950 py-10 md:py-12">
      <Marquee
        size="lg"
        speed={55}
        items={[
          <span key="1" className="italic">
            Creative Developer
          </span>,
          "Three.js · GLSL · WebGL",
          <span key="2" className="italic text-peach">
            Editorial Type
          </span>,
          "Next.js · Nuxt · React",
          "Logo & Brand · Webflow · Framer",
          <span key="3" className="italic">
            Art Direction
          </span>,
          "AI Integration · RAG",
        ]}
      />
    </section>
  );
}
