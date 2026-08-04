type AdminInputProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

export function Input({ label, id, name, type = "text", value, onChange, placeholder, required }: AdminInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-brand-forest-900">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-brand-forest-200 bg-white px-3 py-2.5 text-sm text-brand-forest-900 placeholder:text-brand-forest-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
      />
    </div>
  );
}
