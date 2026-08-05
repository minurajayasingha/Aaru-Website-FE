"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeAdminNavLabel } from "@/content/admin/nav";
import { BellIcon, MenuIcon, SearchIcon } from "./icons";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = activeAdminNavLabel(pathname);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

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
            className="w-56 rounded-full border border-brand-forest-100 bg-white py-2 pl-9 pr-4 text-sm text-brand-forest-900 placeholder:text-brand-forest-400 focus:outline-none focus:ring-2 focus:ring-brand-gold lg:w-72"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full bg-brand-forest-50 p-2 text-brand-forest-700 hover:bg-brand-forest-100"
        >
          <BellIcon />
        </button>

        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((open) => !open)}
            aria-label="Account menu"
            aria-expanded={isProfileMenuOpen}
            className="flex items-center gap-2.5 rounded-full bg-brand-forest-50 py-1 pl-1 pr-3 hover:bg-brand-forest-100"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-white"
              aria-hidden="true"
            >
              A
            </div>
            <span className="hidden text-sm font-medium text-brand-forest-900 md:block">Admin</span>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-brand-forest-100 bg-white p-2 shadow-lg">
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-white"
                  aria-hidden="true"
                >
                  A
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-forest-900">Admin</p>
                  <p className="truncate text-xs text-brand-forest-400">AARU Team</p>
                </div>
              </div>
              <div className="my-2 border-t border-brand-forest-100" />
              <Link
                href="/admin/login"
                onClick={() => setIsProfileMenuOpen(false)}
                className="block rounded-lg px-2 py-1.5 text-sm font-medium text-brand-forest-700 hover:bg-brand-forest-50"
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
