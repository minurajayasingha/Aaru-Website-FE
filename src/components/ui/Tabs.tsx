"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type Tab = { id: string; label: string; icon?: string };

type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-2 border-b-2 pb-2 font-body text-sm tracking-wide transition-colors duration-200",
              isActive
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-cream/70 hover:text-brand-cream",
            )}
          >
            {tab.icon && (
              <span className="relative h-6 w-6 shrink-0">
                <Image src={tab.icon} alt="" fill className="object-contain" />
              </span>
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
