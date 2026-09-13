import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicStepper } from '../components/Stepper';
import { NeumorphicButton } from '../components/Button';

export const stepperDefinition: RegistryComponent = {
  id: 'stepper',
  title: 'Vertical Stepper & Timeline',
  category: 'Navigation',
  description:
    'Milestone checkpoints interconnected with an engraved vertical trench. Completed steps display inset checked wells, and the current active step features an extruded pulse ring.',
  tokens: [
    {
      name: 'Engraved Trench',
      type: 'shadow',
      cssVariable: 'nms-divider-v',
      tailwindClass: 'nms-divider-v',
      description: 'Physical carved 2px trench between checkpoints',
    },
    {
      name: 'Completed Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Circular well with emerald success checkmark',
    },
  ],
  variants: [
    {
      id: 'stepper-flow',
      name: 'Deployment Pipeline Stepper',
      description: 'Step progression with completed and active milestones.',
      previewComponent: () => {
        const [active, setActive] = useState(1);
        return (
          <div className="w-full max-w-sm space-y-6">
            <NeumorphicStepper
              activeStep={active}
              onStepClick={setActive}
              steps={[
                {
                  id: 'build',
                  title: 'Compile & Static Analysis',
                  description: 'TypeScript check and tree-shaking completed with 0 errors.',
                },
                {
                  id: 'test',
                  title: 'Automated E2E Suite',
                  description: 'Running 142 Playwright visual regression tests on edge containers.',
                },
                {
                  id: 'deploy',
                  title: 'Edge CDN Propagation',
                  description: 'Invalidate cache headers and push immutable chunk assets.',
                },
              ]}
            />
            <div className="flex items-center gap-3">
              <NeumorphicButton
                size="sm"
                disabled={active === 0}
                onClick={() => setActive(Math.max(0, active - 1))}
              >
                Previous Step
              </NeumorphicButton>
              <NeumorphicButton
                size="sm"
                disabled={active === 2}
                onClick={() => setActive(Math.min(2, active + 1))}
              >
                Next Step
              </NeumorphicButton>
            </div>
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicStepper } from '@/components/Stepper';

export function StepperDemo() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <NeumorphicStepper
      activeStep={activeStep}
      onStepClick={setActiveStep}
      steps={[
        { id: '1', title: 'Compile & Build', description: 'TypeScript check completed.' },
        { id: '2', title: 'Automated Tests', description: 'Running test suites.' },
        { id: '3', title: 'CDN Propagation', description: 'Pushing assets to edge nodes.' },
      ]}
    />
  );
}`,
        css: `/* Vertical Timeline Step */
.nms-step-indicator {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}
.nms-step-completed {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  color: var(--nms-success-color);
}`,
      },
    },
  ],
};
