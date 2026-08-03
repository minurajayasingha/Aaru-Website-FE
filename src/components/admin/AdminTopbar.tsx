"use client";

import { usePathname } from "next/navigation";
import { activeAdminNavLabel } from "@/content/admin/nav";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = activeAdminNavLabel(pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b border-brand-forest-100 bg-white px-4 md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-brand-forest-700 hover:bg-brand-forest-50 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-brand-forest-900">{title}</h1>
      </div>
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-white"
        aria-hidden="true"
      >
        A
      </div>
    </header>
  );
}
