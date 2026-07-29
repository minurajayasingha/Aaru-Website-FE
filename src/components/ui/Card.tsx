import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-card bg-brand-cream border border-black/20 shadow-card overflow-hidden", className)}>{children}</div>
  );
}
