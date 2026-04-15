type SectionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-8 shadow-panel">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 font-display text-4xl text-ink">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-steel">{description}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}

