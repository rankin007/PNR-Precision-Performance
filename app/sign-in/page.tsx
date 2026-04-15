import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SectionCard } from "@/components/layout/section-card";
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
  const nextPath = pickValue(params.next) ?? "/portal";
  const envReady = hasSupabaseEnv();

  const description =
    setup === "supabase"
      ? "Supabase environment variables are not configured yet. Connect the new Supabase account for this project, then return here to enable real authentication."
      : "This route is the platform sign-in entry point and will be connected to the new project-specific Supabase Auth instance.";

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard eyebrow="Sign In" title="Authentication entry point" description={description}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-sand p-5 text-sm leading-7 text-ink">
            <p className="font-semibold">Next destination</p>
            <p className="mt-2 text-steel">{nextPath}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5 text-sm leading-7 text-steel">
            <p className="font-semibold text-ink">Current status</p>
            <p className="mt-2">
              {envReady
                ? "Supabase environment variables are present. The passwordless sign-in flow is ready to connect to the new project."
                : "UI and middleware are scaffolded. The live auth flow will activate once the new Supabase project is connected and environment variables are set."}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <SignInForm nextPath={nextPath} sent={sent} error={error} envReady={envReady} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-semibold text-ink"
          >
            Return to public site
          </Link>
          <Link
            href={nextPath}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Continue after setup
          </Link>
        </div>
      </SectionCard>
    </main>
  );
}
