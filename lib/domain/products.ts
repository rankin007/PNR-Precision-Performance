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

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_amount: number | string | null;
  currency_code: string | null;
  status?: string | null;
};

const fallbackProducts: ProductSummary[] = [
  {
    id: "product-1",
    name: "Professional Kit",
    slug: "professional-kit",
    description: "Professional Urine and Saliva Analysis BE Kit with instruments, onboarding, protocols, and in-house training.",
    priceLabel: "$2,500 AUD",
    checkoutReady: false,
  },
  {
    id: "product-2",
    name: "Monthly Service",
    slug: "monthly-performance-service",
    description: "Monthly physiological monitoring service with unlimited testing, weekly reporting, and supplement guidance per horse.",
    priceLabel: "$600 AUD",
    checkoutReady: false,
  },
  {
    id: "product-3",
    name: "Kit Buyback",
    slug: "kit-buyback",
    description: "Optional buyback available on or before 4 weeks from purchase date, subject to return condition.",
    priceLabel: "$500 AUD",
    checkoutReady: false,
  },
];

function formatPriceLabel(
  currencyCode: string | null | undefined,
  priceAmount: number | string | null | undefined,
) {
  const amount = typeof priceAmount === "number" ? priceAmount : Number(priceAmount ?? 0);
  const currency = currencyCode ?? "AUD";
  const normalizedAmount = Number.isFinite(amount) ? amount : 0;

  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      maximumFractionDigits: normalizedAmount % 1 === 0 ? 0 : 2,
    }).format(normalizedAmount);
  } catch {
    return `${currency} ${normalizedAmount}`;
  }
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
      (data as ProductRow[] | null)?.map((product) => ({
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
