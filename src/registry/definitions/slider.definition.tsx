import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicSlider } from '../components/Slider';

export const sliderDefinition: RegistryComponent = {
  id: 'slider',
  title: 'Range Slider',
  category: 'Forms & Selection',
  description:
    'Continuous smooth draggable slider with deep recessed groove and tactile extruded knob.',
  tokens: [
    {
      name: 'Slider Groove',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'Deep concave trench with Level 2 Inset shadows',
    },
    {
      name: 'Tactile Thumb',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Circular extruded knob with active depression on drag',
    },
  ],
  variants: [
    {
      id: 'slider-standard',
      name: 'Interactive Slider',
      description: 'Adjust range with real-time value output.',
      controls: [
        { name: 'min', type: 'number', label: 'Min', defaultValue: 0 },
        { name: 'max', type: 'number', label: 'Max', defaultValue: 100 },
        { name: 'step', type: 'number', label: 'Step', defaultValue: 1 },
      ],
      previewComponent: ({ props }) => {
        const [val, setVal] = useState(65);
        return (
          <div className="w-full max-w-md">
            <NeumorphicSlider
              value={val}
              onChange={setVal}
              min={props.min}
              max={props.max}
              step={props.step}
              label="Audio Buffer Latency"
              unit="ms"
            />
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicSlider } from '@/components/Slider';

export function SliderDemo() {
  const [latency, setLatency] = useState(65);

  return (
    <NeumorphicSlider
      value={latency}
      onChange={setLatency}
      min={0}
      max={100}
      label="Audio Buffer Latency"
      unit="ms"
    />
  );
}`,
        css: `/* Neumorphic Range Slider */
.nms-slider-track {
  height: 0.75rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  position: relative;
}`,
      },
    },
  ],
};
