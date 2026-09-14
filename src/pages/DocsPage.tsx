import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { AppView } from '../hooks/useRegistry';
import { useTheme } from '../hooks/useTheme';

interface DocsPageProps {
  onNavigate: (view: AppView, componentId?: string) => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const codeTheme = themes.nightOwl;
  const codeBgClass = 'bg-[#12141a] text-neutral-200';
  const headerBgClass = 'bg-[#181a20] border-b border-black/40 text-neutral-300';
  const lineNumClass = 'text-neutral-600';

  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'bun' | 'yarn'>('npm');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getInstallCmd = () => {
    switch (pkgManager) {
      case 'pnpm':
        return 'pnpm add lucide-react framer-motion clsx tailwind-merge';
      case 'bun':
        return 'bun add lucide-react framer-motion clsx tailwind-merge';
      case 'yarn':
        return 'yarn add lucide-react framer-motion clsx tailwind-merge';
      case 'npm':
      default:
        return 'npm install lucide-react framer-motion clsx tailwind-merge';
    }
  };

  const cssTokensCode = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Light Theme Surface (#e6e7ee) */
  --nms-bg-color: #e6e7ee;
  --nms-hover-bg: #b7bdc6;
  --nms-delete-bg: #eee6e6;

  /* Typography */
  --nms-text-color: #31344b;
  --nms-input-text: #44476A;

  /* Strokes & Focus */
  --nms-border-color: #D1D9E6;
  --nms-focus-border: #9fb3db;

  /* 135-deg Directional Shadow Offsets */
  --nms-shadow-dark: #b8b9be;
  --nms-shadow-light: #ffffff;

  /* Soft Mineral Semantic Tones */
  --nms-info-color: #3d5a80;
  --nms-success-color: #2d6a4f;
  --nms-warning-color: #8c6227;
  --nms-danger-color: #9e3b47;
  --nms-secondary-color: #3d5a80;
}

:root.dark, html.dark, body.dark, .dark {
  /* Dark Theme Surface (#1a1a1a) */
  --nms-bg-color: #1a1a1a;
  --nms-hover-bg: #2d2d2d;
  --nms-delete-bg: #2a1a1a;

  /* Typography */
  --nms-text-color: #e5e5e5;
  --nms-input-text: #d0d0d0;

  /* Strokes & Focus */
  --nms-border-color: rgba(255, 255, 255, 0.08);
  --nms-focus-border: #5b7db1;

  /* 135-deg Directional Shadow Offsets */
  --nms-shadow-dark: #0a0a0a;
  --nms-shadow-light: #282828;

  /* Soft Pastel Semantic Tones */
  --nms-info-color: #7aa2dc;
  --nms-success-color: #68b684;
  --nms-warning-color: #d8a952;
  --nms-danger-color: #d97078;
  --nms-secondary-color: #7aa2dc;
}`;

  const tailwindConfigCode = `import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          base: 'var(--nms-bg-color)',
          surface: 'var(--nms-bg-color)',
          well: 'var(--nms-hover-bg)',
          primary: 'var(--nms-text-color)',
          border: 'var(--nms-border-color)',
          focus: 'var(--nms-focus-border)',
          secondary: 'var(--nms-secondary-color)',
          info: 'var(--nms-info-color)',
          success: 'var(--nms-success-color)',
          warning: 'var(--nms-warning-color)',
          danger: 'var(--nms-danger-color)',
        },
      },
      boxShadow: {
        'neo-raised-sm': '3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light)',
        'neo-raised-md': '6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light)',
        'neo-raised-lg': '9px 9px 18px var(--nms-shadow-dark), -9px -9px 18px var(--nms-shadow-light)',
        'neo-inset-sm': 'inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light)',
        'neo-inset-md': 'inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light)',
        'neo-inset-lg': 'inset 6px 6px 14px var(--nms-shadow-dark), inset -6px -6px 14px var(--nms-shadow-light)',
      },
      borderRadius: {
        'neo-control': '0.55rem',
        'neo-badge': '0.25rem',
        'neo-card': '0.75rem',
        'neo-card-lg': '1.0rem',
        'neo-pill': '9999px',
      },
      fontFamily: {
        sans: ['"Nunito"', '"Nunito Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;`;

  const componentUsageCode = `import React from 'react';
import { NeumorphicButton } from '@/components/ui/Button';
import { NeumorphicBadge } from '@/components/ui/Badge';

export function MyDashboard() {
  return (
    <div className="p-8 bg-neo-base min-h-screen text-neo-primary space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">System Status</h1>
        <NeumorphicBadge color="success">Operational</NeumorphicBadge>
      </div>
      <NeumorphicButton variant="raised">
        Deploy Changes
      </NeumorphicButton>
    </div>
  );
}`;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left pb-24">
      {/* Header Banner */}
      <div className="space-y-3 pb-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary">
          Documentation & Setup
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neo-primary">
          Quickstart & Installation Guide
        </h1>
        <p className="text-sm text-neo-primary/70 max-w-2xl leading-relaxed">
          Add authentic Neumorphic styling to your React & Tailwind application in three easy steps.
        </p>
      </div>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* STEP 1: CSS Variables */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-xs font-black text-neo-secondary">
            1
          </span>
          <h2 className="text-xl font-bold text-neo-primary">
            Step 1: CSS Variables & Design Tokens
          </h2>
        </div>
        <p className="text-xs text-neo-primary/70">
          Paste the base lighting variables into your global stylesheet (e.g., <code className="font-mono text-neo-secondary">src/index.css</code> or <code className="font-mono text-neo-secondary">app/globals.css</code>).
        </p>

        <div className="relative rounded-neo-card bg-[#12141a] shadow-neo-raised-md border border-black/40 dark:border-white/[0.03] overflow-hidden">
          <div className={`flex items-center justify-between px-4 py-2.5 ${headerBgClass} text-xs font-mono`}>
            <span className="text-neutral-400">src/index.css</span>
            <button
              onClick={() => copyToClipboard(cssTokensCode, 'step1')}
              className="px-2.5 py-1 rounded-neo-control bg-[#222530] hover:bg-[#2b2f3d] border border-neutral-700/60 text-neutral-200 transition-colors text-xs font-sans font-semibold"
            >
              {copiedSection === 'step1' ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className={`p-4 overflow-x-auto text-xs font-mono max-h-96 ${codeBgClass} transition-colors duration-200`}>
            <Highlight theme={codeTheme} code={cssTokensCode} language="css">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className={`inline-block w-8 ${lineNumClass} select-none text-right pr-3`}>
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </section>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* STEP 2: Tailwind Config */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-xs font-black text-neo-secondary">
            2
          </span>
          <h2 className="text-xl font-bold text-neo-primary">
            Step 2: Extend Tailwind Configuration
          </h2>
        </div>
        <p className="text-xs text-neo-primary/70">
          Update <code className="font-mono text-neo-secondary">tailwind.config.ts</code> with the 135° shadow elevation scales, border radii, and token colors.
        </p>

        <div className="relative rounded-neo-card bg-[#12141a] shadow-neo-raised-md border border-black/40 dark:border-white/[0.03] overflow-hidden">
          <div className={`flex items-center justify-between px-4 py-2.5 ${headerBgClass} text-xs font-mono`}>
            <span className="text-neutral-400">tailwind.config.ts</span>
            <button
              onClick={() => copyToClipboard(tailwindConfigCode, 'step2')}
              className="px-2.5 py-1 rounded-neo-control bg-[#222530] hover:bg-[#2b2f3d] border border-neutral-700/60 text-neutral-200 transition-colors text-xs font-sans font-semibold"
            >
              {copiedSection === 'step2' ? 'Copied' : 'Copy Config'}
            </button>
          </div>
          <div className={`p-4 overflow-x-auto text-xs font-mono max-h-96 ${codeBgClass} transition-colors duration-200`}>
            <Highlight theme={codeTheme} code={tailwindConfigCode} language="typescript">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className={`inline-block w-8 ${lineNumClass} select-none text-right pr-3`}>
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </section>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* STEP 3: Dependencies & Component Integration */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-xs font-black text-neo-secondary">
            3
          </span>
          <h2 className="text-xl font-bold text-neo-primary">
            Step 3: Install Dependencies & Copy Components
          </h2>
        </div>
        <p className="text-xs text-neo-primary/70">
          Install the supporting icon and animation utilities, then drop any component from our registry straight into your <code className="font-mono text-neo-secondary">components/ui/</code> directory.
        </p>

        {/* Package Manager Tabs */}
        <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neo-border/30 dark:border-black/50 dark:border-b-white/[0.02]">
            <span className="text-xs font-bold text-neo-primary">Install Supporting Packages</span>

            <div className="flex items-center gap-1.5 p-1 rounded-neo-badge shadow-neo-inset-sm bg-neo-well/40 border border-neo-border/40 dark:border-white/[0.03]">
              {(['npm', 'pnpm', 'bun', 'yarn'] as const).map((mgr) => (
                <button
                  key={mgr}
                  onClick={() => setPkgManager(mgr)}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-neo-badge transition-all ${
                    pkgManager === mgr
                      ? 'shadow-neo-raised-sm bg-neo-surface text-neo-primary font-black border border-neo-border/40 dark:border-white/[0.03]'
                      : 'text-neo-primary/60 hover:text-neo-primary'
                  }`}
                >
                  {mgr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-neo-control bg-[#12141a] border border-black/40 dark:border-white/[0.03] shadow-inner">
            <div className="flex items-center gap-2.5 overflow-hidden mr-2">
              <span className="text-xs font-mono font-bold text-neutral-500 select-none">$</span>
              <code className="text-xs font-mono font-bold text-emerald-400 dark:text-emerald-300 truncate">
                {getInstallCmd()}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(getInstallCmd(), 'installCmd')}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-neo-control bg-[#1e222d] hover:bg-[#2b3040] active:bg-[#12141a] border border-neutral-700/60 text-xs font-bold text-neutral-200 transition-all shadow-sm"
            >
              {copiedSection === 'installCmd' ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Example Usage Snippet */}
        <div className="relative rounded-neo-card bg-[#12141a] shadow-neo-raised-md border border-black/40 dark:border-white/[0.03] overflow-hidden">
          <div className={`flex items-center justify-between px-4 py-2.5 ${headerBgClass} text-xs font-mono`}>
            <span className="text-neutral-400">Example Component Usage</span>
            <button
              onClick={() => copyToClipboard(componentUsageCode, 'usage')}
              className="px-2.5 py-1 rounded-neo-control bg-[#222530] hover:bg-[#2b2f3d] border border-neutral-700/60 text-neutral-200 transition-colors text-xs font-sans font-semibold"
            >
              {copiedSection === 'usage' ? 'Copied' : 'Copy TSX'}
            </button>
          </div>
          <div className={`p-4 overflow-x-auto text-xs font-mono ${codeBgClass} transition-colors duration-200`}>
            <Highlight theme={codeTheme} code={componentUsageCode} language="tsx">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className={`inline-block w-8 ${lineNumClass} select-none text-right pr-3`}>
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </section>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* Next Step Banner */}
      <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-neo-primary">Ready to build?</h3>
          <p className="text-xs text-neo-primary/70">
            Browse our catalog of 28+ tactile components with full copyable TSX source code, CLI commands, and CSS tokens.
          </p>
        </div>
        <button
          onClick={() => onNavigate('components')}
          className="px-5 py-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
        >
          Browse Components →
        </button>
      </div>
    </div>
  );
};
