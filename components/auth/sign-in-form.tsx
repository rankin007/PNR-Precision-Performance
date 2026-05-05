import Link from "next/link";
import { signInWithPasswordAction } from "@/app/auth/actions";

type SignInFormProps = {
  nextPath: string;
  sent: boolean;
  error: string | undefined;
  envReady: boolean;
};

const errorMessages: Record<string, string> = {
  email: "Enter an email address before continuing.",
  password: "Enter your password before continuing.",
  credentials: "We could not sign you in with that email and password.",
  otp: "Email magic-link sign-in is no longer the primary member login on this page.",
};

export function SignInForm({
  nextPath,
  sent,
  error,
  envReady,
}: SignInFormProps) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
      <h2 className="font-display text-2xl text-ink">Member Sign In</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-steel">
        Approved trainers and users can sign in here with their email address and password to access the Precision Performance platform.
      </p>

      {sent ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Access request received. Please check your inbox for any follow-up communication.
        </div>
      ) : null}

      {error ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {errorMessages[error] ?? "Authentication could not continue."}
        </div>
      ) : null}

      <form action={signInWithPasswordAction} className="mt-6 grid gap-4">
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
        <label className="grid gap-2 text-sm font-medium text-ink">
          Password
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            disabled={!envReady}
            className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
          />
        </label>
        <button
          type="submit"
          disabled={!envReady}
          className="inline-flex w-fit items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm leading-7 text-steel">
        Need access?
        {" "}
        <Link href="/onboarding" className="font-semibold text-ink underline underline-offset-2">
          Complete the Lets Get Started application
        </Link>
        {" "}
        so Phillip can review and approve your membership.
      </div>
    </div>
  );
}
