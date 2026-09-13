import React from 'react';

export interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'raised' | 'inset' | 'danger' | 'pill' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children: React.ReactNode;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  variant = 'raised',
  size = 'md',
  active = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-neo-control gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-neo-control gap-2 tracking-wide font-medium',
    lg: 'px-7 py-3.5 text-base rounded-neo-card gap-2.5 tracking-wide font-semibold',
  }[size];

  const variantClasses = {
    raised: active
      ? 'shadow-neo-inset-sm text-neo-secondary border border-neo-border'
      : 'shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm active:translate-y-[1px] border border-neo-border hover:border-neo-border',
    inset: 'shadow-neo-inset-sm bg-neo-well/40 text-neo-primary hover:shadow-neo-hover-inset hover:bg-neo-well border border-neo-border',
    danger: active
      ? 'shadow-neo-delete-inset bg-neo-delete text-neo-danger border border-neo-delete'
      : 'shadow-neo-delete bg-neo-delete text-neo-danger hover:shadow-neo-delete-inset active:shadow-neo-delete-inset active:translate-y-[1px] border border-neo-border',
    pill: active
      ? 'shadow-neo-inset-sm rounded-neo-pill text-neo-secondary border border-neo-border'
      : 'shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm rounded-neo-pill border border-neo-border active:translate-y-[1px]',
    icon: active
      ? 'p-2.5 rounded-neo-control shadow-neo-inset-sm text-neo-secondary border border-neo-border'
      : 'p-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm border border-neo-border active:translate-y-[1px]',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center bg-neo-surface text-neo-primary select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
