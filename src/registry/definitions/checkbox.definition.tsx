import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicCheckbox } from '../components/Checkbox';

export const checkboxDefinition: RegistryComponent = {
  id: 'checkbox',
  title: 'Checkbox',
  category: 'Forms & Selection',
  description:
    'Square recessed well with tactile extruded checkmark icon and accent color glow.',
  tokens: [
    {
      name: 'Checkbox Recess',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Square recessed container with 0.25rem radius',
    },
  ],
  variants: [
    {
      id: 'checkbox-group',
      name: 'Checkbox Group',
      description: 'Interactive checkboxes with titles and optional descriptions.',
      previewComponent: () => {
        const [c1, setC1] = useState(true);
        const [c2, setC2] = useState(false);
        return (
          <div className="space-y-4 text-left">
            <NeumorphicCheckbox
              checked={c1}
              onChange={setC1}
              label="Automatic Cloud Synchronization"
              description="Sync projects in real-time across devices"
            />
            <NeumorphicCheckbox
              checked={c2}
              onChange={setC2}
              label="Send Anonymous Crash Telemetry"
            />
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicCheckbox } from '@/components/Checkbox';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <NeumorphicCheckbox
      checked={checked}
      onChange={setChecked}
      label="Automatic Cloud Synchronization"
      description="Sync projects in real-time across devices"
    />
  );
}`,
        css: `/* Neumorphic Checkbox */
.nms-checkbox-box {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background-color: var(--nms-bg-color);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
