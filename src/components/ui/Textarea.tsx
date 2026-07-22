import { cn } from "@/lib/cn";

type TextareaProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
};

export function Textarea({ label, id, name, value, onChange, rows = 5, error }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm text-brand-forest-900">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(
          "rounded-input border bg-brand-cream-dark/40 px-4 py-3 font-body text-brand-forest-900 focus:outline-none focus:ring-2 focus:ring-brand-gold",
          error ? "border-red-500" : "border-brand-forest-200"
        )}
      />
      {error && (
        <span className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
