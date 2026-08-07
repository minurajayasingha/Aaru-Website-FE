import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type HomeFeatureSectionProps = {
  title: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

// Distinct from FeatureSection (the Commercial Space pattern): dark
// background, and the image is full-bleed — it spans the entire height of
// the section edge to edge, no padding or rounded corners, instead of a
// small inset rounded card.
export function HomeFeatureSection({
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: HomeFeatureSectionProps) {
  return (
    <Reveal as="section" className="flex flex-col overflow-hidden bg-brand-forest-900 md:flex-row" once={false}>
      {/* This section's background bleeds full width, but the text needs to
          land on the same edge as the site's 1600px Container above/below
          it. Percentage padding can't do that here — it's relative to this
          half-width column, not the viewport — so the inset is computed in
          vw units instead, mirroring Container's own math (7.2917% of the
          viewport, capped at 1600px * 7.2917% once the viewport exceeds
          1600px). */}
      <div
        className={cn(
          "flex w-full flex-col justify-center gap-6 px-section-s py-16 md:w-1/2",
          imagePosition === "left"
            ? "md:order-2 md:pl-12 md:pr-[max(7.2917vw,calc((100vw_-_1600px)/2_+_116.667px))]"
            : "md:order-1 md:pl-[max(7.2917vw,calc((100vw_-_1600px)/2_+_116.667px))] md:pr-12",
        )}
      >
        <h2 className="font-heading font-light text-h-02 text-white">{title}</h2>
        <p className="font-body text-para-sm font-light text-white/80 md:w-10/12">{paragraph}</p>
        <div className="flex flex-wrap gap-4">
          <Button href={ctaHref} variant="cream" size="sm" className="w-fit">
            {ctaLabel}
          </Button>
          {secondaryCtaLabel && secondaryCtaHref && (
            <Button
              href={secondaryCtaHref}
              variant="secondary"
              size="sm"
              className="w-fit"
            >
              {secondaryCtaLabel}
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "relative min-h-[320px] w-full md:w-4/6",
          imagePosition === "left" ? "md:order-1" : "md:order-2",
        )}
      >
        <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    </Reveal>
  );
}
