import "server-only";

import type { AppAuthContext } from "@/lib/auth/app-context";
import {
  composeManagedAccessSnapshot,
  type ManagedAccessSnapshot,
} from "@/lib/auth/managed-access-contract";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PROFILE_SELECT = "id,user_id,display_name,is_active,users!inner(id,status,primary_role_code)";
const ASSIGNMENT_SELECT =
  "id,horse_id,stable_id,member_profile_id,role_code,access_level,starts_at,ends_at";

export async function getManagedAccessSnapshot(
  context: AppAuthContext,
  reference: Date = new Date(),
): Promise<ManagedAccessSnapshot> {
  if (
    !context.appUserId ||
    !context.memberProfileId ||
    (context.primaryRole !== "administrator" && context.primaryRole !== "trainer")
  ) {
    return { availability: "unavailable" };
  }

  const supabase = await createSupabaseServerClient();
  const [profileResult, horseResult, assignmentResult] = await Promise.all([
    supabase
      .from("member_profiles")
      .select(PROFILE_SELECT)
      .eq("is_active", true)
      .order("display_name"),
    supabase.from("horses").select("id,name,stable_id").order("name"),
    supabase.from("biochemistry_horse_access_assignments").select(ASSIGNMENT_SELECT),
  ]);

  if (profileResult.error || horseResult.error || assignmentResult.error) {
    return { availability: "unavailable" };
  }

  const rawHorses = Array.isArray(horseResult.data) ? horseResult.data : [];
  const permissionResults =
    context.primaryRole === "administrator"
      ? rawHorses.map((horse) => ({ data: true, error: null, horseId: horse.id }))
      : await Promise.all(
          rawHorses.map(async (horse) => {
            const result = await supabase.rpc("is_trainer_for_horse", {
              target_horse_id: horse.id,
            });
            return { ...result, horseId: horse.id };
          }),
        );

  const manageableHorseIds =
    context.primaryRole === "administrator"
      ? rawHorses.map((horse) => horse.id)
      : permissionResults
          .filter((result) => !result.error && result.data === true)
          .map((result) => result.horseId);

  return composeManagedAccessSnapshot({
    actorAppUserId: context.appUserId,
    actorMemberProfileId: context.memberProfileId,
    actorRole: context.primaryRole,
    profiles: profileResult.data,
    horses: rawHorses,
    manageableHorseIds,
    assignments: assignmentResult.data,
    queryFailed:
      !Array.isArray(profileResult.data) ||
      !Array.isArray(horseResult.data) ||
      !Array.isArray(assignmentResult.data) ||
      permissionResults.some((result) => Boolean(result.error)),
    reference,
  });
}

export const managedAccessServerContract = {
  profileSelect: PROFILE_SELECT,
  assignmentSelect: ASSIGNMENT_SELECT,
  clientKind: "signed-in-supabase-server-client" as const,
  partialResults: "unavailable" as const,
};
