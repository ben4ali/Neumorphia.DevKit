import React from 'react';

export interface NeumorphicRadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface NeumorphicRadioProps {
  value: string;
  onChange: (value: string) => void;
  options: NeumorphicRadioOption[];
  name: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const NeumorphicRadio: React.FC<NeumorphicRadioProps> = ({
  value,
  onChange,
  options,
  disabled = false,
  orientation = 'vertical',
}) => {
  return (
    <div
      role="radiogroup"
      className={`flex ${orientation === 'horizontal' ? 'flex-row gap-6 flex-wrap' : 'flex-col gap-3.5'}`}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`inline-flex items-start gap-3 select-none text-left ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <div
              role="radio"
              aria-checked={isSelected}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (!disabled) onChange(opt.value);
                }
              }}
              onClick={() => !disabled && onChange(opt.value)}
              className={`w-5 h-5 rounded-full flex items-center justify-center border border-neo-border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus shadow-neo-inset-sm bg-neo-surface`}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-neo-secondary shadow-neo-raised-sm animate-scale-in" />
              )}
            </div>
            <div className="space-y-0.5 pt-0.5">
              <span className="block text-sm font-semibold text-neo-primary leading-none">{opt.label}</span>
              {opt.description && <span className="block text-xs text-neo-primary/60">{opt.description}</span>}
            </div>
          </label>
        );
      })}
    </div>
  );
};
