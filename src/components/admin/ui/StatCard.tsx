import { cn } from "@/lib/cn";
import { Card } from "./Card";

type StatTrend = {
  direction: "up" | "down";
  value: string;
};

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: (props: { className?: string }) => React.ReactElement;
  trend?: StatTrend;
};

export function StatCard({ label, value, hint, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-forest-400">{label}</span>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-forest-50 text-brand-forest-600">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-brand-forest-900">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.direction === "up" ? "text-brand-forest-600" : "text-red-500"
            )}
          >
            {trend.direction === "up" ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      {hint && !trend && <span className="text-xs text-brand-forest-400">{hint}</span>}
    </Card>
  );
}
