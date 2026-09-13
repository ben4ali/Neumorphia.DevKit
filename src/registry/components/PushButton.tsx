import React, { useState } from 'react';

export interface NeumorphicPushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  sublabel?: string;
  shape?: 'pill' | 'square' | 'circle';
  variant?: 'primary' | 'danger' | 'success';
}

export const NeumorphicPushButton: React.FC<NeumorphicPushButtonProps> = ({
  label = 'POWER ACTUATOR',
  sublabel = 'PRESS & HOLD',
  shape = 'pill',
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const ledColors = {
    primary: 'bg-neo-info shadow-[0_0_8px_var(--nms-info-color)] text-neo-info',
    danger: 'bg-neo-danger shadow-[0_0_8px_var(--nms-danger-color)] text-neo-danger',
    success: 'bg-neo-success shadow-[0_0_8px_var(--nms-success-color)] text-neo-success',
  }[variant];

  if (shape === 'circle') {
    return (
      <div className="inline-flex items-center justify-center p-3 rounded-full shadow-neo-inset-md bg-neo-surface border border-neo-border select-none">
        <button
          disabled={disabled}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-150 border outline-none select-none ${
            isPressed
              ? 'shadow-neo-inset-sm translate-y-1 bg-neo-well/40 text-neo-secondary border-neo-border'
              : 'shadow-neo-raised-md hover:shadow-neo-raised-lg bg-neo-surface text-neo-primary border-neo-border'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
          {...props}
        >
          <span
            className={`w-2 h-2 rounded-full ${ledColors} transition-transform duration-150 ${
              isPressed ? 'scale-125' : 'scale-100 opacity-80'
            }`}
          />
          <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center justify-center p-2.5 rounded-2xl shadow-neo-inset-md bg-neo-surface border border-neo-border select-none">
      <button
        disabled={disabled}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className={`relative px-8 py-4 rounded-xl flex items-center justify-center gap-3.5 transition-all duration-150 border outline-none select-none min-w-[200px] ${
          isPressed
            ? 'shadow-neo-inset-sm translate-y-1 bg-neo-well/40 border-neo-border'
            : 'shadow-neo-raised-md hover:shadow-neo-raised-lg bg-neo-surface border-neo-border'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        {...props}
      >
        {/* Soft Glowing LED */}
        <span
          className={`w-2.5 h-2.5 rounded-full ${ledColors} transition-transform duration-150 ${
            isPressed ? 'scale-125' : 'scale-100 opacity-80'
          }`}
        />

        <div className="text-left space-y-0.5">
          <div className="text-xs font-black uppercase tracking-wider text-neo-primary">{label}</div>
          {sublabel && (
            <div className="text-[10px] font-mono text-neo-primary/50 tracking-tight">{sublabel}</div>
          )}
        </div>
      </button>
    </div>
  );
};
