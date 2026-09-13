import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicSkeleton } from '../components/Skeleton';

export const skeletonDefinition: RegistryComponent = {
  id: 'skeleton',
  title: 'Shimmer Skeleton Loader',
  category: 'Feedback & Progress',
  description:
    'Tactile placeholder containers with soft rounded contours and an animated light shimmer reflection gradient sweeping across the clay surface.',
  tokens: [
    {
      name: 'Skeleton Trench',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Recessed placeholder well with sweeping light sheen',
    },
  ],
  variants: [
    {
      id: 'skeleton-card',
      name: 'Card & Profile Skeleton',
      description: 'Placeholder mockup for loading content states.',
      previewComponent: () => (
        <div className="w-full max-w-sm p-5 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4 text-left">
          {/* Avatar and header row */}
          <div className="flex items-center gap-3">
            <NeumorphicSkeleton variant="circular" width={48} height={48} />
            <div className="space-y-2 flex-1">
              <NeumorphicSkeleton variant="text" width="65%" height={14} />
              <NeumorphicSkeleton variant="text" width="40%" height={10} />
            </div>
          </div>
          {/* Main content body */}
          <NeumorphicSkeleton variant="rectangular" height={80} />
          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <NeumorphicSkeleton variant="text" width={80} height={20} />
            <NeumorphicSkeleton variant="text" width={60} height={20} />
          </div>
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicSkeleton } from '@/components/Skeleton';

export function SkeletonDemo() {
  return (
    <div className="p-5 rounded-2xl bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4">
      <div className="flex items-center gap-3">
        <NeumorphicSkeleton variant="circular" width={48} height={48} />
        <div className="space-y-2 flex-1">
          <NeumorphicSkeleton variant="text" width="60%" />
          <NeumorphicSkeleton variant="text" width="40%" />
        </div>
      </div>
      <NeumorphicSkeleton variant="rectangular" height={80} />
    </div>
  );
}`,
        css: `/* Neumorphic Shimmer Skeleton */
.nms-skeleton {
  background-color: var(--nms-hover-bg);
  box-shadow: inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light);
  border-radius: 0.55rem;
  overflow: hidden;
  position: relative;
}`,
      },
    },
  ],
};
