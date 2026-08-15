import Link from "next/link";
import { submitBiochemistryTestAction } from "@/app/(ops)/data-entry/biochemistry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { BiochemistryCaptureWorkflow } from "@/components/ops/biochemistry-capture-workflow";
import { createInitialBiochemistryCaptureValues } from "@/components/ops/biochemistry-workflow-state";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";

type BiochemistryEntryPageProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BiochemistryEntryPage({ searchParams }: BiochemistryEntryPageProps) {
  await requireOperationalWriteAppContext("/data-entry/biochemistry");
  const params = searchParams ? await searchParams : {};
  const error = pickValue(params.error);
  const horsesResult = await getAccessibleHorseSummaries();
  const initialValues = createInitialBiochemistryCaptureValues({
    horses: horsesResult.horses,
    requestedHorseId: pickValue(params.horseId),
  });

  return (
    <SectionCard
      eyebrow="Biochemistry"
      title="Mobile test capture"
      description="Capture manual biochemistry readings for an assigned horse and review every value before submission."
    >
      <div className="mb-6">
        <Link href="/portal" className="inline-flex min-h-11 items-center rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          Back to trainer dashboard
        </Link>
      </div>
      <BiochemistryCaptureWorkflow
        horses={horsesResult.horses}
        initialValues={initialValues}
        envReady={horsesResult.envReady}
        serverError={error}
        action={submitBiochemistryTestAction}
      />
    </SectionCard>
  );
}
