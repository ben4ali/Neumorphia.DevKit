import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicRangeSlider } from '../components/RangeSlider';

export const rangeSliderDefinition: RegistryComponent = {
  id: 'range-slider',
  title: 'Dual-Thumb Range Slider',
  category: 'Forms & Selection',
  description:
    'Continuous recessed groove with two independent tactile knobs and an active highlighted interval span.',
  tokens: [
    {
      name: 'Slider Track',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'Deep concave horizontal channel with Level 2 Inset shadows',
    },
  ],
  variants: [
    {
      id: 'price-filter',
      name: 'Price & Interval Selector',
      description: 'Select minimum and maximum range thresholds.',
      controls: [
        { name: 'min', type: 'number', label: 'Min', defaultValue: 0 },
        { name: 'max', type: 'number', label: 'Max', defaultValue: 500 },
        { name: 'step', type: 'number', label: 'Step', defaultValue: 5 },
      ],
      previewComponent: ({ props }) => {
        const [val, setVal] = useState<[number, number]>([45, 280]);
        return (
          <div className="w-full max-w-md">
            <NeumorphicRangeSlider
              min={props.min}
              max={props.max}
              step={props.step}
              value={val}
              onChange={setVal}
              label="Compute Instance Pricing"
              unit="$"
            />
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicRangeSlider } from '@/components/RangeSlider';

export function RangeDemo() {
  const [range, setRange] = useState<[number, number]>([45, 280]);

  return (
    <NeumorphicRangeSlider
      min={0}
      max={500}
      step={5}
      value={range}
      onChange={setRange}
      label="Compute Instance Pricing"
      unit="$"
    />
  );
}`,
        css: `/* Dual-Thumb Range Slider Track */
.nms-range-track {
  height: 0.75rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
