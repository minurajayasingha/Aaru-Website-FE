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
        <div className={cn("flex w-full flex-col gap-6 sm:w-8/12", imagePosition === "left" ? "md:order-2" : "md:order-1")}>
          <h2 className="font-heading font-light text-h-02 text-black">{title}</h2>
          <p className="font-body text-para-xs font-light text-black md:w-9/12">{paragraph}</p>
          {ctaLabel && ctaHref && (
            <Button href={ctaHref} variant="primary" className="w-fit">
              {ctaLabel}
            </Button>
          )}
        </div>
        <div
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-card ",
            imagePosition === "left" ? "md:order-1" : "md:order-2",
          )}
        >
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </Container>
    </Reveal>
  );
}
