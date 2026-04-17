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
  const activeUsers = snapshot.users.filter((user) => user.status === "active").length;
  const inactiveUsers = snapshot.users.length - activeUsers;
  const membershipMode = !snapshot.envReady
    ? "Setup required"
    : snapshot.hasAdmin
      ? "Live administration"
      : "Awaiting first admin";

  return (
    <SectionCard
      eyebrow="Admin Memberships"
      title="Membership controls"
      description="Assign access levels, review the current user pool, and keep the platform's access model moving without touching the database manually."
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

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Membership levels</p>
          <p className="mt-4 font-display text-4xl text-ink">{snapshot.membershipLevels.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Configured access tiers ready for assignment.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Bootstrapped users</p>
          <p className="mt-4 font-display text-4xl text-ink">{snapshot.users.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Recent users visible to membership administration.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Active users</p>
          <p className="mt-4 font-display text-4xl text-ink">{activeUsers}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Accounts currently marked active in the user table.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Admin assignment</p>
          <p className="mt-4 text-sm font-semibold text-ink">{snapshot.hasAdmin ? "Present" : "Missing"}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Tracks whether the first admin role has been claimed.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Membership mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{membershipMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!snapshot.envReady
              ? "The membership workspace will become fully active once admin-side Supabase access is available."
              : "Use this area to manage access levels and keep member permissions aligned with real project roles."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <h2 className="font-display text-2xl text-ink">Assign membership level</h2>
          <p className="mt-3 text-sm leading-7 text-steel">
            Use the project-specific user accounts only. Assign levels after the user has authenticated at least once.
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

        <div className="grid gap-6">
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

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Access guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">What to watch</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Active users</p>
                <p className="mt-1 text-steel">{activeUsers} users are currently active and eligible for access review.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Inactive users</p>
                <p className="mt-1 text-steel">{inactiveUsers} users are currently inactive and may need role or access confirmation.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Operational note</p>
                <p className="mt-1 text-steel">
                  Assign levels only after a user has authenticated once, so membership links attach to a real app account instead of an assumed identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
