import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface NeumorphicSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  unit?: string;
}

export const NeumorphicSlider: React.FC<NeumorphicSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  unit = '%',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const updateValueFromPointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const rawPct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const rawVal = min + rawPct * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      const clampedVal = Math.min(Math.max(steppedVal, min), max);
      onChange(clampedVal);
    },
    [min, max, step, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValueFromPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && !disabled) {
      updateValueFromPointer(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full space-y-2 select-none text-left">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold px-1">
          {label && <span className="text-neo-primary/80">{label}</span>}
          {showValue && (
            <span className="font-mono text-neo-secondary px-2 py-0.5 rounded-neo-badge shadow-neo-inset-sm bg-neo-well/30">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsDragging(false)}
        className={`relative h-3 w-full rounded-neo-pill shadow-neo-inset-md bg-neo-surface border border-neo-border cursor-pointer flex items-center ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {/* Filled Track Fill */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-neo-secondary/30 rounded-neo-pill"
          style={{ width: `${percentage}%` }}
        />

        {/* Tactile Extruded Thumb */}
        <div
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              onChange(Math.min(value + step, max));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              onChange(Math.max(value - step, min));
            }
          }}
          className={`absolute w-5 h-5 -ml-2.5 rounded-full bg-neo-surface border border-neo-border transition-shadow duration-150 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
            isDragging
              ? 'shadow-neo-inset-sm scale-95 border-neo-secondary'
              : 'shadow-neo-raised-sm hover:shadow-neo-raised-md'
          }`}
          style={{ left: `${percentage}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neo-secondary absolute inset-0 m-auto" />
        </div>
      </div>
    </div>
  );
};
