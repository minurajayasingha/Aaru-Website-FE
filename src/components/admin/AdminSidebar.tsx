"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { adminNavGroups, isAdminNavItemActive, type AdminNavIconKey } from "@/content/admin/nav";
import {
  DashboardIcon,
  InquiriesIcon,
  ResidencesIcon,
  GalleryIcon,
  SettingsIcon,
  type AdminIconProps,
} from "./icons";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

const iconMap: Record<AdminNavIconKey, (props: AdminIconProps) => React.ReactElement> = {
  dashboard: DashboardIcon,
  inquiries: InquiriesIcon,
  residences: ResidencesIcon,
  gallery: GalleryIcon,
  settings: SettingsIcon,
};

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col bg-brand-forest-900 px-4 py-6">
      <div className="mb-6 px-2 text-lg font-semibold tracking-wide text-white">
        AARU <span className="text-brand-gold">Admin</span>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {adminNavGroups.map((group) => (
          <div key={group.section} className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {group.section}
            </span>
            {group.items.map((item) => {
              const Icon = iconMap[item.icon];

              if (item.disabled) {
                return (
                  <span
                    key={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/30"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      Soon
                    </span>
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
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-gold/15 text-brand-gold"
                      : "text-white/80 hover:bg-brand-forest-800 hover:text-white"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 px-2 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-white">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">Admin</p>
          <p className="truncate text-xs text-white/40">AARU Team</p>
        </div>
      </div>
    </nav>
  );
}
