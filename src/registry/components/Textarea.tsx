import React from 'react';

export interface NeumorphicTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const NeumorphicTextarea = React.forwardRef<HTMLTextAreaElement, NeumorphicTextareaProps>(
  ({ label, helperText, error, className = '', id, rows = 3, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-neo-primary/80 px-1 select-none">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={`w-full bg-neo-surface text-neo-input placeholder:text-neo-primary/40 shadow-neo-inset-sm rounded-neo-control px-3.5 py-2.5 text-base font-light border border-neo-border transition-all duration-300 outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus resize-y ${
            error ? 'border-neo-danger shadow-neo-delete-inset text-neo-danger' : ''
          } ${className}`}
          {...props}
        />
        {(helperText || error) && (
          <p className={`text-xs px-1 ${error ? 'text-neo-danger font-medium' : 'text-neo-primary/60'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
NeumorphicTextarea.displayName = 'NeumorphicTextarea';
