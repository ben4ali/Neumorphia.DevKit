import React from 'react';

export interface NeumorphicProgressProps {
  value: number;
  max?: number;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'accent';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NeumorphicProgress: React.FC<NeumorphicProgressProps> = ({
  value,
  max = 100,
  variant = 'info',
  showLabel = true,
  label,
  size = 'md',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  }[size];

  const colorClasses = {
    info: 'bg-neo-info text-white',
    success: 'bg-neo-success text-white',
    warning: 'bg-neo-warning text-white',
    danger: 'bg-neo-danger text-white',
    accent: 'bg-neo-accent text-white',
  }[variant];

  return (
    <div className="w-full space-y-2 text-left select-none">
      {(label || showLabel) && (
        <div className="flex items-center justify-between text-xs font-semibold px-1">
          {label && <span className="text-neo-primary/80">{label}</span>}
          {showLabel && (
            <span className="font-mono text-neo-primary/70 px-2 py-0.5 rounded-neo-badge shadow-neo-inset-sm bg-neo-surface border border-neo-border">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`w-full ${heightClasses} rounded-neo-pill shadow-neo-inset-md bg-neo-surface border border-neo-border overflow-hidden p-0.5 flex items-center`}
      >
        <div
          className={`h-full rounded-neo-pill ${colorClasses} shadow-neo-raised-sm transition-all duration-500 relative flex items-center justify-end`}
          style={{ width: `${percentage}%` }}
        >
          {/* Glowing Beacon on leading edge */}
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] mr-0.5" />
        </div>
      </div>
    </div>
  );
};
