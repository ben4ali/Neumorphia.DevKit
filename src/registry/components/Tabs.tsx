import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface NeumorphicTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  layoutId?: string;
  className?: string;
}

export const NeumorphicTabs: React.FC<NeumorphicTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  size = 'md',
  layoutId = 'neumorphicTabIndicator',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'p-1 text-xs gap-1',
    md: 'p-1.5 text-sm gap-1.5',
    lg: 'p-2 text-base gap-2',
  }[size];

  const itemPadding = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5',
  }[size];

  return (
    <div
      role="tablist"
      className={`inline-flex items-center rounded-neo-pill shadow-neo-inset-sm bg-neo-well/40 border border-neo-border select-none ${sizeClasses} ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center justify-center gap-2 font-semibold transition-colors duration-200 rounded-neo-pill outline-none focus-visible:ring-2 focus-visible:ring-neo-focus ${itemPadding} ${
              isActive ? 'text-neo-secondary' : 'text-neo-primary/60 hover:text-neo-primary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-neo-pill bg-neo-surface shadow-neo-raised-sm border border-neo-border"
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full shadow-neo-inset-sm bg-neo-well/60 text-neo-secondary">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
