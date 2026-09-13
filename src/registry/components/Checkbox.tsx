import React from 'react';
import { Check } from 'lucide-react';

export interface NeumorphicCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const NeumorphicCheckbox: React.FC<NeumorphicCheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
}) => {
  const boxSizes = {
    sm: 'w-4 h-4 rounded-[5px]',
    md: 'w-5 h-5 rounded-neo-badge',
    lg: 'w-6 h-6 rounded-neo-control',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <label
      className={`inline-flex items-start gap-3 select-none text-left ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) onChange(!checked);
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
        className={`${boxSizes} flex items-center justify-center border border-neo-border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
          checked
            ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-secondary'
            : 'shadow-neo-inset-sm bg-neo-surface text-transparent'
        }`}
      >
        {checked && (
          <Check className={`${iconSizes} stroke-[3] text-neo-secondary drop-shadow-[0_1px_2px_rgba(45,76,200,0.4)]`} />
        )}
      </div>
      {(label || description) && (
        <div className="space-y-0.5 pt-0.5">
          {label && <span className="block text-sm font-semibold text-neo-primary leading-none">{label}</span>}
          {description && <span className="block text-xs text-neo-primary/60">{description}</span>}
        </div>
      )}
    </label>
  );
};
