import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicBadge } from '../components/Badge';

export const badgeDefinition: RegistryComponent = {
  id: 'badge',
  title: 'Badges & Indicators',
  category: 'Feedback & Progress',
  description:
    'Soft mineral status badges designed for Neumorphic surfaces. Uses low-saturation, de-saturated tones on Light mode and soft pastels on Dark mode, avoiding harsh plastic primaries.',
  tokens: [
    {
      name: 'Warning / Amber',
      type: 'color',
      cssVariable: '--nms-warning-color',
      description: '#8c6227 (Muted earthy ochre) / #d8a952 (Soft warm bronze)',
    },
    {
      name: 'Success / Sage',
      type: 'color',
      cssVariable: '--nms-success-color',
      description: '#2d6a4f (Muted sage pine) / #68b684 (Soft moss mint)',
    },
    {
      name: 'Info / Slate Blue',
      type: 'color',
      cssVariable: '--nms-info-color',
      description: '#3d5a80 (Muted slate denim) / #7aa2dc (Soft glacier slate)',
    },
    {
      name: 'Danger / Brick',
      type: 'color',
      cssVariable: '--nms-danger-color',
      description: '#9e3b47 (Muted brick wine) / #d97078 (Soft dusty rose)',
    },
    {
      name: 'Neutral / Slate',
      type: 'color',
      cssVariable: '--nms-neutral-color',
      description: '#4a5568 (Soft mineral slate) / #94a3b8 (Light slate grey)',
    },
  ],
  variants: [
    {
      id: 'recessed-pill',
      name: 'Recessed Well Pill (Recommended)',
      description: 'Soft desaturated text on neutral clay well with a subtle, non-distracting LED dot.',
      previewComponent: () => (
        <div className="flex items-center gap-3 flex-wrap">
          <NeumorphicBadge color="info">Deployment Active</NeumorphicBadge>
          <NeumorphicBadge color="success">Cluster Healthy</NeumorphicBadge>
          <NeumorphicBadge color="warning">High Memory</NeumorphicBadge>
          <NeumorphicBadge color="danger">Node Fault</NeumorphicBadge>
          <NeumorphicBadge color="neutral">Worker 04</NeumorphicBadge>
          <NeumorphicBadge color="accent">AI Engine</NeumorphicBadge>
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicBadge } from '@/components/Badge';

export function BadgeDemo() {
  return (
    <div className="flex items-center gap-3">
      <NeumorphicBadge color="info">Deployment Active</NeumorphicBadge>
      <NeumorphicBadge color="success">Cluster Healthy</NeumorphicBadge>
      <NeumorphicBadge color="warning">High Memory</NeumorphicBadge>
      <NeumorphicBadge color="danger">Node Fault</NeumorphicBadge>
      <NeumorphicBadge color="neutral">Worker 04</NeumorphicBadge>
    </div>
  );
}`,
        css: `/* Soft Neumorphic Inset Badge */
.nms-badge-recessed {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}

.nms-badge-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: currentColor;
  opacity: 0.8;
  box-shadow: 0 0 2px currentColor;
}`,
      },
    },
    {
      id: 'tinted-wash',
      name: 'Matte Watercolor Wash',
      description: 'Ultra-gentle 7% opacity background wash maintaining soft clay depth.',
      previewComponent: () => (
        <div className="flex items-center gap-3 flex-wrap">
          <NeumorphicBadge variant="wash" color="info">
            Telemetry Feed
          </NeumorphicBadge>
          <NeumorphicBadge variant="wash" color="success">
            Verified Build
          </NeumorphicBadge>
          <NeumorphicBadge variant="wash" color="warning">
            High Memory
          </NeumorphicBadge>
          <NeumorphicBadge variant="wash" color="danger">
            Service Degraded
          </NeumorphicBadge>
          <NeumorphicBadge variant="wash" color="neutral">
            Cache Hit
          </NeumorphicBadge>
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicBadge variant="wash" color="info">Telemetry Feed</NeumorphicBadge>
<NeumorphicBadge variant="wash" color="success">Verified Build</NeumorphicBadge>
<NeumorphicBadge variant="wash" color="warning">High Memory</NeumorphicBadge>`,
        css: `/* Soft Matte Wash Badge */
.nms-badge-wash {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: rgba(61, 90, 128, 0.07); /* 7% soft wash */
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
