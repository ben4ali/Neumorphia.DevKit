import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface NeumorphicStatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const NeumorphicStatCard: React.FC<NeumorphicStatCardProps> = ({
  title,
  value,
  change,
  subtitle,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`p-5 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4 text-left transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-neo-primary/60">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border text-neo-secondary">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-neo-primary font-mono tracking-tight">
          {value}
        </div>
        {subtitle && <p className="text-[11px] text-neo-primary/60">{subtitle}</p>}
      </div>

      {change && (
        <div className="pt-2 border-t border-neo-border/40 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-neo-pill shadow-neo-inset-sm border border-neo-border text-xs font-semibold ${
              change.positive
                ? 'text-neo-success bg-neo-success/[0.07]'
                : 'text-neo-danger bg-neo-danger/[0.07]'
            }`}
          >
            {change.positive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{change.value}</span>
          </div>
          <span className="text-[10px] text-neo-primary/50 font-medium">vs. previous period</span>
        </div>
      )}
    </div>
  );
};
