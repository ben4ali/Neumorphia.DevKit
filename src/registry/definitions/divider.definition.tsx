import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicDivider } from '../components/Divider';

export const dividerDefinition: RegistryComponent = {
  id: 'divider',
  title: 'Engraved Divider',
  category: 'Feedback & Progress',
  description:
    'A physical groove carved directly into the clay background using adjacent 1px dark shadow and 1px light specular lines.',
  tokens: [
    {
      name: 'Engraved Groove',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark / --nms-shadow-light',
      tailwindClass: 'nms-divider-h',
      description: 'Adjacent 1px dark shadow and 1px light specular line',
    },
  ],
  variants: [
    {
      id: 'divider-horizontal',
      name: 'Horizontal Divider',
      description: 'Engraved separator with optional centered text pill.',
      previewComponent: () => (
        <div className="w-full max-w-md space-y-4">
          <p className="text-xs text-neo-primary/60 text-center">Section Alpha</p>
          <NeumorphicDivider label="PHYSICAL GROOVE SEPARATOR" />
          <p className="text-xs text-neo-primary/60 text-center">Section Beta</p>
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicDivider label="PHYSICAL GROOVE SEPARATOR" />`,
        css: `/* Engraved Divider */
.nms-divider-h {
  height: 2px;
  border-top: 1px solid var(--nms-shadow-dark);
  border-bottom: 1px solid var(--nms-shadow-light);
}`,
      },
    },
  ],
};
