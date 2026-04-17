import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getPublicProductSummaries } from "@/lib/domain/products";

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function checkoutAlert(checkout: string | undefined) {
  switch (checkout) {
    case "missing-product":
      return "A checkout request was made without a product.";
    case "supabase-admin-missing":
      return "Checkout is blocked because the Supabase service role key is not configured yet.";
    default:
      return checkout ? "That checkout request could not be completed." : null;
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = searchParams ? await searchParams : {};
  const checkout = pickValue(params.checkout);
  const result = await getPublicProductSummaries();
  const readyProducts = result.products.filter((product) => product.checkoutReady).length;
  const checkoutNotice = checkoutAlert(checkout);
  const storefrontMode = !result.envReady
    ? "Catalogue preview"
    : readyProducts === result.products.length && result.products.length > 0
      ? "Commerce live"
      : "Commerce staging";

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Shop"
        title="Product catalogue"
        description="Browse current products, see which offers are already checkout-ready, and move directly into product detail pages for purchase or member follow-up."
      >
        {!result.envReady ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            The storefront is currently running in catalogue preview mode, so curated sample products are shown while live commerce data is still being connected.
          </div>
        ) : null}
        {checkoutNotice ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {checkoutNotice}
          </div>
        ) : null}
        {"error" in result && result.error ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Products could not be loaded yet: {result.error}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Products</p>
            <p className="mt-4 font-display text-4xl text-ink">{result.products.length}</p>
            <p className="mt-3 text-sm leading-7 text-steel">Current catalogue items visible on the storefront.</p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Checkout ready</p>
            <p className="mt-4 font-display text-4xl text-ink">{readyProducts}</p>
            <p className="mt-3 text-sm leading-7 text-steel">Products that can start the current Stripe checkout flow.</p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Storefront mode</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{storefrontMode}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              {result.envReady
                ? "The catalogue is connected to the current environment and reflects the live product query path."
                : "The storefront is presentation-ready while products, payments, and auth are still being wired into live services."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 lg:grid-cols-3">
            {result.products.map((product) => (
              <div key={product.id} className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Product</p>
                <h2 className="mt-4 font-display text-3xl text-ink">{product.name}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">
                  {product.description ?? "Awaiting product description."}
                </p>
                <p className="mt-4 text-sm font-semibold text-ink">{product.priceLabel}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                  >
                    View product
                  </Link>
                  <span className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                    {product.checkoutReady ? "Stripe ready" : "Stripe setup pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Member actions</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Move from browsing to access</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Member sign-in
                </Link>
                <Link
                  href="/portal"
                  className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
                >
                  Open portal
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
                >
                  Contact team
                </Link>
              </div>
              <p className="mt-4 text-sm leading-7 text-steel">
                Use the portal for member-specific follow-up, or contact the team when an offer needs manual handling before checkout is fully live.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Commerce readiness</p>
              <h2 className="mt-3 font-display text-2xl text-ink">What this storefront can do right now</h2>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">Catalogue visibility</p>
                  <p className="mt-1 text-steel">
                    {result.envReady
                      ? "Products are being queried from the current environment."
                      : "Products are being presented from curated fallback content so layout, copy, and sales flow can still be reviewed."}
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">Checkout activation</p>
                  <p className="mt-1 text-steel">
                    {readyProducts > 0
                      ? `${readyProducts} product${readyProducts === 1 ? "" : "s"} can already enter the current checkout flow.`
                      : "Checkout is still staged behind environment setup, so catalogue review and enquiry handling are the primary live paths."}
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">Operational follow-up</p>
                  <p className="mt-1 text-steel">
                    The admin commerce workspace can be used to verify orders and payment records once Stripe and Supabase admin credentials are fully live.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
              <p className="eyebrow">Recommended next step</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Commerce completion path</h2>
              <p className="mt-4 text-sm leading-7 text-steel">
                Finish the remaining environment wiring in admin setup, then retest one end-to-end checkout so the storefront, order persistence, and payment activity all line up in the live workflow.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
