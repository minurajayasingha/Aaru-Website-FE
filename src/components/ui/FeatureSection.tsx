import Image from "next/image";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

type FeatureSectionProps = {
  title: string;
  paragraph: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

export function FeatureSection({
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: FeatureSectionProps) {
  return (
    <Reveal as="section" className="bg-white">
      <Container className="flex flex-col sm:flex-row gap-6 py-8 md:py-0 md:items-center  md:gap-12 lg:pt-20">
        {/* `contents` breaks this wrapper apart on mobile so the image (a
            separate flex item below) can sit between the title and the
            paragraph/button via `order`; at sm+ it becomes a real flex
            column again so title+paragraph+button group back into one
            block beside the image, same as before this mobile reorder. */}
        <div className={cn("contents sm:flex sm:w-8/12 sm:flex-col sm:gap-6", imagePosition === "left" ? "sm:order-2" : "sm:order-1")}>
          <h2 className="order-1 font-heading font-light text-h-02 text-black">{title}</h2>
          <div className="order-3 flex flex-col gap-6">
            <p className="font-body text-para-xs font-light text-black md:w-9/12">{paragraph}</p>
            {ctaLabel && ctaHref && (
              <Button href={ctaHref} variant="primary" className="w-fit">
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>
        <div
          className={cn(
            "relative order-2 aspect-video w-full overflow-hidden rounded-card ",
            imagePosition === "left" ? "sm:order-1" : "sm:order-2",
          )}
        >
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </Container>
    </Reveal>
  );
}
