"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "li";
  delay?: number;
  className?: string;
};

const MotionTag = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
};

export function Reveal({ children, as = "div", delay = 0, className }: RevealProps) {
  const MotionComponent = MotionTag[as];
  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </MotionComponent>
  );
}
