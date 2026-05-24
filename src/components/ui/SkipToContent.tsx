// SkipToContent — keyboard-only escape hatch that drops focus straight on
// <main>. Visually hidden until focused (translate-y off-screen); when
// the user tabs to it the pill slides in with a soft transition.
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-peach px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-widest text-ink-900 shadow-[0_18px_38px_-18px_rgba(227,191,180,0.6)] transition-transform duration-300 ease-out focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warmwhite"
    >
      ↓ Skip to content
    </a>
  );
}
