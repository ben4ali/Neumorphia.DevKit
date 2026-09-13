import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicProgress } from '../components/Progress';

export const progressDefinition: RegistryComponent = {
  id: 'progress',
  title: 'Progress Bar',
  category: 'Feedback & Progress',
  description:
    'Recessed trench with smooth extruded fill and glowing beacon indicator.',
  tokens: [
    {
      name: 'Progress Trench',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'Deep concave horizontal channel with 4px/8px blur',
    },
    {
      name: 'Fill Accents',
      type: 'color',
      cssVariable: '--nms-info-color, --nms-success-color, etc.',
      description: 'Calibrated de-saturated / soft pastel progress fill gradients',
    },
  ],
  variants: [
    {
      id: 'progress-bar',
      name: 'Progress Bar',
      description: 'Progress bar with status color options and dynamic percentage.',
      controls: [
        {
          name: 'variant',
          type: 'select',
          label: 'Status Theme',
          defaultValue: 'info',
          options: [
            { label: 'Info (Slate / Glacier Blue)', value: 'info' },
            { label: 'Success (Sage / Mint Green)', value: 'success' },
            { label: 'Warning (Amber / Ochre)', value: 'warning' },
            { label: 'Danger (Coral Red)', value: 'danger' },
            { label: 'Accent (Violet / Lilac)', value: 'accent' },
          ],
        },
        { name: 'value', type: 'number', label: 'Progress (%)', defaultValue: 72, min: 0, max: 100 },
      ],
      previewComponent: ({ props }) => (
        <div className="w-full max-w-md space-y-4">
          <NeumorphicProgress
            value={props.value}
            variant={props.variant}
            label="Inference Pipeline"
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicProgress
  value={72}
  variant="info"
  label="Inference Pipeline"
/>`,
        css: `/* Progress Trench */
.nms-progress-track {
  height: 1rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  overflow: hidden;
  padding: 0.125rem;
}`,
      },
    },
  ],
};
