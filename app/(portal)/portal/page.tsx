import Link from "next/link";
import { bootstrapInitialAdminAction } from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";
import { getAppAuthContext } from "@/lib/auth/session";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";
import { getPublicProductSummaries } from "@/lib/domain/products";

type PortalPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const params = searchParams ? await searchParams : {};
  const bootstrapState = pickValue(params.bootstrap);
  const denied = pickValue(params.denied);
  const [context, snapshot, horsesResult, submissionsResult, productResult] = await Promise.all([
    getAppAuthContext(),
    getMembershipAdminSnapshot(),
    getAccessibleHorseSummaries(),
    getRecentOperationSubmissions(),
    getPublicProductSummaries(),
  ]);
  const shouldShowInitialAdminBootstrap =
    context.envReady && Boolean(context.sessionUser && context.appUserId) && !snapshot.hasAdmin;
  const portalMode = !horsesResult.envReady || !submissionsResult.envReady
    ? "Preview access"
    : "Live member access";
  const quickStats = [
    {
      label: "Accessible horses",
      value: String(horsesResult.horses.length),
      detail: horsesResult.envReady
        ? "Live horse access resolved through your signed-in context."
        : "Preview horse data is showing until the live dataset is connected.",
    },
    {
      label: "Recent submissions",
      value: String(submissionsResult.submissions.length),
      detail: submissionsResult.envReady
        ? "Latest operational records available for review."
        : "Sample operational records are standing in for live submissions.",
    },
    {
      label: "Membership levels",
      value: String(context.membershipLevelCodes.length),
      detail:
        context.membershipLevelCodes.length > 0
          ? `Current access: ${context.membershipLevelCodes.join(", ")}.`
          : "No membership levels have been assigned yet.",
    },
    {
      label: "Shop catalogue",
      value: String(productResult.products.length),
      detail: productResult.products.some((product) => product.checkoutReady)
        ? "At least one product is ready for checkout."
        : "Commerce data is present, with checkout still dependent on setup status.",
    },
    {
      label: "Portal mode",
      value: portalMode,
      detail:
        !horsesResult.envReady || !submissionsResult.envReady
          ? "Member views can be reviewed now while live horse and operations data are still being connected."
          : "The portal is operating against the current member-access dataset.",
    },
  ];

  return (
    <SectionCard
      eyebrow="Member Portal"
      title="Member overview"
      description="This area brings together your horses, the latest stable activity, and the fastest next steps into reports, data entry, and account administration."
    >
      {denied === "admin" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Administrative access was requested, but your account does not currently have the `platform.admin` permission.
        </div>
      ) : null}
      {bootstrapState === "already-configured" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Initial admin onboarding has already been completed for this project.
        </div>
      ) : null}
      {bootstrapState === "service-role-missing" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Set `SUPABASE_SERVICE_ROLE_KEY` before running first-admin onboarding.
        </div>
      ) : null}
      {shouldShowInitialAdminBootstrap ? (
        <div className="mb-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <h2 className="font-display text-2xl text-ink">Initial admin onboarding</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-steel">
            No admin membership assignment exists yet. The current signed-in account can claim the first
            admin role, which unlocks membership assignment, permissions, and platform administration.
          </p>
          <form action={bootstrapInitialAdminAction} className="mt-5">
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Claim first admin access
            </button>
          </form>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-5">
        {quickStats.map((item) => (
          <div key={item.label} className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{item.label}</p>
            <p className="mt-4 font-display text-4xl text-ink">{item.value}</p>
            <p className="mt-3 text-sm leading-7 text-steel">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_1fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Assigned Horses</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Current horse access</h2>
            </div>
            <Link
              href="/portal/horses"
              className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
            >
              View horses
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {horsesResult.horses.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No horses are attached to this account yet.
              </div>
            ) : (
              horsesResult.horses.slice(0, 4).map((horse) => (
                <div key={horse.id} className="rounded-2xl border border-ink/10 bg-sand px-5 py-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-ink">{horse.name}</p>
                      <p className="mt-1 text-sm text-steel">
                        Stable: {horse.stableName ?? "Assignment pending"} / Status: {horse.status ?? "Pending"}
                      </p>
                    </div>
                    <Link
                      href={`/portal/horses/${horse.id}`}
                      className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
                    >
                      Open profile
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Member guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">How to use this portal</h2>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Start with horse access to confirm the profiles and stable context visible to this account.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Move into reports when you want member-facing summaries of recent metrics and timeline changes.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Use the shop and operations routes only when your role needs those next-step workflows.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Recent Activity</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Latest submissions</h2>
            <div className="mt-6 grid gap-3">
              {submissionsResult.submissions.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No submissions are available yet.
                </div>
              ) : (
                submissionsResult.submissions.slice(0, 4).map((submission) => (
                  <div key={submission.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                      {submission.type}
                    </p>
                    <p className="mt-2 font-semibold text-ink">{submission.horseName}</p>
                    <p className="mt-1 text-sm leading-7 text-steel">{submission.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Quick Actions</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Where to go next</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/portal/reports"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Open reports
              </Link>
              <Link
                href="/data-entry/submissions"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Review submissions
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Visit shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
