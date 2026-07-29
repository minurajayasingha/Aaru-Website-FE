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
  "inline-flex items-center justify-center rounded-button font-body font-thin tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-forest-900 text-white/90 hover:bg-brand-gold active:bg-brand-gold-light",
  secondary: "bg-white text-brand-forest-900 border border-brand-forest-700 hover:bg-brand-cream-dark",
  ghost: "bg-transparent text-brand-forest-900 hover:bg-brand-forest-50",
  cream: "bg-brand-gold text-white hover:bg-brand-cream-dark",
};

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

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={cn(classes, disabled && "opacity-50 pointer-events-none")}
        aria-disabled={disabled}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.();
        }}
      >
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
