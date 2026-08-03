"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { adminNavItems, isAdminNavItemActive } from "@/content/admin/nav";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 bg-brand-forest-900 px-4 py-6">
      <div className="mb-6 px-2 text-lg font-semibold tracking-wide text-white">
        AARU <span className="text-brand-gold">Admin</span>
      </div>
      {adminNavItems.map((item) => {
        if (item.disabled) {
          return (
            <span
              key={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/30"
            >
              {item.label}
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">Soon</span>
            </span>
          );
        }

        const active = isAdminNavItemActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-forest-800 text-brand-gold"
                : "text-white/80 hover:bg-brand-forest-800 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
