import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-brand-forest-100 bg-white p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
