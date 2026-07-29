import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type StoryProfileSectionProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

export function StoryProfileSection({
  eyebrow,
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imagePosition = "left",
}: StoryProfileSectionProps) {
  return (
    <Reveal as="section" className="bg-white px-section-s py-16 pb-0 md:px-section-x">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div
          className={cn(
            "relative aspect-[7/8] w-full overflow-hidden rounded-card sm:w-2/3 lg:w-6/12",
            imagePosition === "left" ? "lg:order-1" : "lg:order-2",
          )}
        >
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
        </div>
        <div
          className={cn(
            "flex w-full flex-col gap-4 lg:w-6/12",
            imagePosition === "left" ? "lg:order-2" : "lg:order-1",
          )}
        >
          <span className="font-subheading text-para-md uppercase text-brand-gold">{eyebrow}</span>
          <h2 className="font-heading font-light text-h-01 text-black">{title}</h2>
          <p className="font-body text-para-sm font-thin text-black lg:w-10/12">{paragraph}</p>
          {ctaLabel && ctaHref && (
            <Button href={ctaHref} variant="primary" className="mt-2 w-fit">
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
