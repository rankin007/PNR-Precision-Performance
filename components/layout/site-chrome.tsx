"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteChromeProps = {
  children: React.ReactNode;
};

const publicNavigation = [
  { href: "/", label: "Home" },
  { href: "/platform-stack", label: "Platform Stack" },
  { href: "/shop", label: "Shop" },
  { href: "/member-experience", label: "Member Experience" },
  { href: "/contact", label: "Contact" },
];

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/data-entry") ||
    pathname.startsWith("/auth/callback")
  );
}

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  if (isProtectedPath(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="section-wrap flex flex-col gap-4 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="max-w-[34rem]">
            <h1 className="font-display text-4xl leading-none text-black md:text-5xl">
              PRECISION PERFORMANCE
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-black md:text-base">
              Biochemistry Analysis for Elite Equine
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/80 md:text-base">
              An advanced Urine and Saliva Analysis to optimize Equine Performance and Recovery.
            </p>
          </Link>

          <nav className="flex flex-wrap gap-2">
            {publicNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-ink text-white"
                      : "border border-ink/10 bg-white text-ink hover:border-ink/20"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/onboarding"
              className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
            >
              Apply Now
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Member Sign In
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="mt-16 border-t border-ink/10 bg-[#18212b] text-white">
        <div className="section-wrap grid gap-8 px-4 py-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="font-display text-3xl">Precision Performance</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              A world first in understanding accurate Performance and Recovery of Elite Equine Athletes
            </p>
            <div className="mt-6 space-y-2 text-sm leading-7 text-white/80">
              <p>Contact: Phillip Rankin, Founder: 044 888 3838</p>
              <p>
                <a
                  href="mailto:phillip@balanceenergyaustralia.com"
                  className="transition hover:text-white"
                >
                  phillip@balanceenergyaustralia.com
                </a>
              </p>
            </div>
          </div>

          <form className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d88b70]">Email Enquiry</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/80">
                <span className="font-semibold uppercase tracking-[0.12em]">Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/80">
                <span className="font-semibold uppercase tracking-[0.12em]">Email</span>
                <input
                  type="email"
                  name="email"
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
                  placeholder="Your email"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/80 md:col-span-2">
                <span className="font-semibold uppercase tracking-[0.12em]">Mobile</span>
                <input
                  type="tel"
                  name="mobile"
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
                  placeholder="Your mobile number"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/80 md:col-span-2">
                <span className="font-semibold uppercase tracking-[0.12em]">Comments</span>
                <textarea
                  name="comments"
                  rows={5}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
                  placeholder="Tell us a little about your enquiry"
                />
              </label>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
