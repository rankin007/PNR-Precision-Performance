import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

type CommerceOrderRow = {
  id: string;
  status: string;
  total_amount: number | string | null;
  currency_code: string | null;
  ordered_at: string | null;
  provider: string | null;
  users?: { email?: string | null } | Array<{ email?: string | null }> | null;
  order_items?:
    | Array<{
        quantity?: number | null;
        line_total_amount?: number | string | null;
        products?: { name?: string | null } | Array<{ name?: string | null }> | null;
      }>
    | null;
};

type CommercePaymentRow = {
  id: string;
  order_id: string | null;
  status: string;
  amount: number | string | null;
  currency_code: string | null;
  provider: string | null;
  provider_payment_id: string | null;
  paid_at: string | null;
};

function relationFirst<T>(value: T | T[] | null | undefined): T | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

function amountLabel(amount: number | string | null | undefined, currencyCode: string | null | undefined) {
  const numericAmount = typeof amount === "number" ? amount : Number(amount ?? 0);
  return `${currencyCode ?? "AUD"} ${numericAmount}`;
}

export async function getCommerceAdminSnapshot() {
  if (!hasSupabaseAdminEnv()) {
    return {
      envReady: false,
      orders: [] as Array<{
        id: string;
        status: string;
        totalLabel: string;
        orderedAt: string | null;
        provider: string | null;
        userEmail: string | null;
        itemSummary: string;
      }>,
      payments: [] as Array<{
        id: string;
        orderId: string | null;
        status: string;
        amountLabel: string;
        provider: string | null;
        providerPaymentId: string | null;
        paidAt: string | null;
      }>,
    };
  }

  const admin = createSupabaseAdminClient();
  const [{ data: orders }, { data: payments }] = await Promise.all([
    admin
      .from("orders")
      .select("id, status, total_amount, currency_code, ordered_at, provider, users(email), order_items(quantity, line_total_amount, products(name))")
      .order("created_at", { ascending: false })
      .limit(20),
    admin
      .from("payments")
      .select("id, order_id, status, amount, currency_code, provider, provider_payment_id, paid_at")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  return {
    envReady: true,
    orders: ((orders ?? []) as CommerceOrderRow[]).map((order) => {
      const firstItem = order.order_items?.[0];
      const productName = relationFirst(firstItem?.products)?.name ?? "Product";
      const quantity = firstItem?.quantity ?? 1;
      const extraItems = Math.max((order.order_items?.length ?? 1) - 1, 0);

      return {
        id: order.id,
        status: order.status,
        totalLabel: amountLabel(order.total_amount, order.currency_code),
        orderedAt: order.ordered_at,
        provider: order.provider ?? null,
        userEmail: relationFirst(order.users)?.email ?? null,
        itemSummary:
          extraItems > 0
            ? `${productName} x${quantity} + ${extraItems} more item${extraItems === 1 ? "" : "s"}`
            : `${productName} x${quantity}`,
      };
    }),
    payments: ((payments ?? []) as CommercePaymentRow[]).map((payment) => ({
      id: payment.id,
      orderId: payment.order_id,
      status: payment.status,
      amountLabel: amountLabel(payment.amount, payment.currency_code),
      provider: payment.provider ?? null,
      providerPaymentId: payment.provider_payment_id ?? null,
      paidAt: payment.paid_at,
    })),
  };
}
