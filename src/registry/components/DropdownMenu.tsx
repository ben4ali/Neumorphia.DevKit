import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface NeumorphicDropdownMenuProps {
  triggerLabel?: string;
  items: DropdownMenuItem[];
  className?: string;
}

export const NeumorphicDropdownMenu: React.FC<NeumorphicDropdownMenuProps> = ({
  triggerLabel = 'Options',
  items,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 px-4 py-2 rounded-neo-control text-xs font-semibold select-none border border-neo-border transition-all outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${
          isOpen
            ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-secondary'
            : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary hover:shadow-neo-raised-md'
        }`}
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-neo-secondary' : 'text-neo-primary/60'
          }`}
        />
      </button>

      {/* Floating Menu List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-52 rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border p-1.5 z-50 space-y-0.5"
            role="menu"
          >
            {items.map((item) => (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-neo-control text-xs font-medium transition-all text-left outline-none ${
                  item.destructive
                    ? 'text-neo-danger hover:bg-neo-danger/[0.07] active:shadow-neo-delete-inset'
                    : 'text-neo-primary hover:bg-neo-well/30 active:shadow-neo-inset-sm hover:text-neo-secondary'
                } ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon && <span className="w-3.5 h-3.5 opacity-80">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[10px] font-mono text-neo-primary/40">{item.shortcut}</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
