import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { AppView } from '../hooks/useRegistry';
import { useTheme } from '../hooks/useTheme';
import { Copy, Check, Sparkles, Terminal, FileCode, Bot, Layers, Sliders } from 'lucide-react';

interface AIPromptsPageProps {
  onNavigate: (view: AppView, componentId?: string) => void;
}

export const AIPromptsPage: React.FC<AIPromptsPageProps> = ({ onNavigate }) => {
  const codeTheme = themes.nightOwl;
  const codeBgClass = 'bg-[#12141a] text-neutral-200';
  const lineNumClass = 'text-neutral-600';

  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'cursor' | 'copilot' | 'chat'>('cursor');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Prompt Builder State
  const [customName, setCustomName] = useState('Audio Transport Transport');
  const [customCategory, setCustomCategory] = useState('Actions & Controls');
  const [customElevation, setCustomElevation] = useState<'raised' | 'inset'>('raised');
  const [customInteraction, setCustomInteraction] = useState('Mechanical press with active tactile depression');
  const [customFramework, setCustomFramework] = useState('React (TypeScript) + Tailwind CSS');
  const [customDarkSupport, setCustomDarkSupport] = useState(true);
  const [customAria, setCustomAria] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cursorRulesCode = `# Neumorphia DevKit — AI Coding Agent Design System Rules
# Target: Cursor (.cursorrules), Windsurf (.windsurfrules), Claude Code (CLAUDE.md)

You are an expert Frontend Engineer and UI Designer specialized in the Neumorphia DevKit design system.
When generating or modifying UI components, strictly adhere to authentic Neumorphic (Soft UI) physical principles.

## 1. Mathematical Lighting Physics
- Directional Light Angle: 135° simulated ambient light (Top-Left to Bottom-Right).
- Every raised element MUST pair a top-left highlight (-Xpx, -Ypx) with a bottom-right drop shadow (+Xpx, +Ypx).
- Every recessed (inset) well MUST pair an inset top-left shadow (+Xpx, +Ypx) with an inset bottom-right highlight (-Xpx, -Ypx).

## 2. Zero-Contrast Surface Rule
- In Neumorphism, UI elements are sculpted directly from the canvas background clay.
- ALWAYS use the surface background token: 'bg-neo-surface' or 'bg-neo-base'.
- NEVER apply contrasting flat background colors (like solid white, bright blue, or gray-200) to cards, buttons, or wells. Visual boundaries are defined ONLY by dual 135° highlights and shadows.

## 3. Approved Tailwind Shadow Utilities
Use these predefined elevation classes instead of arbitrary shadow strings:
- Raised Subtle: 'shadow-neo-raised-sm' (3px / 6px blur) — for badges, pills, small triggers.
- Raised Standard: 'shadow-neo-raised-md' (6px / 12px blur) — for buttons, cards, docks.
- Raised Elevated: 'shadow-neo-raised-lg' (9px / 18px blur) — for floating cards and hero panels.
- Inset Subtle: 'shadow-neo-inset-sm' (inset 2px / 4px blur) — for switch wells, input fields.
- Inset Standard: 'shadow-neo-inset-md' (inset 4px / 8px blur) — for active pressed states, tracks.
- Inset Deep: 'shadow-neo-inset-lg' (inset 6px / 14px blur) — for deep progress trenches.

## 4. Radii & Stroke Tokens
- Radii: 'rounded-neo-control' (0.55rem), 'rounded-neo-card' (0.75rem), 'rounded-neo-card-lg' (1.0rem), 'rounded-neo-pill' (9999px).
- Border: ALWAYS add 'border border-neo-border' for tactile edge definition.
- Focus: 'focus:border-neo-focus focus:ring-1 focus:ring-neo-focus outline-none'.

## 5. WCAG AAA Contrast & Typography
- Light Mode (#e6e7ee): Text MUST use mineral charcoal 'text-neo-primary' (#2b2e42, 8.44:1 AAA contrast).
- Dark Mode (#1a1a1a): Text MUST use crisp light 'text-neo-primary' (#f1f3f5, 12.65:1 AAA contrast).
- Font: Prioritize 'font-sans' (Nunito) and 'font-mono' (JetBrains Mono).
- Semantic Tones: Use muted, low-chroma status tokens ('text-neo-secondary', 'text-neo-success', 'text-neo-danger').

## 6. Forbidden Anti-Patterns (DO NOT DO)
- DO NOT use harsh black drop shadows without corresponding light highlights.
- DO NOT place floating modals with light highlights over dark backdrop overlays.
- DO NOT use sharp 90° corners; Soft UI requires smooth, continuous rounded corners.
- DO NOT create dense tables where every cell has separate inset depth (creates visual fatigue).`;

  const componentPromptTemplate = `Act as a Senior Frontend Engineer using the Neumorphia DevKit design system.
Create a production-ready Neumorphic ${customName} component in ${customFramework}.

Design System Specifications:
1. Category: ${customCategory}
2. Resting Elevation: ${customElevation === 'raised' ? 'Raised extrusion (shadow-neo-raised-md, bg-neo-surface, border border-neo-border)' : 'Inset recess (shadow-neo-inset-md, bg-neo-well/30, border border-neo-border)'}
3. Interactive Behavior: ${customInteraction}
4. Color Tokens:
   - Surface background: bg-neo-surface
   - Text contrast: text-neo-primary (WCAG AAA compliant)
   - Accent highlight: text-neo-secondary
   ${customDarkSupport ? '- Full Dark Mode compatibility via Tailwind "dark:" modifier' : ''}
5. Accessibility & Mechanics:
   ${customAria ? '- Include semantic HTML, proper ARIA attributes, and accessible keyboard focus states (focus:ring-1 focus:ring-neo-focus)' : ''}
   - Smooth tactile transitions (transition-all duration-150)

Provide the complete React TypeScript component code with clear TypeScript props interface and an example usage demonstration.`;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left pb-28">
      {/* 1. HEADER BANNER */}
      <header className="space-y-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary">
            Developer Toolkit
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-neo-badge shadow-neo-inset-sm bg-neo-well/30 text-neo-secondary border border-neo-border">
            AI Agent Skills
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neo-primary leading-tight">
          AI Prompts &amp; Agent Skills
        </h1>
        <p className="text-base text-neo-primary/85 leading-relaxed max-w-3xl">
          Teach modern AI coding agents (<strong>Cursor</strong>, <strong>Windsurf</strong>, <strong>GitHub Copilot</strong>, <strong>Claude Code</strong>, and <strong>ChatGPT</strong>) how to generate authentic Neumorphic components using our exact 135° lighting physics and token rules.
        </p>
      </header>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 2. SECTION 1: EDUCATIONAL GUIDE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            1. Why AI Coding Agents Need an Agent Skill
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            By default, LLMs are trained on billions of lines of flat, generic web code. When you ask an AI to create a component, it instinctively outputs standard flat borders, white cards, and single-direction black drop shadows.
          </p>
        </div>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="w-8 h-8 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-center text-rose-500 font-bold">
              ✕
            </div>
            <h3 className="text-sm font-bold text-neo-primary">Generic AI Output</h3>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Produces flat <code className="text-neo-secondary font-mono">bg-white</code> cards with harsh 90° black shadows and mismatched borders that break Soft UI consistency.
            </p>
          </div>

          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="w-8 h-8 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-indigo-500 font-bold">
              ✓
            </div>
            <h3 className="text-sm font-bold text-neo-primary">With Neumorphia Skill</h3>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Enforces 135° dual directional highlights, background clay matching, zero-contrast rules, and semantic tactile elevation tokens.
            </p>
          </div>

          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="w-8 h-8 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-emerald-500 font-bold">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-neo-primary">Zero Code Re-work</h3>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Components generated by your AI agent can be dropped directly into your codebase without manual CSS tweaking or lighting recalculations.
            </p>
          </div>
        </div>

        {/* Workflow Instructions Tabs */}
        <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neo-border/50">
            <div className="space-y-0.5 text-left">
              <span className="text-xs font-bold uppercase tracking-wide text-neo-secondary">
                Setup Workflows
              </span>
              <h3 className="text-sm font-bold text-neo-primary">Where to Paste Your Agent Skill</h3>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-neo-badge shadow-neo-inset-sm bg-neo-surface border border-neo-border">
              {[
                { id: 'cursor', label: 'Cursor / Windsurf' },
                { id: 'copilot', label: 'GitHub Copilot / Claude' },
                { id: 'chat', label: 'ChatGPT / Claude Web' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkflowTab(tab.id as any)}
                  className={`px-3 py-1 text-xs font-bold rounded-neo-badge transition-all ${
                    activeWorkflowTab === tab.id
                      ? 'shadow-neo-raised-sm bg-neo-base text-neo-secondary border border-neo-border'
                      : 'text-neo-primary/60 hover:text-neo-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Tab Details */}
          {activeWorkflowTab === 'cursor' && (
            <div className="space-y-3 text-xs text-neo-primary/80 leading-relaxed text-left">
              <p>
                <strong>Cursor &amp; Windsurf:</strong> Create a file named <code className="font-mono text-neo-secondary font-bold">.cursorrules</code> (or <code className="font-mono text-neo-secondary font-bold">.windsurfrules</code>) in the root of your project directory, then paste Artifact A below into the file.
              </p>
              <div className="p-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center gap-2 font-mono text-[11px] text-neo-primary">
                <span>📁 your-project-root/</span>
                <span className="text-neo-primary/40">└──</span>
                <span className="text-neo-secondary font-bold">.cursorrules</span>
              </div>
            </div>
          )}

          {activeWorkflowTab === 'copilot' && (
            <div className="space-y-3 text-xs text-neo-primary/80 leading-relaxed text-left">
              <p>
                <strong>GitHub Copilot Workspace &amp; Claude Code:</strong> Place the rules inside your project repository instructions at <code className="font-mono text-neo-secondary font-bold">.github/copilot-instructions.md</code> or <code className="font-mono text-neo-secondary font-bold">CLAUDE.md</code>.
              </p>
              <div className="p-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center gap-2 font-mono text-[11px] text-neo-primary">
                <span>📁 your-project-root/</span>
                <span className="text-neo-primary/40">└──</span>
                <span className="text-neo-secondary font-bold">CLAUDE.md</span>
              </div>
            </div>
          )}

          {activeWorkflowTab === 'chat' && (
            <div className="space-y-3 text-xs text-neo-primary/80 leading-relaxed text-left">
              <p>
                <strong>ChatGPT, Claude, or Gemini Chat:</strong> Go to <em>Custom Instructions</em> (or project knowledge) and paste Artifact A into the <em>"How would you like the model to respond?"</em> field. Alternatively, paste it as a preamble at the start of your chat session.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 3. SECTION 2: ARTIFACT A (.cursorrules / System Prompt) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-xs font-black text-neo-secondary">
                A
              </span>
              <h2 className="text-xl font-bold text-neo-primary">
                Artifact A: The .cursorrules / System Prompt
              </h2>
            </div>
            <p className="text-xs text-neo-primary/70">
              The complete, production-grade ruleset that enforces lighting angles, zero-contrast clay background, and Tailwind tokens.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(cursorRulesCode, 'artifactA')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all flex-shrink-0"
          >
            {copiedId === 'artifactA' ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copied .cursorrules!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neo-secondary" />
                <span>Copy .cursorrules (Agent Skill)</span>
              </>
            )}
          </button>
        </div>

        {/* Syntax-Highlighted Code Container */}
        <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border overflow-hidden text-left">
          <div className="flex items-center justify-between px-5 py-2.5 bg-neo-well/30 border-b border-neo-border/50 text-xs font-mono text-neo-primary/70">
            <span>.cursorrules / CLAUDE.md</span>
            <span className="text-[11px] font-sans font-semibold text-neo-secondary">
              Markdown System Prompt
            </span>
          </div>

          <div
            role="region"
            aria-label="Cursor rules and AI system prompt code snippet"
            className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed max-h-[480px] border-t border-neo-border/30 transition-colors duration-200`}
          >
            <Highlight theme={codeTheme} code={cursorRulesCode} language="markdown">
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  data-language="markdown"
                  style={{ ...style, margin: 0, padding: 0, backgroundColor: 'transparent' }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className={`inline-block w-8 ${lineNumClass} select-none text-right pr-3 font-mono text-[11px]`}>
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

      {/* 4. SECTION 3: ARTIFACT B & INTERACTIVE PROMPT BUILDER */}
      <section className="space-y-6">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center text-xs font-black text-neo-secondary">
              B
            </span>
            <h2 className="text-xl font-bold text-neo-primary">
              Artifact B: Interactive Component Request Generator
            </h2>
          </div>
          <p className="text-xs text-neo-primary/70">
            Customize the parameters below to generate a tailored, prompt-engineered request for your AI agent.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-5 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-neo-secondary pb-2 border-b border-neo-border/50">
              Prompt Parameters
            </div>

            {/* Component Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neo-primary block">Component Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Audio Transport Transport, OTP Pad"
                className="w-full h-10 px-3 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs text-neo-primary outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neo-primary block">Category</label>
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs text-neo-primary outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus"
              >
                <option value="Actions & Controls">Actions &amp; Controls</option>
                <option value="Forms & Selection">Forms &amp; Selection</option>
                <option value="Navigation & Layout">Navigation &amp; Layout</option>
                <option value="Feedback & Progress">Feedback &amp; Progress</option>
                <option value="Overlays & Modals">Overlays &amp; Modals</option>
              </select>
            </div>

            {/* Elevation Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neo-primary block">Resting Elevation</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCustomElevation('raised')}
                  className={`py-2 px-3 rounded-neo-control text-xs font-bold transition-all ${
                    customElevation === 'raised'
                      ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                      : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/70 hover:text-neo-primary border border-neo-border'
                  }`}
                >
                  Raised Extrusion
                </button>
                <button
                  onClick={() => setCustomElevation('inset')}
                  className={`py-2 px-3 rounded-neo-control text-xs font-bold transition-all ${
                    customElevation === 'inset'
                      ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                      : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/70 hover:text-neo-primary border border-neo-border'
                  }`}
                >
                  Inset Recess
                </button>
              </div>
            </div>

            {/* Interactive Behavior */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neo-primary block">Interactive Behavior</label>
              <input
                type="text"
                value={customInteraction}
                onChange={(e) => setCustomInteraction(e.target.value)}
                placeholder="e.g. Mechanical press with active depression"
                className="w-full h-10 px-3 rounded-neo-control shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs text-neo-primary outline-none focus:border-neo-focus focus:ring-1 focus:ring-neo-focus"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2 text-xs font-bold text-neo-primary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customDarkSupport}
                  onChange={(e) => setCustomDarkSupport(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Include Dark Mode Tokens &amp; Pastel Accents</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-neo-primary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customAria}
                  onChange={(e) => setCustomAria(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Enforce ARIA Accessibility &amp; Keyboard Focus</span>
              </label>
            </div>
          </div>

          {/* Generated Prompt Output (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border overflow-hidden text-left">
              <div className="flex items-center justify-between px-5 py-2.5 bg-neo-well/30 border-b border-neo-border/50">
                <span className="text-xs font-bold text-neo-primary">Generated Prompt for AI</span>
                <button
                  onClick={() => copyToClipboard(componentPromptTemplate, 'artifactB')}
                  className="px-3 py-1 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
                >
                  {copiedId === 'artifactB' ? 'Copied Prompt!' : 'Copy Prompt'}
                </button>
              </div>

              <div
                role="region"
                aria-label="Generated user prompt template for AI agent"
                className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed border-t border-neo-border/30 transition-colors duration-200`}
              >
                <pre style={{ margin: 0, padding: 0, whiteSpace: 'pre-wrap' }}>
                  {componentPromptTemplate}
                </pre>
              </div>
            </div>

            <div className="p-4 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border text-xs text-neo-primary/70 leading-relaxed text-left">
              💡 <strong>Pro-Tip:</strong> After pasting this prompt into Cursor or Claude Code, your agent will reference the <code className="font-mono text-neo-secondary font-bold">.cursorrules</code> file and output compliant TSX code using your project's Tailwind config.
            </div>
          </div>
        </div>
      </section>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 5. NAVIGATION / ACTION BANNER */}
      <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-neo-primary">Ready to test generated components?</h3>
          <p className="text-xs text-neo-primary/70">
            Compare AI outputs against our 28+ handcrafted components in the registry or tweak lighting in the sandbox.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('playground')}
            className="px-4 py-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all"
          >
            Open Sandbox
          </button>
          <button
            onClick={() => onNavigate('components')}
            className="px-4 py-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
          >
            Browse Components →
          </button>
        </div>
      </div>
    </div>
  );
};
