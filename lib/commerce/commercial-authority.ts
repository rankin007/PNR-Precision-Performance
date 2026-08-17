import "server-only";

export const commercialAuthority = {
  version: "030B-consultation-led-v1",
  posture: "commerce-disabled-safe",
  decision: {
    owner: "Phillip Rankin",
    role: "Director of Aprec8 Pty Ltd",
    effectiveDate: "2026-08-12",
    supersession:
      "Only a later versioned, expressly owner-approved schedule may replace this authority.",
  },
  offer: {
    name: "Precision Performance BE Kit and Onboarding Package",
    identifier: "PP-BE-KIT-ONBOARDING-AU",
    price: {
      amount: 5500,
      currency: "AUD",
      gstInclusive: true,
      display: "AUD $5,500 including GST",
    },
  },
  checkoutEnabled: false,
  reasonCode: "consultation-led-commerce-disabled",
  publicMessage:
    "Online purchasing is unavailable. The approved package is consultation-led and supplied only under an accepted written quote.",
  nextStep:
    "Visit the stable-trial section to check current enquiry availability and request a trainer consultation.",
  schedule: {
    salesModel:
      "Consultation and accepted written quote only; no online checkout, automatic order, subscription activation or website payment.",
    freight:
      "Freight is additional and destination-based. The written quote states freight and the complete total before acceptance.",
    kitContents:
      "Aprec8 selects the equipment and consumables for the customer. Every supplied item and quantity is itemised in the accepted quote; images, seeds and historical catalogues create no inclusion.",
    training:
      "One initial onboarding and equipment-use session of no more than two hours, delivered remotely or on site as agreed. Travel and additional training are separately quoted.",
    softwareAndPortal:
      "No subscription, unlimited testing, horse, stable or user entitlement, or continuing portal access is included unless expressly itemised in the quote.",
    support:
      "Initial setup questions are covered for 30 calendar days after onboarding through an approved Aprec8 contact channel. Ongoing operational or veterinary support requires a separate agreement.",
    term:
      "This is a one-off package with no automatic renewal or twelve-month commitment. A written quote expires after 30 days unless it states otherwise.",
    payment:
      "The accepted quote states the payment method, timing and any deposit. The website collects no payment.",
    cancellation:
      "There is no obligation before quote acceptance. After acceptance, the quote governs cancellation subject to non-excludable Australian Consumer Law rights.",
    refundsAndReturns:
      "Australian Consumer Law remedies apply. No additional change-of-mind return promise is included; any discretionary return is agreed in writing.",
    warrantyAndReplacement:
      "Australian Consumer Law guarantees and any itemised manufacturer warranty apply. No extended warranty is promised, and Aprec8 remains the customer contact for supplied-goods issues.",
    ownership:
      "Ownership transfers after cleared payment and delivery unless the accepted quote expressly identifies loaned equipment.",
    buyback:
      "No buyback is guaranteed. Historical $500 wording is superseded; any future buyback is a separate written offer.",
    stableTrial:
      "A stable-trial enquiry requests consultation only and creates no order, payment, subscription, onboarding, equipment entitlement or automatic conversion. Any equipment loan or structured trial requires a separate signed trial schedule.",
    eligibility:
      "Australian customers are accepted by Aprec8 following consultation and an availability review; eligibility is not automatic.",
    fulfilment:
      "Fulfilment is subject to stock and destination. The accepted quote confirms dispatch, installation and training timing, the responsible contact, freight and complete total; no general delivery-time promise applies.",
    claims:
      "The package supports professional measurement and review. It does not diagnose, prescribe treatment, guarantee performance, replace veterinary assessment or promise race readiness.",
    historicalRecords:
      "Existing orders retain their original terms. Historical prices, test rows and catalogues are not reinterpreted or mutated.",
  },
  legacyConflicts: [
    "$2,500",
    "$3,500",
    "$4,500",
    "$120",
    "P.O.A",
    "unlimited testing",
    "$500",
    "$149",
    "$249",
    "$89",
  ],
} as const;

export type CommerceLaunchPosture = typeof commercialAuthority.posture;
