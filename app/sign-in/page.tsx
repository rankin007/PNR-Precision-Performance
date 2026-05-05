import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SectionCard } from "@/components/layout/section-card";
import { getAppAuthContext } from "@/lib/auth/app-context";
import { normalizeNextPath } from "@/lib/auth/next-path";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = searchParams ? await searchParams : {};
  const setup = pickValue(params.setup);
  const sent = pickValue(params.sent) === "true";
  const error = pickValue(params.error);
  const nextPath = normalizeNextPath(pickValue(params.next));
  const envReady = hasSupabaseEnv();
  const authContext = await getAppAuthContext();
  const allowedSetupEmails = new Set([
    "phillip@balanceenergyaustralia.com",
    "rrankin@live.com.au",
  ]);
  const signedInEmail = authContext.sessionUser?.email?.toLowerCase() ?? null;
  const canContinueAfterSetup = signedInEmail ? allowedSetupEmails.has(signedInEmail) : false;

  const description =
    setup === "supabase"
      ? "The sign-in route is ready, but Supabase environment variables still need to be present before member login can complete."
      : "Approved trainers and users can sign in here with their email address and password to enter the authenticated Precision Performance platform.";

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard eyebrow="Sign In" title="Authentication entry point" description={description}>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Next destination</p>
            <p className="mt-4 text-sm font-semibold text-ink">{nextPath}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              After a successful sign-in, this is the destination the session will continue toward.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Current status</p>
            <p className="mt-4 text-sm font-semibold text-ink">{envReady ? "Ready" : "Needs setup"}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              {envReady
                ? "Supabase environment variables are present and the email-and-password member login is active."
                : "Set the Supabase environment variables to activate the live member sign-in flow."}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Destination area</p>
            <p className="mt-4 text-sm font-semibold text-ink">
              {nextPath.startsWith("/admin")
                ? "Administration"
                : nextPath.startsWith("/data-entry")
                  ? "Operations"
                  : "Member portal"}
            </p>
            <p className="mt-3 text-sm leading-7 text-steel">
              This helps confirm where the user is heading after they sign in.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SignInForm nextPath={nextPath} sent={sent} error={error} envReady={envReady} />

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">How It Works</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Approved Member Access</h2>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  Existing approved members sign in here with their email address and password.
                </p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  New trainers and users should use the Lets Get Started application form instead of this page.
                </p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                  Once Phillip approves access and an account is provisioned, members can return here and sign in.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Membership Request</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Need New Access?</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/onboarding"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Lets Get Started
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
                >
                  Return to public site
                </Link>
                {canContinueAfterSetup ? (
                  <Link
                    href={nextPath}
                    className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
                  >
                    Continue after setup
                  </Link>
                ) : (
                  <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    New access requests are reviewed by Phillip before a member account can be activated.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
