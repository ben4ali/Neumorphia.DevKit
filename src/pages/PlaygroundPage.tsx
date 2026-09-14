import React, { useState, useMemo } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '../hooks/useTheme';

export const PlaygroundPage: React.FC = () => {
  const codeTheme = themes.nightOwl;
  const codeBgClass = 'bg-[#12141a] text-neutral-200';
  const lineNumClass = 'text-neutral-600';

  // Playground state
  const [angle, setAngle] = useState<number>(135);
  const [distance, setDistance] = useState<number>(6);
  const [blur, setBlur] = useState<number>(12);
  const [isInset, setIsInset] = useState<boolean>(false);
  const [surfaceColor, setSurfaceColor] = useState<string>('#e6e7ee');
  const [shape, setShape] = useState<'card' | 'control' | 'pill' | 'circle'>('card');
  const [copiedType, setCopiedType] = useState<'css' | 'tailwind' | null>(null);

  // Preset background colors
  const colorPresets = [
    { name: 'Neumorphia Light', hex: '#e6e7ee' },
    { name: 'Neumorphia Dark', hex: '#1a1a1a' },
    { name: 'Cool Slate', hex: '#e0e5ec' },
    { name: 'Dark Slate', hex: '#252836' },
    { name: 'Muted Cloud', hex: '#f0f3f8' },
  ];

  // Calculate light and dark shadow colors derived from surface luminance
  const isDarkSurface = useMemo(() => {
    const hex = surfaceColor.replace('#', '');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.45;
  }, [surfaceColor]);

  // Directional offsets calculation from angle in degrees
  const { offsetX, offsetY } = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.round(distance * Math.cos(rad));
    const y = Math.round(distance * Math.sin(rad));
    return { offsetX: x, offsetY: y };
  }, [angle, distance]);

  // Calculate dynamic shadows
  const { computedBoxShadow, tailwindClass } = useMemo(() => {
    const darkColor = isDarkSurface ? 'rgba(0, 0, 0, 0.65)' : 'rgba(163, 177, 198, 0.6)';
    const lightColor = isDarkSurface ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)';

    const prefix = isInset ? 'inset ' : '';
    const shadow1 = `${prefix}${offsetX}px ${offsetY}px ${blur}px ${darkColor}`;
    const shadow2 = `${prefix}${-offsetX}px ${-offsetY}px ${blur}px ${lightColor}`;
    const fullBoxShadow = `${shadow1}, ${shadow2}`;

    const tw = `shadow-[${prefix}${offsetX}px_${offsetY}px_${blur}px_${darkColor.replace(/\s+/g, '')},_${prefix}${-offsetX}px_${-offsetY}px_${blur}px_${lightColor.replace(/\s+/g, '')}]`;

    return {
      computedBoxShadow: fullBoxShadow,
      tailwindClass: tw,
    };
  }, [offsetX, offsetY, blur, isInset, isDarkSurface]);

  const borderRadiusClass = {
    card: 'rounded-2xl',
    control: 'rounded-lg',
    pill: 'rounded-full',
    circle: 'rounded-full aspect-square',
  }[shape];

  const cssSnippet = `/* 135° Simulated Light Elevation */
.neumorphic-element {
  background-color: ${surfaceColor};
  box-shadow: ${computedBoxShadow};
}`;

  const tailwindSnippet = `<!-- Tailwind Arbitrary Elevation -->
<div className="${tailwindClass} bg-[${surfaceColor}]">
  <!-- Content -->
</div>`;

  const copyToClipboard = (text: string, type: 'css' | 'tailwind') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const resetDefaults = () => {
    setAngle(135);
    setDistance(6);
    setBlur(12);
    setIsInset(false);
    setSurfaceColor('#e6e7ee');
    setShape('card');
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left pb-28">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary">
            Interactive Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neo-primary">
            Neumorphic Sandbox & CSS Generator
          </h1>
          <p className="text-sm text-neo-primary/70 max-w-2xl leading-relaxed">
            Tune directional lighting, elevation distances, and shadow diffusion in real time, then export production-ready CSS or Tailwind utilities.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all"
        >
          Reset Settings
        </button>
      </div>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* Main Studio Grid with Roomy Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-8 p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border">
          <div className="text-sm font-bold text-neo-primary pb-3 border-b border-neo-border/50">
            Lighting & Surface Controls
          </div>

          {/* 1. Elevation Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-neo-primary/80 block">Elevation Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsInset(false)}
                className={`py-2.5 px-3 rounded-neo-control text-xs font-bold transition-all ${
                  !isInset
                    ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                    : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/70 hover:text-neo-primary border border-neo-border'
                }`}
              >
                Raised (Extrusion)
              </button>
              <button
                onClick={() => setIsInset(true)}
                className={`py-2.5 px-3 rounded-neo-control text-xs font-bold transition-all ${
                  isInset
                    ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                    : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/70 hover:text-neo-primary border border-neo-border'
                }`}
              >
                Inset (Recessed)
              </button>
            </div>
          </div>

          {/* 2. Light Angle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neo-primary/80">
              <span>Light Source Angle</span>
              <span className="font-mono text-neo-secondary">{angle}°</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[45, 90, 135, 180].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setAngle(deg)}
                  className={`py-1.5 text-xs font-mono font-bold rounded-neo-badge transition-all ${
                    angle === deg
                      ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                      : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/60 hover:text-neo-primary border border-neo-border'
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 rounded-full shadow-neo-inset-sm appearance-none bg-neo-base accent-indigo-600 cursor-pointer mt-2"
            />
          </div>

          {/* 3. Distance & Blur Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neo-primary/80">
                <span>Shadow Distance / Offset</span>
                <span className="font-mono text-neo-secondary">{distance}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 rounded-full shadow-neo-inset-sm appearance-none bg-neo-base accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neo-primary/80">
                <span>Blur Diffusion</span>
                <span className="font-mono text-neo-secondary">{blur}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="48"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-2 rounded-full shadow-neo-inset-sm appearance-none bg-neo-base accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Shape Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-neo-primary/80 block">Element Geometry</label>
            <div className="grid grid-cols-4 gap-2">
              {(['card', 'control', 'pill', 'circle'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-2 text-xs capitalize font-bold rounded-neo-control transition-all ${
                    shape === s
                      ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border border-neo-border'
                      : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/60 hover:text-neo-primary border border-neo-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Surface Color & Presets */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-neo-primary/80">
              <span>Canvas Surface Color</span>
              <span className="font-mono text-neo-secondary uppercase">{surfaceColor}</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={surfaceColor}
                onChange={(e) => setSurfaceColor(e.target.value)}
                className="w-9 h-9 rounded-neo-control border border-neo-border cursor-pointer shadow-neo-raised-sm bg-transparent p-0.5"
              />
              <div className="flex-1 flex gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setSurfaceColor(preset.hex)}
                    title={preset.name}
                    style={{ backgroundColor: preset.hex }}
                    className={`flex-1 h-9 rounded-neo-control border transition-all ${
                      surfaceColor.toLowerCase() === preset.hex.toLowerCase()
                        ? 'ring-2 ring-indigo-500 scale-105 border-white'
                        : 'border-neo-border shadow-neo-raised-sm hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Canvas + High-Contrast Code Exporters (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Live Stage with room to breathe */}
          <div
            style={{ backgroundColor: surfaceColor }}
            className="w-full h-96 rounded-neo-card-lg border border-neo-border flex items-center justify-center p-12 transition-colors duration-300 relative overflow-hidden shadow-inner"
          >
            {/* Ambient indicator */}
            <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/10 dark:bg-white/10 backdrop-blur-sm text-neo-primary/70">
              Angle: {angle}° • Distance: {distance}px
            </div>

            {/* Generated Tactile Surface */}
            <div
              style={{
                backgroundColor: surfaceColor,
                boxShadow: computedBoxShadow,
              }}
              className={`w-52 h-40 ${borderRadiusClass} transition-all duration-150 flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none`}
            >
              <span
                className={`text-sm font-bold ${
                  isDarkSurface ? 'text-neutral-200' : 'text-neutral-800'
                }`}
              >
                {isInset ? 'Inset Recessed' : 'Raised Extrusion'}
              </span>
              <span
                className={`text-xs font-mono mt-1 ${
                  isDarkSurface ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {angle}° Directional Light
              </span>
            </div>
          </div>

          {/* High-Contrast Syntax-Highlighted Code Exporters */}
          <div className="space-y-6">
            {/* 1. Vanilla CSS Output */}
            <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] overflow-hidden text-left">
              <div className="flex items-center justify-between px-5 py-2.5 bg-neo-well/30 border-b border-neo-border/30 dark:border-black/50 dark:border-b-white/[0.02]">
                <span className="text-xs font-bold text-neo-primary">Vanilla CSS Rule</span>
                <button
                  onClick={() => copyToClipboard(cssSnippet, 'css')}
                  className="px-3 py-1 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border/40 dark:border-white/[0.03] text-xs font-bold text-neo-secondary transition-all"
                >
                  {copiedType === 'css' ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
              <div
                role="region"
                aria-label="Generated Vanilla CSS rule snippet"
                className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed border-t border-neo-border/20 dark:border-black/50 transition-colors duration-200`}
              >
                <Highlight theme={codeTheme} code={cssSnippet} language="css">
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      data-language="css"
                      style={{ ...style, margin: 0, padding: 0, backgroundColor: 'transparent' }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          <span className={`inline-block w-6 ${lineNumClass} select-none text-right pr-3 font-mono text-[11px]`}>
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

            {/* 2. Tailwind Arbitrary Class Output */}
            <div className="rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border/40 dark:border-white/[0.03] overflow-hidden text-left">
              <div className="flex items-center justify-between px-5 py-2.5 bg-neo-well/30 border-b border-neo-border/30 dark:border-black/50 dark:border-b-white/[0.02]">
                <span className="text-xs font-bold text-neo-primary">Tailwind Arbitrary Class</span>
                <button
                  onClick={() => copyToClipboard(tailwindSnippet, 'tailwind')}
                  className="px-3 py-1 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border/40 dark:border-white/[0.03] text-xs font-bold text-neo-secondary transition-all"
                >
                  {copiedType === 'tailwind' ? 'Copied!' : 'Copy Tailwind'}
                </button>
              </div>
              <div
                role="region"
                aria-label="Generated Tailwind CSS class snippet"
                className={`p-4 ${codeBgClass} text-xs font-mono overflow-x-auto leading-relaxed border-t border-neo-border/20 dark:border-black/50 transition-colors duration-200`}
              >
                <Highlight theme={codeTheme} code={tailwindSnippet} language="html">
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      data-language="html"
                      style={{ ...style, margin: 0, padding: 0, backgroundColor: 'transparent' }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          <span className={`inline-block w-6 ${lineNumClass} select-none text-right pr-3 font-mono text-[11px]`}>
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
          </div>
        </div>
      </div>
    </div>
  );
};
