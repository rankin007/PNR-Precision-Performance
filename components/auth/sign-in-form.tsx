"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestEmailOtpAction, verifyEmailOtpAction } from "@/app/auth/actions";
import { Notice } from "@/components/ui/notice";
import {
  enterExistingCodeRecovery,
  enterRequestedCodeMode,
  initialOtpEntryMode,
  isOtpEmailReadOnly,
  isOtpEntryVisible,
  type OtpEntryMode,
} from "@/lib/auth/otp-entry-flow";
import { isValidOtpToken, normalizeOtpToken } from "@/lib/auth/otp-verification";

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

const requestMayArriveMessage = "If this email can sign in, a code may arrive shortly. Wait before requesting another code.";
const requestRetryLaterMessage = "Sign-in is temporarily unavailable. Wait before requesting another code.";

export function SignInForm({
  nextPath,
  sent,
  error,
  envReady,
}: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [entryMode, setEntryMode] = useState<OtpEntryMode>(() => initialOtpEntryMode(sent));
  const [message, setMessage] = useState<string | null>(null);
  const [resendSeconds, setResendSeconds] = useState(sent ? 60 : 0);
  const [pending, startTransition] = useTransition();
  const codeRequested = isOtpEntryVisible(entryMode);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setInterval(() => setResendSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  function requestCode() {
    setMessage(null);
    startTransition(async () => {
      const result = await requestEmailOtpAction(email, nextPath);
      if (!result.ok && result.reason === "configuration") {
        setMessage("Secure sign-in is unavailable. Please contact the portal operator.");
        return;
      }
      if (!result.ok && result.reason === "retry-later") {
        setMessage(requestRetryLaterMessage);
        return;
      }
      if (!result.ok) {
        setMessage("Sign-in could not continue. Check the details and try again.");
        return;
      }
      setEntryMode(enterRequestedCodeMode().mode);
      setResendSeconds(60);
      setMessage(requestMayArriveMessage);
    });
  }

  function verifyCode() {
    setMessage(null);
    startTransition(async () => {
      const result = await verifyEmailOtpAction(email, code);
      if (!result.ok) {
        setCode("");
        setMessage("That code could not be verified. Request a new code and try again.");
        return;
      }
      router.replace(nextPath);
      router.refresh();
    });
  }

  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
      <h2 className="font-display text-2xl text-ink">Email sign-in</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-steel">
        Enter your approved account email. We will send a secure, single-use six-digit code.
      </p>

      {sent ? (
        <Notice className="mt-5" tone="success" title="Email requested">
          {requestMayArriveMessage}
        </Notice>
      ) : null}

      {error ? (
        <Notice className="mt-5" tone="warning" title="Sign-in needs attention">
          {errorMessages[error] ?? "Authentication could not continue."}
        </Notice>
      ) : null}

      {message ? (
        <Notice className="mt-5" tone="warning" title="Sign-in status">
          {message}
        </Notice>
      ) : null}

      <form onSubmit={(event) => { event.preventDefault(); if (codeRequested) verifyCode(); else requestCode(); }} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            readOnly={isOtpEmailReadOnly(entryMode)}
            required
            placeholder="you@example.com"
            disabled={!envReady}
            className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
          />
        </label>
        {codeRequested ? (
          <>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Six-digit code
              <input
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                value={code}
                onChange={(event) => setCode(normalizeOtpToken(event.target.value))}
                aria-describedby="otp-help"
                required
                autoFocus
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 font-mono text-xl tracking-[0.25em] text-technical transition focus:border-data"
              />
            </label>
            <p id="otp-help" className="text-sm leading-6 text-steel">
              Use the newest code. Each code works once; requesting another code replaces the previous one.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={!envReady || pending || !isValidOtpToken(code)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical disabled:cursor-not-allowed disabled:bg-muted">
                {pending ? "Verifying…" : "Verify code"}
              </button>
              <button type="button" disabled={pending || resendSeconds > 0} onClick={requestCode} className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:text-muted">
                {resendSeconds > 0 ? `Request another code in ${resendSeconds}s` : "Request another code"}
              </button>
              <button type="button" disabled={pending} onClick={() => { setEntryMode("request"); setCode(""); setMessage(null); }} className="inline-flex min-h-12 items-center justify-center px-3 text-sm font-semibold text-ink underline underline-offset-4">
                Use a different email
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={!envReady || pending || !email.trim()} className="inline-flex w-fit min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical disabled:cursor-not-allowed disabled:bg-muted">
            {pending ? "Requesting…" : "Send sign-in code"}
          </button>
          <button type="button" disabled={!envReady || pending} onClick={() => { setEntryMode(enterExistingCodeRecovery().mode); setCode(""); setMessage(null); }} className="inline-flex min-h-12 items-center justify-center px-3 text-sm font-semibold text-ink underline underline-offset-4">
            Already have a code?
          </button>
          </div>
        )}
      </form>
    </div>
  );
}
