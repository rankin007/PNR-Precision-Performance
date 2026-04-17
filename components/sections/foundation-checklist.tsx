const items = [
  "Public website and commerce-ready product surfaces",
  "Authenticated portal routes for owners, trainers, and future roles",
  "Operations workflows for daily, feeding, and track submissions",
  "Administrative controls for memberships, users, and setup readiness",
  "Structured content and architecture that can scale with the platform",
];

export function FoundationChecklist() {
  return (
    <section id="foundation" className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#18212b] p-8 text-white">
          <span className="eyebrow text-[#d88b70] before:bg-current">Platform Snapshot</span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            The platform now spans public discovery, member access, operations, and administration.
          </h2>
          <p className="mt-5 text-sm leading-8 text-white/75">
            As more live integrations and business-specific detail are added, this platform can expand without
            changing its core structure or splitting into disconnected tools.
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
