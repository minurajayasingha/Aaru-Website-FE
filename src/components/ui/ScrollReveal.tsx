"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

type ScrollRevealProps = {
  progress: MotionValue<number>;
  range: [number, number];
  y?: number;
  scale?: boolean;
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
};

const MotionTag = {
  div: motion.div,
  section: motion.section,
};

export function ScrollReveal({
  progress,
  range,
  y = 32,
  scale = false,
  as = "div",
  className,
  children,
}: ScrollRevealProps) {
  const MotionComponent = MotionTag[as];
  const opacity = useTransform(progress, range, [0, 1]);
  const translateY = useTransform(progress, range, [y, 0]);
  const scaleValue = useTransform(progress, range, [0.94, 1]);

  return (
    <MotionComponent
      className={cn(className)}
      style={{ opacity, y: translateY, scale: scale ? scaleValue : undefined }}
    >
      {children}
    </MotionComponent>
  );
}
