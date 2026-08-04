"use client";

import { usePathname } from "next/navigation";
import { activeAdminNavLabel } from "@/content/admin/nav";
import { BellIcon, MenuIcon, SearchIcon } from "./icons";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = activeAdminNavLabel(pathname);

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-brand-forest-100 bg-white px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-brand-forest-700 hover:bg-brand-forest-50 md:hidden"
        >
          <MenuIcon />
        </button>
        <h1 className="truncate text-lg font-semibold text-brand-forest-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-forest-400" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="w-56 rounded-full border border-brand-forest-100 bg-brand-forest-50 py-2 pl-9 pr-4 text-sm text-brand-forest-900 placeholder:text-brand-forest-400 focus:outline-none focus:ring-2 focus:ring-brand-gold lg:w-72"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 text-brand-forest-700 hover:bg-brand-forest-50"
        >
          <BellIcon />
        </button>

        <div className="flex items-center gap-2.5 border-l border-brand-forest-100 pl-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-white"
            aria-hidden="true"
          >
            A
          </div>
          <span className="hidden text-sm font-medium text-brand-forest-900 md:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
