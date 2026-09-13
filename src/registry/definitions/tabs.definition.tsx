import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicTabs } from '../components/Tabs';
import { LayoutGrid, Code, Sliders } from 'lucide-react';

export const tabsDefinition: RegistryComponent = {
  id: 'tabs',
  title: 'Segmented Tabs',
  category: 'Navigation',
  description:
    'Tactile segmented tab control with a recessed base track and a floating extruded active pill that glides seamlessly using Framer Motion physics.',
  tokens: [
    {
      name: 'Tab Track',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Recessed tray background with subtle 0.0625rem border',
    },
    {
      name: 'Floating Active Pill',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Extruded tactile pill gliding smoothly across tabs',
    },
  ],
  variants: [
    {
      id: 'segmented-tabs',
      name: 'Segmented Tabs',
      description: 'Standard segmented switch with dynamic badges and icons.',
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
      ],
      previewComponent: ({ props }) => {
        const [active, setActive] = useState('overview');
        return (
          <NeumorphicTabs
            size={props.size}
            activeTab={active}
            onChange={setActive}
            tabs={[
              { id: 'overview', label: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
              { id: 'code', label: 'Codebase', icon: <Code className="w-4 h-4" />, badge: 3 },
              { id: 'settings', label: 'Controls', icon: <Sliders className="w-4 h-4" /> },
            ]}
          />
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicTabs } from '@/components/Tabs';
import { LayoutGrid, Code, Sliders } from 'lucide-react';

export function NavigationExample() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <NeumorphicTabs
      activeTab={activeTab}
      onChange={setActiveTab}
      tabs={[
        { id: 'overview', label: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
        { id: 'code', label: 'Codebase', icon: <Code className="w-4 h-4" />, badge: 3 },
        { id: 'settings', label: 'Controls', icon: <Sliders className="w-4 h-4" /> },
      ]}
    />
  );
}`,
        css: `/* Neumorphic Segmented Tab */
.nms-tabs-track {
  display: inline-flex;
  padding: 0.35rem;
  border-radius: 9999px;
  background-color: var(--nms-hover-bg);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}
.nms-tab-active {
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border-radius: 9999px;
  color: var(--nms-secondary-color);
}`,
      },
    },
  ],
};
