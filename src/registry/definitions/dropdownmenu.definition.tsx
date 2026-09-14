import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicDropdownMenu } from '../components/DropdownMenu';
import { FileText, Copy, Share2, Trash2, Edit3 } from 'lucide-react';

export const dropdownMenuDefinition: RegistryComponent = {
  id: 'dropdown-menu',
  title: 'Dropdown Menu & Popover',
  category: 'Overlays & Surfaces',
  description:
    'Floating popover menu triggered by an action button. Items depress into subtle inset highlights on hover and active click.',
  tokens: [
    {
      name: 'Popover Surface',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'Elevated popover panel with 0.75rem radius',
    },
  ],
  variants: [
    {
      id: 'menu-actions',
      name: 'Contextual Action Menu',
      description: 'Action list with keyboard shortcuts and destructive item styling.',
      previewComponent: () => (
        <div className="py-8">
          <NeumorphicDropdownMenu
            triggerLabel="Document Actions"
            items={[
              { id: 'edit', label: 'Edit Metadata', icon: <Edit3 className="w-3.5 h-3.5" />, shortcut: 'Ctrl+E' },
              { id: 'duplicate', label: 'Duplicate File', icon: <Copy className="w-3.5 h-3.5" />, shortcut: 'Ctrl+D' },
              { id: 'share', label: 'Share Link', icon: <Share2 className="w-3.5 h-3.5" /> },
              { id: 'delete', label: 'Delete Artifact', icon: <Trash2 className="w-3.5 h-3.5" />, destructive: true },
            ]}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicDropdownMenu } from '@/components/DropdownMenu';
import { Edit3, Copy, Trash2 } from 'lucide-react';

export function DropdownDemo() {
  return (
    <NeumorphicDropdownMenu
      triggerLabel="Document Actions"
      items={[
        { id: 'edit', label: 'Edit Metadata', icon: <Edit3 className="w-3.5 h-3.5" />, shortcut: 'Ctrl+E' },
        { id: 'duplicate', label: 'Duplicate', icon: <Copy className="w-3.5 h-3.5" />, shortcut: 'Ctrl+D' },
        { id: 'delete', label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, destructive: true },
      ]}
    />
  );
}`,
        css: `/* Neumorphic Popover Menu */
.nms-dropdown-menu {
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.75rem;
  padding: 0.35rem;
}`,
      },
    },
  ],
};
