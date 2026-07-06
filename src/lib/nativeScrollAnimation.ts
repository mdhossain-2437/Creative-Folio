function supportsCssDeclaration(declaration: string): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return false;
  }
  return CSS.supports(declaration);
}

export function supportsNativeScrollTimeline(): boolean {
  return supportsCssDeclaration("animation-timeline: scroll()");
}

export function supportsNativeViewTimeline(): boolean {
  return (
    supportsCssDeclaration("animation-timeline: view()") &&
    supportsCssDeclaration("animation-range: entry 0% cover 30%")
  );
}
