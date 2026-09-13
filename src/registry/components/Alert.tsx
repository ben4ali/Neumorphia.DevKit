import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';

export interface NeumorphicAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export const NeumorphicAlert: React.FC<NeumorphicAlertProps> = ({
  variant = 'info',
  title,
  description,
  onClose,
  className = '',
}) => {
  const config = {
    info: {
      icon: <Info className="w-4 h-4 text-neo-info" />,
      accentBg: 'bg-neo-info',
    },
    success: {
      icon: <CheckCircle2 className="w-4 h-4 text-neo-success" />,
      accentBg: 'bg-neo-success',
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4 text-neo-warning" />,
      accentBg: 'bg-neo-warning',
    },
    danger: {
      icon: <AlertOctagon className="w-4 h-4 text-neo-danger" />,
      accentBg: 'bg-neo-danger',
    },
  }[variant];

  return (
    <div
      role="alert"
      className={`w-full rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border flex items-stretch overflow-hidden text-left transition-all ${className}`}
    >
      {/* Crisp, Perfectly Straight Vertical Accent Bar */}
      <div className={`w-1.5 flex-shrink-0 ${config.accentBg}`} />

      <div className="p-4 flex items-start gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1 space-y-0.5 pt-0.5 min-w-0">
          <h4 className="text-xs font-bold text-neo-primary">{title}</h4>
          {description && (
            <p className="text-xs text-neo-primary/70 leading-relaxed break-words">{description}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-neo-badge shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-neo-primary/60 hover:text-neo-primary transition-all border border-neo-border flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
