const steps = [
  "Operational data moves into structured portal and ops workflows",
  "Authenticated members land in permission-aware views",
  "Administration controls access levels and user assignments",
  "Commerce, reporting, and integrations stay aligned through one platform",
];

export function WorkflowStrip() {
  return (
    <section id="workflow" className="px-4 py-8 md:px-8 md:py-12">
      <div className="section-wrap">
        <div className="rounded-[2rem] border border-ink/10 bg-[#f8f5ef] px-6 py-8 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Operational Flow</span>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                One platform can now support the public site, member experience, operations, and administration.
              </h2>
            </div>
            <div className="grid gap-3 md:max-w-xl">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white bg-white px-4 py-4 text-sm leading-7 text-steel"
                >
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
