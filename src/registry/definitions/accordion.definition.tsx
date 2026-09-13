import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicAccordion } from '../components/Accordion';

export const accordionDefinition: RegistryComponent = {
  id: 'accordion',
  title: 'Accordion & Collapsible',
  category: 'Navigation',
  description:
    'Extruded trigger bars with smooth rotating chevrons that expand downward revealing tactile recessed content wells using Framer Motion.',
  tokens: [
    {
      name: 'Trigger Bar',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Extruded container with smooth 0.75rem border radius',
    },
    {
      name: 'Content Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Recessed tray housing the collapsible body text',
    },
  ],
  variants: [
    {
      id: 'accordion-faq',
      name: 'FAQ & Settings Panel',
      description: 'Collapsible sections with badge indicators and height animation.',
      controls: [
        { name: 'allowMultiple', type: 'boolean', label: 'Allow Multiple Open', defaultValue: false },
      ],
      previewComponent: ({ props }) => (
        <NeumorphicAccordion
          allowMultiple={props.allowMultiple}
          defaultExpanded={['physics']}
          items={[
            {
              id: 'physics',
              title: 'How does Neumorphic 135° lighting work?',
              badge: 'Core Physics',
              content:
                'Neumorphism simulates a single virtual light source stationed at the top-left (135°). Raised elements cast a dark drop shadow to the bottom-right and catch specular light highlights along the top-left lip.',
            },
            {
              id: 'contrast',
              title: 'How is WCAG AAA/AA text contrast preserved?',
              badge: 'Accessibility',
              content:
                'We decouple surface elevation from typography color. Surfaces blend seamlessly into the clay background (#e6e7ee / #1a1a1a) while text uses high-contrast slate (#31344b) achieving an 8.44:1 AAA contrast pass in Light Mode.',
            },
            {
              id: 'performance',
              title: 'Are Neumorphic box-shadow calculations GPU accelerated?',
              badge: 'Performance',
              content:
                'Yes. Modern browsers render box-shadow properties with GPU compositing shaders. Transitions between raised and inset states are optimized using CSS transforms and will-change hints.',
            },
          ]}
        />
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicAccordion } from '@/components/Accordion';

export function AccordionDemo() {
  return (
    <NeumorphicAccordion
      items={[
        {
          id: '1',
          title: 'How does 135° lighting work?',
          content: 'Raised elements cast a dark shadow toward bottom-right and catch light highlights on the top-left.',
        },
      ]}
    />
  );
}`,
        css: `/* Neumorphic Accordion */
.nms-accordion-trigger {
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.75rem;
  padding: 1rem;
}
.nms-accordion-content {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border-radius: 0.55rem;
  padding: 1rem;
}`,
      },
    },
  ],
};
