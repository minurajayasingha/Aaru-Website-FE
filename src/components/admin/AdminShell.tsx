"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-forest-50">
      <div className={cn("hidden shrink-0 transition-[width] duration-200 md:block", isCollapsed ? "md:w-20" : "md:w-64")}>
        <div className={cn("fixed inset-y-0 transition-[width] duration-200", isCollapsed ? "w-20" : "w-64")}>
          <AdminSidebar collapsed={isCollapsed} />
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">
            <AdminSidebar onNavigate={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          onMenuClick={() => setIsDrawerOpen(true)}
          isSidebarCollapsed={isCollapsed}
          onToggleSidebar={() => setIsCollapsed((current) => !current)}
        />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
