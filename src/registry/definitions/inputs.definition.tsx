import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicInput } from '../components/Input';
import { NeumorphicTextarea } from '../components/Textarea';
import { NeumorphicSelect } from '../components/Select';
import { Mail } from 'lucide-react';

export const inputsDefinition: RegistryComponent = {
  id: 'inputs',
  title: 'Text Input',
  category: 'Forms & Selection',
  description:
    'Recessed text input control utilizing Level 1 Inset shadows, light-mode AA/AAA contrast ratios, and illuminated focus stroke borders.',
  tokens: [
    {
      name: 'Input Recess',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'inset 2px 2px 4px / inset -2px -2px 4px light-physics well',
    },
    {
      name: 'Focus Border',
      type: 'color',
      cssVariable: '--nms-focus-border',
      description: '#A3BFFA (Light) / #4a9eff (Dark) outline glow',
    },
  ],
  variants: [
    {
      id: 'text-input',
      name: 'Text Input',
      description: 'Standard 44px height input with subtle border and focus ring.',
      controls: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Email Address' },
        { name: 'placeholder', type: 'text', label: 'Placeholder', defaultValue: 'alex@company.com' },
        { name: 'error', type: 'text', label: 'Error', defaultValue: '' },
      ],
      previewComponent: ({ props }) => (
        <div className="w-full max-w-sm">
          <NeumorphicInput
            label={props.label}
            placeholder={props.placeholder}
            error={props.error}
            icon={<Mail className="w-4 h-4" />}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: (props) => `
import { NeumorphicInput } from '@/components/Input';
import { Mail } from 'lucide-react';

export function Example() {
  return (
    <NeumorphicInput
      label="${props.label || 'Email Address'}"
      placeholder="${props.placeholder || 'alex@company.com'}"
      ${props.error ? `error="${props.error}"` : ''}
      icon={<Mail className="w-4 h-4" />}
    />
  );
}`,
        css: `/* Neumorphic Form Input */
.nms-form-control {
  display: block;
  width: 100%;
  height: 44px;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  font-weight: 300;
  color: var(--nms-input-text);
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.55rem;
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  transition: all 0.3s ease-in-out;
  outline: none;
}
.nms-form-control:focus {
  border-color: var(--nms-focus-border);
}`,
      },
    },
    {
      id: 'textarea',
      name: 'Textarea',
      description: 'Multi-line recessed text well with smooth focus glow.',
      controls: [
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Project Notes' },
        { name: 'placeholder', type: 'text', label: 'Placeholder', defaultValue: 'Write notes here...' },
      ],
      previewComponent: ({ props }) => (
        <div className="w-full max-w-sm">
          <NeumorphicTextarea label={props.label} placeholder={props.placeholder} rows={3} />
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicTextarea label="Project Notes" placeholder="Write notes here..." rows={3} />`,
        css: `textarea.nms-form-control {
  height: auto;
  min-height: 90px;
  resize: vertical;
}`,
      },
    },
    {
      id: 'select',
      name: 'Dropdown Select',
      description: 'Recessed select container with integrated custom chevron indicator.',
      previewComponent: () => (
        <div className="w-full max-w-sm">
          <NeumorphicSelect
            label="Cloud Region"
            options={[
              { label: 'US-East (N. Virginia)', value: 'us-east-1' },
              { label: 'EU-West (Frankfurt)', value: 'eu-west-1' },
              { label: 'AP-Southeast (Tokyo)', value: 'ap-southeast-1' },
            ]}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicSelect
  label="Cloud Region"
  options={[
    { label: 'US-East (N. Virginia)', value: 'us-east-1' },
    { label: 'EU-West (Frankfurt)', value: 'eu-west-1' },
  ]}
/>`,
        css: `.nms-select {
  appearance: none;
  padding: 0.6rem 1.75rem 0.6rem 0.75rem;
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.55rem;
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
}`,
      },
    },
  ],
};
