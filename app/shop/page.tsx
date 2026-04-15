import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getPublicProductSummaries } from "@/lib/domain/products";

export default async function ShopPage() {
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

