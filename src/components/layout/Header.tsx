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
    <header className="sticky top-0 z-40 w-full border-b border-neo-border bg-neo-base transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <button
          onClick={() => onSelectView('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-neo-control shadow-neo-raised-sm group-hover:shadow-neo-raised-md bg-neo-surface border border-neo-border flex items-center justify-center p-2 select-none transition-all">
            <Logo size={24} className="text-neo-primary" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-neo-primary">
              Neumorphia<span className="text-neo-secondary font-black">.DevKit</span>
            </span>
          </div>
        </button>

        {/* Center Text Navigation (Clean, Spacious, Easy to Click) */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-neo-control transition-all duration-150 ${
                  isActive
                    ? 'shadow-neo-raised-sm bg-neo-base text-neo-secondary border border-neo-border font-bold'
                    : 'text-neo-primary/70 hover:text-neo-primary hover:bg-neo-well/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-medium text-neo-primary/80 hover:text-neo-primary transition-all"
            title="Search components and guides (Ctrl + K)"
          >
            <span>Search</span>
            <kbd className="px-2 py-0.5 text-xs font-mono font-bold rounded-neo-badge shadow-neo-inset-sm bg-neo-well/30 border border-neo-border text-neo-primary/70">
              Ctrl + K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-neo-primary border border-neo-border transition-all flex items-center justify-center"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-neo-primary/80" />
            ) : (
              <Sun className="w-4 h-4 text-neo-primary" />
            )}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/ben4ali/Neumorphia.DevKit"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-sm font-bold text-neo-primary border border-neo-border transition-all"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Mobile Subnavigation Strip (Clean Text Links) */}
      <div className="md:hidden flex items-center justify-around border-t border-neo-border px-3 py-2 bg-neo-base">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-neo-badge transition-all ${
                isActive
                  ? 'shadow-neo-raised-sm bg-neo-base text-neo-secondary border border-neo-border font-bold'
                  : 'text-neo-primary/70 hover:text-neo-primary'
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
