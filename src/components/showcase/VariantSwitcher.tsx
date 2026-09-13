import React from 'react';
import { ComponentVariant } from '../../types/registry';
import { motion } from 'framer-motion';

interface VariantSwitcherProps {
  variants: ComponentVariant[];
  activeVariantId: string;
  onSelectVariant: (variantId: string) => void;
}

export const VariantSwitcher: React.FC<VariantSwitcherProps> = ({
  variants,
  activeVariantId,
  onSelectVariant,
}) => {
  if (variants.length <= 1) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
      <div className="inline-flex p-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/40 border border-neo-border">
        {variants.map((variant) => {
          const isActive = activeVariantId === variant.id;
          return (
            <button
              key={variant.id}
              onClick={() => onSelectVariant(variant.id)}
              className={`relative px-3.5 py-1.5 rounded-neo-pill text-xs font-semibold select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
                isActive ? 'text-neo-secondary' : 'text-neo-primary/60 hover:text-neo-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeVariantTab"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-neo-pill bg-neo-surface shadow-neo-raised-sm border border-neo-border"
                />
              )}
              <span className="relative z-10">{variant.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
