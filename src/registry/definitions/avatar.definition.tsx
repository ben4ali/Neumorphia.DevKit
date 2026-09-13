import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicAvatar, NeumorphicAvatarGroup } from '../components/Avatar';

export const avatarDefinition: RegistryComponent = {
  id: 'avatar',
  title: 'Avatar & Group',
  category: 'Overlays & Surfaces',
  description:
    'Recessed circular frame with status indicators and overlapping group styling.',
  tokens: [
    {
      name: 'Avatar Bevel',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Recessed circular frame enclosing user avatar images',
    },
  ],
  variants: [
    {
      id: 'avatar-demo',
      name: 'Avatar & Squad Group',
      description: 'Individual avatars with status pips and stacked group with counter.',
      previewComponent: () => (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <NeumorphicAvatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              status="online"
              size="lg"
            />
            <NeumorphicAvatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              status="busy"
              size="md"
            />
            <NeumorphicAvatar fallback="AG" size="sm" status="online" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-neo-primary/60">Active Squad:</p>
            <NeumorphicAvatarGroup max={4}>
              <NeumorphicAvatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" />
              <NeumorphicAvatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" />
              <NeumorphicAvatar src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" />
              <NeumorphicAvatar src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" />
              <NeumorphicAvatar fallback="EK" />
              <NeumorphicAvatar fallback="RL" />
            </NeumorphicAvatarGroup>
          </div>
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicAvatarGroup max={4}>
  <NeumorphicAvatar src="https://..." status="online" />
  <NeumorphicAvatar src="https://..." />
  <NeumorphicAvatar fallback="AG" />
</NeumorphicAvatarGroup>`,
        css: `/* Recessed Avatar Ring */
.nms-avatar-ring {
  border-radius: 9999px;
  padding: 0.25rem;
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  background-color: var(--nms-bg-color);
}`,
      },
    },
  ],
};
