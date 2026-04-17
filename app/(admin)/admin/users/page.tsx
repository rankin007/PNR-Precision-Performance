import { updateUserStatusAction } from "@/app/(admin)/admin/users/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getAdminUserSnapshot } from "@/lib/auth/bootstrap";

type AdminUsersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const params = searchParams ? await searchParams : {};
  const updated = pickValue(params.updated);
  const status = pickValue(params.status);
  const error = pickValue(params.error);
  const snapshot = await getAdminUserSnapshot();
  const activeUsers = snapshot.users.filter((user) => user.status === "active");
  const inactiveUsers = snapshot.users.filter((user) => user.status !== "active");
  const usersWithMemberships = snapshot.users.filter((user) => user.membershipLevelCodes.length > 0);
  const usersWithoutMemberships = snapshot.users.filter((user) => user.membershipLevelCodes.length === 0);
  const usersWithOrganisation = snapshot.users.filter((user) => Boolean(user.organisationName));
  const accessSummary = Array.from(
    snapshot.users.reduce((map, user) => {
      if (user.membershipLevelCodes.length === 0) {
        map.set("unassigned", (map.get("unassigned") ?? 0) + 1);
        return map;
      }

      for (const code of user.membershipLevelCodes) {
        map.set(code, (map.get(code) ?? 0) + 1);
      }

      return map;
    }, new Map<string, number>()),
  ).sort((a, b) => b[1] - a[1]);
  const adminAttentionQueue = snapshot.users.filter(
    (user) =>
      user.membershipLevelCodes.length === 0 || !user.organisationName || user.status !== "active",
  );

  return (
    <SectionCard
      eyebrow="Admin Users"
      title="User and profile controls"
      description="Review bootstrapped users, inspect their attached membership levels, and control account status without touching the database manually."
    >
      {!snapshot.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase service-role configuration is missing. User management tools will activate once the new
          project environment variables are set.
        </div>
      ) : null}

      {updated && status ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Updated user status to `{status}`.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "service-role-missing"
            ? "Set `SUPABASE_SERVICE_ROLE_KEY` before using admin user management."
            : error === "missing-fields"
              ? "Both a user id and next status are required."
              : "User status update failed."}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Visible users</p>
          <p className="mt-4 font-display text-4xl text-ink">{snapshot.users.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Recent authenticated users available to the admin workspace.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Active accounts</p>
          <p className="mt-4 font-display text-4xl text-ink">{activeUsers.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Accounts currently marked active and ready to use the platform.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Access assigned</p>
          <p className="mt-4 font-display text-4xl text-ink">{usersWithMemberships.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Users with at least one membership level already attached.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Organisation profiles</p>
          <p className="mt-4 font-display text-4xl text-ink">{usersWithOrganisation.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Profiles that already carry organisation context for reporting and support.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Review Queue</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Users needing admin attention</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Focus this queue on access assignment, organisation completion, and reactivating accounts that should still have platform access.
            </p>
            <div className="mt-6 grid gap-3">
              {adminAttentionQueue.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No immediate user follow-up is visible in the current snapshot.
                </div>
              ) : (
                adminAttentionQueue.slice(0, 6).map((user) => (
                  <div key={user.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    <p className="font-semibold text-ink">{user.displayName || user.email}</p>
                    <p className="mt-1 text-sm text-steel">{user.email}</p>
                    <p className="mt-3 text-sm text-steel">
                      {user.membershipLevelCodes.length === 0 ? "Access level missing." : `Access: ${user.membershipLevelCodes.join(" / ")}.`}{" "}
                      {!user.organisationName ? "Organisation missing." : `Organisation: ${user.organisationName}.`}{" "}
                      {user.status !== "active" ? `Status is ${user.status}.` : "Status is active."}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Coverage</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Access and profile distribution</h2>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Unassigned users</p>
                <p className="mt-1 text-steel">{usersWithoutMemberships.length} users still need an access level.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Inactive users</p>
                <p className="mt-1 text-steel">{inactiveUsers.length} users are currently marked inactive.</p>
              </div>
              {accessSummary.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  Membership distribution will appear here after users are assigned to levels.
                </div>
              ) : (
                accessSummary.map(([code, count]) => (
                  <div key={code} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold uppercase tracking-[0.14em]">{code}</p>
                      <p className="text-steel">{count}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {snapshot.users.length === 0 ? (
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand px-5 py-5 text-sm text-steel">
              No users have authenticated into the platform yet.
            </div>
          ) : (
            snapshot.users.map((user) => {
              const nextStatus = user.status === "active" ? "inactive" : "active";

              return (
                <div
                  key={user.id}
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                        {user.membershipLevelCodes.length > 0 ? (
                          user.membershipLevelCodes.map((code) => (
                            <span key={code} className="rounded-full border border-ember/20 bg-ember/10 px-3 py-1">
                              {code}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700">
                            No levels assigned
                          </span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-display text-3xl text-ink">{user.displayName || user.email}</h2>
                        <p className="mt-1 text-sm text-steel">{user.email}</p>
                      </div>
                      <div className="grid gap-2 text-sm text-steel">
                        <p>Status: {user.status}</p>
                        <p>Organisation: {user.organisationName || "Not yet supplied"}</p>
                        <p>
                          Admin note:{" "}
                          {user.membershipLevelCodes.length === 0
                            ? "Assign an access level after this user confirms their intended role."
                            : user.status !== "active"
                              ? "Reactivate this user only if they should retain platform access."
                              : !user.organisationName
                                ? "Add organisation context to keep reporting and support records tidy."
                                : "Profile looks ready for ongoing platform use."}
                        </p>
                      </div>
                    </div>

                    <form action={updateUserStatusAction} className="flex flex-wrap items-center gap-3">
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="status" value={nextStatus} />
                      <button
                        type="submit"
                        className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                      >
                        Mark {nextStatus}
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </SectionCard>
  );
}
