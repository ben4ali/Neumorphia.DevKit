import React from 'react';

export interface NeumorphicDividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const NeumorphicDivider: React.FC<NeumorphicDividerProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`inline-flex items-center justify-center self-stretch mx-2 ${className}`}>
        <div className="w-[2px] h-full nms-divider-v" />
      </div>
    );
  }

  if (label) {
    return (
      <div className={`relative flex items-center justify-center w-full my-4 ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full nms-divider-h" />
        </div>
        <div className="relative px-3 py-1 rounded-neo-pill shadow-neo-raised-sm bg-neo-surface border border-neo-border text-xs font-semibold text-neo-primary/70">
          {label}
        </div>
      </div>
    );
  }

  return <div className={`w-full my-4 nms-divider-h ${className}`} />;
};
