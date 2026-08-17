"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { activeAdminNavLabel } from "@/content/admin/nav";
import { sampleInquiries } from "@/content/admin/inquiries";
import { BellIcon, MenuIcon, SidebarToggleIcon } from "./icons";

type AdminTopbarProps = {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

const iconButtonClasses = "rounded-full bg-brand-forest-50 p-2 text-brand-forest-700 hover:bg-brand-forest-100";

function formatRelativeTime(dateStr: string): string {
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export function AdminTopbar({ onMenuClick, isSidebarCollapsed, onToggleSidebar }: AdminTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const title = activeAdminNavLabel(pathname);
  const newInquiries = sampleInquiries.filter((inquiry) => inquiry.status === "new");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileMenuOpen && !isNotificationsOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (isProfileMenuOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (isNotificationsOpen && notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen, isNotificationsOpen]);

  function goToInquiry(id: string) {
    setIsNotificationsOpen(false);
    router.push(`/admin/inquiries?inquiryId=${id}`);
  }

  async function handleSignOut() {
    setIsProfileMenuOpen(false);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

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
        <h1 className="truncate text-lg font-semibold text-brand-forest-900 md:hidden">{title}</h1>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`hidden md:block ${iconButtonClasses}`}
        >
          <SidebarToggleIcon />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setIsNotificationsOpen((open) => !open)}
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            className={`relative ${iconButtonClasses}`}
          >
            <BellIcon />
            {newInquiries.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {newInquiries.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 z-50 mt-2 w-[26rem] overflow-hidden rounded-xl border border-brand-forest-100 bg-white shadow-lg">
              <div className="border-b border-brand-forest-100 px-4 py-3">
                <p className="text-sm font-semibold text-brand-forest-900">New inquiries</p>
              </div>
              {newInquiries.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-brand-forest-400">You&apos;re all caught up.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-forest-50 text-xs uppercase tracking-wide text-brand-forest-400">
                    <tr>
                      <th className="px-4 py-2 font-medium">Name</th>
                      <th className="px-4 py-2 font-medium">Time</th>
                      <th className="px-4 py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-forest-100">
                    {newInquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        onClick={() => goToInquiry(inquiry.id)}
                        className="cursor-pointer hover:bg-brand-forest-50"
                      >
                        <td className="truncate px-4 py-2 font-medium text-brand-forest-900">{inquiry.name}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-brand-forest-700">
                          {formatRelativeTime(inquiry.submittedAt)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-brand-forest-400">{inquiry.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((open) => !open)}
            aria-label="Account menu"
            aria-expanded={isProfileMenuOpen}
            className="flex items-center gap-2.5 rounded-full hover:bg-brand-forest-100 md:bg-brand-forest-50 md:py-1 md:pl-1 md:pr-3"
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
              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-brand-forest-700 hover:bg-brand-forest-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
