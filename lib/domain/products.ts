import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceLabel: string;
};

const fallbackProducts: ProductSummary[] = [
  {
    id: "product-1",
    name: "Performance Review Pack",
    slug: "performance-review-pack",
    description: "Structured review pack for owners and trainers with horse performance context.",
    priceLabel: "$149 AUD",
  },
  {
    id: "product-2",
    name: "Biochemistry Reporting Bundle",
    slug: "biochemistry-reporting-bundle",
    description: "Reporting bundle for biochemical observations and interpretation support.",
    priceLabel: "$249 AUD",
  },
  {
    id: "product-3",
    name: "Stable Operations Toolkit",
    slug: "stable-operations-toolkit",
    description: "Operational templates and reporting support for stable workflows.",
    priceLabel: "$89 AUD",
  },
];

export async function getPublicProductSummaries() {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      products: fallbackProducts,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, description, price_amount, currency_code")
    .eq("status", "active")
    .order("name");

  if (error) {
    return {
      envReady: true,
      products: [] as ProductSummary[],
      error: error.message,
    };
  }

  return {
    envReady: true,
    products:
      data?.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description ?? null,
        priceLabel: `${product.currency_code ?? "AUD"} ${product.price_amount ?? 0}`,
      })) ?? [],
  };
}

