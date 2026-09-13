import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../hooks/useTheme';
import { AppView } from '../../hooks/useRegistry';
import { Logo } from '../common/Logo';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  activeView: AppView;
  onSelectView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenSearch,
  activeView,
  onSelectView,
}) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'home', label: 'Guide & Overview' },
    { id: 'components', label: 'Components' },
    { id: 'docs', label: 'Installation' },
    { id: 'playground', label: 'Sandbox' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neo-border bg-neo-base transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <button
          onClick={() => onSelectView('home')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center p-1.5 select-none">
            <Logo size={20} className="text-neo-primary" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-neo-primary">
              Neumorphia<span className="text-neo-secondary font-black">.DevKit</span>
            </span>
          </div>
        </button>

        {/* Center Text Navigation (Clean, No Icons) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-neo-badge transition-all duration-150 ${
                  isActive
                    ? 'shadow-neo-raised-sm bg-neo-base text-neo-secondary border border-neo-border font-bold'
                    : 'text-neo-primary/60 hover:text-neo-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs text-neo-primary/70 hover:text-neo-primary transition-all"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded-neo-badge shadow-neo-inset-sm bg-neo-well/20 border border-neo-border text-neo-primary/60">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-neo-primary border border-neo-border transition-all"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-neo-primary/80" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-neo-primary" />
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/ben4ali/Neumorphia.DevKit"
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary border border-neo-border transition-all"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Mobile Subnavigation Strip (Clean Text Links) */}
      <div className="md:hidden flex items-center justify-around border-t border-neo-border px-2 py-1.5 bg-neo-base">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-neo-badge transition-all ${
                isActive
                  ? 'shadow-neo-raised-sm bg-neo-base text-neo-secondary border border-neo-border font-bold'
                  : 'text-neo-primary/60 hover:text-neo-primary'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
