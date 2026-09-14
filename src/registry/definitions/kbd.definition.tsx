import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicKbd } from '../components/Kbd';

export const kbdDefinition: RegistryComponent = {
  id: 'kbd',
  title: 'Interactive Keyboard Keycap',
  category: 'Forms & Selection',
  description:
    'Micro-extruded physical keyboard keycap that dynamically detects real keyboard keystrokes and compresses down into an inset well when pressed.',
  tokens: [
    {
      name: 'Keycap Elevation',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Micro-extruded keycap elevation with crisp 0.25rem radius',
    },
    {
      name: 'Actuated Depression',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm translate-y-[2px]',
      description: 'Physical downward compression on keyboard or click actuation',
    },
  ],
  variants: [
    {
      id: 'interactive-keycaps',
      name: 'Live Keyboard Keystroke Tester',
      description: 'Press any corresponding key on your physical keyboard to actuate the keycap!',
      previewComponent: () => (
        <div className="space-y-6 text-left py-4">
          <div className="p-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 text-xs text-neo-primary/70 text-center font-mono">
            💡 Type on your physical keyboard (e.g. Ctrl, K, Shift, Enter, Space, W, A, S, D) to watch them press down!
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neo-primary/70 w-36">Command Palette:</span>
              <div className="flex items-center gap-1.5">
                <NeumorphicKbd keyTrigger="control">Ctrl</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="k">K</NeumorphicKbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neo-primary/70 w-36">Save & Format:</span>
              <div className="flex items-center gap-1.5">
                <NeumorphicKbd keyTrigger="shift">Shift</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="alt">Alt</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="f">F</NeumorphicKbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neo-primary/70 w-36">WASD Navigation:</span>
              <div className="flex items-center gap-1.5">
                <NeumorphicKbd keyTrigger="w">W</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="a">A</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="s">S</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="d">D</NeumorphicKbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neo-primary/70 w-36">Common Keys:</span>
              <div className="flex items-center gap-1.5">
                <NeumorphicKbd keyTrigger="enter">Enter</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="escape">Esc</NeumorphicKbd>
                <NeumorphicKbd keyTrigger=" ">Space</NeumorphicKbd>
                <NeumorphicKbd keyTrigger="tab">Tab</NeumorphicKbd>
              </div>
            </div>
          </div>
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicKbd } from '@/components/Kbd';

export function ShortcutDemo() {
  return (
    <div className="flex items-center gap-1.5">
      <NeumorphicKbd keyTrigger="control">Ctrl</NeumorphicKbd>
      <NeumorphicKbd keyTrigger="k">K</NeumorphicKbd>
    </div>
  );
}`,
        css: `/* Micro-Extruded Keycap */
.nms-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 0.25rem;
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  transition: all 0.1s ease;
}

.nms-kbd:active, .nms-kbd-pressed {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  transform: translateY(2px);
  color: var(--nms-secondary-color);
}`,
      },
    },
  ],
};
