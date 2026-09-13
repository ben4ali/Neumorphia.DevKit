import React from 'react';

export interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const NeumorphicInput = React.forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ label, helperText, error, icon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-neo-primary/80 px-1 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && <span className="absolute left-3.5 text-neo-primary/50 pointer-events-none">{icon}</span>}
          <input
            id={inputId}
            ref={ref}
            className={`w-full h-[44px] bg-neo-surface text-neo-input placeholder:text-neo-primary/40 shadow-neo-inset-sm rounded-neo-control px-3.5 py-2.5 text-base font-light border border-neo-border transition-all duration-300 outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus ${
              icon ? 'pl-10' : ''
            } ${error ? 'border-neo-danger shadow-neo-delete-inset text-neo-danger' : ''} ${className}`}
            {...props}
          />
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
NeumorphicInput.displayName = 'NeumorphicInput';
