import { signInWithOtpAction } from "@/app/auth/actions";
import { Notice } from "@/components/ui/notice";

type SignInFormProps = {
  nextPath: string;
  sent: boolean;
  error: string | undefined;
  envReady: boolean;
};

const errorMessages: Record<string, string> = {
  email: "Enter an email address before continuing.",
  otp: "We could not start sign-in. Check the new Supabase project settings and try again.",
  callback: "The sign-in link could not be verified. Request a new link and try again.",
  "portal-access": "Your account is signed in, but portal access is not active yet.",
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
        Enter your approved account email. We will send a secure, single-use sign-in link.
      </p>

      {sent ? (
        <Notice className="mt-5" tone="success" title="Email requested">
          Sign-in email requested. Check your inbox and return through the magic link.
        </Notice>
      ) : null}

      {error ? (
        <Notice className="mt-5" tone="warning" title="Sign-in needs attention">
          {errorMessages[error] ?? "Authentication could not continue."}
        </Notice>
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
            className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
          />
        </label>
        <button
          type="submit"
          disabled={!envReady}
          className="inline-flex w-fit items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical disabled:cursor-not-allowed disabled:bg-muted"
        >
          Request sign-in link
        </button>
      </form>
    </div>
  );
}
