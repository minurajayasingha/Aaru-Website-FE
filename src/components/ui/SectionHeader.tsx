import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  level: "h1" | "h2";
  eyebrow?: string;
  description?: string;
  className?: string;
  /** Title size: "lg" (96px) for a standalone section header, "md" (60px) when paired beside an image/card. Defaults to "lg". */
  size?: "md" | "lg";
};

const titleSizeClasses: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  md: "text-h-01",
  lg: "text-h-01",
};

export function SectionHeader({ title, level, eyebrow, description, className, size = "lg" }: SectionHeaderProps) {
  const HeadingTag = level;
  return (
    <div className={cn("flex flex-col gap-2 ", className)}>
      {eyebrow && (
        <span className="font-subheading text-para-md uppercase text-brand-gold">{eyebrow}</span>
      )}
      <HeadingTag className={cn("font-heading font-light text-h-01 text-black", titleSizeClasses[size])}>{title}</HeadingTag>
      {description && <p className="font-body text-para-sm font-thin text-black ">{description}</p>}
    </div>
  );
}
