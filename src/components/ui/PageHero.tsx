import Image from "next/image";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  /** Separate, art-directed image shown below the `md` breakpoint instead of
   * cropping `imageSrc` down — a straight object-cover crop of a wide
   * desktop photo often loses the subject on tall narrow phone screens. */
  mobileImageSrc?: string;
  height?: "sm" | "md" | "lg";
};

const heightClasses: Record<NonNullable<PageHeroProps["height"]>, string> = {
  sm: "h-[50vh]",
  md: "h-[60vh]",
  lg: "h-[75vh]",
};

export function PageHero({ title, subtitle, imageSrc, imageAlt, mobileImageSrc, height = "md" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end justify-center pb-24 text-center text-brand-cream sm:pb-16 md:items-center md:pb-0",
        heightClasses[height],
      )}
    >
      {mobileImageSrc ? (
        <>
          <Image src={mobileImageSrc} alt={imageAlt} fill priority className="object-cover md:hidden" />
          <Image src={imageSrc} alt={imageAlt} fill priority className="hidden object-cover md:block" />
        </>
      ) : (
        <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover" />
      )}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1 className="font-heading text-h-02 md:text-h-02">{title}</h1>
        {subtitle && <p className="font-subheading text-subh-02 uppercase px-4 md:px-0">{subtitle}</p>}
      </div>
    </section>
  );
}
