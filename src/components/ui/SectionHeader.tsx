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
  md: "text-h-02",
  lg: "text-h-02",
};

export function SectionHeader({ title, level, eyebrow, description, className, size = "lg" }: SectionHeaderProps) {
  const HeadingTag = level;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <span className="font-subheading text-para-md uppercase text-brand-gold">{eyebrow}</span>
      )}
      <HeadingTag className={cn("font-heading font-bold text-black", titleSizeClasses[size])}>{title}</HeadingTag>
      {description && <p className="font-body text-body-lg text-brand-forest-700 max-w-2xl">{description}</p>}
    </div>
  );
}
