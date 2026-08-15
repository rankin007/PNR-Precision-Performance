import PricingPage from "@/app/pricing/page";
import DisclaimerPage from "@/app/disclaimer/page";
import ShopPage from "@/app/shop/page";
import ProductDetailPage from "@/app/shop/[slug]/page";
import AdminCommercePage from "@/app/(admin)/admin/commerce/page";
import type { AdminCommerceSnapshot } from "@/lib/stripe/commerce";

const rawSyntheticSnapshot: AdminCommerceSnapshot = {
  envReady: true,
  products: [{
    id: "synthetic-product-identifier-never-rendered",
    name: "Historical demonstration product",
    slug: "historical-demonstration",
    status: "inactive",
    priceAmount: 1,
    currencyCode: "AUD",
    updatedAt: "2026-08-12T00:00:00.000Z",
  }],
  orders: [{
    id: "synthetic-order-identifier-never-rendered",
    userId: "synthetic-customer-identifier-never-rendered",
    status: "historical",
    totalAmount: 2,
    currencyCode: "AUD",
    provider: "synthetic-provider-identifier-never-rendered",
    checkoutSessionId: "synthetic-checkout-identifier-never-rendered",
    paymentIntentId: "synthetic-intent-identifier-never-rendered",
    orderedAt: "2026-08-12T00:00:00.000Z",
    updatedAt: "2026-08-12T00:00:00.000Z",
  }],
  payments: [{
    id: "synthetic-payment-identifier-never-rendered",
    orderId: "synthetic-order-identifier-never-rendered",
    status: "historical",
    amount: 3,
    currencyCode: "AUD",
    provider: "synthetic-provider-identifier-never-rendered",
    providerPaymentId: "synthetic-intent-identifier-never-rendered",
    checkoutSessionId: "synthetic-checkout-identifier-never-rendered",
    paidAt: "2026-08-12T00:00:00.000Z",
    createdAt: "2026-08-12T00:00:00.000Z",
  }],
  errors: [],
};

const { AdminCommerceContent, projectAdminCommerceSnapshot } = AdminCommercePage;
const adminView = projectAdminCommerceSnapshot(rawSyntheticSnapshot);

function EvidenceSection({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section data-evidence-section={name} aria-label={name} className="min-w-0">
      {children}
    </section>
  );
}

type EvidenceProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvidencePage({ searchParams }: EvidenceProps) {
  const params = searchParams ? await searchParams : {};
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const mode = rawMode ?? "pricing";

  if (mode === "pricing") {
    return <EvidenceSection name="pricing"><PricingPage /></EvidenceSection>;
  }
  if (mode === "disclaimer") {
    return <EvidenceSection name="disclaimer"><DisclaimerPage /></EvidenceSection>;
  }
  if (mode === "shop-detail") {
    return (
      <div className="min-w-0 bg-canvas">
        <EvidenceSection name="shop"><ShopPage /></EvidenceSection>
        <EvidenceSection name="detail"><ProductDetailPage /></EvidenceSection>
      </div>
    );
  }
  if (mode === "admin") {
    return (
      <main className="min-h-screen min-w-0 overflow-x-clip bg-canvas px-3 py-8 sm:px-8">
        <EvidenceSection name="admin">
          <AdminCommerceContent view={adminView} />
        </EvidenceSection>
      </main>
    );
  }

  return (
    <div className="min-w-0 bg-canvas">
      <EvidenceSection name="pricing"><PricingPage /></EvidenceSection>
      <EvidenceSection name="disclaimer"><DisclaimerPage /></EvidenceSection>
      <EvidenceSection name="shop"><ShopPage /></EvidenceSection>
      <EvidenceSection name="detail"><ProductDetailPage /></EvidenceSection>
      <main className="min-w-0 px-8 py-12">
        <EvidenceSection name="admin">
          <AdminCommerceContent view={adminView} />
        </EvidenceSection>
      </main>
    </div>
  );
}
