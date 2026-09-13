import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicAlert } from '../components/Alert';

export const alertDefinition: RegistryComponent = {
  id: 'alert',
  title: 'Alert Banner',
  category: 'Feedback & Progress',
  description:
    'Level 2 Raised alert banner with an inset status receptacle and calibrated semantic edge accents.',
  tokens: [
    {
      name: 'Alert Surface',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'Level 2 Raised container with 6px/12px elevation',
    },
    {
      name: 'Semantic Accents',
      type: 'color',
      cssVariable: '--nms-info-color, --nms-success-color, etc.',
      description: 'Calibrated de-saturated / soft pastel border highlights',
    },
  ],
  variants: [
    {
      id: 'alert-banner',
      name: 'Alert Banner',
      description: 'Status notifications with dismiss button and calibrated palette.',
      controls: [
        {
          name: 'variant',
          type: 'select',
          label: 'Alert Type',
          defaultValue: 'success',
          options: [
            { label: 'Success', value: 'success' },
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Danger', value: 'danger' },
          ],
        },
      ],
      previewComponent: ({ props }) => (
        <div className="w-full max-w-lg">
          <NeumorphicAlert
            variant={props.variant}
            title="Cluster Deployment Synchronized"
            description="All 16 edge worker nodes have received the latest model weights without downtime."
            onClose={() => alert('Dismissed')}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicAlert
  variant="success"
  title="Cluster Deployment Synchronized"
  description="All 16 edge worker nodes have received the latest model weights."
  onClose={() => handleDismiss()}
/>`,
        css: `/* Neumorphic Alert */
.nms-alert {
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-left: 4px solid var(--nms-success-color);
  border-radius: 0.75rem;
  padding: 1rem;
}`,
      },
    },
  ],
};
