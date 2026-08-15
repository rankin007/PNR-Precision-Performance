import type {
  ManagedAssignmentMutationAdapter,
  ManagedAssignmentPayload,
  ManagedMutationQueryResult,
} from "./managed-access-contract";

export const MANAGED_ACCESS_ASSIGNMENTS_TABLE = "biochemistry_horse_access_assignments";

export type ManagedAccessQueryBuilder = PromiseLike<ManagedMutationQueryResult> & {
  select(columns: string): ManagedAccessQueryBuilder;
  eq(column: string, value: unknown): ManagedAccessQueryBuilder;
  or(filters: string): ManagedAccessQueryBuilder;
  insert(payload: ManagedAssignmentPayload): ManagedAccessQueryBuilder;
  update(payload: ManagedAssignmentPayload | { ends_at: string }): ManagedAccessQueryBuilder;
};
export type ManagedAccessQueryClient = { from(table: string): ManagedAccessQueryBuilder };

export function createManagedAccessMutationAdapter(
  client: ManagedAccessQueryClient,
  nowIso: string,
): ManagedAssignmentMutationAdapter {
  return {
    findExisting(key) {
      return client.from(MANAGED_ACCESS_ASSIGNMENTS_TABLE)
        .select("id,starts_at,ends_at")
        .eq("horse_id", key.horseId)
        .eq("member_profile_id", key.memberProfileId)
        .eq("role_code", key.roleCode);
    },
    create(payload) {
      return client.from(MANAGED_ACCESS_ASSIGNMENTS_TABLE).insert(payload).select("id");
    },
    reactivate(target, payload) {
      return client.from(MANAGED_ACCESS_ASSIGNMENTS_TABLE).update(payload)
        .eq("id", target.assignmentId)
        .eq("horse_id", target.horseId)
        .eq("member_profile_id", target.memberProfileId)
        .eq("role_code", target.roleCode)
        .or(`starts_at.gt.${nowIso},ends_at.lt.${nowIso}`)
        .select("id");
    },
    revoke(target) {
      return client.from(MANAGED_ACCESS_ASSIGNMENTS_TABLE).update({ ends_at: nowIso })
        .eq("id", target.assignmentId)
        .eq("horse_id", target.horseId)
        .eq("member_profile_id", target.memberProfileId)
        .eq("role_code", target.roleCode)
        .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
        .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
        .select("id");
    },
  };
}
