const items = [
  "Professional project scaffold for a scalable equine platform",
  "App Router layout and starter landing experience",
  "Tailwind and global design tokens",
  "Agent registry for frontend, brand, platform, and data work",
  "Structured content folders for briefs and architecture inputs",
];

export function FoundationChecklist() {
  return (
    <section id="foundation" className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#18212b] p-8 text-white">
          <span className="eyebrow text-[#d88b70] before:bg-current">Repository Status</span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            The baseline frame is in place and now reflects the actual platform direction.
          </h2>
          <p className="mt-5 text-sm leading-8 text-white/75">
            As product, member, and data requirements are added, this scaffold can grow
            into a tailored web and app ecosystem without reworking the base architecture.
          </p>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-8 shadow-panel">
          <ul className="grid gap-4">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm font-medium text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
