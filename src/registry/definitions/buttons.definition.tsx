import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicButton } from '../components/Button';
import { Sparkles, Trash2, Heart, Download, ShieldCheck } from 'lucide-react';

export const buttonsDefinition: RegistryComponent = {
  id: 'buttons',
  title: 'Buttons',
  category: 'Actions',
  description:
    'Tactile, physics-based buttons that smoothly transition from extruded convex surfaces to compressed inset wells on press and hover states.',
  tokens: [
    {
      name: 'Raised Elevation',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: '3px 3px 6px (dark) / -3px -3px 6px (light) dual lighting vectors',
    },
    {
      name: 'Depressed / Inset',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'inset 2px 2px 4px / inset -2px -2px 4px surface compression',
    },
    {
      name: 'Destructive Shadow',
      type: 'shadow',
      cssVariable: '--nms-delete-shadow-dark',
      tailwindClass: 'shadow-neo-delete',
      description: 'Harmonized red-tinted ambient shadow for danger actions',
    },
  ],
  variants: [
    {
      id: 'raised',
      name: 'Raised Action',
      description: 'Standard elevated surface with active tactile depression.',
      controls: [
        {
          name: 'size',
          type: 'select',
          label: 'Size',
          defaultValue: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Primary Action' },
      ],
      previewComponent: ({ props }) => (
        <NeumorphicButton size={props.size} disabled={props.disabled}>
          <Sparkles className="w-4 h-4 text-neo-secondary" />
          {props.label}
        </NeumorphicButton>
      ),
      codeSnippets: {
        tailwind: (props) => `
import { NeumorphicButton } from '@/components/Button';

export function Example() {
  return (
    <NeumorphicButton size="${props.size || 'md'}" ${props.disabled ? 'disabled' : ''}>
      ${props.label || 'Primary Action'}
    </NeumorphicButton>
  );
}`,
        css: (props) => `
<!-- HTML -->
<button class="nms-btn">
  ${props.label || 'Primary Action'}
</button>

/* CSS */
.nms-btn {
  background-color: var(--nms-bg-color);
  color: var(--nms-text-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.55rem;
  padding: 0.6rem 1.25rem;
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  letter-spacing: 0.025em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nms-btn:hover, .nms-btn:active {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  transform: translateY(1px);
}`,
      },
    },
    {
      id: 'inset',
      name: 'Inset / Well Button',
      description: 'Starts in an inset well state and intensifies on active hover.',
      previewComponent: () => (
        <NeumorphicButton variant="inset">
          <ShieldCheck className="w-4 h-4 text-neo-secondary" />
          Depressed Toggle
        </NeumorphicButton>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicButton variant="inset">
  <ShieldCheck className="w-4 h-4 text-neo-secondary" />
  Depressed Toggle
</NeumorphicButton>`,
        css: `.nms-inner-btn {
  background-color: var(--nms-bg-color);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}
.nms-inner-btn:hover {
  background-color: var(--nms-hover-bg);
  box-shadow: inset 4px 4px 8px var(--nms-hover-shadow-dark), inset -4px -4px 8px var(--nms-hover-shadow-light);
}`,
      },
    },
    {
      id: 'danger',
      name: 'Destructive Action',
      description: 'Engineered with extracted destructive danger tokens for irreversible actions.',
      previewComponent: () => (
        <NeumorphicButton variant="danger">
          <Trash2 className="w-4 h-4" />
          Delete Project
        </NeumorphicButton>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicButton variant="danger">
  <Trash2 className="w-4 h-4" />
  Delete Project
</NeumorphicButton>`,
        css: `.nms-delete-btn {
  background-color: var(--nms-delete-bg);
  color: var(--nms-danger-color);
  border: 0.0625rem solid var(--nms-delete-border);
  box-shadow: 3px 3px 6px var(--nms-delete-shadow-dark), -3px -3px 6px var(--nms-delete-shadow-light);
}`,
      },
    },
    {
      id: 'pill-and-icon',
      name: 'Pill & Icon Variants',
      description: 'Rounded full geometry for floating actions and circular tool buttons.',
      previewComponent: () => (
        <div className="flex items-center gap-4">
          <NeumorphicButton variant="pill">
            <Download className="w-4 h-4" /> Download Assets
          </NeumorphicButton>
          <NeumorphicButton variant="icon" aria-label="Favorite">
            <Heart className="w-4 h-4 text-rose-500" />
          </NeumorphicButton>
        </div>
      ),
      codeSnippets: {
        tailwind: `<div className="flex items-center gap-4">
  <NeumorphicButton variant="pill">
    <Download className="w-4 h-4" /> Download Assets
  </NeumorphicButton>
  <NeumorphicButton variant="icon" aria-label="Favorite">
    <Heart className="w-4 h-4 text-rose-500" />
  </NeumorphicButton>
</div>`,
        css: `.nms-btn-pill {
  border-radius: 9999px;
  padding: 0.6rem 1.5rem;
}
.nms-btn-icon {
  border-radius: 0.55rem;
  padding: 0.6rem;
}`,
      },
    },
  ],
};
