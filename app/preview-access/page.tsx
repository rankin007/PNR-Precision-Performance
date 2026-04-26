import { grantAdminBypassAction, grantPreviewAccessAction } from "@/app/preview-access/actions";
import { SectionCard } from "@/components/layout/section-card";
import {
  hasAdminBypassConfigured,
  hasPreviewAccessConfigured,
  isOpenPreviewMode,
  isSiteLockEnabled,
} from "@/lib/auth/bypass";
import { normalizeNextPath } from "@/lib/auth/next-path";

type PreviewAccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const errorMessages: Record<string, string> = {
  "preview-token": "That site preview passcode did not match.",
  "admin-token": "That admin bypass passcode did not match.",
};

export default async function PreviewAccessPage({ searchParams }: PreviewAccessPageProps) {
  const params = searchParams ? await searchParams : {};
  const nextPath = normalizeNextPath(pickValue(params.next), "/");
  const error = pickValue(params.error);
  const openPreviewMode = isOpenPreviewMode();
  const siteLockEnabled = isSiteLockEnabled();
  const previewEnabled = hasPreviewAccessConfigured();
  const adminEnabled = hasAdminBypassConfigured();

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Preview Access"
        title="Temporary access control"
        description="Use this page to keep the site private while the build is still underway, and to let admin work continue without relying on email sign-in."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Site lock</p>
            <p className="mt-4 text-sm font-semibold text-ink">
              {openPreviewMode ? "Bypassed locally" : siteLockEnabled ? "Enabled" : "Disabled"}
            </p>
            <p className="mt-3 text-sm leading-7 text-steel">
              When enabled, public visitors will be stopped here until they enter the preview passcode.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Admin bypass</p>
            <p className="mt-4 text-sm font-semibold text-ink">
              {openPreviewMode ? "Open preview mode" : adminEnabled ? "Configured" : "Not configured"}
            </p>
            <p className="mt-3 text-sm leading-7 text-steel">
              This gives admin direct access to protected app areas without waiting on email-based sign-in.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Next destination</p>
            <p className="mt-4 text-sm font-semibold text-ink">{nextPath}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              After access is granted, the app will continue to this path.
            </p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {errorMessages[error] ?? "Access could not be granted."}
          </div>
        ) : null}

        {openPreviewMode ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            `OPEN_APP_PREVIEW=true` is active, so protected app areas are open locally without sign-in.
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <form action={grantAdminBypassAction} className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Admin</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Admin bypass access</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Use the admin bypass passcode to work inside protected admin and data-entry areas without waiting on email delivery.
            </p>
            <input type="hidden" name="next" value={nextPath} />
            <label className="mt-6 grid gap-2 text-sm font-medium text-ink">
              Admin passcode
              <input
                name="token"
                type="password"
                disabled={!adminEnabled}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Enter admin passcode"
              />
            </label>
            <button
              type="submit"
              disabled={!adminEnabled}
              className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
            >
              Enter admin workspace
            </button>
          </form>

          <form action={grantPreviewAccessAction} className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Public Preview</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Site preview access</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Use the preview passcode when you want selected people to see the site before it is opened publicly.
            </p>
            <input type="hidden" name="next" value={nextPath} />
            <label className="mt-6 grid gap-2 text-sm font-medium text-ink">
              Preview passcode
              <input
                name="token"
                type="password"
                disabled={!previewEnabled}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Enter preview passcode"
              />
            </label>
            <button
              type="submit"
              disabled={!previewEnabled}
              className="mt-5 rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              Enter private preview
            </button>
          </form>
        </div>
      </SectionCard>
    </main>
  );
}
