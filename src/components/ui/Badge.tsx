import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-brand-cream px-2 py-1 text-para-xxs font-subheading tracking-wide text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
