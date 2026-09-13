import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicRadio } from '../components/Radio';

export const radioDefinition: RegistryComponent = {
  id: 'radio',
  title: 'Radio Group',
  category: 'Forms & Selection',
  description:
    'Circular recessed well with centered tactile extruded dot indicator.',
  tokens: [
    {
      name: 'Radio Recess',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Circular recessed depression with centered extruded dot',
    },
  ],
  variants: [
    {
      id: 'radio-group',
      name: 'Radio Group',
      description: 'Single selection radio list with descriptions.',
      previewComponent: () => {
        const [plan, setPlan] = useState('pro');
        return (
          <NeumorphicRadio
            name="plan"
            value={plan}
            onChange={setPlan}
            options={[
              { label: 'Hobby Tier', value: 'hobby', description: 'Up to 3 concurrent active workspaces' },
              { label: 'Professional Plan', value: 'pro', description: 'Unlimited workspaces & cloud previews' },
              { label: 'Enterprise Engine', value: 'enterprise', description: 'Dedicated instances & priority support' },
            ]}
          />
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicRadio } from '@/components/Radio';

export function RadioDemo() {
  const [selected, setSelected] = useState('pro');

  return (
    <NeumorphicRadio
      name="plan"
      value={selected}
      onChange={setSelected}
      options={[
        { label: 'Hobby Tier', value: 'hobby' },
        { label: 'Professional Plan', value: 'pro' },
        { label: 'Enterprise Engine', value: 'enterprise' },
      ]}
    />
  );
}`,
        css: `/* Neumorphic Radio */
.nms-radio-outer {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
