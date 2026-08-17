import { SectionCard } from "@/components/layout/section-card";
import { requireAdminAppContext } from "@/lib/auth/session";
import {
  getAdminCommerceSnapshot,
  type AdminCommerceSnapshot,
} from "@/lib/stripe/commerce";
import { commercialAuthority } from "@/lib/commerce/commercial-authority";

function formatMoney(amount: number, currencyCode: string) {
  return `${currencyCode} ${amount.toFixed(2)}`;
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

export type AdminCommerceViewModel = {
  envReady: boolean;
  readStatusCount: number;
  products: Array<{
    key: string;
    label: string;
    name: string;
    slug: string;
    status: string;
    priceAmount: number;
    currencyCode: string;
  }>;
  orders: Array<{
    key: string;
    label: string;
    status: string;
    totalAmount: number;
    currencyCode: string;
    updatedAt: string | null;
  }>;
  payments: Array<{
    key: string;
    label: string;
    status: string;
    amount: number;
    currencyCode: string;
    paidAt: string | null;
  }>;
};

function projectAdminCommerceSnapshot(
  snapshot: AdminCommerceSnapshot,
): AdminCommerceViewModel {
  return {
    envReady: snapshot.envReady,
    readStatusCount: snapshot.errors.length,
    products: snapshot.products.map((product, index) => ({
      key: `historical-product-${index + 1}`,
      label: `Historical product ${index + 1}`,
      name: product.name,
      slug: product.slug,
      status: product.status,
      priceAmount: product.priceAmount,
      currencyCode: product.currencyCode,
    })),
    orders: snapshot.orders.map((order, index) => ({
      key: `historical-order-${index + 1}`,
      label: `Historical order ${index + 1}`,
      status: order.status,
      totalAmount: order.totalAmount,
      currencyCode: order.currencyCode,
      updatedAt: order.updatedAt,
    })),
    payments: snapshot.payments.map((payment, index) => ({
      key: `historical-payment-${index + 1}`,
      label: `Historical payment ${index + 1}`,
      status: payment.status,
      amount: payment.amount,
      currencyCode: payment.currencyCode,
      paidAt: payment.paidAt,
    })),
  };
}

function AdminCommerceContent({ view }: { view: AdminCommerceViewModel }) {
  return (
    <SectionCard
      eyebrow="Admin Commerce"
      title="Commerce visibility"
      description="Read-only launch view for the approved schedule and historical reconciliation state."
    >
      <section className="rounded-2xl border border-brand/20 bg-brand/5 px-4 py-4 text-sm text-technical">
        <p className="font-semibold">Approved consultation-led schedule</p>
        <p className="mt-2 break-words text-lg font-semibold">
          {commercialAuthority.offer.name}{" \u2014 "}{commercialAuthority.offer.price.display}
        </p>
        <p className="mt-2 break-words leading-6">{commercialAuthority.schedule.freight}</p>
        <p className="mt-2 break-words leading-6">
          Online purchasing and payment reconciliation remain disabled:{" "}
          {commercialAuthority.reasonCode}.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
        <p className="font-semibold">Historical reconciliation only</p>
        <p className="mt-1 break-words">
          Catalogue, order and payment rows below retain their original terms. They are not
          approved offers and cannot create sessions, orders or payments.
        </p>
      </section>

      {!view.envReady ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Admin commerce records are unavailable because the protected read-only environment is
          not configured.
        </div>
      ) : null}

      {view.readStatusCount > 0 ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Historical reconciliation loaded with {view.readStatusCount} non-sensitive read status
          {view.readStatusCount === 1 ? "" : "es"}.
        </div>
      ) : null}

      <div className="mt-8 grid min-w-0 gap-6">
        <section className="min-w-0 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                Historical products
              </p>
              <h2 className="mt-2 break-words font-display text-2xl text-ink">Catalogue reconciliation</h2>
            </div>
            <p className="text-sm text-steel">{view.products.length} products</p>
          </div>
          <div className="mt-5 grid min-w-0 gap-3">
            {view.products.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No historical products are available from the configured database.
              </div>
            ) : (
              view.products.map((product) => (
                <div key={product.key} className="min-w-0 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">{product.label}</p>
                  <p className="mt-1 break-words">{product.name}</p>
                  <p className="mt-1 break-words text-steel">/{product.slug}</p>
                  <p className="mt-2 font-semibold">
                    {formatMoney(product.priceAmount, product.currencyCode)}
                  </p>
                  <p className="mt-1 text-steel">Status: {product.status}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                Historical orders
              </p>
              <h2 className="mt-2 break-words font-display text-2xl text-ink">Order reconciliation</h2>
            </div>
            <p className="text-sm text-steel">Latest {view.orders.length}</p>
          </div>
          <div className="mt-5 grid min-w-0 gap-3">
            {view.orders.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No historical orders have been recorded.
              </div>
            ) : (
              view.orders.map((order) => (
                <div key={order.key} className="min-w-0 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">{order.label}</p>
                  <p className="mt-1 text-steel">Status: {order.status}</p>
                  <p className="mt-2 font-semibold">
                    {formatMoney(order.totalAmount, order.currencyCode)}
                  </p>
                  <p className="mt-1 text-steel">Updated: {formatDate(order.updatedAt)}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                Historical payments
              </p>
              <h2 className="mt-2 break-words font-display text-2xl text-ink">Payment reconciliation</h2>
            </div>
            <p className="text-sm text-steel">Latest {view.payments.length}</p>
          </div>
          <div className="mt-5 grid min-w-0 gap-3">
            {view.payments.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No historical payments have been recorded.
              </div>
            ) : (
              view.payments.map((payment) => (
                <div key={payment.key} className="min-w-0 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">{payment.label}</p>
                  <p className="mt-1 text-steel">Status: {payment.status}</p>
                  <p className="mt-2 font-semibold">
                    {formatMoney(payment.amount, payment.currencyCode)}
                  </p>
                  <p className="mt-1 text-steel">Paid: {formatDate(payment.paidAt)}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </SectionCard>
  );
}

async function AdminCommercePage() {
  await requireAdminAppContext("/admin/commerce");
  const snapshot = await getAdminCommerceSnapshot();

  return <AdminCommerceContent view={projectAdminCommerceSnapshot(snapshot)} />;
}

AdminCommercePage.AdminCommerceContent = AdminCommerceContent;
AdminCommercePage.projectAdminCommerceSnapshot = projectAdminCommerceSnapshot;

export default AdminCommercePage;
