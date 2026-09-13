import React from 'react';

export interface NeumorphicSelectOption {
  label: string;
  value: string | number;
}

export interface NeumorphicSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: NeumorphicSelectOption[];
  helperText?: string;
  error?: string;
}

export const NeumorphicSelect = React.forwardRef<HTMLSelectElement, NeumorphicSelectProps>(
  ({ label, options, helperText, error, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-neo-primary/80 px-1 select-none">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full h-[44px] appearance-none bg-neo-surface text-neo-input shadow-neo-inset-sm rounded-neo-control pl-3.5 pr-10 py-2 text-base font-light border border-neo-border transition-all duration-300 outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus cursor-pointer ${
              error ? 'border-neo-danger shadow-neo-delete-inset text-neo-danger' : ''
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-neo-base text-neo-primary">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neo-primary/60">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {(helperText || error) && (
          <p className={`text-xs px-1 ${error ? 'text-neo-danger font-medium' : 'text-neo-primary/60'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
NeumorphicSelect.displayName = 'NeumorphicSelect';
