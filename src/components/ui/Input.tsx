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
};

export function Input({ label, id, name, value, onChange, type = "text", error, required }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-body-xs text-black pl-4 font-light">
        {label}
      </label>
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
          "rounded-input border bg-brand-cream-dark/40 px-4 py-2.5 font-body text-sm text-black font-thin focus:outline-none focus:ring-1 focus:ring-black/70",
          error ? "border-red-500" : "border-brand-forest-500"
        )}
      />
      {error && (
        <span id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
