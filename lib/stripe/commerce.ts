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

export type AdminCommerceSnapshot = {
  envReady: boolean;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    status: string;
    priceAmount: number;
    currencyCode: string;
    updatedAt: string | null;
  }>;
  orders: Array<{
    id: string;
    userId: string | null;
    status: string;
    totalAmount: number;
    currencyCode: string;
    provider: string | null;
    checkoutSessionId: string | null;
    paymentIntentId: string | null;
    orderedAt: string | null;
    updatedAt: string | null;
  }>;
  payments: Array<{
    id: string;
    orderId: string | null;
    status: string;
    amount: number;
    currencyCode: string;
    provider: string | null;
    providerPaymentId: string | null;
    checkoutSessionId: string | null;
    paidAt: string | null;
    createdAt: string | null;
  }>;
  errors: string[];
};

function optionalUuid(value: string | null | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normaliseAmount(value: number | string | null | undefined) {
  const amount = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(amount) ? amount : 0;
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

export async function getAdminCommerceSnapshot(): Promise<AdminCommerceSnapshot> {
  if (!hasSupabaseAdminEnv()) {
    return {
      envReady: false,
      products: [],
      orders: [],
      payments: [],
      errors: [],
    };
  }

  const admin = createSupabaseAdminClient();
  const [productsResult, ordersResult, paymentsResult] = await Promise.all([
    admin
      .from("products")
      .select("id, name, slug, status, price_amount, currency_code, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50),
    admin
      .from("orders")
      .select(
        "id, user_id, status, total_amount, currency_code, provider, provider_checkout_session_id, provider_payment_intent_id, ordered_at, updated_at",
      )
      .order("updated_at", { ascending: false })
      .limit(25),
    admin
      .from("payments")
      .select(
        "id, order_id, status, amount, currency_code, provider, provider_payment_id, provider_checkout_session_id, paid_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(25),
  ]);

  const errors = [
    productsResult.error ? "products-read-failed" : null,
    ordersResult.error ? "orders-read-failed" : null,
    paymentsResult.error ? "payments-read-failed" : null,
  ].filter(Boolean) as string[];

  return {
    envReady: true,
    products:
      productsResult.data?.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        status: product.status ?? "draft",
        priceAmount: normaliseAmount(product.price_amount),
        currencyCode: product.currency_code ?? "AUD",
        updatedAt: product.updated_at ?? null,
      })) ?? [],
    orders:
      ordersResult.data?.map((order) => ({
        id: order.id,
        userId: order.user_id ?? null,
        status: order.status ?? "pending",
        totalAmount: normaliseAmount(order.total_amount),
        currencyCode: order.currency_code ?? "AUD",
        provider: order.provider ?? null,
        checkoutSessionId: order.provider_checkout_session_id ?? null,
        paymentIntentId: order.provider_payment_intent_id ?? null,
        orderedAt: order.ordered_at ?? null,
        updatedAt: order.updated_at ?? null,
      })) ?? [],
    payments:
      paymentsResult.data?.map((payment) => ({
        id: payment.id,
        orderId: payment.order_id ?? null,
        status: payment.status ?? "pending",
        amount: normaliseAmount(payment.amount),
        currencyCode: payment.currency_code ?? "AUD",
        provider: payment.provider ?? null,
        providerPaymentId: payment.provider_payment_id ?? null,
        checkoutSessionId: payment.provider_checkout_session_id ?? null,
        paidAt: payment.paid_at ?? null,
        createdAt: payment.created_at ?? null,
      })) ?? [],
    errors,
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

  await ensureOrderItemForProduct({
    orderId: order.id,
    productId: input.product.id,
    amount: input.product.priceAmount,
  });

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

async function ensureOrderItemForProduct(input: {
  orderId: string;
  productId: string;
  amount: number;
}) {
  const admin = createSupabaseAdminClient();
  const { data: existingItem, error: lookupError } = await admin
    .from("order_items")
    .select("id")
    .eq("order_id", input.orderId)
    .eq("product_id", input.productId)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  if (existingItem) {
    return;
  }

  const { error: itemInsertError } = await admin.from("order_items").insert({
    order_id: input.orderId,
    product_id: input.productId,
    quantity: 1,
    unit_price_amount: input.amount,
    line_total_amount: input.amount,
  });

  if (itemInsertError) {
    throw itemInsertError;
  }
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
      .upsert(
        {
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
        },
        {
          onConflict: "provider,provider_checkout_session_id",
        },
      )
      .select("id")
      .single();

    if (orderInsertError) {
      throw orderInsertError;
    }

    resolvedOrderId = insertedOrder.id;
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

  if (!resolvedOrderId) {
    throw new Error("Stripe checkout session could not be matched to an order.");
  }

  if (productId) {
    await ensureOrderItemForProduct({
      orderId: resolvedOrderId,
      productId,
      amount,
    });
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
