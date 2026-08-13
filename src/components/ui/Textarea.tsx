import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
  maxLength?: number;
  icon?: ReactNode;
};

export function Textarea({ label, id, name, value, onChange, rows = 5, error, maxLength, icon }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-body text-para-xxs text-black pl-4 font-light">
          {label}
        </label>
        {maxLength !== undefined && (
          <span className="font-body text-para-xxs font-light text-gray-400">
            {value.length}/{maxLength} characters
          </span>
        )}
      </div>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-4 top-3 text-brand-forest-500">{icon}</span>}
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
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
