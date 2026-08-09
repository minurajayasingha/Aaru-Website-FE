"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type Tab = { id: string; label: string; icon?: string };

type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <Container role="tablist" className="flex md:flex-wrap justify-evenly gap-2 sm:gap-12 lg:gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 border-b-2 pb-1 font-subheading text-para-xxxs font-thin transition-colors duration-200 md:gap-2 md:text-para-md",
              isActive
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-cream/70 hover:text-brand-cream",
            )}
          >
            {tab.icon && (
              <span className="relative h-6 w-6 shrink-0 md:h-12 md:w-12">
                <Image src={tab.icon} alt="" fill className="object-contain" />
              </span>
            )}
            {tab.label}
          </button>
        );
      })}
    </Container>
  );
}
