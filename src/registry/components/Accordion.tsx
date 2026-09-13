import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

export interface NeumorphicAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export const NeumorphicAccordion: React.FC<NeumorphicAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className = '',
}) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setExpanded((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpanded((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 w-full max-w-2xl text-left ${className}`}>
      {items.map((item) => {
        const isOpen = expanded.includes(item.id);

        return (
          <div
            key={item.id}
            className="rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border overflow-hidden transition-all duration-200"
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-xs sm:text-sm font-bold text-neo-primary select-none outline-none focus-visible:ring-2 focus-visible:ring-neo-focus group"
            >
              <span className="flex items-center gap-2.5">
                {item.title}
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-neo-badge shadow-neo-inset-sm text-neo-secondary border border-neo-border">
                    {item.badge}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neo-primary/60 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-neo-secondary' : ''
                }`}
              />
            </button>

            {/* Content Well */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-1">
                    <div className="p-4 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 border border-neo-border text-xs sm:text-sm text-neo-primary/80 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
