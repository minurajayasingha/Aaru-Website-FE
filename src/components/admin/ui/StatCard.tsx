import { Card } from "./Card";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-brand-forest-400">{label}</span>
      <span className="text-2xl font-semibold text-brand-forest-900">{value}</span>
      {hint && <span className="text-xs text-brand-forest-400">{hint}</span>}
    </Card>
  );
}
