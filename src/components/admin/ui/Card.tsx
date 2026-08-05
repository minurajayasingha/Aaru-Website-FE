import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-brand-forest-100 bg-white p-6 shadow-sm", className)} onClick={onClick}>
      {children}
    </div>
  );
}
