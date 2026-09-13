import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicCard } from '../components/Card';
import { NeumorphicButton } from '../components/Button';
import { ArrowRight, Database } from 'lucide-react';

export const cardDefinition: RegistryComponent = {
  id: 'card',
  title: 'Cards & Surfaces',
  category: 'Overlays & Surfaces',
  description:
    'Extruded cards, shallow inset well containers, and deep sunken surfaces adhering to Level 2 Raised and Level 1/2 Inset formulas.',
  tokens: [
    {
      name: 'Extruded Card (Level 2)',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: '6px 6px 12px / -6px -6px 12px resting card elevation',
    },
    {
      name: 'Inset Well Container',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'inset 2px 2px 4px / inset -2px -2px 4px shallow sunken container',
    },
    {
      name: 'Deep Sunken Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-md',
      description: 'inset 4px 4px 8px / inset -4px -4px 8px deep recessed container',
    },
  ],
  variants: [
    {
      id: 'extruded-card',
      name: 'Extruded Card',
      description: 'Standard Level 2 Raised card with subtle edge border.',
      previewComponent: () => (
        <NeumorphicCard className="max-w-md w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border text-neo-secondary">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-neo-badge shadow-neo-inset-sm text-neo-secondary">
              Active Store
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-neo-primary">Vector Index Shard #4</h3>
            <p className="text-xs text-neo-primary/60 mt-1">
              984,210 embeddings indexed with HNSW cosine similarity graphs.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-neo-primary/60">RAM: 4.2 GB / 8.0 GB</span>
            <NeumorphicButton size="sm">
              Inspect Shard <ArrowRight className="w-3.5 h-3.5" />
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicCard } from '@/components/Card';
import { NeumorphicButton } from '@/components/Button';

export function ExampleCard() {
  return (
    <NeumorphicCard className="max-w-md w-full p-6 space-y-4">
      <h3 className="text-base font-bold text-neo-primary">Vector Index Shard</h3>
      <p className="text-xs text-neo-primary/60">Embeddings indexed with HNSW cosine similarity.</p>
      <NeumorphicButton size="sm">Inspect Shard</NeumorphicButton>
    </NeumorphicCard>
  );
}`,
        css: `/* Extruded Card */
.nms-card {
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: var(--nms-text-color);
}`,
      },
    },
    {
      id: 'inset-wells',
      name: 'Inset Well & Deep Recess',
      description: 'Shallow and deep sunken containers for nested content grouping.',
      previewComponent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <NeumorphicCard variant="well" className="space-y-2">
            <h4 className="text-xs font-bold text-neo-primary uppercase tracking-wider">.nms-inner-card</h4>
            <p className="text-xs text-neo-primary/70">
              Shallow sunken well for nesting secondary stats inside main cards.
            </p>
          </NeumorphicCard>
          <NeumorphicCard variant="deepWell" className="space-y-2">
            <h4 className="text-xs font-bold text-neo-primary uppercase tracking-wider">.nms-inner-card-strong</h4>
            <p className="text-xs text-neo-primary/70">
              Deep recessed well for logs, code blocks, or active focus zones.
            </p>
          </NeumorphicCard>
        </div>
      ),
      codeSnippets: {
        tailwind: `<NeumorphicCard variant="well">Shallow Well</NeumorphicCard>
<NeumorphicCard variant="deepWell">Deep Recessed Well</NeumorphicCard>`,
        css: `.nms-inner-card {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.75rem;
}
.nms-inner-card-strong {
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 1rem;
}`,
      },
    },
  ],
};
