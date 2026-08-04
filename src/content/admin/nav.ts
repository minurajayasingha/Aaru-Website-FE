export type AdminNavIconKey = "dashboard" | "inquiries" | "residences" | "gallery" | "settings";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminNavIconKey;
  disabled?: boolean;
};

export type AdminNavGroup = {
  section: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    section: "General",
    items: [{ label: "Dashboard", href: "/admin", icon: "dashboard" }],
  },
  {
    section: "Content",
    items: [
      { label: "Inquiries", href: "/admin/inquiries", icon: "inquiries" },
      { label: "Residences", href: "/admin/residences", icon: "residences", disabled: true },
      { label: "Gallery", href: "/admin/gallery", icon: "gallery", disabled: true },
    ],
  },
  {
    section: "System",
    items: [{ label: "Settings", href: "/admin/settings", icon: "settings", disabled: true }],
  },
];

function flattenAdminNavItems(): AdminNavItem[] {
  return adminNavGroups.flatMap((group) => group.items);
}

export function isAdminNavItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function activeAdminNavLabel(pathname: string | null): string {
  const match = flattenAdminNavItems().find((item) => isAdminNavItemActive(pathname, item.href));
  return match?.label ?? "Admin";
}
