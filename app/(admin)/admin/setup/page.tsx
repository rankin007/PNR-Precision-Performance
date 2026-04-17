import { SectionCard } from "@/components/layout/section-card";
import { getPlatformStatus } from "@/lib/runtime/platform-status";
import { siteConfig } from "@/lib/site-config";

function statusClass(ready: boolean) {
  return ready
    ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700"
    : "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700";
}

export default function AdminSetupPage() {
  const status = getPlatformStatus();
  const checkpoints = [
    {
      key: "site_url",
      label: "Public site URL",
      ready: status.siteUrlConfigured,
      detail: "Used for auth callbacks, metadata, and deployment verification.",
    },
    {
      key: "supabase_public",
      label: "Supabase public client",
      ready: status.supabaseConfigured,
      detail: "Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    },
    {
      key: "supabase_admin",
      label: "Supabase admin client",
      ready: status.supabaseAdminConfigured,
      detail: "Required for user bootstrap and admin-side assignment flows.",
    },
    {
      key: "stripe",
      label: "Stripe core keys",
      ready: status.stripeConfigured,
      detail: "Required for checkout, billing, and product-linked payment flows.",
    },
    {
      key: "stripe_webhooks",
      label: "Stripe webhook secret",
      ready: status.stripeWebhookConfigured,
      detail: "Required for reliable payment event handling.",
    },
    {
      key: "railway",
      label: "Railway token",
      ready: status.railwayConfigured,
      detail: "Used only when background services and integrations are activated.",
    },
  ];
  const readyCount = checkpoints.filter((checkpoint) => checkpoint.ready).length;
  const blockedCheckpoints = checkpoints.filter((checkpoint) => !checkpoint.ready);
  const setupPhase = !status.supabaseConfigured
    ? "Foundation"
    : !status.supabaseAdminConfigured
      ? "Admin activation"
      : !status.stripeConfigured
        ? "Commerce activation"
        : !status.stripeWebhookConfigured
          ? "Payment verification"
          : "Operational readiness";
  const nextActions = [
    !status.siteUrlConfigured
      ? "Confirm NEXT_PUBLIC_SITE_URL so auth callbacks, metadata, and live-domain links point to the correct deployment."
      : null,
    !status.supabaseConfigured
      ? "Finish the public Supabase variables first so member sign-in and live data stop falling back to sample structures."
      : null,
    status.supabaseConfigured && !status.supabaseAdminConfigured
      ? "Add the Supabase service-role key next so user bootstrap, membership assignment, and admin review tools become fully live."
      : null,
    status.supabaseAdminConfigured && !status.stripeConfigured
      ? "Load Stripe publishable and secret keys to activate checkout-ready products and commerce admin tracking."
      : null,
    status.stripeConfigured && !status.stripeWebhookConfigured
      ? "Finish the Stripe webhook secret so paid orders and payment events reconcile reliably after checkout."
      : null,
    !status.railwayConfigured
      ? "Railway is optional for now. Wire it in when background services or long-running integrations are ready to be activated."
      : null,
  ].filter(Boolean) as string[];
  const verificationLinks = [
    {
      label: "Runtime health JSON",
      href: "/api/health",
      description: "Confirms the app can report environment and integration readiness from the running deployment.",
    },
    {
      label: "Setup status JSON",
      href: "/api/setup/status",
      description: "Exposes the setup-oriented status payload that admin tooling can rely on.",
    },
    {
      label: "Production sign-in",
      href: "/sign-in",
      description: "Use after environment changes to verify the member entry flow behaves as expected.",
    },
  ];

  return (
    <SectionCard
      eyebrow="Admin Setup"
      title="Platform readiness"
      description="Track the environment, auth, commerce, and integration checkpoints required for a fully live platform from inside the admin workspace."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Service</p>
          <p className="mt-4 font-display text-3xl text-ink">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Current platform service identity.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Ready checkpoints</p>
          <p className="mt-4 font-display text-4xl text-ink">{readyCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Configured items out of {checkpoints.length} tracked checkpoints.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Node environment</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{status.nodeEnvironment}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Runtime environment currently reported by the app.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Current phase</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{setupPhase}</p>
          <p className="mt-3 text-sm leading-7 text-steel">The most useful next implementation layer based on the current environment state.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Vercel environment</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{status.vercelEnvironment}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Deployment environment currently visible to the app.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.key}
              className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-ink">{checkpoint.label}</p>
                  <p className="mt-2 text-sm leading-7 text-steel">{checkpoint.detail}</p>
                </div>
                <span className={statusClass(checkpoint.ready)}>
                  {checkpoint.ready ? "Ready" : "Needs setup"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Launch blockers</p>
            <h2 className="mt-3 font-display text-2xl text-ink">What still needs attention</h2>
            <div className="mt-6 grid gap-3">
              {blockedCheckpoints.length === 0 ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                  Core environment checkpoints are in place. The next focus can shift from setup to live operational verification.
                </div>
              ) : (
                blockedCheckpoints.map((checkpoint) => (
                  <div key={checkpoint.key} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    <p className="font-semibold text-ink">{checkpoint.label}</p>
                    <p className="mt-1 text-sm text-steel">{checkpoint.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Next actions</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Recommended sequence</h2>
            <div className="mt-6 grid gap-3">
              {nextActions.length === 0 ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                  No obvious environment gaps are left in the current status snapshot.
                </div>
              ) : (
                nextActions.map((action) => (
                  <div key={action} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                    {action}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Verification</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Live checks to run</h2>
            <div className="mt-6 grid gap-3">
              {verificationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 transition hover:border-ink/20"
                >
                  <p className="font-semibold text-ink">{link.label}</p>
                  <p className="mt-1 text-sm text-steel">{link.description}</p>
                  <p className="mt-3 text-sm font-semibold text-ember">{link.href}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
