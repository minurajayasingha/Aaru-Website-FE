import { cn } from "@/lib/cn";

type SelectOption = { value: string; label: string };

type SelectProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
};

export function Select({ label, id, name, value, onChange, options, error }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm text-brand-forest-900">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "rounded-input border bg-brand-cream-dark/40 px-4 py-3 font-body text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold",
          error ? "border-red-500" : "border-brand-forest-200"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
