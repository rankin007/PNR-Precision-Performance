import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SectionCard } from "@/components/layout/section-card";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
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
  const nextPath = normalizeAppRedirectPath(pickValue(params.next));
  const envReady = hasSupabaseEnv();

  const description =
    setup === "supabase"
      ? "Secure sign-in is not configured in this environment. An operator must complete the approved service setup before access can continue."
      : "Sign in to the Precision Performance Portal for approved equine biochemistry and operations access.";

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard eyebrow="Secure portal" title="Sign in to Precision Performance" description={description}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-sand p-5 text-sm leading-7 text-ink">
            <p className="font-semibold">After sign-in</p>
            <p className="mt-2 text-steel">
              {nextPath === "/portal" ? "Trainer dashboard" : "Your approved portal destination"}
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5 text-sm leading-7 text-steel">
            <p className="font-semibold text-ink">Current status</p>
            <p className="mt-2">
              {envReady
                ? "The secure sign-in service is configured. Access and code delivery still require an approved account."
                : "Secure sign-in is unavailable until the approved service configuration is complete."}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <SignInForm nextPath={nextPath} sent={sent} error={error} envReady={envReady} />
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink"
          >
            Return to public site
          </Link>
        </div>
      </SectionCard>
    </main>
  );
}
