"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { edgeAlignClass, RowDivider } from "./EdgeAlignedRow";
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

        <div className="hidden md:flex md:justify-between">
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && <RowDivider className={dividerColor} />}
              <div className={cn("flex flex-col gap-1.5", edgeAlignClass(index, items.length))}>
                <AmenityText item={item} isDark={isDark} />
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
