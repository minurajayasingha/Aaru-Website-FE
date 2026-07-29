"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export type Stat = {
  value: string;
  label: string;
  caption: string;
};

type StatsSectionProps = {
  stats: Stat[];
};

function StatText({ stat }: { stat: Stat }) {
  return (
    <>
      <p className="font-subheading text-h-03 font-thin">{stat.value}</p>
      <p className="font-heading text-para-lg tracking-wide font-thin">{stat.label}</p>
      <p className="font-heading text-para-xs font-thin text-white/60">{stat.caption}</p>
    </>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <StaticStats stats={stats} />;
  }

  return (
    <>
      <DesktopBar stats={stats} />
      <MobileStats stats={stats} />
    </>
  );
}

// Desktop: a plain 300px-tall bar, no pinning or extra scroll height added.
// Progress is read directly off how far the bar has scrolled through the
// viewport, so each column's reveal is scrubbed by the scroll position
// itself — scroll down and the next column comes in, scroll back up and it
// retreats in step, with no separate "reverse" animation needed.
function getRevealRange(total: number, index: number): [number, number] {
  if (index === 0) return [-1, 0];
  const segment = 1 / (total - 1);
  return [(index - 1) * segment, index * segment];
}

function DesktopBar({ stats }: { stats: Stat[] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <div ref={barRef} className="hidden h-[240px] items-center bg-brand-forest-900 px-20 text-brand-cream md:flex  ">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-5 divide-x divide-brand-cream/20 text-center">
        {stats.map((stat, index) => (
          <DesktopColumn key={stat.label} stat={stat} index={index} total={stats.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function DesktopColumn({
  stat,
  index,
  total,
  progress,
}: {
  stat: Stat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const range = getRevealRange(total, index);
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [32, 0]);

  return (
    <motion.div className="flex flex-col items-center gap-0.5 px-4" style={{ opacity, y }}>
      <StatText stat={stat} />
    </motion.div>
  );
}

// Mobile: no pinning, no scroll-jacking — a plain green section in normal
// document flow. Each stat just fades from invisible to visible on its own
// as it scrolls into view, the same way the rest of the site reveals things.
function MobileStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col divide-y divide-brand-cream/15 bg-brand-forest-800 px-6 text-brand-cream md:hidden">
      {stats.map((stat) => (
        <Reveal key={stat.label} className="flex flex-col items-center gap-0.5 py-7 text-center">
          <StatText stat={stat} />
        </Reveal>
      ))}
    </div>
  );
}

function StaticStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="text-brand-cream">
      <div className="hidden bg-brand-forest-800 px-6 py-16 md:block">
        <div className="mx-auto max-w-7xl divide-x divide-brand-cream/15 text-center md:grid md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 px-4">
              <StatText stat={stat} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col divide-y divide-brand-cream/15 bg-brand-forest-800 px-6 md:hidden">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5 py-7 text-center">
            <StatText stat={stat} />
          </div>
        ))}
      </div>
    </section>
  );
}
