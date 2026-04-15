import Link from "next/link";

export function PublicCtaStrip() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap">
        <div className="rounded-[2rem] bg-[#18212b] px-8 py-10 text-white shadow-panel">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d88b70]">Public Paths</p>
              <h2 className="mt-4 font-display text-4xl leading-tight">
                The public site now has dedicated paths for commerce and enquiries.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75">
                Use the shop page as the starting point for product catalogue growth, and the contact path as the
                first enquiry workflow until the final branded forms are connected.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Visit shop
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

