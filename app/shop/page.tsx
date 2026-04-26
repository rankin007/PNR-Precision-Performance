import { SectionCard } from "@/components/layout/section-card";

const professionalKitItems = [
  "Certified testing instruments",
  "Calibration and setup services",
  "Stable onboarding and workflow integration",
  "Access to BE Australia performance protocols",
  "200 specimen containers",
  "Testing station and tray",
  "Ancillary equipment to complete the testing",
  "In-house training and instructions",
];

const monthlyServiceItems = [
  "Unlimited testing with no cap on frequency or sample volume",
  "Weekly hydration and electrolyte reporting",
  "Recovery indicator tracking",
  "Training block trend analysis",
  "Mineral and vitamin guidance",
  "Adjustments based on workload, climate, and patterns",
  "Individual profiles for each enrolled horse",
];

const programOutcomes = [
  "Improved training precision through real-time physiological data.",
  "Reduced risk of dehydration, fatigue, and electrolyte imbalance.",
  "Clear nutritional direction for trainers, vets, and owners.",
  "Consistent weekly insights to support peak performance.",
];

const biologicalMarkers = [
  "Health scores",
  "Carbohydrate loads and ratios",
  "pH variances",
  "Conductivity range: 20-33 ms, with high turbidity indicating poor filtration",
];

const calibrationProtocols = [
  "Hydration management",
  "Diet acidity management",
  "Precise testing protocols",
];

const performanceLoop = [
  "Real Time adjustments based on individual results.",
  "Track Comments from human connections",
  "Introduction to Long Term development for yearling programs",
];

const roadmap = [
  "Phase 1. Go by the Numbers",
  "Phase 2 Trust the Numbers",
  "Phase 3 Precise Adjustments",
];

const longTermMetrics = [
  "Skeletal, muscular, and emotional improvement in Thoroughbreds",
  "Early protocol implementation to build a generation of elite athletes",
  "High health scores tied directly to win and place outcomes",
  "Ongoing monitoring, data collection, and professional intuition to guide results",
];

const professionalKitSlug = "professional-kit";
const monthlyServiceSlug = "monthly-performance-service";

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 text-sm leading-7 text-steel">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl border border-ink/10 bg-sand px-4 py-3">
          <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d2b161] text-xs font-bold text-[#b58b2f]">
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ShopPage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Shop"
        title="Professional Equipment"
        description="Elite Equine Performance Analysis pricing and services for our advanced urine and saliva analysis program, designed to optimize the health and performance of elite Thoroughbred racehorses."
      >
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-ink/10 bg-[#f8f4ec] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Overview</p>
            <h2 className="mt-3 font-display text-3xl text-ink">Elite Equine Performance Analysis</h2>
            <p className="mt-4 text-sm leading-8 text-steel">
              A structured professional program combining in-house testing equipment, advanced biological
              analysis, and continuous reporting to support high-performance racing stables.
            </p>
            <FeatureList
              items={[
                "One-off Professional Urine and Saliva Analysis BE Kit to establish your in-house testing station",
                "Monthly performance service with unlimited testing and weekly reporting",
                "Food, supplement, hydration, and recovery guidance for each horse",
                "Baseline analysis using Blue Square biological markers and strict performance protocols",
                "Phased implementation roadmap for immediate adoption and long-term development",
              ]}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="font-display text-3xl text-[#1f5f49]">Professional Kit</p>
              <p className="mt-10 text-sm text-steel">One-off purchase</p>
              <p className="mt-6 font-display text-5xl text-[#1f5f49]">$2,500</p>
              <p className="mt-3 text-sm text-steel">Buyback option: $500 on or before 4 weeks from purchase date</p>
              <FeatureList items={professionalKitItems} />
              <div className="mt-8">
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="slug" value={professionalKitSlug} />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-[1.1rem] bg-[#1f5f49] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#184b39]"
                  >
                    Order Now
                  </button>
                </form>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#d2b161] bg-white p-6 shadow-panel">
              <span className="inline-flex rounded-full bg-[#f7efd8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#c49a3a]">
                Recommended
              </span>
              <p className="mt-8 font-display text-3xl text-[#1f5f49]">Monthly Service</p>
              <p className="mt-10 text-sm text-steel">Per horse per month</p>
              <p className="mt-6 font-display text-5xl text-[#1f5f49]">$600</p>
              <p className="mt-3 text-sm text-steel">In-house collection and continuous physiological monitoring</p>
              <FeatureList items={monthlyServiceItems} />
              <div className="mt-8">
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="slug" value={monthlyServiceSlug} />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-[1.1rem] bg-[#d2b161] px-5 py-4 text-sm font-semibold text-[#18212b] transition hover:bg-[#c5a44f]"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Pricing Summary</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Overview and pricing panel</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-ink">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                  <th className="px-4">Item</th>
                  <th className="px-4">Description</th>
                  <th className="px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="rounded-2xl bg-sand">
                  <td className="rounded-l-2xl px-4 py-4 font-semibold">Professional Kit</td>
                  <td className="px-4 py-4">Certified instruments, equipment, onboarding, training, and 200 specimen containers</td>
                  <td className="rounded-r-2xl px-4 py-4 font-semibold">$2,500 one-off</td>
                </tr>
                <tr className="rounded-2xl bg-sand">
                  <td className="rounded-l-2xl px-4 py-4 font-semibold">Kit Buyback</td>
                  <td className="px-4 py-4">Available on or before 4 weeks if returned in good order</td>
                  <td className="rounded-r-2xl px-4 py-4 font-semibold">$500</td>
                </tr>
                <tr className="rounded-2xl bg-sand">
                  <td className="rounded-l-2xl px-4 py-4 font-semibold">Monthly Service</td>
                  <td className="px-4 py-4">Unlimited testing, weekly reporting, and supplement guidance per horse</td>
                  <td className="rounded-r-2xl px-4 py-4 font-semibold">$600 per horse / month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Program Outcomes</p>
            <h2 className="mt-3 font-display text-2xl text-ink">What the program is designed to deliver</h2>
            <FeatureList items={programOutcomes} />
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Biological Markers</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Baseline analysis and Blue Squares</h2>
            <FeatureList items={biologicalMarkers} />
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Calibration</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Protocols and testing focus</h2>
            <FeatureList items={calibrationProtocols} />
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Performance Loop</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Feedback and live adjustment model</h2>
            <FeatureList items={performanceLoop} />
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Implementation</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Roadmap</h2>
            <FeatureList items={roadmap} />
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Long-Term Success</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Development and success metrics</h2>
            <FeatureList items={longTermMetrics} />
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
