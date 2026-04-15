import { assignMembershipLevelByEmailAction } from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";

type AdminMembershipsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminMembershipsPage({
  searchParams,
}: AdminMembershipsPageProps) {
  const params = searchParams ? await searchParams : {};
  const assigned = pickValue(params.assigned);
  const level = pickValue(params.level);
  const error = pickValue(params.error);
  const snapshot = await getMembershipAdminSnapshot();

  return (
    <SectionCard
      eyebrow="Admin Memberships"
      title="Membership controls"
      description="This route will host membership levels, permission bundles, and administrator assignment workflows."
    >
      {!snapshot.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase service-role configuration is missing. Membership assignment tools will activate once the
          new project environment variables are set.
        </div>
      ) : null}

      {assigned && level ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Assigned membership level `{level}` to `{assigned}`.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "user-not-found"
            ? "That user email does not yet exist in the application user table."
            : "Email and membership level are both required."}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <h2 className="font-display text-2xl text-ink">Assign membership level</h2>
          <p className="mt-3 text-sm leading-7 text-steel">
            Use the new project-specific user accounts only. Assign levels after the user has authenticated at least once.
          </p>
          <form action={assignMembershipLevelByEmailAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-ink">
              User email
              <input
                name="email"
                type="email"
                placeholder="member@example.com"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Membership level
              <select
                name="levelCode"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a level
                </option>
                {snapshot.membershipLevels.map((membershipLevel) => (
                  <option key={membershipLevel.code} value={membershipLevel.code}>
                    {membershipLevel.name} ({membershipLevel.code})
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Assign level
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <h2 className="font-display text-2xl text-ink">Recent users</h2>
          <div className="mt-5 grid gap-3">
            {snapshot.users.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No bootstrapped users yet.
              </div>
            ) : (
              snapshot.users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink"
                >
                  <p className="font-semibold">{user.email}</p>
                  <p className="mt-1 text-steel">Status: {user.status}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
