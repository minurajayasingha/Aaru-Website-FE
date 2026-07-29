"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

// No pinning, just a plain row whose columns are scrubbed directly by how
// far it has scrolled through the viewport — scroll down and each column
// reveals left to right, scroll back up and they retreat in step.
function getRevealRange(total: number, index: number): [number, number] {
  if (index === 0) return [-1, 0];
  const segment = 1 / (total - 1);
  return [(index - 1) * segment, index * segment];
}

function AmenityColumn({
  item,
  index,
  total,
  progress,
  isDark,
}: {
  item: IconAmenityItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isDark: boolean;
}) {
  const range = getRevealRange(total, index);
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [32, 0]);

  return (
    <motion.div className="flex flex-col items-center gap-1.5 text-center" style={{ opacity, y }}>
      <AmenityText item={item} isDark={isDark} />
    </motion.div>
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
  const barRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ["start 0.85", "start 0.55"],
  });

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
          ref={barRef}
          className={cn(
            "hidden md:grid",
            columnsClassName,
            isDark ? "divide-x divide-white/10" : "divide-x divide-brand-forest-100",
          )}
        >
          {items.map((item, index) => (
            <AmenityColumn
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              progress={scrollYProgress}
              isDark={isDark}
            />
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
