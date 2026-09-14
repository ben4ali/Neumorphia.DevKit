import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { getComponentSource } from '../../registry/sources';

interface CodeViewerProps {
  componentId: string;
  tailwindSnippet: string;
  cssSnippet: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  componentId,
  tailwindSnippet,
  cssSnippet,
}) => {
  const codeTheme = themes.nightOwl;
  const codeBgClass = 'bg-[#12141a] text-neutral-200';
  const lineNumClass = 'text-neutral-600';

  const sourceInfo = getComponentSource(componentId);

  const [activeTab, setActiveTab] = useState<'source' | 'usage' | 'cli' | 'css'>('source');
  const [copied, setCopied] = useState(false);
  const [cliPkg, setCliPkg] = useState<'npx' | 'pnpm' | 'bun' | 'curl'>('npx');

  const getCliCommand = () => {
    switch (cliPkg) {
      case 'pnpm':
        return `pnpm dlx neumorphia-devkit add ${componentId}`;
      case 'bun':
        return `bunx neumorphia-devkit add ${componentId}`;
      case 'curl':
        return sourceInfo.curlCmd;
      case 'npx':
      default:
        return `npx neumorphia-devkit add ${componentId}`;
    }
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'cli':
        return getCliCommand();
      case 'source':
        return sourceInfo.source;
      case 'usage':
        return tailwindSnippet;
      case 'css':
        return cssSnippet;
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'cli':
        return 'bash';
      case 'source':
      case 'usage':
        return 'tsx';
      case 'css':
        return 'css';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent().trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] overflow-hidden text-left">
      {/* Code Header Bar (Clean text-only tabs without icons) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-neo-well/30 border-b border-neo-border/30 dark:border-black/50">
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Mode Tabs */}
          <div className="inline-flex p-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-surface border border-neo-border/40 dark:border-white/[0.03] text-xs">
            <button
              onClick={() => setActiveTab('source')}
              className={`px-3 py-1 rounded-neo-pill font-semibold transition-all ${
                activeTab === 'source'
                  ? 'bg-neo-secondary text-white shadow-sm font-bold'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
              title="Full production-ready React component code"
            >
              <span>{sourceInfo.fileName} (Source)</span>
            </button>

            <button
              onClick={() => setActiveTab('usage')}
              className={`px-3 py-1 rounded-neo-pill font-semibold transition-all ${
                activeTab === 'usage'
                  ? 'bg-neo-secondary text-white shadow-sm font-bold'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
              title="How to use this component in your pages"
            >
              <span>Usage Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('cli')}
              className={`px-3 py-1 rounded-neo-pill font-semibold transition-all ${
                activeTab === 'cli'
                  ? 'bg-neo-secondary text-white shadow-sm font-bold'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
              title="Install or download via CLI/cURL"
            >
              <span>CLI / Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded-neo-pill font-semibold transition-all ${
                activeTab === 'css'
                  ? 'bg-neo-secondary text-white shadow-sm font-bold'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
              title="Raw Vanilla CSS shadow rules"
            >
              <span>Vanilla CSS</span>
            </button>
          </div>
        </div>

        {/* Copy Button & Target Path Info */}
        <div className="flex items-center gap-2">
          {activeTab === 'source' && (
            <span className="hidden sm:inline-block font-mono text-[11px] text-neo-primary/60 px-2.5 py-0.5 rounded-neo-badge bg-neo-well/30 border border-neo-border/30 dark:border-white/[0.02]">
              src/components/ui/{sourceInfo.fileName}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary border border-neo-border/40 dark:border-white/[0.03] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neo-secondary" />
                <span>
                  {activeTab === 'source'
                    ? 'Copy Component Code'
                    : activeTab === 'cli'
                    ? 'Copy Command'
                    : 'Copy Code'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CLI Package Manager Sub-Header (Only visible on CLI tab) */}
      {activeTab === 'cli' && (
        <div className="px-4 py-2.5 bg-[#181a22] border-b border-black/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400 font-medium mr-1">Package Manager:</span>
            {(['npx', 'pnpm', 'bun', 'curl'] as const).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setCliPkg(pkg)}
                className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold transition-all ${
                  cliPkg === pkg
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {pkg}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-neutral-400 hidden sm:inline">
            Directly pulls <code className="text-white font-bold bg-neutral-800 px-1 py-0.5 rounded">{sourceInfo.fileName}</code> into your project
          </span>
        </div>
      )}

      {/* Syntax-Highlighted Code / Command Container with high-contrast text & selection */}
      <div
        role="region"
        aria-label={`${activeTab} code snippet`}
        className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed border-t border-neo-border/20 dark:border-black/50 transition-colors duration-200 selection:bg-indigo-600 selection:text-white max-h-[500px]`}
      >
        {activeTab === 'cli' ? (
          <div className="flex items-center gap-3 py-2 px-1 selection:bg-indigo-600 selection:text-white">
            <span className="text-neutral-400 select-none font-bold text-sm">$</span>
            <code className="text-white font-bold text-sm select-all tracking-wide selection:bg-indigo-600 selection:text-white">
              {getCliCommand()}
            </code>
          </div>
        ) : (
          <Highlight theme={codeTheme} code={getCurrentContent().trim()} language={getLanguage()}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                data-language={getLanguage()}
                style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                    <span className={`table-cell select-none pr-4 text-right ${lineNumClass} font-mono text-[11px]`}>
                      {i + 1}
                    </span>
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </div>
  );
};
