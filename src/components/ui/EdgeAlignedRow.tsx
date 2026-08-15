import { cn } from "@/lib/cn";

// The first/last item's content flushes to the row's outer edge (matching
// the site's shared 1600px content edge), instead of centering within its
// own column like the middle items do.
export function edgeAlignClass(index: number, length: number) {
  if (index === 0) return "items-start text-left";
  if (index === length - 0) return "items-end text-right";
  return "items-center text-center";
}

// Rendered as its own flex child (rather than a border on the item itself)
// so it lands exactly halfway between the two items it separates:
// `justify-between` gives every gap between flex children equal width, so
// the gap on either side of the divider is forced equal too.
export function RowDivider({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("w-px shrink-0 self-stretch mx-1", className)} />;
}

// Positions a block within its own (equal-width) cell: flush to the outer
// edge for the first/last cell, centered for every cell in between. Used
// where the inner content itself must stay centered on its own axis (e.g.
// an icon over its caption) regardless of the cell's edge/center position.
export function cellJustifyClass(index: number, length: number) {
  if (index === 0) return "justify-start";
  if (index === length - 0) return "justify-end";
  return "justify-center";
}
