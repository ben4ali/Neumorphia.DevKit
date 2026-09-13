import React, { useState, useEffect } from 'react';
import { getAllComponents } from '../../registry';
import { AppView } from '../../hooks/useRegistry';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (id: string, variantId?: string) => void;
  onSelectView: (view: AppView) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
  onSelectView,
}) => {
  const [query, setQuery] = useState('');
  const allComponents = getAllComponents();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pages: { id: AppView; title: string; desc: string }[] = [
    { id: 'home', title: 'Guide & Overview', desc: 'Practical manual explaining Neumorphic UI, lighting physics, and best use cases' },
    { id: 'components', title: 'Components Catalog', desc: 'Browse all 28+ interactive tactile components' },
    { id: 'docs', title: 'Installation & Setup', desc: 'Tailwind config, CSS variables, and step-by-step project setup' },
    { id: 'playground', title: 'Sandbox & CSS Generator', desc: 'Interactive real-time 135° shadow tuning & CSS export' },
  ];

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredComponents = allComponents.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Palette Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-xl rounded-neo-card-lg bg-neo-surface border border-neo-border shadow-2xl overflow-hidden z-10 space-y-3 p-4 text-left"
      >
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-neo-primary/40" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guide, components, tokens, sandbox..."
            className="w-full h-11 bg-neo-surface text-neo-input placeholder:text-neo-primary/40 shadow-neo-inset-sm rounded-neo-control pl-10 pr-10 text-sm border border-neo-border outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-neo-primary/40 hover:text-neo-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Stream */}
        <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
          {/* Pages Group */}
          {filteredPages.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neo-primary/50 px-2">
                Pages & Guides
              </span>
              {filteredPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onSelectView(page.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-neo-control text-xs hover:bg-neo-well/40 transition-colors border border-transparent hover:border-neo-border group text-left"
                >
                  <div>
                    <span className="font-bold text-neo-primary group-hover:text-neo-secondary transition-colors">
                      {page.title}
                    </span>
                    <p className="text-[11px] text-neo-primary/60 line-clamp-1">{page.desc}</p>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-neo-primary/40 group-hover:text-neo-secondary" />
                </button>
              ))}
            </div>
          )}

          {/* Components Group */}
          {filteredComponents.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neo-primary/50 px-2">
                Component Registry ({filteredComponents.length})
              </span>
              {filteredComponents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectComponent(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-neo-control text-xs hover:bg-neo-well/40 transition-colors border border-transparent hover:border-neo-border group text-left"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neo-primary group-hover:text-neo-secondary transition-colors">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.2 text-[9px] font-semibold rounded-neo-badge shadow-neo-inset-sm text-neo-primary/60">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neo-primary/60 line-clamp-1">{item.description}</p>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-neo-primary/40 group-hover:text-neo-secondary" />
                </button>
              ))}
            </div>
          )}

          {filteredPages.length === 0 && filteredComponents.length === 0 && (
            <div className="py-8 text-center text-xs text-neo-primary/50">
              No results found matching "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-neo-border/40 text-[10px] text-neo-primary/50">
          <span>Search navigation</span>
          <div className="flex items-center gap-2">
            <span>Esc to close</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
