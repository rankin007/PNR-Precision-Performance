import { submitBiochemistryTestAction } from "@/app/(ops)/data-entry/biochemistry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { BiochemistryCaptureWorkflow } from "@/components/ops/biochemistry-capture-workflow";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";

type BiochemistryEntryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BiochemistryEntryPage({ searchParams }: BiochemistryEntryPageProps) {
  await requireOperationalWriteAppContext("/data-entry/biochemistry");
  const params = searchParams ? await searchParams : {};
  const error = pickValue(params.error);
  const horsesResult = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Biochemistry"
      title="Mobile test capture"
      description="Capture manual biochemistry readings for an assigned horse and produce an auditable scoring result without guessing missing lookup values."
    >
      <BiochemistryCaptureWorkflow
        horses={horsesResult.horses}
        envReady={horsesResult.envReady}
        serverError={error}
        action={submitBiochemistryTestAction}
      />
    </SectionCard>
  );
}
