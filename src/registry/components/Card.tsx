import React from 'react';

export interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'well' | 'deepWell';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  variant = 'raised',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...props
}) => {
  const pClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  const variantClasses = {
    raised: `bg-neo-surface shadow-neo-raised-md rounded-neo-card border border-neo-border ${
      hoverable ? 'hover:shadow-neo-raised-lg transition-shadow duration-200' : ''
    }`,
    well: 'bg-neo-surface shadow-neo-inset-sm rounded-neo-card border border-neo-border',
    deepWell: 'bg-neo-surface shadow-neo-inset-md rounded-neo-card-lg border border-neo-border',
  }[variant];

  return (
    <div className={`transition-all duration-200 text-left ${variantClasses} ${pClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
