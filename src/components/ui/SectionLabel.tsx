export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-warmwhite/50">
      <span className="display-num">§{index}</span>
      <span aria-hidden className="h-px w-8 bg-warmwhite/20" />
      <span>{children}</span>
    </p>
  );
}
