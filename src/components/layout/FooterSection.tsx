"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { CtaBannerGate } from "./CtaBannerGate";
import { Footer } from "./Footer";

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  return (
    <div ref={sectionRef}>
      <CtaBannerGate />
      <Footer progress={scrollYProgress} />
    </div>
  );
}
