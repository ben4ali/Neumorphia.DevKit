import React, { useState, useEffect } from 'react';
import { RegistryComponent, ComponentVariant } from '../../types/registry';
import { VariantSwitcher } from './VariantSwitcher';
import { DynamicControls } from './DynamicControls';
import { CodeViewer } from './CodeViewer';
import { TokenReferenceTable } from './TokenReferenceTable';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowcaseCanvasProps {
  component: RegistryComponent;
  activeVariant: ComponentVariant;
  onSelectVariant: (id: string) => void;
}

export const ShowcaseCanvas: React.FC<ShowcaseCanvasProps> = ({
  component,
  activeVariant,
  onSelectVariant,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [propValues, setPropValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const initialValues: Record<string, any> = {};
    activeVariant.controls?.forEach((ctrl) => {
      initialValues[ctrl.name] = ctrl.defaultValue;
    });
    setPropValues(initialValues);
  }, [activeVariant.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handlePropChange = (name: string, val: any) => {
    setPropValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleResetProps = () => {
    const defaultValues: Record<string, any> = {};
    activeVariant.controls?.forEach((ctrl) => {
      defaultValues[ctrl.name] = ctrl.defaultValue;
    });
    setPropValues(defaultValues);
  };

  const PreviewComponent = activeVariant.previewComponent;

  const tailwindSnippet =
    typeof activeVariant.codeSnippets.tailwind === 'function'
      ? activeVariant.codeSnippets.tailwind(propValues)
      : activeVariant.codeSnippets.tailwind;

  const cssSnippet =
    typeof activeVariant.codeSnippets.css === 'function'
      ? activeVariant.codeSnippets.css(propValues)
      : activeVariant.codeSnippets.css;

  return (
    <div className="flex-1 w-full py-6 px-4 sm:px-6 lg:px-8 space-y-6 text-left">
      {/* Component Title & Metadata Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neo-secondary">
          {component.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-primary tracking-tight">
          {component.title}
        </h1>
        <p className="text-xs sm:text-sm text-neo-primary/70 max-w-2xl leading-relaxed">
          {component.description}
        </p>
      </div>

      {/* Variant Selector Tabs */}
      <VariantSwitcher
        variants={component.variants}
        activeVariantId={activeVariant.id}
        onSelectVariant={onSelectVariant}
      />

      {/* Interactive Canvas Surface Container */}
      <div className="rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] overflow-hidden">
        {/* Canvas Stage Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neo-well/30 border-b border-neo-border/30 dark:border-black/50 dark:border-b-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neo-primary">{activeVariant.name}</span>
            <span className="text-[11px] text-neo-primary/50 hidden sm:inline">
              — {activeVariant.description}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Real Fullscreen Canvas Expansion Toggle */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary border border-neo-border transition-all"
              title="Expand Canvas to Fullscreen (Esc to exit)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Expand Canvas</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Canvas Body */}
        <div className="min-h-[260px] p-8 sm:p-12 flex items-center justify-center bg-neo-surface transition-colors duration-200 relative overflow-hidden">
          <motion.div
            key={activeVariant.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="w-full flex items-center justify-center"
          >
            <PreviewComponent props={propValues} />
          </motion.div>
        </div>

        {/* Dynamic Props Controls Panel */}
        <DynamicControls
          controls={activeVariant.controls || []}
          values={propValues}
          onChange={handlePropChange}
          onReset={handleResetProps}
        />
      </div>

      {/* Fullscreen Expanded Stage Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Expanded Canvas Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-neo-card-lg bg-neo-base border border-neo-border shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Top Modal Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neo-border/30 dark:border-black/50 dark:border-b-white/[0.02] bg-neo-surface">
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neo-secondary uppercase">
                      {component.title}
                    </span>
                    <span className="text-xs text-neo-primary/40">•</span>
                    <span className="text-xs font-bold text-neo-primary">{activeVariant.name}</span>
                  </div>
                  <p className="text-[11px] text-neo-primary/60">{activeVariant.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary border border-neo-border transition-all"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Fullscreen Interactive Canvas */}
              <div className="flex-1 p-12 flex items-center justify-center bg-neo-base overflow-auto">
                <PreviewComponent props={propValues} />
              </div>

              {/* Controls in Fullscreen */}
              <DynamicControls
                controls={activeVariant.controls || []}
                values={propValues}
                onChange={handlePropChange}
                onReset={handleResetProps}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Code Inspector (Component Source, CLI, Usage, Vanilla CSS) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neo-secondary">
          Component Source & Integration Code
        </h2>
        <CodeViewer
          componentId={component.id}
          tailwindSnippet={tailwindSnippet}
          cssSnippet={cssSnippet}
        />
      </div>

      {/* Design Token & Shadow Reference Table */}
      <TokenReferenceTable tokens={component.tokens} />
    </div>
  );
};
