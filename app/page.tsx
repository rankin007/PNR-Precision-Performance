import Image from "next/image";
import Link from "next/link";
import { TrainerEnquiryForm } from "@/components/forms/trainer-enquiry-form";
import { HorseMark } from "@/components/marketing/horse-mark";

const methodSteps = [
  { label: "01", title: "Biochemical profiling", text: "Bring horse details, stable observations, instrument readings, team notes and feeding protocols into one consistent review." },
  { label: "02", title: "Recovery optimisation", text: "Use regular post-work analysis to observe weekly changes and support informed feeding and hydration adjustments." },
  { label: "03", title: "Sustained performance", text: "Follow individual trends over time so practical decisions are grounded in consistent information rather than estimates alone." },
];

const trainerBenefits = [
  "A clearer view of recovery between gallops and race days",
  "Better understanding of each horse's individual patterns",
  "Less guesswork in feeding and hydration strategies",
  "Earlier visibility of changes that warrant closer review",
  "Support for longer, more consistent racing campaigns",
  "Data-informed adjustments using non-invasive testing",
];

const monitoringTopics = [
  "Hydration and electrolyte balance",
  "Recovery efficiency",
  "Urine conductivity and pH levels",
  "Carbohydrate and salt ratios",
  "Nutrient utilisation and indicators of metabolic load",
  "Feeding and supplementation response",
];

function HorseItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 rounded-lg border border-technical/10 bg-white px-5 py-4 text-sm font-semibold leading-7 text-technical shadow-sm">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-accent" aria-hidden="true">
        <HorseMark className="h-6 w-6" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell overflow-x-hidden bg-canvas">
      <section className="relative min-h-[92svh] overflow-hidden bg-technical text-white">
        <Image src="/under-construction-thoroughbred.jpg" alt="Thoroughbred in a professional racing stable" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071b17]/95 via-brand/88 to-brand/45" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-canvas to-transparent" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-5 md:px-6 xl:px-0">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase">
            <HorseMark className="h-8 w-8 text-accent" /> Precision Performance
          </Link>
          <nav aria-label="Public navigation" className="hidden items-center gap-5 text-sm text-white/85 md:flex">
            <a href="#method" className="hover:text-white">Method</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
            <a href="#kit" className="hover:text-white">BE Kit</a>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/sign-in" className="rounded-full border border-white/35 px-4 py-2 hover:bg-white/10">Trainer Login</Link>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-4.5rem)] w-full max-w-[1180px] items-center px-4 pb-20 pt-8 md:px-6 xl:px-0">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase leading-6 tracking-[0.22em] text-accent md:text-sm">Elite Equine Performance and Recovery Analysis</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl">Precision Performance.<span className="mt-2 block text-white/92">A science for elite equine athletes.</span></h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/84 md:text-lg">Non-invasive urine and saliva analysis gives trainers a consistent view of hydration, electrolyte and recovery trends. Precision Performance combines practical horsemanship with measurable information to support informed decisions for each thoroughbred.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#enquiry" className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-technical hover:bg-white">Request a Stable Trial</a>
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 px-6 py-3 text-sm font-semibold hover:bg-white/10">See How It Works</a>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="eyebrow">The Precision Performance Method</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <h2 className="font-display text-4xl leading-tight text-technical md:text-5xl">Professional horsemanship. Go by the numbers. Trust the numbers. No guessing.</h2>
            <p className="text-base leading-8 text-muted md:text-lg">A platform designed to complement stable knowledge with reliable data, helping trainers observe inconsistencies and follow improvements over time through clear, approachable information.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {methodSteps.map((step) => <article key={step.title} className="rounded-xl border border-accent/35 bg-brand p-6 text-white shadow-panel"><p className="text-sm font-bold text-accent">{step.label}</p><h3 className="mt-4 font-display text-2xl">{step.title}</h3><p className="mt-4 text-sm leading-7 text-white/76">{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div><p className="eyebrow">For Trainers</p><h2 className="mt-6 font-display text-4xl leading-tight text-technical md:text-5xl">A clearer daily view of horses that need attention.</h2><p className="mt-6 text-base leading-8 text-muted">Designed around the working stable, Precision Performance helps trainers bring regular measurements and experienced observation into one repeatable review process.</p></div>
          <ul className="grid gap-3 sm:grid-cols-2">{trainerBenefits.map((item) => <HorseItem key={item}>{item}</HorseItem>)}</ul>
        </div>
      </section>

      <section id="how-it-works" className="bg-technical px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">See how it works</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><h2 className="font-display text-4xl leading-tight md:text-5xl">Clear trends, viewed in context.</h2><p className="text-base leading-8 text-white/72">Regular measurements help establish an individual baseline and make change easier to discuss. These approved examples are anonymised demonstration content; they do not display production thresholds, proprietary formulas or live horse records.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-xl bg-white p-4 text-technical"><Image src="/029m/anonymised-hydration-demonstration.png" alt="Anonymised demonstration chart showing hydration readings changing over time" width={1162} height={616} priority className="h-auto w-full rounded-md" /><figcaption className="mt-4 text-sm font-semibold">Anonymised hydration trend demonstration.</figcaption></figure>
            <figure className="overflow-hidden rounded-xl bg-white p-4 text-technical"><Image src="/029m/anonymised-conductivity-demonstration.png" alt="Anonymised demonstration dashboard with conductivity and carbohydrate trend charts" width={579} height={384} priority className="h-auto w-full rounded-md" /><figcaption className="mt-4 text-sm font-semibold">Anonymised conductivity and carbohydrate demonstration.</figcaption></figure>
          </div>
        </div>
      </section>

      <section id="kit" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="eyebrow">Testing Kit and Services</p><h2 className="mt-6 font-display text-4xl leading-tight text-technical md:text-5xl">Stable measurements in real time.</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <ul className="grid gap-3">{monitoringTopics.map((item) => <HorseItem key={item}>{item}</HorseItem>)}</ul>
            <article className="overflow-hidden rounded-xl border border-technical/10 bg-white shadow-panel"><Image src="/029m/be-kit.jpeg" alt="Open BE Kit containing field testing instruments and sample equipment" width={1600} height={1600} priority className="aspect-[4/3] w-full object-cover object-center" /><div className="p-6"><p className="eyebrow">The BE Kit</p><h3 className="mt-4 font-display text-3xl text-technical">Premium equipment for regular stable testing.</h3><p className="mt-4 text-sm leading-7 text-muted">The BE Kit brings together instruments selected for frequent professional and on-site use. It supports high-volume, non-invasive testing as part of the Precision Performance review process. Equipment is supplied with training; it is not available through online checkout.</p></div></article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24"><div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">The Phil-osophy</p><h2 className="mt-6 font-display text-4xl text-technical md:text-5xl">Know more. Guess less. Do no harm.</h2></div><div className="space-y-5 text-base leading-8 text-muted"><p>Precision Performance brings scientific information, consistent monitoring, practical horsemanship and individualised care together. More accurate information can support better-informed decisions for each horse.</p><p>Our goal is simple: go by the numbers, trust the numbers and do no harm. Non-invasive analysis provides another source of timely information while experienced trainers and qualified veterinary professionals remain central to every decision.</p></div></div></section>

      <section className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto w-full max-w-[1180px]"><p className="eyebrow">The Precision Performance Approach</p><div className="mt-6 rounded-xl border border-accent/40 bg-brand p-7 text-white md:p-10"><h2 className="font-display text-3xl md:text-4xl">Practical insight for the working stable.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-white/75">Precision Performance is designed around consistent observation, non-invasive measurement and informed professional review—helping trainers build a clearer picture of each horse over time.</p></div></div></section>

      <section id="enquiry" className="bg-brand px-4 py-16 text-white md:px-8 md:py-24"><div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Get in Touch</p><h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Request a Stable Trial.</h2><p className="mt-5 text-base leading-8 text-white/76">Stable enquiries are personally handled by founder Phillip Rankin. Online enquiry transmission, commerce and onboarding remain unavailable while their requirements are completed.</p><Link href="/pricing" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold hover:bg-white/10">View commercial information</Link><p className="mt-6 text-sm leading-6 text-white/70">Precision Performance provides educational and informational support only. It does not diagnose or treat horses and does not replace trainer or veterinary judgement.</p><Link href="/disclaimer" className="mt-3 inline-flex text-sm font-semibold underline underline-offset-4 hover:text-accent">Read the public information disclaimer</Link></div><TrainerEnquiryForm /></div></section>
    </main>
  );
}
