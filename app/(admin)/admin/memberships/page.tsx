import {
  approveApplicationAccessAction,
  assignMembershipLevelByEmailAction,
} from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";

type AdminMembershipsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not yet recorded";
  }

  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default async function AdminMembershipsPage({
  searchParams,
}: AdminMembershipsPageProps) {
  const params = searchParams ? await searchParams : {};
  const assigned = pickValue(params.assigned);
  const approved = pickValue(params.approved);
  const level = pickValue(params.level);
  const invite = pickValue(params.invite);
  const error = pickValue(params.error);
  const snapshot = await getMembershipAdminSnapshot();
  const activeUsers = snapshot.users.filter((user) => user.status === "active").length;
  const pendingApplications = snapshot.applications.filter((application) => application.status !== "approved");
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

      {approved && level ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Approved `{approved}` as `{level}`. {invite === "sent" ? "An invite email was sent so the member can set a password." : "The member already existed, so access was activated immediately."}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "service-role-missing"
            ? "Set `SUPABASE_SERVICE_ROLE_KEY` before approving applications or assigning memberships."
            : error === "application-missing"
              ? "An application id is required to approve a member request."
            : error === "user-not-found"
            ? "That user email does not yet exist in the application user table."
            : error === "Application must be verified before approval."
              ? "This application still needs email verification and disclaimer confirmation before approval."
              : error}
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
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Pending applications</p>
          <p className="mt-4 font-display text-4xl text-ink">{pendingApplications.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Applications awaiting verification or Phillip approval.</p>
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
            <p className="eyebrow">Applications</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Approve new member requests</h2>
            <div className="mt-5 grid gap-3">
              {pendingApplications.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No new onboarding applications are waiting right now.
                </div>
              ) : (
                pendingApplications.map((application) => {
                  const readyForApproval = Boolean(application.emailVerifiedAt && application.disclaimerAgreedAt);

                  return (
                    <div key={application.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="font-semibold">{application.clientName}</p>
                          <p className="mt-1 text-steel">{application.directEmail}</p>
                          <p className="mt-1 text-steel">{application.businessName || application.stableAddress}</p>
                        </div>
                        <div className="grid gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Business Name</p>
                            <p className="mt-1 text-ink">{application.businessName || "Not supplied"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Mobile Number</p>
                            <p className="mt-1 text-ink">{application.mobileNumber}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Stable Address</p>
                            <p className="mt-1 whitespace-pre-line text-ink">{application.stableAddress}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Direct Email</p>
                            <p className="mt-1 text-ink">{application.directEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Admin / Billing Email</p>
                            <p className="mt-1 text-ink">{application.adminEmail || "Not supplied"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Submitted</p>
                            <p className="mt-1 text-ink">{formatDateTime(application.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Email Verified</p>
                            <p className="mt-1 text-ink">{formatDateTime(application.emailVerifiedAt)}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Disclaimer Agreed</p>
                            <p className="mt-1 text-ink">{formatDateTime(application.disclaimerAgreedAt)}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                          <span className={`rounded-full px-3 py-1 ${readyForApproval ? "border border-emerald-200 bg-emerald-50 text-emerald-700" : "border border-amber-200 bg-amber-50 text-amber-700"}`}>
                            {readyForApproval ? "Verified" : "Awaiting Verification"}
                          </span>
                          <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-ink">
                            {application.status}
                          </span>
                        </div>
                        <form action={approveApplicationAccessAction} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <input type="hidden" name="applicationId" value={application.id} />
                          <select
                            name="levelCode"
                            defaultValue="trainer"
                            className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none"
                          >
                            {snapshot.membershipLevels
                              .filter((membershipLevel) => !["admin", "public"].includes(membershipLevel.code))
                              .map((membershipLevel) => (
                                <option key={membershipLevel.code} value={membershipLevel.code}>
                                  {membershipLevel.name}
                                </option>
                              ))}
                          </select>
                          <button
                            type="submit"
                            disabled={!readyForApproval}
                            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-steel"
                          >
                            Approve And Provision Access
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
