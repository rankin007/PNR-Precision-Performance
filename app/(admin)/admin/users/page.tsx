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

      <div className="mt-8 grid gap-4">
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
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                      {user.membershipLevelCodes.length > 0
                        ? user.membershipLevelCodes.join(" · ")
                        : "No levels assigned"}
                    </p>
                    <h2 className="font-display text-3xl text-ink">
                      {user.displayName || user.email}
                    </h2>
                    <p className="text-sm text-steel">{user.email}</p>
                    {user.organisationName ? (
                      <p className="text-sm text-steel">Organisation: {user.organisationName}</p>
                    ) : null}
                    <p className="text-sm text-steel">Status: {user.status}</p>
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
    </SectionCard>
  );
}
