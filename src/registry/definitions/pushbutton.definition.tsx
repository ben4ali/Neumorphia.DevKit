import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicPushButton } from '../components/PushButton';

export const pushButtonDefinition: RegistryComponent = {
  id: 'push-button',
  title: 'Physical 3D Push Button',
  category: 'Actions',
  description:
    'Our showcase Hero component simulating an authentic 3D mechanical switch with visible physical travel. The convex resting key sits inside a recessed chassis and physically sinks upon actuation.',
  tokens: [
    {
      name: 'Chassis Housing',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'Deep concave mechanical switch enclosure well',
    },
    {
      name: 'Resting Mechanical Key',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'Elevated key cap with physical 3D relief',
    },
    {
      name: 'Depressed Travel State',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm translate-y-1',
      description: 'Downward compression with internal inset well shadow',
    },
  ],
  variants: [
    {
      id: 'push-actuator',
      name: '3D Mechanical Actuator',
      description: 'Click and hold to actuate the mechanical switch.',
      controls: [
        {
          name: 'shape',
          type: 'select',
          label: 'Chassis Shape',
          defaultValue: 'pill',
          options: [
            { label: 'Rectangular Bar', value: 'pill' },
            { label: 'Circular Actuator', value: 'circle' },
          ],
        },
        {
          name: 'variant',
          type: 'select',
          label: 'LED Indicator',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Blue LED)', value: 'primary' },
            { label: 'Danger (Red LED)', value: 'danger' },
            { label: 'Success (Green LED)', value: 'success' },
          ],
        },
        { name: 'label', type: 'text', label: 'Key Label', defaultValue: 'POWER ACTUATOR' },
      ],
      previewComponent: ({ props }) => (
        <div className="py-6 flex flex-col items-center gap-4">
          <NeumorphicPushButton
            shape={props.shape}
            variant={props.variant}
            label={props.label}
          />
          <span className="text-[11px] text-neo-primary/50 font-mono">
            [ Click and hold to experience mechanical key travel ]
          </span>
        </div>
      ),
      codeSnippets: {
        tailwind: (props) => `import { NeumorphicPushButton } from '@/components/PushButton';

export function PushButtonDemo() {
  return (
    <NeumorphicPushButton
      shape="${props.shape || 'pill'}"
      variant="${props.variant || 'primary'}"
      label="${props.label || 'POWER ACTUATOR'}"
    />
  );
}`,
        css: `/* 3D Mechanical Key Switch */
.nms-switch-housing {
  padding: 0.625rem;
  border-radius: 1rem;
  background-color: var(--nms-bg-color);
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}

.nms-switch-key {
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  transition: all 0.15s ease;
  cursor: pointer;
}

.nms-switch-key:active {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  transform: translateY(4px);
}`,
      },
    },
  ],
};
