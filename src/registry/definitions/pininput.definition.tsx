import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicPinInput } from '../components/PinInput';

export const pinInputDefinition: RegistryComponent = {
  id: 'pin-input',
  title: 'PIN & OTP Input',
  category: 'Forms & Selection',
  description:
    'Tactile square recessed cells with automatic focus progression, backspace handling, clipboard paste parsing, and focus border illumination.',
  tokens: [
    {
      name: 'Cell Recess',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Individual square recessed input cell with 0.55rem radius',
    },
  ],
  variants: [
    {
      id: 'pin-standard',
      name: '6-Digit Verification Code',
      description: 'Standard numeric OTP verification input.',
      controls: [
        { name: 'mask', type: 'boolean', label: 'Mask Digits', defaultValue: false },
        { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
      ],
      previewComponent: ({ props }) => {
        const [pin, setPin] = useState('');
        return (
          <div className="space-y-4">
            <NeumorphicPinInput
              length={6}
              value={pin}
              onChange={setPin}
              mask={props.mask}
              disabled={props.disabled}
              label="Two-Factor Security Code"
              onComplete={(code) => alert(`Entered PIN: ${code}`)}
            />
            {pin && (
              <p className="text-xs font-mono text-neo-secondary">
                Current Value: {pin}
              </p>
            )}
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicPinInput } from '@/components/PinInput';

export function PinDemo() {
  const [pin, setPin] = useState('');

  return (
    <NeumorphicPinInput
      length={6}
      value={pin}
      onChange={setPin}
      label="Two-Factor Security Code"
      onComplete={(code) => console.log('PIN:', code)}
    />
  );
}`,
        css: `/* Neumorphic PIN Cell */
.nms-pin-cell {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-family: monospace;
  font-weight: bold;
  border-radius: 0.55rem;
  background-color: var(--nms-bg-color);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  outline: none;
}
.nms-pin-cell:focus {
  border-color: var(--nms-focus-border);
}`,
      },
    },
  ],
};
