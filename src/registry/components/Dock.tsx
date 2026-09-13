import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NeumorphicDockProps {
  items: DockItem[];
  className?: string;
}

export const NeumorphicDock: React.FC<NeumorphicDockProps> = ({ items, className = '' }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  return (
    <div className={`inline-flex items-center gap-2 p-2 rounded-neo-pill bg-neo-surface shadow-neo-raised-md border border-neo-border select-none ${className}`}>
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const isActive = activeId === item.id;

        return (
          <div key={item.id} className="relative group">
            {/* Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-neo-badge bg-neo-surface shadow-neo-raised-sm border border-neo-border text-[10px] font-semibold text-neo-primary whitespace-nowrap pointer-events-none transition-opacity duration-150 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.label}
            </div>

            {/* Dock Icon Button */}
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setActiveId(item.id);
                item.onClick?.();
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
                isActive
                  ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-secondary border-neo-border'
                  : 'shadow-neo-raised-sm bg-neo-surface hover:shadow-neo-raised-md text-neo-primary/80 hover:text-neo-primary border-neo-border active:shadow-neo-inset-sm'
              }`}
              aria-label={item.label}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};
