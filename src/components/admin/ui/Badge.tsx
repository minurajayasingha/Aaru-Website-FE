import { cn } from "@/lib/cn";

export type AdminBadgeStatus = "new" | "in-progress" | "closed";

type BadgeProps = {
  status: AdminBadgeStatus;
};

export const statusLabels: Record<AdminBadgeStatus, string> = {
  new: "New",
  "in-progress": "In progress",
  closed: "Closed",
};

export const statusClasses: Record<AdminBadgeStatus, string> = {
  new: "bg-brand-gold text-brand-forest-900",
  "in-progress": "bg-brand-forest-600 text-white",
  closed: "bg-brand-forest-100 text-brand-forest-600 border border-brand-forest-200",
};

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        statusClasses[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
