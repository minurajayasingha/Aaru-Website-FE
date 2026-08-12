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
    <Reveal as="section" className="bg-white px-section-s py-16  md:px-section-x">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div
          className={cn(
            "relative w-full sm:w-2/3 lg:w-4/12",
            imagePosition === "left" ? "lg:order-1" : "lg:order-2",
          )}
        >
          <div className="absolute  hidden aspect-[4/5] w-full bg-brand-cream sm:block" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
            <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 20vw" className="object-cover" />
          </div>
          <div className="absolute hidden grid-cols-8 gap-1.5 sm:grid">
            {Array.from({ length: 32 }).map((_, index) => (
              <span key={index} className="h-1 w-1 rounded-full bg-brand-forest-300" />
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex w-full flex-col gap-4 lg:w-7/12",
            imagePosition === "left" ? "lg:order-2" : "lg:order-1",
          )}
        >
          <span className="font-subheading text-para-md uppercase text-brand-gold">{eyebrow}</span>
          <h2 className="font-heading font-light text-h-01 text-black">{title}</h2>
          {paragraph.split("<br>").map((part, index) => (
            <p key={index} className="text-justify font-body text-para-sm font-thin text-black ">
              {part.trim()}
            </p>
          ))}
          {ctaLabel && ctaHref && (
            <Button href={ctaHref} variant="primary" className="mt-2 w-fit mb-12">
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
}
