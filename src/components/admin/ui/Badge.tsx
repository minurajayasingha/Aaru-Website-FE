import { cn } from "@/lib/cn";

export type AdminBadgeStatus = "new" | "in-progress" | "closed";

type BadgeProps = {
  status: AdminBadgeStatus;
};

const statusLabels: Record<AdminBadgeStatus, string> = {
  new: "New",
  "in-progress": "In progress",
  closed: "Closed",
};

const statusClasses: Record<AdminBadgeStatus, string> = {
  new: "bg-brand-gold-light/40 text-brand-forest-900",
  "in-progress": "bg-brand-forest-100 text-brand-forest-700",
  closed: "bg-brand-forest-50 text-brand-forest-400",
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", statusClasses[status])}>
      {statusLabels[status]}
    </span>
  );
}
