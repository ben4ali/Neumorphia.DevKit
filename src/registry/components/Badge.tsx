import React from 'react';

export type NeumorphicBadgeColor = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent';
export type NeumorphicBadgeVariant = 'recessed' | 'wash';

export interface NeumorphicBadgeProps {
  color?: NeumorphicBadgeColor;
  variant?: NeumorphicBadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  pill?: boolean;
}

export const NeumorphicBadge: React.FC<NeumorphicBadgeProps> = ({
  color = 'info',
  variant = 'recessed',
  children,
  icon,
  className = '',
  pill = true,
}) => {
  const colorTextMap = {
    info: 'text-neo-info',
    success: 'text-neo-success',
    warning: 'text-neo-warning',
    danger: 'text-neo-danger',
    neutral: 'text-neo-neutral',
    accent: 'text-neo-accent',
  }[color];

  const colorWashMap = {
    info: 'bg-neo-info/[0.07]',
    success: 'bg-neo-success/[0.07]',
    warning: 'bg-neo-warning/[0.07]',
    danger: 'bg-neo-danger/[0.07]',
    neutral: 'bg-neo-neutral/[0.07]',
    accent: 'bg-neo-accent/[0.07]',
  }[color];

  const variantClasses = {
    recessed: 'shadow-neo-inset-sm bg-neo-surface border border-neo-border',
    wash: `shadow-neo-inset-sm ${colorWashMap} border border-neo-border`,
  }[variant];

  const radiusClasses = pill ? 'rounded-neo-pill px-3 py-1' : 'rounded-neo-badge px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-wide select-none transition-all ${colorTextMap} ${variantClasses} ${radiusClasses} ${className}`}
    >
      {icon ? (
        <span className="w-3.5 h-3.5 flex items-center justify-center opacity-85">{icon}</span>
      ) : (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shadow-[0_0_2px_currentColor] flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="leading-none">{children}</span>
    </span>
  );
};
