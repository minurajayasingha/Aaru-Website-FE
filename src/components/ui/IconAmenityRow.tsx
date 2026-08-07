"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { RowDivider } from "./EdgeAlignedRow";
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
};

// Positions the icon+text block within its (equal-width) cell: flush to
// the outer edge for the first/last cell, centered for every cell in
// between — same idea as StatsSection's edge-flush, but applied to the
// cell as a whole rather than to items-align, so the icon stays centered
// over its own text regardless of position.
function cellJustifyClass(index: number, length: number) {
  if (index === 0) return "justify-start";
  if (index === length - 1) return "justify-end";
  return "justify-center";
}

export function IconAmenityRow({ heading, paragraph, items, theme = "light" }: IconAmenityRowProps) {
  const isDark = theme === "dark";
  const dividerColor = isDark ? "bg-white/10" : "bg-brand-forest-100";

  return (
    <section className={cn("py-16", isDark ? "bg-brand-forest-900" : undefined)}>
      <Container>
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

        {/* Equal-width cells (flex-1) keep the gap between every pair of
            dividers the same size, regardless of how long each item's text
            is. The inner wrapper stays centered so the icon lines up with
            its own text; the outer cell's justify-* then pins that whole
            block flush to the row's edge for the first/last item only. */}
        <div className="hidden md:flex">
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && <RowDivider className={dividerColor} />}
              <div className={cn("flex min-w-0 flex-1", cellJustifyClass(index, items.length))}>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <AmenityText item={item} isDark={isDark} />
                </div>
              </div>
            </Fragment>
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
      </Container>
    </section>
  );
}
