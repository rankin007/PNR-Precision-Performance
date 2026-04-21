"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

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

const footerGroups = [
  {
    heading: "Platform",
    links: [
      { href: "/portal", label: "Portal" },
      { href: "/admin", label: "Admin" },
      { href: "/data-entry", label: "Data Entry" },
    ],
  },
  {
    heading: "Public Routes",
    links: [
      { href: "/shop", label: "Product Catalogue" },
      { href: "/onboarding", label: "Client Onboarding" },
      { href: "/sign-in", label: "Sign In" },
    ],
  },
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
        <div className="section-wrap grid gap-8 px-4 py-12 md:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d88b70]">Website Footer</p>
            <h2 className="mt-3 font-display text-3xl">{siteConfig.name}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Racehorse performance, member access, operations, and commerce in one structured platform environment.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{group.heading}</h3>
              <div className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
