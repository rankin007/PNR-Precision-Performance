import type Stripe from "stripe";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { bootstrapAuthenticatedUser } from "@/lib/auth/bootstrap";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

type ProductSnapshot = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceAmount: number;
  currencyCode: string;
};

type CheckoutUserContext = {
  appUserId: string | null;
  authUser: User | null;
  email: string | null;
};

function optionalUuid(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normaliseAmountFromMinorUnits(amount: number | null | undefined) {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return 0;
  }

  return Number((amount / 100).toFixed(2));
}

function normalisePaymentIntentId(session: Stripe.Checkout.Session) {
  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }

  return session.payment_intent?.id ?? null;
}

function mapOrderStatusFromSession(session: Stripe.Checkout.Session) {
  if (session.payment_status === "paid") {
    return "paid";
  }

  if (session.status === "expired") {
    return "cancelled";
  }

  return "pending";
}

function mapPaymentStatusFromSession(session: Stripe.Checkout.Session) {
  if (session.payment_status === "paid") {
    return "paid";
  }

  if (session.status === "expired") {
    return "failed";
  }

  return "pending";
}

function paymentTimestamp(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    return null;
  }

  return new Date(session.created * 1000).toISOString();
}

export async function resolveCheckoutUserContext(
  supabase: SupabaseClient,
): Promise<CheckoutUserContext> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !hasSupabaseAdminEnv()) {
    return {
      appUserId: null,
      authUser: user ?? null,
      email: user?.email ?? null,
    };
  }

  const result = await bootstrapAuthenticatedUser({
    authUserId: user.id,
    email: user.email ?? null,
    displayName:
      typeof user.user_metadata?.display_name === "string"
        ? user.user_metadata.display_name
        : typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : null,
    firstName:
      typeof user.user_metadata?.first_name === "string" ? user.user_metadata.first_name : null,
    lastName:
      typeof user.user_metadata?.last_name === "string" ? user.user_metadata.last_name : null,
  });

  return {
    appUserId: result.bootstrapped ? result.appUserId : null,
    authUser: user,
    email: user.email ?? null,
  };
}

export async function createPendingOrderForCheckout(input: {
  product: ProductSnapshot;
  appUserId: string | null;
}) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Missing Supabase service role configuration for checkout persistence.");
  }

  const admin = createSupabaseAdminClient();
  const now = new Date().toISOString();

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: input.appUserId,
      provider: "stripe",
      status: "pending",
      subtotal_amount: input.product.priceAmount,
      tax_amount: 0,
      total_amount: input.product.priceAmount,
      currency_code: input.product.currencyCode,
      updated_at: now,
    })
    .select("id")
    .single();

  if (orderError) {
    throw orderError;
  }

  const { error: itemError } = await admin.from("order_items").insert({
    order_id: order.id,
    product_id: input.product.id,
    quantity: 1,
    unit_price_amount: input.product.priceAmount,
    line_total_amount: input.product.priceAmount,
  });

  if (itemError) {
    throw itemError;
  }

  return {
    id: order.id,
  };
}

export async function attachCheckoutSessionToOrder(input: {
  orderId: string;
  checkoutSessionId: string;
  paymentIntentId?: string | null;
}) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Missing Supabase service role configuration for checkout persistence.");
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("orders")
    .update({
      provider: "stripe",
      provider_checkout_session_id: input.checkoutSessionId,
      provider_payment_intent_id: input.paymentIntentId ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.orderId);

  if (error) {
    throw error;
  }
}

export async function markOrderCheckoutFailed(orderId: string) {
  if (!hasSupabaseAdminEnv()) {
    return;
  }

  const admin = createSupabaseAdminClient();

  await admin
    .from("orders")
    .update({
      status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);
}

export async function syncCheckoutSessionToCommerce(session: Stripe.Checkout.Session) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Missing Supabase service role configuration for Stripe webhooks.");
  }

  const admin = createSupabaseAdminClient();
  const orderIdFromMetadata = optionalUuid(session.metadata?.order_id);
  const appUserId = optionalUuid(session.metadata?.app_user_id);
  const productId = optionalUuid(session.metadata?.product_id);
  const paymentIntentId = normalisePaymentIntentId(session);
  const amount = normaliseAmountFromMinorUnits(session.amount_total);
  const currencyCode = session.currency?.toUpperCase() ?? "AUD";
  const paidAt = paymentTimestamp(session);
  const orderStatus = mapOrderStatusFromSession(session);

  let resolvedOrderId = orderIdFromMetadata;

  if (!resolvedOrderId && session.id) {
    const { data: existingOrder } = await admin
      .from("orders")
      .select("id")
      .eq("provider", "stripe")
      .eq("provider_checkout_session_id", session.id)
      .maybeSingle();

    resolvedOrderId = existingOrder?.id ?? null;
  }

  if (!resolvedOrderId) {
    const { data: insertedOrder, error: orderInsertError } = await admin
      .from("orders")
      .insert({
        user_id: appUserId,
        provider: "stripe",
        provider_checkout_session_id: session.id,
        provider_payment_intent_id: paymentIntentId,
        status: orderStatus,
        subtotal_amount: amount,
        tax_amount: 0,
        total_amount: amount,
        currency_code: currencyCode,
        ordered_at: paidAt,
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (orderInsertError) {
      throw orderInsertError;
    }

    resolvedOrderId = insertedOrder.id;

    if (productId) {
      const { error: itemInsertError } = await admin.from("order_items").insert({
        order_id: resolvedOrderId,
        product_id: productId,
        quantity: 1,
        unit_price_amount: amount,
        line_total_amount: amount,
      });

      if (itemInsertError) {
        throw itemInsertError;
      }
    }
  } else {
    const { error: orderUpdateError } = await admin
      .from("orders")
      .update({
        user_id: appUserId,
        provider: "stripe",
        provider_checkout_session_id: session.id,
        provider_payment_intent_id: paymentIntentId,
        status: orderStatus,
        subtotal_amount: amount,
        total_amount: amount,
        currency_code: currencyCode,
        ordered_at: paidAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", resolvedOrderId);

    if (orderUpdateError) {
      throw orderUpdateError;
    }
  }

  if (paymentIntentId) {
    const { error: paymentError } = await admin.from("payments").upsert(
      {
        user_id: appUserId,
        order_id: resolvedOrderId,
        provider: "stripe",
        provider_payment_id: paymentIntentId,
        provider_checkout_session_id: session.id,
        amount,
        currency_code: currencyCode,
        status: mapPaymentStatusFromSession(session),
        paid_at: paidAt,
      },
      {
        onConflict: "provider,provider_payment_id",
      },
    );

    if (paymentError) {
      throw paymentError;
    }
  }

  return {
    orderId: resolvedOrderId,
    paymentIntentId,
  };
}
