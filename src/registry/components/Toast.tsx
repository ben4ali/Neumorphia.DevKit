import React from 'react';
import { X } from 'lucide-react';

export interface NeumorphicToastProps {
  title: string;
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
  className?: string;
}

export const NeumorphicToast: React.FC<NeumorphicToastProps> = ({
  title,
  message,
  variant = 'info',
  onClose,
  className = '',
}) => {
  const dotColor = {
    info: 'bg-neo-info shadow-[0_0_4px_var(--nms-info-color)]',
    success: 'bg-neo-success shadow-[0_0_4px_var(--nms-success-color)]',
    warning: 'bg-neo-warning shadow-[0_0_4px_var(--nms-warning-color)]',
    danger: 'bg-neo-danger shadow-[0_0_4px_var(--nms-danger-color)]',
  }[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3.5 px-4 py-2.5 rounded-neo-pill bg-neo-surface shadow-neo-raised-md border border-neo-border select-none text-left ${className}`}
    >
      {/* Soft Glowing Status Dot */}
      <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />

      {/* Message Copy */}
      <div className="space-y-0.5 pr-2">
        <h5 className="text-xs font-bold text-neo-primary">{title}</h5>
        {message && <p className="text-[11px] text-neo-primary/60">{message}</p>}
      </div>

      {/* Dismiss Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-full shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-neo-primary/60 hover:text-neo-primary border border-neo-border transition-all"
          aria-label="Dismiss toast"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
