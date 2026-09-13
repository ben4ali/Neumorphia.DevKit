import React from 'react';

export interface NeumorphicSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const NeumorphicSkeleton: React.FC<NeumorphicSkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
}) => {
  const variantStyles = {
    text: 'rounded-neo-badge h-3.5 w-full',
    rectangular: 'rounded-neo-card h-24 w-full',
    circular: 'rounded-full w-12 h-12',
  }[variant];

  return (
    <div
      style={{ width, height }}
      className={`relative overflow-hidden shadow-neo-inset-sm bg-neo-well/40 border border-neo-border/50 ${variantStyles} ${className}`}
    >
      {/* Soft Sweeping Shimmer Reflection */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
    </div>
  );
};
