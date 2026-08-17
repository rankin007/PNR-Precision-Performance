import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import type { NavigationItem } from "@/lib/navigation";

type AppShellProps = {
  area: string;
  description: string;
  navigation: NavigationItem[];
  userEmail?: string | null;
  memberDisplayName?: string | null;
  membershipLevelCodes?: string[];
  children: React.ReactNode;
};

export function AppShell({
  area,
  description,
  navigation,
  userEmail,
  memberDisplayName,
  membershipLevelCodes,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="section-wrap grid min-h-screen grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 md:grid-cols-[260px_minmax(0,1fr)] md:px-8">
        <aside className="min-w-0 rounded-[2rem] border border-white/10 bg-technical p-6 text-white shadow-panel">
          <div className="space-y-4">
            <p className="eyebrow max-w-full whitespace-normal [overflow-wrap:anywhere] text-accent before:shrink-0 before:bg-current">Precision Performance Portal</p>
            <div>
              <h1 className="break-words font-display text-3xl leading-tight">{area}</h1>
              <p className="mt-3 break-words text-sm leading-7 text-white/70">{description}</p>
            </div>
          </div>

          <nav className="mt-8 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-w-0 max-w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <span className="block min-w-0 break-words">{item.label}</span>
                <span className="mt-1 block min-w-0 break-words text-xs text-white/50">{item.description}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6">
          <header className="min-w-0 max-w-full rounded-[2rem] border border-ink/10 bg-white/85 px-6 py-5 shadow-panel">
            <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-sm uppercase tracking-[0.2em] text-data">Portal area</p>
                <h2 className="mt-2 break-words font-display text-3xl text-ink">{area}</h2>
                <p className="mt-2 min-w-0 break-words text-sm leading-7 text-steel">
                  {memberDisplayName
                    ? `Signed in as ${memberDisplayName}${userEmail ? ` · ${userEmail}` : ""}`
                    : userEmail
                      ? `Signed in as ${userEmail}`
                      : "Awaiting live Supabase session"}
                </p>
                {membershipLevelCodes && membershipLevelCodes.length > 0 ? (
                  <div className="mt-3 flex min-w-0 max-w-full flex-wrap gap-2">
                    {membershipLevelCodes.map((code) => (
                      <span
                        key={code}
                        className="min-w-0 max-w-full break-words rounded-full border border-ink/10 bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
                >
                  Public site
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
                >
                  Portal
                </Link>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </header>

          <section className="min-w-0 max-w-full">{children}</section>
        </div>
      </div>
    </div>
  );
}
