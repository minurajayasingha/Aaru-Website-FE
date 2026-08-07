"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cream";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  target?: "_blank";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const baseClasses =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-button font-body font-thin tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-forest-900 text-white/90 active:bg-brand-gold-light",
  secondary: "bg-white text-brand-forest-900 border border-brand-forest-700",
  ghost: "bg-transparent text-brand-forest-900",
  cream: "bg-brand-gold text-white",
};

const fillClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-gold",
  secondary: "bg-brand-cream-dark",
  ghost: "bg-brand-forest-50",
  cream: "bg-brand-cream-dark",
};

function handleFillOrigin(event: React.MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  event.currentTarget.style.setProperty("--fill-x", `${x}%`);
  event.currentTarget.style.setProperty("--fill-y", `${y}%`);
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-para-xs px-6 py-3",
  md: "text-para-sm px-12 py-3",
  lg: "text-para-md px-16 py-4",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  target,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  const fill = (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 scale-0 rounded-button transition-transform duration-500 ease-out group-hover:scale-100",
        fillClasses[variant],
      )}
      style={{ transformOrigin: "var(--fill-x, 50%) var(--fill-y, 50%)" }}
    />
  );
  const label = <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={cn(classes, disabled && "opacity-50 pointer-events-none")}
        aria-disabled={disabled}
        onMouseEnter={handleFillOrigin}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.();
        }}
      >
        {fill}
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} onMouseEnter={handleFillOrigin}>
      {fill}
      {label}
    </button>
  );
}
