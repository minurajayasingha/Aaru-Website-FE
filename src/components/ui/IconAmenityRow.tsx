"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { RowDivider, cellJustifyClass } from "./EdgeAlignedRow";
import { cn } from "@/lib/cn";

export type IconAmenityItem = { id: string; name: string; description: string; icon?: string };

function AmenityText({ item, isDark }: { item: IconAmenityItem; isDark: boolean }) {
  return (
    <>
      {item.icon && (
        <span className="relative h-16 w-16">
          <Image src={item.icon} alt="" fill className="object-contain" />
        </span>
      )}
      <p className={cn("font-subheading uppercase text-para-xs", isDark ? "text-white" : "text-black")}>
        {item.name}
      </p>
      <p className={cn("font-body text-para-xxs font-thin", isDark ? "text-white/70" : "text-black")}>
        {item.description}
      </p>
    </>
  );
}

// One row of equal-width cells (flex-1), which keeps the gap between
// every pair of dividers the same size regardless of how long each item's
// text is. In single-row mode the outer cell's justify-* pins the first/
// last item flush to the row's edge, matching the site's other edge-flush
// rows (StatsSection, etc). In multi-row mode every cell is centered
// instead — with several stacked rows sharing the same column widths, a
// centered box keeps each column's icon aligned across rows regardless of
// that row's text length, instead of drifting per row like the flush
// edges would.
function AmenityRow({
  items,
  isDark,
  dividerColor,
  centerAll,
}: {
  items: IconAmenityItem[];
  isDark: boolean;
  dividerColor: string;
  centerAll: boolean;
}) {
  return (
    <div className="flex">
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && <RowDivider className={dividerColor} />}
          <div
            className={cn(
              "flex min-w-0 flex-1",
              centerAll ? "justify-center" : cellJustifyClass(index, items.length),
            )}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <AmenityText item={item} isDark={isDark} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

type IconAmenityRowProps = {
  heading?: string;
  paragraph?: string;
  items: IconAmenityItem[];
  theme?: "light" | "dark";
  /** Wraps into multiple stacked rows of this many items instead of one long row. */
  itemsPerRow?: number;
};

export function IconAmenityRow({ heading, paragraph, items, theme = "light", itemsPerRow }: IconAmenityRowProps) {
  const isDark = theme === "dark";
  const dividerColor = isDark ? "bg-white/10" : "bg-brand-forest-100";
  const rows = chunk(items, itemsPerRow ?? items.length);
  const isMultiRow = rows.length > 1;

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

        <div className={cn("hidden flex-col gap-y-12 md:flex", isMultiRow && "mx-auto w-full max-w-6xl")}>
          {rows.map((row, index) => (
            <AmenityRow key={index} items={row} isDark={isDark} dividerColor={dividerColor} centerAll={isMultiRow} />
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
                className={cn("flex flex-col items-center gap-1.5 text-center bg", isTrailingOdd && "col-span-2")}
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
