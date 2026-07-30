"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export type IconAmenityItem = { id: string; name: string; description: string; icon: string };

function AmenityText({ item, isDark }: { item: IconAmenityItem; isDark: boolean }) {
  return (
    <>
      <span className="relative h-16 w-16">
        <Image src={item.icon} alt="" fill className="object-contain" />
      </span>
      <p className={cn("font-subheading uppercase text-para-xs", isDark ? "text-white" : "text-black")}>
        {item.name}
      </p>
      <p className={cn("font-body text-para-xxs font-thin", isDark ? "text-white/70" : "text-black")}>
        {item.description}
      </p>
    </>
  );
}

type IconAmenityRowProps = {
  heading?: string;
  paragraph?: string;
  items: IconAmenityItem[];
  theme?: "light" | "dark";
  /** Literal Tailwind grid-cols class for the row at the md breakpoint, e.g. "md:grid-cols-7". */
  columnsClassName: string;
};

export function IconAmenityRow({ heading, paragraph, items, theme = "light", columnsClassName }: IconAmenityRowProps) {
  const isDark = theme === "dark";

  return (
    <section className={cn("px-6 py-16", isDark ? "bg-brand-forest-900" : undefined)}>
      <div className="mx-auto max-w-7xl">
        {(heading || paragraph) && (
          <div className="mx-auto mb-10 flex max-w-7xl flex-col items-center gap-3 text-center">
            {heading && (
              <h2 className={cn("font-heading font-light text-h-02", isDark ? "text-white" : "text-black")}>
                {heading}
              </h2>
            )}
            {paragraph && (
              <p
                className={cn(
                  "font-body text-para-xs font-light",
                  isDark ? "text-white/70" : "text-brand-forest-700",
                )}
              >
                {paragraph}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "hidden md:grid",
            columnsClassName,
            isDark ? "divide-x divide-white/10" : "divide-x divide-brand-forest-100",
          )}
        >
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1.5 text-center">
              <AmenityText item={item} isDark={isDark} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:hidden">
          {items.map((item, index) => {
            const isTrailingOdd = items.length % 2 !== 0 && index === items.length - 1;
            return (
              <Reveal
                key={item.id}
                delay={index * 0.06}
                once={false}
                className={cn("flex flex-col items-center gap-1.5 text-center", isTrailingOdd && "col-span-2")}
              >
                <AmenityText item={item} isDark={isDark} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
