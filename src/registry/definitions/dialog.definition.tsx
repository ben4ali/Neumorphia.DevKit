import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicDialog } from '../components/Dialog';
import { NeumorphicButton } from '../components/Button';

export const dialogDefinition: RegistryComponent = {
  id: 'dialog',
  title: 'Modal Dialog',
  category: 'Overlays & Surfaces',
  description:
    'Modal dialog with a blurred backdrop wash and tactile Neumorphic internal controls. The floating overlay intentionally avoids Neumorphic dual shadows because it floats above a backdrop rather than on a contiguous clay surface.',
  tokens: [
    {
      name: 'Backdrop Wash',
      type: 'color',
      cssVariable: 'bg-black/40 backdrop-blur-sm',
      description: 'Blurred darkening wash over the underlying page',
    },
    {
      name: 'Modal Panel Frame',
      type: 'radius',
      cssVariable: '--nms-border-color',
      tailwindClass: 'rounded-neo-card-lg border border-neo-border',
      description: 'Solid surface with 1.0rem radius and subtle edge boundary',
    },
  ],
  variants: [
    {
      id: 'dialog-modal',
      name: 'Modal Dialog',
      description: 'Floating modal panel with tactile internal buttons and close trigger.',
      previewComponent: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <div>
            <NeumorphicButton onClick={() => setIsOpen(true)}>
              Launch Modal Dialog
            </NeumorphicButton>

            <NeumorphicDialog
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Confirm API Key Revocation"
              description="This will immediately invalidate production token prod_live_948a."
              footer={
                <>
                  <NeumorphicButton size="sm" onClick={() => setIsOpen(false)}>
                    Cancel
                  </NeumorphicButton>
                  <NeumorphicButton size="sm" variant="danger" onClick={() => setIsOpen(false)}>
                    Revoke Key
                  </NeumorphicButton>
                </>
              }
            >
              <div className="space-y-3">
                <p className="text-xs text-neo-primary/70 leading-relaxed">
                  Any downstream services attempting to connect using this key will receive a 401 Unauthorized status code.
                </p>
              </div>
            </NeumorphicDialog>
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicDialog } from '@/components/Dialog';
import { NeumorphicButton } from '@/components/Button';

export function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NeumorphicButton onClick={() => setIsOpen(true)}>Open Modal</NeumorphicButton>
      <NeumorphicDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm API Key Revocation"
        description="This will invalidate production token."
        footer={
          <>
            <NeumorphicButton size="sm" onClick={() => setIsOpen(false)}>Cancel</NeumorphicButton>
            <NeumorphicButton size="sm" variant="danger">Revoke Key</NeumorphicButton>
          </>
        }
      >
        <p className="text-xs text-neo-primary/70">Downstream services will receive a 401 status.</p>
      </NeumorphicDialog>
    </>
  );
}`,
        css: `/* Floating Modal Panel (No Neumorphic dual shadow over backdrop) */
.nms-dialog {
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
}`,
      },
    },
  ],
};
