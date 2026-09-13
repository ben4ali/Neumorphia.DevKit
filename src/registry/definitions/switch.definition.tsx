import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicSwitch } from '../components/Switch';

export const switchDefinition: RegistryComponent = {
  id: 'switch',
  title: 'Switch & Toggle',
  category: 'Forms & Selection',
  description:
    'Recessed track with an extruded tactile sliding thumb and optional glowing indicator beacon.',
  tokens: [
    {
      name: 'Switch Track',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Concave track recessed into clay background surface',
    },
    {
      name: 'Knob & Thumb',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Extruded circular tactile knob with active depression',
    },
  ],
  variants: [
    {
      id: 'switch-standard',
      name: 'Standard Switch',
      description: 'Standard tactile switch with label and description.',
      controls: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Hardware Acceleration' },
        { name: 'description', type: 'text', label: 'Description', defaultValue: 'Utilize GPU compute shaders' },
        { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
      ],
      previewComponent: ({ props }) => {
        const [checked, setChecked] = useState(true);
        return (
          <NeumorphicSwitch
            checked={checked}
            onChange={setChecked}
            label={props.label}
            description={props.description}
            disabled={props.disabled}
          />
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicSwitch } from '@/components/Switch';

export function SwitchDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <NeumorphicSwitch
      checked={enabled}
      onChange={setEnabled}
      label="Hardware Acceleration"
      description="Utilize GPU compute shaders"
    />
  );
}`,
        css: `/* Neumorphic Switch */
.nms-switch-track {
  width: 3.5rem;
  height: 1.75rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  position: relative;
}
.nms-switch-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  transition: transform 0.3s ease;
}`,
      },
    },
  ],
};
