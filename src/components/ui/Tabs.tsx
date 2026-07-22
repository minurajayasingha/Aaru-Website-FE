"use client";

import { cn } from "@/lib/cn";

type Tab = { id: string; label: string };

type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap justify-center gap-8">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "font-body text-sm tracking-wide pb-2 border-b-2 transition-colors duration-200",
              isActive
                ? "border-brand-gold text-brand-cream"
                : "border-transparent text-brand-cream/60 hover:text-brand-cream"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
