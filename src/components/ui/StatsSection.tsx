"use client";

import { Fragment } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export type Stat = {
  value: string;
  label: string;
  caption: string;
};

type StatsSectionProps = {
  stats: Stat[];
};

// The first/last stat's text flushes to the section's outer edge (matching
// the content edges above), instead of centering within its own grid
// column like the middle stats do.
function edgeAlignClass(index: number, length: number) {
  if (index === 0) return "items-start text-left";
  if (index === length - 1) return "items-end text-right";
  return "items-center text-center";
}

// A divider rendered as its own flex child (rather than a border on the
// stat itself) lands exactly halfway between the two stats it separates:
// `justify-between` gives every gap between flex children equal width, so
// the gap on either side of the divider is forced equal too.
function Divider({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("w-px shrink-0 self-stretch mx-4", className)} />;
}

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

// All stats fade in together as one group, in both desktop and mobile — no
// per-item stagger.
function DesktopBar({ stats }: { stats: Stat[] }) {
  return (
    <Reveal once={false} className="hidden h-[240px] items-center bg-brand-forest-900 text-brand-cream md:flex">
      <Container className="flex justify-between text-center">
        {stats.map((stat, index) => (
          <Fragment key={stat.label}>
            {index > 0 && <Divider className="bg-brand-cream/20" />}
            <div className={cn("flex flex-col gap-0.5", edgeAlignClass(index, stats.length))}>
              <StatText stat={stat} />
            </div>
          </Fragment>
        ))}
      </Container>
    </Reveal>
  );
}

function MobileStats({ stats }: { stats: Stat[] }) {
  return (
    <Reveal
      once={false}
      className="flex flex-col divide-y divide-brand-cream/15 bg-brand-forest-800 px-6 text-brand-cream md:hidden"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-0.5 py-7 text-center">
          <StatText stat={stat} />
        </div>
      ))}
    </Reveal>
  );
}

function StaticStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="text-brand-cream">
      <div className="hidden bg-brand-forest-800 py-16 md:block">
        <Container className="flex justify-between text-center">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && <Divider className="bg-brand-cream/15" />}
              <div className={cn("flex flex-col gap-1.5", edgeAlignClass(index, stats.length))}>
                <StatText stat={stat} />
              </div>
            </Fragment>
          ))}
        </Container>
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
