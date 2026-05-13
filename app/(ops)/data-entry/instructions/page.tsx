import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { trainerInstructionResources, type TrainerInstructionResource } from "@/lib/trainer-instructions";

function typeLabel(type: TrainerInstructionResource["type"]) {
  switch (type) {
    case "instructional-video":
      return "Instructional Video";
    case "youtube-video":
      return "YouTube Video";
    case "pdf-document":
      return "PDF Document";
    case "quick-start-note":
      return "Quick-Start Note";
    case "troubleshooting-note":
      return "Troubleshooting Note";
    default:
      return "Resource";
  }
}

export default function TrainTheTrainerInstructionsPage() {
  const totalResources = trainerInstructionResources.reduce((count, section) => count + section.items.length, 0);

  return (
    <SectionCard
      eyebrow="Train The Trainer"
      title="Train the Trainer Instructions"
      description="Keep your walkthrough videos, YouTube links, PDF guides, and printable trainer references together in one place for quick operational access."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/data-entry/horses"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          Back to The Stable
        </Link>
        <Link
          href="/data-entry"
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          Data Entry
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Resource library</p>
          <p className="mt-4 font-display text-4xl text-ink">{totalResources}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Total links currently listed across all training materials.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Content groups</p>
          <p className="mt-4 font-display text-4xl text-ink">{trainerInstructionResources.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Videos and documents are grouped so trainers can scan the library faster.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Admin note</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">Update anytime</p>
          <p className="mt-3 text-sm leading-7 text-steel">Edit `lib/trainer-instructions.ts` to swap placeholder links for your real videos and PDF files.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        {trainerInstructionResources.map((section) => (
          <div key={section.heading} className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{section.heading}</p>
                <h2 className="mt-3 font-display text-2xl text-ink">{section.heading}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-steel">{section.summary}</p>
              </div>
              <div className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
                {section.items.length} link{section.items.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {section.items.map((item) => (
                <div key={item.title} className="flex flex-col gap-4 rounded-[1.5rem] border border-ink/10 bg-sand px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{typeLabel(item.type)}</p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-steel">{item.description}</p>
                    <p className="mt-2 break-all text-xs text-steel">{item.url}</p>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                  >
                    Open Resource
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
