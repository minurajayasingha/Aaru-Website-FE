import { cn } from "@/lib/cn";

export type TabBarOption = {
  label: string;
  value: string;
};

type TabBarProps = {
  options: TabBarOption[];
  value: string;
  onChange: (value: string) => void;
};

export function TabBar({ options, value, onChange }: TabBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            value === option.value
              ? "bg-brand-forest-900 text-white"
              : "border border-brand-forest-100 bg-white text-brand-forest-700 hover:bg-brand-forest-50"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
