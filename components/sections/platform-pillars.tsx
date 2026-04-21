const pillars = [
  {
    title: "Horse Performance Data",
    subtitle: null,
    description: "Capture racehorse performance, physiology, and operational records in a database-backed workflow.",
  },
  {
    title: "Member Experience",
    subtitle: "Owners · Trainers · Staff",
    description: "Your platform is accurate metrics for an insight into your horse's performance and recovery biochemistry. No Guessing!",
  },
  {
    title: "Commerce And Growth",
    subtitle: null,
    description: "Present products, member offers, and future hybrid revenue paths through a connected storefront.",
  },
];

export function PlatformPillars() {
  return (
    <section id="capabilities" className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap">
        <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-8 shadow-panel">
          <span className="eyebrow">Platform Capabilities</span>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
                <h2 className="font-display text-3xl text-ink">{pillar.title}</h2>
                {pillar.subtitle && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-ember">{pillar.subtitle}</p>
                )}
                <p className="mt-3 text-sm leading-7 text-steel">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
