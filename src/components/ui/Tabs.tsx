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
    <div role="tablist" className="flex md:flex-wrap justify-evenly gap-12 sm:gap-12 lg:gap-1 px-section-x overflow-x-auto ">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-2 border-b-2 pb-1 font-subheading text-para-md font-thin transition-colors duration-200",
              isActive
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-cream/70 hover:text-brand-cream",
            )}
          >
            {tab.icon && (
              <span className="relative h-12 w-12 shrink-0 ">
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
