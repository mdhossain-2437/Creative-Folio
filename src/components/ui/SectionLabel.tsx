export function SectionLabel({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-normal text-warmwhite/85">
      {index && <span className="display-num text-peach">{index}</span>}
      {index && <span aria-hidden className="text-warmwhite/30">·</span>}
      <span>{children}</span>
    </p>
  );
}
