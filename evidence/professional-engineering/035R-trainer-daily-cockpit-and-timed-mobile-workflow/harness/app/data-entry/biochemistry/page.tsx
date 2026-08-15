import Link from "next/link";
import { BiochemistryCaptureWorkflow } from "@/components/ops/biochemistry-capture-workflow";
import { createInitialBiochemistryCaptureValues } from "@/components/ops/biochemistry-workflow-state";

const horses = [
  { id: "synthetic-alpha", name: "Synthetic Alpha" },
  { id: "synthetic-bravo", name: "Synthetic Bravo" },
  { id: "synthetic-charlie", name: "Synthetic Charlie" },
];

async function evidenceOnlyAction(_formData: FormData): Promise<never> {
  "use server";
  throw new Error("Synthetic evidence mode does not submit records.");
}

type Props = { searchParams?: Promise<Record<string, string | string[] | undefined>> };
function first(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function EvidenceCapture({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const initialValues = createInitialBiochemistryCaptureValues({ horses, requestedHorseId: first(params.horseId), now: new Date("2026-08-11T01:30:00.000Z") });
  return (
    <main className="min-h-screen bg-canvas px-4 py-8 sm:px-8">
      <section className="mx-auto max-w-3xl rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Synthetic local evidence</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Mobile test capture</h1>
        <p className="mt-3 text-sm leading-6 text-ink">Use only the supplied synthetic values. Review the test, but do not tap Submit test. This local action cannot save a record.</p>
        <div className="my-6"><Link href="/" className="inline-flex min-h-11 items-center rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">Back to trainer dashboard</Link></div>
        <BiochemistryCaptureWorkflow horses={horses} initialValues={initialValues} envReady action={evidenceOnlyAction} />
      </section>
    </main>
  );
}
