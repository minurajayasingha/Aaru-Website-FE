"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "li";
  delay?: number;
  className?: string;
  /** When false, the reveal replays when it re-enters from below after having scrolled away below the viewport. It never plays a hide transition when scrolling past it downward, since that happens directly under the navbar's blur and flickers. */
  once?: boolean;
};

const MotionTag = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
};

export function Reveal({ children, as = "div", delay = 0, className, once = true }: RevealProps) {
  const MotionComponent = MotionTag[as];
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      style={{ willChange: "transform, opacity" }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{ delay }}
      viewport={{ margin: "-80px", once }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => {
        if (once) return;
        // Only reset when it left through the bottom of the viewport
        // (scrolled up and away from it) so it can replay next time it's
        // scrolled back down to. Leaving through the top (scrolled past it
        // going down, disappearing under the fixed navbar) never triggers
        // a hide transition - that's the exact spot where its blur causes
        // a flicker if something is animating underneath it.
        const rect = ref.current?.getBoundingClientRect();
        if (rect && rect.top > 0) {
          setIsVisible(false);
        }
      }}
    >
      {children}
    </MotionComponent>
  );
}
