export type AdminNavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Residences", href: "/admin/residences", disabled: true },
  { label: "Gallery", href: "/admin/gallery", disabled: true },
  { label: "Settings", href: "/admin/settings", disabled: true },
];

export function isAdminNavItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function activeAdminNavLabel(pathname: string | null): string {
  const match = adminNavItems.find((item) => isAdminNavItemActive(pathname, item.href));
  return match?.label ?? "Admin";
}
