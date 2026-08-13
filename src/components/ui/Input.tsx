import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  required?: boolean;
  icon?: ReactNode;
};

export function Input({ label, id, name, value, onChange, type = "text", error, required, icon }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-para-xxs text-black pl-4 font-light">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest-500">{icon}</span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full rounded-input border bg-brand-cream-dark/30 py-2.5 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70",
            icon ? "pl-11 pr-4" : "px-4",
            error ? "border-red-500" : "border-brand-forest-200"
          )}
        />
      </div>
      {error && (
        <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
