import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useRegistry } from './hooks/useRegistry';
import { useSEO } from './hooks/useSEO';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { CommandMenu } from './components/layout/CommandMenu';
import { ShowcaseCanvas } from './components/showcase/ShowcaseCanvas';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AIPromptsPage } from './pages/AIPromptsPage';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    activeView,
    selectView,
    activeComponentId,
    activeVariantId,
    currentComponent,
    currentVariant,
    selectComponent,
    selectVariant,
  } = useRegistry();

  // Dynamic Enterprise SEO & JSON-LD Synchronization
  useSEO(activeView, activeView === 'components' ? currentComponent : undefined);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div className="min-h-screen bg-neo-base text-neo-primary flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Fixed Solid Navbar */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeView={activeView}
        onSelectView={selectView}
      />

      {/* Main View Container */}
      <div className="flex-1 flex flex-col">
        {activeView === 'home' && (
          <HomePage
            onNavigate={(view, componentId) => {
              if (componentId) {
                selectComponent(componentId);
              } else {
                selectView(view);
              }
            }}
          />
        )}

        {activeView === 'components' && (
          <div className="flex-1 max-w-7xl w-full mx-auto flex">
            {/* Left Category Sidebar */}
            <Sidebar
              activeId={activeComponentId}
              onSelectComponent={(id) => selectComponent(id)}
              filterQuery={filterQuery}
              onFilterChange={setFilterQuery}
            />

            {/* Vertical Engraved Divider */}
            <div className="hidden lg:block nms-divider-v self-stretch my-2" />

            {/* Central Component Canvas */}
            <main className="flex-1 min-w-0 pb-16">
              <ShowcaseCanvas
                component={currentComponent}
                activeVariant={currentVariant}
                onSelectVariant={selectVariant}
              />

              {/* Design Token Reference Quick Spec */}
              <section id="token-specs" className="w-full px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
                <div className="p-5 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3 text-left">
                  <h3 className="text-sm font-bold text-neo-primary">
                    Lighting & Contrast Reference
                  </h3>
                  <p className="text-xs text-neo-primary/70 leading-relaxed">
                    Components calculate shadows from a simulated <span className="font-semibold text-neo-secondary">135° directional light source</span>. Light mode utilizes cool gray clay (<code className="font-mono text-neo-secondary">#e6e7ee</code>) with 8.44:1 AAA text contrast, and Dark mode utilizes charcoal clay (<code className="font-mono text-neo-secondary">#1a1a1a</code>) with 12.65:1 AAA text contrast.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 space-y-0.5">
                      <span className="text-[10px] font-bold text-neo-primary/60 uppercase">Light Surface</span>
                      <p className="text-xs font-mono font-bold text-neo-primary">#e6e7ee</p>
                    </div>
                    <div className="p-2.5 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 space-y-0.5">
                      <span className="text-[10px] font-bold text-neo-primary/60 uppercase">Dark Surface</span>
                      <p className="text-xs font-mono font-bold text-neo-primary">#1a1a1a</p>
                    </div>
                    <div className="p-2.5 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 space-y-0.5">
                      <span className="text-[10px] font-bold text-neo-primary/60 uppercase">Shadow Dark</span>
                      <p className="text-xs font-mono font-bold text-neo-primary">#b8b9be</p>
                    </div>
                    <div className="p-2.5 rounded-neo-control shadow-neo-inset-sm bg-neo-well/30 space-y-0.5">
                      <span className="text-[10px] font-bold text-neo-primary/60 uppercase">Light Highlight</span>
                      <p className="text-xs font-mono font-bold text-neo-primary">#ffffff</p>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        )}

        {activeView === 'docs' && (
          <DocsPage
            onNavigate={(view, componentId) => {
              if (componentId) {
                selectComponent(componentId);
              } else {
                selectView(view);
              }
            }}
          />
        )}

        {activeView === 'playground' && <PlaygroundPage />}

        {activeView === 'ai' && (
          <AIPromptsPage
            onNavigate={(view, componentId) => {
              if (componentId) {
                selectComponent(componentId);
              } else {
                selectView(view);
              }
            }}
          />
        )}
      </div>

      {/* Solid Application Footer */}
      <Footer onNavigate={selectView} />

      {/* Global Command Palette (⌘K) */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectComponent={(id, vId) => selectComponent(id, vId)}
        onSelectView={selectView}
      />
    </div>
  );
}

export default App;
