import React from 'react';

export interface NeumorphicGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  unit?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

export const NeumorphicGauge: React.FC<NeumorphicGaugeProps> = ({
  value,
  max = 100,
  size = 140,
  strokeWidth = 10,
  label,
  unit = '%',
  variant = 'info',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const strokeColorMap = {
    info: '#3d5a80',
    success: '#2d6a4f',
    warning: '#8c6227',
    danger: '#9e3b47',
  }[variant];

  const colorClasses = {
    info: 'stroke-neo-info text-neo-info',
    success: 'stroke-neo-success text-neo-success',
    warning: 'stroke-neo-warning text-neo-warning',
    danger: 'stroke-neo-danger text-neo-danger',
  }[variant];

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Outer Recessed Ring Frame */}
      <div
        style={{ width: size + 24, height: size + 24 }}
        className="rounded-full shadow-neo-inset-md bg-neo-surface border border-neo-border/40 dark:border-white/[0.03] flex items-center justify-center p-3"
      >
        <div
          style={{ width: size, height: size }}
          className="relative rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border/30 dark:border-white/[0.03] flex items-center justify-center"
        >
          <svg
            width={size}
            height={size}
            className="transform -rotate-90 origin-center overflow-visible"
          >
            {/* Deep Contrast Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-black/[0.08] dark:text-black/60"
              fill="transparent"
            />
            {/* Active High-Contrast Progress Arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`${colorClasses} transition-all duration-700 ease-out`}
              fill="transparent"
            />
          </svg>

          {/* Center Value and Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black font-mono text-neo-primary tracking-tight">
              {Math.round(value)}
              <span className="text-xs font-semibold text-neo-primary/60 ml-0.5">{unit}</span>
            </span>
            {label && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-neo-primary/60 mt-0.5">
                {label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
