import { SectionCard } from "@/components/layout/section-card";
import { ManagedAccessWorkspace } from "@/components/ops/managed-access-workspace";
import { getManagedAccessSnapshot } from "@/lib/auth/managed-access-server";
import { requireManagedAccessAppContext } from "@/lib/auth/session";
import {
  assignManagedHorseAccessAction,
  revokeManagedHorseAccessAction,
} from "./actions";

type AccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ManagedAccessPage({ searchParams }: AccessPageProps) {
  const context = await requireManagedAccessAppContext("/data-entry/access");
  const snapshot = await getManagedAccessSnapshot(context);
  const params = searchParams ? await searchParams : {};
  const rawStatus = first(params.status);
  const status =
    rawStatus === "assigned" || rawStatus === "revoked" || rawStatus === "unavailable"
      ? rawStatus
      : undefined;

  return (
    <SectionCard
      eyebrow="Managed Access"
      title="Horse access"
      description="Manage read access for already-scoped Veterinarians and Stable Staff."
    >
      <ManagedAccessWorkspace
        snapshot={snapshot}
        status={status}
        assignAction={assignManagedHorseAccessAction}
        revokeAction={revokeManagedHorseAccessAction}
      />
    </SectionCard>
  );
}
