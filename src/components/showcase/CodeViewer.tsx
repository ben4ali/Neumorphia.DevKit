import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface CodeViewerProps {
  tailwindSnippet: string;
  cssSnippet: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ tailwindSnippet, cssSnippet }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const codeTheme = isDark ? themes.nightOwl : themes.oneLight;
  const codeBgClass = isDark ? 'bg-[#14161b] text-neutral-200' : 'bg-[#f8f9fc] text-[#24292f]';
  const lineNumClass = isDark ? 'text-neutral-600' : 'text-neutral-400';

  const [activeTab, setActiveTab] = useState<'tailwind' | 'css'>('tailwind');
  const [copied, setCopied] = useState(false);

  const currentSnippet = activeTab === 'tailwind' ? tailwindSnippet : cssSnippet;
  const language = activeTab === 'tailwind' ? 'tsx' : 'css';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border overflow-hidden text-left">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neo-well/30 border-b border-neo-border/60">
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-surface border border-neo-border">
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`px-3 py-1 rounded-neo-pill text-xs font-semibold transition-all ${
                activeTab === 'tailwind'
                  ? 'bg-neo-secondary text-white shadow-sm'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
            >
              Tailwind TSX
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded-neo-pill text-xs font-semibold transition-all ${
                activeTab === 'css'
                  ? 'bg-neo-secondary text-white shadow-sm'
                  : 'text-neo-primary/70 hover:text-neo-primary'
              }`}
            >
              Vanilla CSS
            </button>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm text-xs font-semibold text-neo-primary border border-neo-border transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neo-secondary" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax-Highlighted Code Container */}
      <div
        role="region"
        aria-label={`${activeTab === 'tailwind' ? 'Tailwind TSX' : 'Vanilla CSS'} code snippet`}
        className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed border-t border-neo-border/30 transition-colors duration-200 selection:bg-indigo-600 selection:text-white`}
      >
        <Highlight theme={codeTheme} code={currentSnippet.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              data-language={language}
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
      </div>
    </div>
  );
};
