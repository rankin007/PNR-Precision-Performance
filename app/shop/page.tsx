import { SectionCard } from "@/components/layout/section-card";

const bulletClass =
  "flex gap-3 rounded-2xl border border-ink/10 bg-sand px-4 py-3";
const bulletIconClass =
  "mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d2b161] text-xs font-bold text-[#b58b2f]";

const overviewItems = [
  "One-off Professional Urine and Saliva Analysis BE Kit to establish your in-house testing station",
  "Monthly performance service with unlimited testing and weekly reporting",
  "Food, supplement, hydration, and recovery guidance for each horse",
  "Baseline analysis using Blue Square biological markers and strict performance protocols",
  "Phased implementation roadmap for immediate adoption and long-term development",
];

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

const detailSections = [
  {
    eyebrow: "Program Outcomes",
    title: "What the program is designed to deliver",
    items: [
      "Improved training precision through real-time physiological data.",
      "Reduced risk of dehydration, fatigue, and electrolyte imbalance.",
      "Clear nutritional direction for trainers, vets, and owners.",
      "Consistent weekly insights to support peak performance.",
    ],
  },
  {
    eyebrow: "Biological Markers",
    title: "Baseline analysis and Blue Squares",
    items: [
      "Health scores",
      "Carbohydrate loads and ratios",
      "pH variances",
      "Conductivity range: 20-33 ms, with high turbidity indicating poor filtration",
    ],
  },
  {
    eyebrow: "Calibration",
    title: "Protocols and testing focus",
    items: [
      "Hydration management",
      "Diet acidity management",
      "Precise testing protocols",
    ],
  },
  {
    eyebrow: "Performance Loop",
    title: "Feedback and live adjustment model",
    items: [
      "Real Time adjustments based on individual results.",
      "Track Comments from human connections",
      "Introduction to Long Term development for yearling programs",
    ],
  },
  {
    eyebrow: "Implementation",
    title: "Roadmap",
    items: [
      "Phase 1. Go by the Numbers",
      "Phase 2 Trust the Numbers",
      "Phase 3 Precise Adjustments",
    ],
  },
  {
    eyebrow: "Long-Term Success",
    title: "Development and success metrics",
    items: [
      "Skeletal, muscular, and emotional improvement in Thoroughbreds",
      "Early protocol implementation to build a generation of elite athletes",
      "High health scores tied directly to win and place outcomes",
      "Ongoing monitoring, data collection, and professional intuition to guide results",
    ],
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 text-sm leading-7 text-steel">
      {items.map((item) => (
        <li key={item} className={bulletClass}>
          <span className={bulletIconClass}>+</span>
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
            <h2 className="mt-3 font-display text-3xl text-ink">
              Elite Equine Performance Analysis
            </h2>
            <p className="mt-4 text-sm leading-8 text-steel">
              A structured professional program combining in-house testing equipment,
              advanced biological analysis, and continuous reporting to support
              high-performance racing stables.
            </p>
            <BulletList items={overviewItems} />
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-2 xl:grid-cols-2">
            <div className="flex h-full flex-col rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="font-display text-3xl text-[#1f5f49]">Professional Kit</p>
              <p className="mt-10 text-sm text-steel">One-off purchase</p>
              <p className="mt-6 font-display text-5xl text-[#1f5f49]">$4,500</p>
              <p className="mt-3 text-sm text-steel">plus Postage</p>
              <BulletList items={professionalKitItems} />
              <div className="mt-auto pt-8">
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="slug" value="professional-kit" />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-[1.1rem] bg-[#1f5f49] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#184b39]"
                  >
                    Order Now
                  </button>
                </form>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-[2rem] border border-[#d2b161] bg-white p-6 shadow-panel">
              <span className="inline-flex rounded-full bg-[#f7efd8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#c49a3a]">
                Recommended
              </span>
              <p className="mt-8 font-display text-3xl text-[#1f5f49]">Monthly Service</p>
              <p className="mt-10 font-display text-4xl leading-tight text-[#1f5f49]">
                $120 Per Horse or P.O.A
              </p>
              <p className="mt-3 text-sm text-steel">Unlimited testing.</p>
              <BulletList items={monthlyServiceItems} />
              <div className="mt-auto pt-8">
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="slug" value="monthly-performance-service" />
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
                  <td className="px-4 py-4">
                    Certified instruments, equipment, onboarding, training, and 200
                    specimen containers
                  </td>
                  <td className="rounded-r-2xl px-4 py-4 font-semibold">
                    $4,500 one-off plus Postage
                  </td>
                </tr>
                <tr className="rounded-2xl bg-sand">
                  <td className="rounded-l-2xl px-4 py-4 font-semibold">Monthly Service</td>
                  <td className="px-4 py-4">Unlimited testing.</td>
                  <td className="rounded-r-2xl px-4 py-4 font-semibold">
                    $120 per horse or P.O.A
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {detailSections.map((section) => (
            <div
              key={section.eyebrow}
              className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel"
            >
              <p className="eyebrow">{section.eyebrow}</p>
              <h2 className="mt-3 font-display text-2xl text-ink">{section.title}</h2>
              <BulletList items={section.items} />
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
