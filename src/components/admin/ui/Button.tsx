"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type AdminButtonVariant = "primary" | "secondary" | "ghost";
type AdminButtonSize = "sm" | "md";

type AdminButtonProps = {
  children: React.ReactNode;
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<AdminButtonVariant, string> = {
  primary: "bg-brand-forest-600 text-white hover:bg-brand-forest-700",
  secondary: "bg-white text-brand-forest-900 border border-brand-forest-200 hover:bg-brand-forest-50",
  ghost: "bg-transparent text-brand-forest-700 hover:bg-brand-forest-50",
};

const sizeClasses: Record<AdminButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: AdminButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
