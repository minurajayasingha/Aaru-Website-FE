import Image from "next/image";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  height?: "sm" | "md" | "lg";
};

const heightClasses: Record<NonNullable<PageHeroProps["height"]>, string> = {
  sm: "h-[50vh]",
  md: "h-[60vh]",
  lg: "h-[75vh]",
};

export function PageHero({ title, subtitle, imageSrc, imageAlt, height = "md" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center text-center text-brand-cream",
        heightClasses[height],
      )}
    >
      <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1 className="font-heading text-4xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="font-body text-xs uppercase tracking-widest">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
