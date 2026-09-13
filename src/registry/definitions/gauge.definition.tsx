import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicGauge } from '../components/Gauge';

export const gaugeDefinition: RegistryComponent = {
  id: 'gauge',
  title: 'Circular Radial Gauge',
  category: 'Feedback & Progress',
  description:
    'Circular radial gauge with an outer recessed ring framing an SVG progress arc, glowing indicator tip, and centered numeric readout.',
  tokens: [
    {
      name: 'Gauge Frame Ring',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'Deep concave circular frame enclosing the meter',
    },
    {
      name: 'Center Core Island',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Elevated central island housing the numeric metric',
    },
  ],
  variants: [
    {
      id: 'gauge-metrics',
      name: 'Performance Gauges',
      description: 'Circular radial meters with real-time arc progression.',
      controls: [
        { name: 'value', type: 'number', label: 'Value', defaultValue: 78, min: 0, max: 100 },
      ],
      previewComponent: ({ props }) => {
        return (
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <NeumorphicGauge
              value={props.value || 78}
              label="CPU Core Load"
              variant="info"
              unit="%"
            />
            <NeumorphicGauge
              value={92}
              label="GPU Memory"
              variant="warning"
              unit="%"
            />
            <NeumorphicGauge
              value={44}
              label="Network I/O"
              variant="success"
              unit="MB/s"
            />
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicGauge } from '@/components/Gauge';

export function GaugeDemo() {
  return (
    <NeumorphicGauge
      value={78}
      label="CPU Core Load"
      variant="info"
      unit="%"
    />
  );
}`,
        css: `/* Neumorphic Circular Gauge Frame */
.nms-gauge-frame {
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
