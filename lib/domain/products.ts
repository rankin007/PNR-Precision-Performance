import { hasSupabaseEnv } from "@/lib/supabase/env";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasStripeServerEnv } from "@/lib/stripe/env";

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceLabel: string;
  checkoutReady: boolean;
};

export type ProductDetail = ProductSummary & {
  currencyCode: string;
  priceAmount: number;
  status: string;
};

const fallbackProducts: ProductSummary[] = [
  {
    id: "product-1",
    name: "Performance Review Pack",
    slug: "performance-review-pack",
    description: "Structured review pack for owners and trainers with horse performance context.",
    priceLabel: "$149 AUD",
    checkoutReady: false,
  },
  {
    id: "product-2",
    name: "Biochemistry Reporting Bundle",
    slug: "biochemistry-reporting-bundle",
    description: "Reporting bundle for biochemical observations and interpretation support.",
    priceLabel: "$249 AUD",
    checkoutReady: false,
  },
  {
    id: "product-3",
    name: "Stable Operations Toolkit",
    slug: "stable-operations-toolkit",
    description: "Operational templates and reporting support for stable workflows.",
    priceLabel: "$89 AUD",
    checkoutReady: false,
  },
];

function formatPriceLabel(currencyCode: string | null | undefined, priceAmount: number | null | undefined) {
  const amount = typeof priceAmount === "number" ? priceAmount : Number(priceAmount ?? 0);
  const currency = currencyCode ?? "AUD";

  return `${currency} ${amount}`;
}

export async function getPublicProductSummaries() {
  const checkoutReady = hasSupabaseEnv() && hasSupabaseAdminEnv() && hasStripeServerEnv();

  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      products: fallbackProducts.map((product) => ({
        ...product,
        checkoutReady,
      })),
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
        priceLabel: formatPriceLabel(product.currency_code, product.price_amount),
        checkoutReady,
      })) ?? [],
  };
}

export async function getPublicProductDetail(slug: string) {
  const checkoutReady = hasSupabaseEnv() && hasSupabaseAdminEnv() && hasStripeServerEnv();

  if (!hasSupabaseEnv()) {
    const product = fallbackProducts.find((item) => item.slug === slug);

    return {
      envReady: false,
      product: product
        ? {
            ...product,
            currencyCode: "AUD",
            priceAmount: Number(product.priceLabel.replace(/[^0-9.]/g, "")) || 0,
            status: "active",
            checkoutReady,
          }
        : null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, description, price_amount, currency_code, status")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    return {
      envReady: true,
      product: null,
      error: error.message,
    };
  }

  if (!data) {
    return {
      envReady: true,
      product: null,
    };
  }

  return {
    envReady: true,
    product: {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      priceLabel: formatPriceLabel(data.currency_code, data.price_amount),
      currencyCode: data.currency_code ?? "AUD",
      priceAmount: typeof data.price_amount === "number" ? data.price_amount : Number(data.price_amount ?? 0),
      status: data.status ?? "active",
      checkoutReady,
    } satisfies ProductDetail,
  };
}
