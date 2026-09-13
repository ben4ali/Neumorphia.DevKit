import React, { useState } from 'react';
import { categories, getComponentsByCategory } from '../../registry';
import { ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onSelectComponent: (id: string) => void;
  filterQuery: string;
  onFilterChange: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  onSelectComponent,
  filterQuery,
  onFilterChange,
}) => {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Search / Filter Input */}
      <div>
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Filter components..."
          className="w-full h-8 bg-neo-surface text-neo-input placeholder:text-neo-primary/40 shadow-neo-inset-sm rounded-neo-control px-3 text-xs border border-neo-border outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus transition-all"
        />
      </div>

      {/* Category Tree */}
      <div className="space-y-4">
        {categories.map((category) => {
          const items = getComponentsByCategory(category).filter(
            (c) =>
              c.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
              c.description.toLowerCase().includes(filterQuery.toLowerCase())
          );

          if (items.length === 0 && filterQuery) return null;

          const isCollapsed = collapsedCategories[category];

          return (
            <div key={category} className="space-y-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-neo-primary/70 uppercase tracking-wider hover:text-neo-primary transition-colors group"
              >
                <span>{category}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neo-primary/40 transition-transform duration-200 ${
                    isCollapsed ? '-rotate-90' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Component Items List with Enhanced Tactile Hover Feedback */}
              {!isCollapsed && (
                <div className="space-y-1 pl-1">
                  {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectComponent(item.id)}
                        className={`w-full flex items-center px-3 py-1.5 rounded-neo-control text-xs font-semibold transition-all duration-150 text-left ${
                          isActive
                            ? 'shadow-neo-inset-sm bg-neo-well/50 text-neo-secondary border border-neo-border translate-x-1 font-bold'
                            : 'text-neo-primary/70 hover:text-neo-primary hover:bg-neo-surface hover:shadow-neo-raised-sm hover:border hover:border-neo-border hover:translate-x-1.5 border border-transparent'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
