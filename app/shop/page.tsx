import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getPublicProductSummaries } from "@/lib/domain/products";

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = searchParams ? await searchParams : {};
  const checkout = pickValue(params.checkout);
  const result = await getPublicProductSummaries();

  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Shop"
        title="Product catalogue shell"
        description="This public path is now ready to host products, paid resources, and future commerce expansion."
      >
        {!result.envReady ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase is not configured yet, so sample product cards are shown.
          </div>
        ) : null}
        {checkout ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {checkout === "missing-product"
              ? "A checkout request was made without a product."
              : checkout === "supabase-admin-missing"
                ? "Checkout is blocked because the Supabase service role key is not configured yet."
              : "That checkout request could not be completed."}
          </div>
        ) : null}
        {"error" in result && result.error ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Products could not be loaded yet: {result.error}
          </div>
        ) : null}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {result.products.map((product) => (
            <div key={product.id} className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Product</p>
              <h2 className="mt-4 font-display text-3xl text-ink">{product.name}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">
                {product.description ?? "Awaiting product description."}
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">{product.priceLabel}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/shop/${product.slug}`}
                  className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
                >
                  View product
                </Link>
                <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  {product.checkoutReady ? "Stripe ready" : "Stripe setup pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/sign-in"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Member sign-in
          </Link>
        </div>
      </SectionCard>
    </main>
  );
}
