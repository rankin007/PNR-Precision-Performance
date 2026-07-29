import { SectionCard } from "@/components/layout/section-card";
import { requireAdminAppContext } from "@/lib/auth/session";
import { getAdminCommerceSnapshot } from "@/lib/stripe/commerce";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

function formatMoney(amount: number, currencyCode: string) {
  return `${currencyCode} ${amount.toFixed(2)}`;
}

function shortId(value: string | null) {
  if (!value) {
    return "Not recorded";
  }

  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 10)}...${value.slice(-6)}`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not recorded";
  }

  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminCommercePage() {
  await requireAdminAppContext("/admin/commerce");
  const snapshot = await getAdminCommerceSnapshot();

  return (
    <SectionCard
      eyebrow="Admin Commerce"
      title="Commerce visibility"
      description="Read-only launch view for product readiness, order state, Stripe checkout session linkage, and payment reconciliation."
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="font-semibold">Commerce disabled: {commercialAuthority.reasonCode}</p>
        <p className="mt-1">Catalogue values below are historical reconciliation data only. They are not approved offers and checkout cannot create sessions, orders or payments.</p>
      </div>
      {!snapshot.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase service-role configuration is missing. Commerce records can be inspected once the admin environment is configured.
        </div>
      ) : null}

      {snapshot.errors.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Commerce data loaded with these non-sensitive read statuses: {snapshot.errors.join(", ")}.
        </div>
      ) : null}

      <div className="mt-8 grid gap-6">
        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Products</p>
              <h2 className="mt-2 font-display text-2xl text-ink">Catalogue readiness</h2>
            </div>
            <p className="text-sm text-steel">{snapshot.products.length} products</p>
          </div>

          <div className="mt-5 grid gap-3">
            {snapshot.products.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No products are available from the configured database.
              </div>
            ) : (
              snapshot.products.map((product) => (
                <div key={product.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="mt-1 text-steel">/{product.slug}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-semibold">{formatMoney(product.priceAmount, product.currencyCode)}</p>
                      <p className="mt-1 text-steel">Status: {product.status}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Orders</p>
              <h2 className="mt-2 font-display text-2xl text-ink">Checkout state</h2>
            </div>
            <p className="text-sm text-steel">Latest {snapshot.orders.length}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {snapshot.orders.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No checkout orders have been recorded yet.
              </div>
            ) : (
              snapshot.orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr]">
                    <div>
                      <p className="font-semibold">Order {shortId(order.id)}</p>
                      <p className="mt-1 text-steel">Status: {order.status}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{formatMoney(order.totalAmount, order.currencyCode)}</p>
                      <p className="mt-1 text-steel">Provider: {order.provider ?? "Not recorded"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Checkout: {shortId(order.checkoutSessionId)}</p>
                      <p className="mt-1 text-steel">Updated: {formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Payments</p>
              <h2 className="mt-2 font-display text-2xl text-ink">Payment reconciliation</h2>
            </div>
            <p className="text-sm text-steel">Latest {snapshot.payments.length}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {snapshot.payments.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No Stripe payment records have been reconciled yet.
              </div>
            ) : (
              snapshot.payments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr]">
                    <div>
                      <p className="font-semibold">Payment {shortId(payment.id)}</p>
                      <p className="mt-1 text-steel">Status: {payment.status}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{formatMoney(payment.amount, payment.currencyCode)}</p>
                      <p className="mt-1 text-steel">Provider: {payment.provider ?? "Not recorded"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Intent: {shortId(payment.providerPaymentId)}</p>
                      <p className="mt-1 text-steel">Paid: {formatDate(payment.paidAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </SectionCard>
  );
}
