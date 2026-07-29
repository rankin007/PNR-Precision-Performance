export const commercialAuthority = {
  version: "030-authority-pending-v1",
  posture: "commerce-disabled-safe",
  checkoutEnabled: false,
  reasonCode: "commercial-authority-incomplete",
  publicMessage:
    "Online purchasing is unavailable while the commercial schedule is being confirmed.",
  nextStep: "Request a trainer consultation to discuss current availability and requirements.",
} as const;

export type CommerceLaunchPosture = typeof commercialAuthority.posture;
