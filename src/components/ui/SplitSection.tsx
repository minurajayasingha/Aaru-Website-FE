import Image from "next/image";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

type SplitSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: "_blank";
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageFit?: "cover" | "contain";
  /** When false, the section's reveal replays every time it enters/leaves the viewport instead of only once. */
  revealOnce?: boolean;
};

export function SplitSection({
  eyebrow,
  title,
  paragraphs,
  ctaLabel,
  ctaHref,
  ctaTarget,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  imageFit = "cover",
  revealOnce = true,
}: SplitSectionProps) {
  const eyebrowEl = (
    <span className="font-subheading uppercase text-para-md text-brand-gold">{eyebrow}</span>
  );
  const headingEl = <h2 className="font-heading font-light text-h-01 text-black">{title}</h2>;
  const paragraphsEl = (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="font-body text-para-sm font-thin text-black md:w-10/12">
          {paragraph}
        </p>
      ))}
    </div>
  );
  const buttonEl = ctaLabel && ctaHref && (
    <Button href={ctaHref} target={ctaTarget} variant="primary" className="w-fit">
      {ctaLabel}
    </Button>
  );

  return (
    <Reveal as="section" className="bg-white" once={revealOnce}>
      {/* Mobile: stacked, image between heading and paragraph */}
      <div className="flex flex-col gap-4 px-section-s py-16 md:hidden">
        {eyebrowEl}
        {headingEl}
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-card sm:aspect-[9/12]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={imageFit === "cover" ? "object-cover" : "object-contain"}
          />
        </div>
        {paragraphsEl}
        {buttonEl}
      </div>

      {/* Tablet/desktop: side-by-side, each side sized only by its own content */}
      <div
        className={cn(
          "mx-auto hidden gap-12 px-section-x py-16 md:grid md:items-center",
          imagePosition === "left" ? "md:grid-cols-[6fr_4fr]" : "md:grid-cols-[4fr_6fr]",
        )}
      >
        <div className={cn("flex w-full flex-col gap-4", imagePosition === "left" ? "md:order-2" : "md:order-1")}>
          {eyebrowEl}
          {headingEl}
          {paragraphsEl}
          {buttonEl}
        </div>
        <div
          className={cn(
            "relative aspect-[6/5] w-full overflow-hidden rounded-card xl:aspect-[15/10]",
            imagePosition === "left" ? "md:order-1" : "md:order-2",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={imageFit === "cover" ? "object-cover" : "object-contain"}
          />
        </div>
      </div>
    </Reveal>
  );
}
