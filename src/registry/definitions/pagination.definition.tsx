import React, { useState } from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicPagination } from '../components/Pagination';

export const paginationDefinition: RegistryComponent = {
  id: 'pagination',
  title: 'Pagination Controls',
  category: 'Navigation',
  description:
    'Tactile pagination controls. Inactive page buttons are extruded upwards, while the active page compresses into a recessed inset well.',
  tokens: [
    {
      name: 'Active Page Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Active page pill depressed into the surface',
    },
    {
      name: 'Inactive Page Pill',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-sm',
      description: 'Extruded square pill with 0.55rem radius',
    },
  ],
  variants: [
    {
      id: 'pagination-standard',
      name: 'Dataset Pagination',
      description: 'Step through paginated tables and records.',
      controls: [
        { name: 'totalPages', type: 'number', label: 'Total Pages', defaultValue: 12 },
      ],
      previewComponent: ({ props }) => {
        const [page, setPage] = useState(4);
        return (
          <div className="space-y-3 text-center">
            <NeumorphicPagination
              currentPage={page}
              totalPages={props.totalPages || 12}
              onPageChange={setPage}
            />
            <p className="text-xs text-neo-primary/60">
              Viewing page <span className="font-bold text-neo-secondary">{page}</span> of {props.totalPages || 12}
            </p>
          </div>
        );
      },
      codeSnippets: {
        tailwind: `import { NeumorphicPagination } from '@/components/Pagination';

export function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <NeumorphicPagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
    />
  );
}`,
        css: `/* Pagination Steps */
.nms-page-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.55rem;
  background-color: var(--nms-bg-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
}
.nms-page-btn-active {
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  color: var(--nms-secondary-color);
}`,
      },
    },
  ],
};
