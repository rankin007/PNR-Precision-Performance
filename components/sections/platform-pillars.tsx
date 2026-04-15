const pillars = [
  {
    title: "Structured Horse Data",
    description: "Capture racehorse performance, physiology, and operational records in a database-backed workflow.",
  },
  {
    title: "Permission-Aware Membership",
    description: "Support owners, trainers, staff, and administrators with role-aware visibility and control.",
  },
  {
    title: "Commerce And Growth",
    description: "Prepare the public site for products, paid tiers, and future hybrid revenue models.",
  },
];

export function PlatformPillars() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap">
        <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-8 shadow-panel">
          <span className="eyebrow">Platform Pillars</span>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
                <h2 className="font-display text-3xl text-ink">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

