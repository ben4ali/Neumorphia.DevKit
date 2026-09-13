import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicToast } from '../components/Toast';
import { NeumorphicButton } from '../components/Button';

export const toastDefinition: RegistryComponent = {
  id: 'toast',
  title: 'Toast Notification Capsule',
  category: 'Overlays & Surfaces',
  description:
    'High-elevation floating notification capsule with a glowing status indicator dot, message copy, and tactile dismiss button.',
  tokens: [
    {
      name: 'Toast Capsule Chassis',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'Floating pill container with rounded-full geometry',
    },
  ],
  variants: [
    {
      id: 'toast-stack',
      name: 'Notification Capsules',
      description: 'Transient alert feedback capsules for system events.',
      previewComponent: () => {
        const [showSuccess, setShowSuccess] = useState(true);
        const [showWarning, setShowWarning] = useState(true);

        return (
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center gap-3">
              {showSuccess && (
                <NeumorphicToast
                  variant="success"
                  title="Configuration Synchronized"
                  message="Edge workers updated across 8 regions."
                  onClose={() => setShowSuccess(false)}
                />
              )}
              {showWarning && (
                <NeumorphicToast
                  variant="warning"
                  title="API Quota Exceeded 80%"
                  message="Upgrade to enterprise for unlimited throughput."
                  onClose={() => setShowWarning(false)}
                />
              )}
            </div>

            {(!showSuccess || !showWarning) && (
              <div className="pt-2">
                <NeumorphicButton
                  size="sm"
                  onClick={() => {
                    setShowSuccess(true);
                    setShowWarning(true);
                  }}
                >
                  Restore Toasts
                </NeumorphicButton>
              </div>
            )}
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicToast } from '@/components/Toast';

export function ToastDemo() {
  return (
    <NeumorphicToast
      variant="success"
      title="Configuration Synchronized"
      message="Edge workers updated across 8 regions."
      onClose={() => console.log('Closed')}
    />
  );
}`,
        css: `/* Toast Capsule */
.nms-toast {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}`,
      },
    },
  ],
};
