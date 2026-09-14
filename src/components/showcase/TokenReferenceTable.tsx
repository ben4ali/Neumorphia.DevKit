import React from 'react';
import { TokenReference } from '../../types/registry';
import { Layers, Sparkles } from 'lucide-react';

interface TokenReferenceTableProps {
  tokens?: TokenReference[];
}

export const TokenReferenceTable: React.FC<TokenReferenceTableProps> = ({ tokens }) => {
  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] overflow-hidden text-left space-y-3 p-5">
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-neo-secondary" />
        <h3 className="text-sm font-bold text-neo-primary tracking-tight">
          Design Token & Lighting Matrix
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neo-border/30 dark:border-white/[0.04] text-neo-primary/60">
              <th className="pb-2 font-semibold">Token / Level</th>
              <th className="pb-2 font-semibold">CSS Variable</th>
              <th className="pb-2 font-semibold">Tailwind Utility</th>
              <th className="pb-2 font-semibold">Physics Mechanism</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neo-border/20 dark:divide-white/[0.03]">
            {tokens.map((token) => (
              <tr key={token.name} className="hover:bg-neo-well/20 transition-colors">
                <td className="py-2.5 font-bold text-neo-primary">{token.name}</td>
                <td className="py-2.5 font-mono text-neo-secondary">{token.cssVariable}</td>
                <td className="py-2.5 font-mono text-xs">
                  {token.tailwindClass ? (
                    <span className="px-2 py-0.5 rounded-neo-badge shadow-neo-inset-sm bg-neo-well/50 text-neo-primary font-bold">
                      {token.tailwindClass}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="py-2.5 text-neo-primary/70">{token.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
