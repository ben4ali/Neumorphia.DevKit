import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicTooltip } from '../components/Tooltip';
import { NeumorphicButton } from '../components/Button';
import { HelpCircle, Shield } from 'lucide-react';

export const tooltipDefinition: RegistryComponent = {
  id: 'tooltip',
  title: 'Tooltip',
  category: 'Overlays & Surfaces',
  description:
    'Micro-extruded bubble with tactile shadow elevation on hover and keyboard focus.',
  tokens: [
    {
      name: 'Tooltip Elevation',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: '3px 3px 6px elevation with 0.55rem border radius',
    },
  ],
  variants: [
    {
      id: 'tooltips-demo',
      name: 'Interactive Tooltips',
      description: 'Hover or focus over the triggers to view the soft floating bubble.',
      previewComponent: () => (
        <div className="flex items-center gap-6">
          <NeumorphicTooltip content="Copy raw SHA-256 commit hash" position="top">
            <NeumorphicButton variant="icon" aria-label="Commit Info">
              <HelpCircle className="w-4 h-4 text-neo-secondary" />
            </NeumorphicButton>
          </NeumorphicTooltip>

          <NeumorphicTooltip content="Security scanning passed without vulnerabilities" position="bottom">
            <NeumorphicButton size="sm">
              <Shield className="w-4 h-4 text-neo-success" />
              Security Check
            </NeumorphicButton>
          </NeumorphicTooltip>
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicTooltip content="Copy raw SHA-256 hash" position="top">
  <NeumorphicButton variant="icon">
    <HelpCircle className="w-4 h-4" />
  </NeumorphicButton>
</NeumorphicTooltip>`,
        css: `/* Tooltip Micro-Bubble */
.nms-tooltip {
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  background-color: var(--nms-bg-color);
  border-radius: 0.55rem;
  padding: 0.35rem 0.75rem;
}`,
      },
    },
  ],
};
