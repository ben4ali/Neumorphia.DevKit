import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicDock } from '../components/Dock';
import { Home, Compass, MessageSquare, Bell, Settings, Terminal, Sparkles } from 'lucide-react';

export const dockDefinition: RegistryComponent = {
  id: 'dock',
  title: 'Tactile Floating Dock',
  category: 'Navigation',
  description:
    'High-elevation floating pill toolbar with magnifying interactive icon triggers that depress into inset wells on click.',
  tokens: [
    {
      name: 'Dock Pill Chassis',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'High-elevation rounded-full floating bar',
    },
    {
      name: 'Depressed Icon Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Active button sinking into the dock chassis',
    },
  ],
  variants: [
    {
      id: 'dock-bottom',
      name: 'Floating Navigation Dock',
      description: 'Interactive dock with hover magnification and tactile depression.',
      previewComponent: () => (
        <div className="py-6">
          <NeumorphicDock
            items={[
              { id: 'home', label: 'Workspace', icon: <Home className="w-5 h-5" /> },
              { id: 'explore', label: 'Artifacts', icon: <Compass className="w-5 h-5" /> },
              { id: 'chat', label: 'Copilot', icon: <MessageSquare className="w-5 h-5" /> },
              { id: 'terminal', label: 'CLI Console', icon: <Terminal className="w-5 h-5" /> },
              { id: 'settings', label: 'Preferences', icon: <Settings className="w-5 h-5" /> },
            ]}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicDock } from '@/components/Dock';
import { Home, Compass, MessageSquare, Settings } from 'lucide-react';

export function DockDemo() {
  return (
    <NeumorphicDock
      items={[
        { id: 'home', label: 'Workspace', icon: <Home className="w-5 h-5" /> },
        { id: 'explore', label: 'Artifacts', icon: <Compass className="w-5 h-5" /> },
        { id: 'chat', label: 'Copilot', icon: <MessageSquare className="w-5 h-5" /> },
        { id: 'settings', label: 'Preferences', icon: <Settings className="w-5 h-5" /> },
      ]}
    />
  );
}`,
        css: `/* Floating Dock Chassis */
.nms-dock {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
