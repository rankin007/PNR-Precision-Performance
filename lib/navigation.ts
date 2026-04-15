export type NavigationItem = {
  href: string;
  label: string;
  description: string;
};

export const portalNavigation: NavigationItem[] = [
  {
    href: "/portal",
    label: "Overview",
    description: "Permission-aware member landing area.",
  },
  {
    href: "/portal/horses",
    label: "Horses",
    description: "Assigned horse profiles and summaries.",
  },
  {
    href: "/portal/reports",
    label: "Reports",
    description: "Performance and history reporting area.",
  },
];

export const adminNavigation: NavigationItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Membership, permissions, and operations control.",
  },
  {
    href: "/admin/memberships",
    label: "Memberships",
    description: "Level setup and assignment controls.",
  },
  {
    href: "/admin/users",
    label: "Users",
    description: "Profiles, access, and organisation management.",
  },
];

export const opsNavigation: NavigationItem[] = [
  {
    href: "/data-entry",
    label: "Daily Records",
    description: "Phone-first logging workflows.",
  },
  {
    href: "/data-entry/feeding",
    label: "Feeding",
    description: "Menus and feeding event capture.",
  },
  {
    href: "/data-entry/track",
    label: "Track Sessions",
    description: "Training and track activity capture.",
  },
  {
    href: "/data-entry/submissions",
    label: "Submissions",
    description: "Recent submissions and review paths.",
  },
];
