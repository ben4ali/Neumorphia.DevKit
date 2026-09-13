import React from 'react';
import { PropControl } from '../../types/registry';
import { Sliders, RotateCcw } from 'lucide-react';

interface DynamicControlsProps {
  controls: PropControl[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onReset: () => void;
}

export const DynamicControls: React.FC<DynamicControlsProps> = ({
  controls,
  values,
  onChange,
  onReset,
}) => {
  if (!controls || controls.length === 0) return null;

  return (
    <div className="p-4 bg-neo-surface border-t border-neo-border/60 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-neo-secondary uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Props:</span>
        </div>

        {controls.map((control) => (
          <div key={control.name} className="flex items-center gap-2 text-xs">
            <span className="text-neo-primary/70 font-semibold">{control.label}:</span>

            {control.type === 'select' && (
              <select
                value={values[control.name] ?? control.defaultValue}
                onChange={(e) => onChange(control.name, e.target.value)}
                className="bg-neo-surface text-neo-input shadow-neo-inset-sm rounded-neo-control px-2.5 py-1 text-xs border border-neo-border outline-none focus:border-neo-focus"
              >
                {control.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {control.type === 'boolean' && (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={values[control.name] ?? control.defaultValue}
                  onChange={(e) => onChange(control.name, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-neo-surface shadow-neo-inset-sm peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neo-secondary after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-neo-well/60 border border-neo-border"></div>
              </label>
            )}

            {control.type === 'text' && (
              <input
                type="text"
                value={values[control.name] ?? control.defaultValue}
                onChange={(e) => onChange(control.name, e.target.value)}
                className="bg-neo-surface text-neo-input shadow-neo-inset-sm rounded-neo-control px-2.5 py-1 text-xs border border-neo-border outline-none focus:border-neo-focus w-32"
              />
            )}

            {control.type === 'number' && (
              <input
                type="number"
                min={control.min}
                max={control.max}
                step={control.step}
                value={values[control.name] ?? control.defaultValue}
                onChange={(e) => onChange(control.name, Number(e.target.value))}
                className="bg-neo-surface text-neo-input shadow-neo-inset-sm rounded-neo-control px-2.5 py-1 text-xs border border-neo-border outline-none focus:border-neo-focus w-20 font-mono"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-neo-badge shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary/70 hover:text-neo-primary transition-all border border-neo-border"
        title="Reset to default props"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset</span>
      </button>
    </div>
  );
};
