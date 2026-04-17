import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionCard } from "@/components/layout/section-card";
import { getPublicProductDetail } from "@/lib/domain/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatReason(reason: string | undefined) {
  if (!reason) {
    return null;
  }

  return reason.replace(/[_-]+/g, " ");
}

function checkoutMessage(checkout: string | undefined, reason: string | undefined) {
  switch (checkout) {
    case "success":
      return {
        tone: "success",
        text: "Stripe returned a successful checkout completion for this product.",
      };
    case "cancelled":
      return {
        tone: "warning",
        text: "Checkout was cancelled before payment was completed.",
      };
    case "stripe-missing":
      return {
        tone: "warning",
        text: "Stripe keys are not configured yet, so checkout cannot start.",
      };
    case "supabase-admin-missing":
      return {
        tone: "warning",
        text: "The Supabase service role key is not configured yet, so orders cannot be persisted safely.",
      };
    case "product-unavailable":
      return {
        tone: "warning",
        text: "This product is not currently available for checkout.",
      };
    case "unavailable":
      return {
        tone: "warning",
        text: formatReason(reason)
          ? `Stripe could not create a checkout session for this product. Reason: ${formatReason(reason)}.`
          : "Stripe could not create a checkout session for this product.",
      };
    default:
      return null;
  }
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const checkout = pickValue(query.checkout);
  const reason = pickValue(query.reason);
  const result = await getPublicProductDetail(slug);
  const loadError = "error" in result ? result.error : undefined;

  if (!result.product) {
    notFound();
  }

  const message = checkoutMessage(checkout, reason);
  const commerceMode = !result.envReady
    ? "Preview detail"
    : result.product.checkoutReady
      ? "Checkout live"
      : "Checkout staging";

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Product Detail"
        title={result.product.name}
        description="Use this page as the direct decision point for purchase, member sign-in, and the next fulfilment-ready commerce steps."
      >
        {!result.envReady ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            This product page is currently running in preview mode, so curated fallback product data is being shown while the live catalogue connection is still being completed.
          </div>
        ) : null}
        {loadError ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Product data could not be loaded yet: {loadError}
          </div>
        ) : null}
        {message ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
              message.tone === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Product</p>
            <p className="mt-4 font-display text-4xl text-ink">{result.product.name}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              {result.product.description ?? "Awaiting product description."}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Price</p>
            <p className="mt-4 font-display text-4xl text-ink">{result.product.priceLabel}</p>
            <p className="mt-3 text-sm leading-7 text-steel">Currency: {result.product.currencyCode}</p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Checkout</p>
            <p className="mt-4 text-sm font-semibold text-ink">
              {result.product.checkoutReady ? "Ready to launch" : "Waiting on setup"}
            </p>
            <p className="mt-3 text-sm leading-7 text-steel">
              {result.product.checkoutReady
                ? "Stripe can start a payment session for this product."
                : "Checkout will activate once platform keys and persistence are fully ready."}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Commerce mode</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{commerceMode}</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              {!result.envReady
                ? "This route is presentation-ready for review before the live catalogue and order persistence path is fully connected."
                : result.product.checkoutReady
                  ? "This product can move directly from detail page to checkout."
                  : "This offer is visible, but checkout still depends on setup completion."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Offer Summary</p>
            <div className="mt-4 grid gap-4 text-sm leading-7 text-steel">
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                This page is positioned as the direct handoff from product discovery to purchase intent.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                It supports both preview catalogue review and live Supabase-backed product records without changing the route structure.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                The next fulfilment layer can plug in after checkout confirmation and webhook processing.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-sand p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Commerce</p>
            <h2 className="mt-4 font-display text-3xl text-ink">{result.product.priceLabel}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              {result.product.checkoutReady
                ? "Stripe checkout can now create a live payment session for this product."
                : "Stripe is not configured yet, so checkout remains in standby mode."}
            </p>

            <form action="/api/checkout" method="POST" className="mt-6">
              <input type="hidden" name="slug" value={result.product.slug} />
              <button
                type="submit"
                disabled={!result.product.checkoutReady}
                className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
              >
                {result.product.checkoutReady ? "Start checkout" : "Checkout unavailable"}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
              >
                Back to shop
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
              >
                Member sign-in
              </Link>
            </div>
          </div>
        </div>
      </SectionCard>
    </main>
  );
}
