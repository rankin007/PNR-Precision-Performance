import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAdminUserSnapshot, getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";
import { getPublicProductSummaries } from "@/lib/domain/products";
import { getPlatformStatus } from "@/lib/runtime/platform-status";

function readinessState(ready: boolean) {
  return ready
    ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700"
    : "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700";
}

export default async function AdminPage() {
  const [membershipSnapshot, userSnapshot, productResult] = await Promise.all([
    getMembershipAdminSnapshot(),
    getAdminUserSnapshot(),
    getPublicProductSummaries(),
  ]);
  const platformStatus = getPlatformStatus();
  const activeUsers = userSnapshot.users.filter((user) => user.status === "active").length;
  const checkoutReadyCount = productResult.products.filter((product) => product.checkoutReady).length;
  const setupItems = [
    {
      label: "Supabase public client",
      ready: platformStatus.supabaseConfigured,
    },
    {
      label: "Supabase admin client",
      ready: platformStatus.supabaseAdminConfigured,
    },
    {
      label: "Stripe checkout keys",
      ready: platformStatus.stripeConfigured,
    },
    {
      label: "Stripe webhooks",
      ready: platformStatus.stripeWebhookConfigured,
    },
  ];

  return (
    <SectionCard
      eyebrow="Administration"
      title="Platform control overview"
      description="Track access readiness, membership operations, and commerce setup from one place before moving into the detailed administration screens."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Users</p>
          <p className="mt-4 font-display text-4xl text-ink">{userSnapshot.users.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Bootstrapped accounts visible to admin tools.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Active users</p>
          <p className="mt-4 font-display text-4xl text-ink">{activeUsers}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Accounts currently marked active in the app user table.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Membership levels</p>
          <p className="mt-4 font-display text-4xl text-ink">{membershipSnapshot.membershipLevels.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Configured access tiers available for assignment.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Checkout-ready products</p>
          <p className="mt-4 font-display text-4xl text-ink">{checkoutReadyCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Products that can move through the current checkout path.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Setup Readiness</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Core platform services</h2>
            </div>
            <Link
              href="/api/setup/status"
              className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
            >
              View API status
            </Link>
          </div>

          <div className="mt-6 grid gap-3">
            {setupItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-sand px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <p className="font-medium text-ink">{item.label}</p>
                <span className={readinessState(item.ready)}>{item.ready ? "Ready" : "Needs setup"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Administration</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Quick actions</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/admin/memberships"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Manage memberships
              </Link>
              <Link
                href="/admin/setup"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Check setup
              </Link>
              <Link
                href="/admin/commerce"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                View commerce
              </Link>
              <Link
                href="/admin/users"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Review users
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Check storefront
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Recent Users</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Latest account activity</h2>
            <div className="mt-6 grid gap-3">
              {userSnapshot.users.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No authenticated users have been bootstrapped yet.
                </div>
              ) : (
                userSnapshot.users.slice(0, 4).map((user) => (
                  <div key={user.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    <p className="font-semibold text-ink">{user.displayName || user.email}</p>
                    <p className="mt-1 text-sm text-steel">{user.email}</p>
                    <p className="mt-1 text-sm text-steel">
                      {user.membershipLevelCodes.length > 0
                        ? user.membershipLevelCodes.join(", ")
                        : "No levels assigned"} / {user.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
