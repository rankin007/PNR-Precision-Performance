import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPendingOrderForCheckout, attachCheckoutSessionToOrder, markOrderCheckoutFailed, resolveCheckoutUserContext } from "@/lib/stripe/commerce";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { getStripeServerClient } from "@/lib/stripe/server";
import { hasStripeServerEnv } from "@/lib/stripe/env";

const recurringMonthlyProductSlugs = new Set(["monthly-performance-service"]);

function resolveSiteUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

function resolveStripeErrorCode(error: unknown) {
  if (error && typeof error === "object") {
    const stripeError = error as { code?: string; type?: string };

    if (typeof stripeError.code === "string" && stripeError.code.trim()) {
      return stripeError.code;
    }

    if (typeof stripeError.type === "string" && stripeError.type.trim()) {
      return stripeError.type;
    }
  }

  return "unknown";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const slug = formData.get("slug");

  if (typeof slug !== "string" || !slug.trim()) {
    return NextResponse.redirect(new URL("/shop?checkout=missing-product", request.url));
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(new URL(`/shop/${slug}?checkout=supabase-missing`, request.url));
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.redirect(new URL(`/shop/${slug}?checkout=supabase-admin-missing`, request.url));
  }

  if (!hasStripeServerEnv()) {
    return NextResponse.redirect(new URL(`/shop/${slug}?checkout=stripe-missing`, request.url));
  }

  const supabase = await createSupabaseServerClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, slug, description, price_amount, currency_code, status")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !product) {
    return NextResponse.redirect(new URL(`/shop/${slug}?checkout=product-unavailable`, request.url));
  }

  const siteUrl = resolveSiteUrl(request);
  const stripe = getStripeServerClient();
  const userContext = await resolveCheckoutUserContext(supabase);
  const amount = typeof product.price_amount === "number" ? product.price_amount : Number(product.price_amount ?? 0);
  const currencyCode = (product.currency_code ?? "AUD").toUpperCase();
  const isRecurringSubscription = recurringMonthlyProductSlugs.has(product.slug);
  const pendingOrder = await createPendingOrderForCheckout({
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description ?? null,
      priceAmount: amount,
      currencyCode,
    },
    appUserId: userContext.appUserId,
  });

  try {
    const checkoutMetadata = {
      order_id: pendingOrder.id,
      app_user_id: userContext.appUserId ?? "",
      auth_user_id: userContext.authUser?.id ?? "",
      product_id: product.id,
      product_slug: product.slug,
    };

    const session = await stripe.checkout.sessions.create({
      mode: isRecurringSubscription ? "subscription" : "payment",
      success_url: `${siteUrl}/shop/${product.slug}?checkout=success`,
      cancel_url: `${siteUrl}/shop/${product.slug}?checkout=cancelled`,
      customer_email: userContext.email ?? undefined,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currencyCode.toLowerCase(),
            unit_amount: Math.round(amount * 100),
            ...(isRecurringSubscription
              ? {
                  recurring: {
                    interval: "month" as const,
                  },
                }
              : {}),
            product_data: {
              name: product.name,
              description: product.description ?? undefined,
              metadata: {
                product_id: product.id,
                product_slug: product.slug,
              },
            },
          },
          quantity: 1,
        },
      ],
      metadata: checkoutMetadata,
      ...(isRecurringSubscription
        ? {
            subscription_data: {
              metadata: checkoutMetadata,
            },
          }
        : {}),
    });

    await attachCheckoutSessionToOrder({
      orderId: pendingOrder.id,
      checkoutSessionId: session.id,
      paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
    });

    if (!session.url) {
      await markOrderCheckoutFailed(pendingOrder.id);
      return NextResponse.redirect(new URL(`/shop/${slug}?checkout=unavailable`, request.url));
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    await markOrderCheckoutFailed(pendingOrder.id);
    const reason = resolveStripeErrorCode(error);
    console.error("Stripe checkout session creation failed", {
      slug,
      orderId: pendingOrder.id,
      reason,
      error,
    });
    return NextResponse.redirect(
      new URL(`/shop/${slug}?checkout=unavailable&reason=${encodeURIComponent(reason)}`, request.url),
    );
  }
}
