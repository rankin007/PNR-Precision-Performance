import { signInWithOtpAction } from "@/app/auth/actions";

type SignInFormProps = {
  nextPath: string;
  sent: boolean;
  error: string | undefined;
  envReady: boolean;
};

const errorMessages: Record<string, string> = {
  email: "Enter an email address before continuing.",
  otp: "We could not start sign-in. Check the Supabase project settings and try again.",
};

export function SignInForm({
  nextPath,
  sent,
  error,
  envReady,
}: SignInFormProps) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
      <h2 className="font-display text-2xl text-ink">Email sign-in</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-steel">
        Request a passwordless sign-in link for the project-specific Supabase account. This is the main entry point for owners, trainers, staff, and administrators.
      </p>

      {sent ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Sign-in email requested. Check your inbox and continue through the magic link.
        </div>
      ) : null}

      {error ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {errorMessages[error] ?? "Authentication could not continue."}
        </div>
      ) : null}

      <form action={signInWithOtpAction} className="mt-6 grid gap-4">
        <input type="hidden" name="next" value={nextPath} />
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email address
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            disabled={!envReady}
            className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
          />
        </label>
        <button
          type="submit"
          disabled={!envReady}
          className="inline-flex w-fit items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
        >
          Request sign-in link
        </button>
      </form>
    </div>
  );
}
