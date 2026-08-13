"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/contact/icons";

type SelectOption = { value: string; label: string };

type SelectProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  icon?: ReactNode;
};

export function Select({ label, id, name, value, onChange, options, error, icon }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function selectOption(optionValue: string) {
    onChange({ target: { name, value: optionValue } } as React.ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = e.key === "ArrowDown" ? 1 : -1;
      const nextIndex = Math.min(Math.max(selectedIndex + step, 0), options.length - 1);
      selectOption(options[nextIndex].value);
    }
  }

  return (
    <div className="flex flex-col gap-2" ref={rootRef}>
      <label htmlFor={id} className="font-body text-para-xxs text-black pl-4 font-light">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest-500">{icon}</span>
        )}
        <button
          type="button"
          id={id}
          onClick={() => setOpen((isOpen) => !isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full truncate rounded-input border bg-brand-cream-dark/30 py-2.5 pr-11 text-left font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70",
            icon ? "pl-11" : "pl-4",
            error ? "border-red-500" : "border-brand-forest-200"
          )}
        >
          {options[selectedIndex]?.label}
        </button>
        <ChevronDownIcon
          className={cn(
            "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-forest-500 transition-transform",
            open && "rotate-180"
          )}
        />
        {open && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-input border border-brand-forest-200 bg-white py-1.5 shadow-card"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => selectOption(option.value)}
                className={cn(
                  "cursor-pointer px-4 py-2 font-body text-sm font-thin text-black transition-colors hover:bg-brand-forest-50",
                  option.value === value && "bg-brand-forest-50 font-normal"
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
