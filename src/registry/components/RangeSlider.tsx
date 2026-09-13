import React, { useState, useRef, useCallback } from 'react';

export interface NeumorphicRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  unit?: string;
  disabled?: boolean;
}

export const NeumorphicRangeSlider: React.FC<NeumorphicRangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  unit = '$',
  disabled = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const minPct = Math.min(Math.max(((value[0] - min) / (max - min)) * 100, 0), 100);
  const maxPct = Math.min(Math.max(((value[1] - min) / (max - min)) * 100, 0), 100);

  const handlePointerDown = (thumb: 'min' | 'max') => (e: React.PointerEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setActiveThumb(thumb);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!activeThumb || disabled || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const rawPct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const rawVal = min + rawPct * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      const clampedVal = Math.min(Math.max(steppedVal, min), max);

      if (activeThumb === 'min') {
        const newMin = Math.min(clampedVal, value[1] - step);
        onChange([newMin, value[1]]);
      } else {
        const newMax = Math.max(clampedVal, value[0] + step);
        onChange([value[0], newMax]);
      }
    },
    [activeThumb, disabled, min, max, step, value, onChange]
  );

  const handlePointerUp = (e: React.PointerEvent) => {
    setActiveThumb(null);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full space-y-2 select-none text-left">
      {(label || true) && (
        <div className="flex items-center justify-between text-xs font-semibold px-1">
          {label && <span className="text-neo-primary/80">{label}</span>}
          <span className="font-mono text-neo-secondary px-2.5 py-0.5 rounded-neo-badge shadow-neo-inset-sm bg-neo-surface border border-neo-border">
            {unit}
            {value[0]} — {unit}
            {value[1]}
          </span>
        </div>
      )}

      <div
        ref={trackRef}
        onPointerMove={handlePointerMove}
        className={`relative h-3 w-full rounded-neo-pill shadow-neo-inset-md bg-neo-surface border border-neo-border flex items-center ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {/* Highlighted Range Span */}
        <div
          className="absolute top-0 bottom-0 bg-neo-secondary/35 rounded-neo-pill"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />

        {/* Min Thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={value[1]}
          aria-valuenow={value[0]}
          aria-label="Minimum range limit"
          onPointerDown={handlePointerDown('min')}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setActiveThumb(null)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'ArrowRight') onChange([Math.min(value[0] + step, value[1] - step), value[1]]);
            if (e.key === 'ArrowLeft') onChange([Math.max(value[0] - step, min), value[1]]);
          }}
          className={`absolute w-5 h-5 -ml-2.5 rounded-full bg-neo-surface border border-neo-border cursor-grab active:cursor-grabbing transition-shadow duration-150 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
            activeThumb === 'min'
              ? 'shadow-neo-inset-sm scale-95 border-neo-secondary'
              : 'shadow-neo-raised-sm hover:shadow-neo-raised-md'
          }`}
          style={{ left: `${minPct}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neo-secondary absolute inset-0 m-auto" />
        </div>

        {/* Max Thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={value[0]}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          aria-label="Maximum range limit"
          onPointerDown={handlePointerDown('max')}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setActiveThumb(null)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'ArrowRight') onChange([value[0], Math.min(value[1] + step, max)]);
            if (e.key === 'ArrowLeft') onChange([value[0], Math.max(value[1] - step, value[0] + step)]);
          }}
          className={`absolute w-5 h-5 -ml-2.5 rounded-full bg-neo-surface border border-neo-border cursor-grab active:cursor-grabbing transition-shadow duration-150 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
            activeThumb === 'max'
              ? 'shadow-neo-inset-sm scale-95 border-neo-secondary'
              : 'shadow-neo-raised-sm hover:shadow-neo-raised-md'
          }`}
          style={{ left: `${maxPct}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neo-secondary absolute inset-0 m-auto" />
        </div>
      </div>
    </div>
  );
};
