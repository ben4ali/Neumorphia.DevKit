import React from 'react';

export interface NeumorphicSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const NeumorphicSwitch: React.FC<NeumorphicSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
}) => {
  const trackSizes = {
    sm: 'w-10 h-5',
    md: 'w-14 h-7',
    lg: 'w-18 h-9',
  }[size];

  const thumbSizes = {
    sm: 'w-3.5 h-3.5 top-[3px] left-[3px]',
    md: 'w-5 h-5 top-[4px] left-[4px]',
    lg: 'w-7 h-7 top-[4px] left-[4px]',
  }[size];

  const translateClasses = {
    sm: checked ? 'translate-x-5' : 'translate-x-0',
    md: checked ? 'translate-x-7' : 'translate-x-0',
    lg: checked ? 'translate-x-9' : 'translate-x-0',
  }[size];

  return (
    <label
      className={`inline-flex items-center gap-3 select-none text-left ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) onChange(!checked);
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative ${trackSizes} rounded-neo-pill border border-neo-border transition-all duration-300 ${
          checked ? 'shadow-neo-inset-sm bg-neo-well/50' : 'shadow-neo-inset-sm bg-neo-surface'
        } focus-visible:ring-2 focus-visible:ring-neo-focus outline-none`}
      >
        <div
          className={`absolute ${thumbSizes} rounded-neo-pill transition-all duration-300 flex items-center justify-center ${translateClasses} ${
            checked
              ? 'bg-neo-secondary shadow-neo-raised-sm text-white'
              : 'bg-neo-surface shadow-neo-raised-sm border border-neo-border'
          }`}
        >
          {checked && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </div>
      </div>
      {(label || description) && (
        <div className="space-y-0.5">
          {label && <span className="block text-sm font-semibold text-neo-primary">{label}</span>}
          {description && <span className="block text-xs text-neo-primary/60">{description}</span>}
        </div>
      )}
    </label>
  );
};
