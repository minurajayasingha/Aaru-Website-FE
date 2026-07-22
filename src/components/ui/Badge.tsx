import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-forest-800/90 px-3 py-1 text-xs font-body font-medium tracking-wide text-brand-cream",
        className
      )}
    >
      {children}
    </span>
  );
}
