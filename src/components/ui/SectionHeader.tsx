import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  level: "h1" | "h2";
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ title, level, eyebrow, description, className }: SectionHeaderProps) {
  const HeadingTag = level;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <span className="font-body text-xs uppercase tracking-widest text-brand-gold">{eyebrow}</span>
      )}
      <HeadingTag className="font-display text-4xl md:text-5xl text-brand-forest-900">{title}</HeadingTag>
      {description && <p className="font-body text-base text-brand-forest-700 max-w-2xl">{description}</p>}
    </div>
  );
}
