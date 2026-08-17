"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  adminNavGroups,
  adminSettingsNavItem,
  isAdminNavItemActive,
  type AdminNavIconKey,
  type AdminNavItem,
} from "@/content/admin/nav";
import {
  DashboardIcon,
  InquiriesIcon,
  ResidencesIcon,
  GalleryIcon,
  SettingsIcon,
  SidebarToggleIcon,
  type AdminIconProps,
} from "./icons";

type AdminSidebarProps = {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

const iconMap: Record<AdminNavIconKey, (props: AdminIconProps) => React.ReactElement> = {
  dashboard: DashboardIcon,
  inquiries: InquiriesIcon,
  residences: ResidencesIcon,
  gallery: GalleryIcon,
  settings: SettingsIcon,
};

export function AdminSidebar({ onNavigate, collapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  function renderNavItem(item: AdminNavItem) {
    const Icon = iconMap[item.icon];

    if (item.disabled) {
      return (
        <span
          key={item.href}
          title={collapsed ? item.label : undefined}
          className={cn(
            "flex items-center rounded-lg py-2.5 text-sm text-white/30",
            collapsed ? "justify-center px-2" : "justify-between px-3"
          )}
        >
          <span className="flex items-center gap-2.5">
            <Icon className="h-[18px] w-[18px]" />
            {!collapsed && item.label}
          </span>
          {!collapsed && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">Soon</span>
          )}
        </span>
      );
    }

    const active = isAdminNavItemActive(pathname, item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-lg py-2.5 text-sm font-medium transition-colors",
          collapsed ? "justify-center px-2" : "px-3",
          active
            ? "bg-brand-gold/15 text-brand-gold"
            : "text-white/80 hover:bg-brand-forest-800 hover:text-white"
        )}
      >
        <Icon className="h-[18px] w-[18px]" />
        {!collapsed && item.label}
      </Link>
    );
  }

  return (
    <nav className={cn("flex h-full flex-col bg-brand-forest-900 py-6", collapsed ? "px-2" : "px-4")}>
      <div className={cn("mb-6 flex items-center gap-2", collapsed ? "flex-col px-0" : "justify-between px-2")}>
        <div className={cn("flex items-center gap-2.5", collapsed && "flex-col")}>
          <div className="relative h-8 w-8 shrink-0">
            <Image src="/images/logo/aaru-mark-white.svg" alt="AARU" fill className="object-contain" />
          </div>
          {!collapsed && <span className="text-lg font-semibold tracking-wide text-white">AARU</span>}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-brand-forest-800 hover:text-white"
          >
            <SidebarToggleIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {adminNavGroups.map((group) => (
          <div key={group.section} className="flex flex-col gap-1">
            {!collapsed && (
              <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                {group.section}
              </span>
            )}
            {group.items.map((item) => renderNavItem(item))}
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">{renderNavItem(adminSettingsNavItem)}</div>
    </nav>
  );
}
