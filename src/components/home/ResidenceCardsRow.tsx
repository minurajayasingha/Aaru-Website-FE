"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ResidenceCard } from "@/components/ui/ResidenceCard";
import type { Residence } from "@/content/residences";

// Same technique as the stats bar and commercial amenities row: no pinning,
// just a plain grid whose cards are scrubbed directly by how far the row
// has scrolled through the viewport — scroll down and each card reveals
// left to right, scroll back up and they retreat in step.
function getRevealRange(total: number, index: number): [number, number] {
  if (index === 0) return [-1, 0];
  const segment = 1 / (total - 1);
  return [(index - 1) * segment, index * segment];
}

function ResidenceColumn({
  residence,
  index,
  total,
  progress,
}: {
  residence: Residence;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const range = getRevealRange(total, index);
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [32, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <ResidenceCard
        slug={residence.slug}
        name={residence.name}
        floorLabel={residence.floorLabel}
        unitBadge={residence.unitBadge}
        bedroomLabel={residence.bedroomLabel}
        sizeLabel={residence.sizeLabel}
        cardAmenities={residence.cardAmenities}
        imageSrc={residence.cardImage.src}
        imageAlt={residence.cardImage.alt}
      />
    </motion.div>
  );
}

export function ResidenceCardsRow({ residences }: { residences: Residence[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <>
      <div ref={rowRef} className="hidden gap-4 px-section-x md:grid md:grid-cols-3">
        {residences.map((residence, index) => (
          <ResidenceColumn
            key={residence.slug}
            residence={residence}
            index={index}
            total={residences.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="grid gap-6 px-section-x md:hidden">
        {residences.map((residence, index) => (
          <Reveal key={residence.slug} delay={index * 0.25} once={false}>
            <ResidenceCard
              slug={residence.slug}
              name={residence.name}
              floorLabel={residence.floorLabel}
              unitBadge={residence.unitBadge}
              bedroomLabel={residence.bedroomLabel}
              sizeLabel={residence.sizeLabel}
              cardAmenities={residence.cardAmenities}
              imageSrc={residence.cardImage.src}
              imageAlt={residence.cardImage.alt}
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}
