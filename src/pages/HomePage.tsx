import React, { useState } from 'react';
import { AppView } from '../hooks/useRegistry';
import { NeumorphicSwitch } from '../registry/components/Switch';
import { NeumorphicBadge } from '../registry/components/Badge';

interface HomePageProps {
  onNavigate: (view: AppView, componentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoRaised, setDemoRaised] = useState(true);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left pb-28">
      {/* 1. DOCUMENT TITLE / HERO HEADER */}
      <header className="space-y-4 pb-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary">
          Design System & Reference Manual
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neo-primary leading-tight">
          Understanding Neumorphic UI Design
        </h1>
        <p className="text-base text-neo-primary/85 leading-relaxed max-w-3xl">
          A developer’s practical handbook for Soft UI. This guide covers how Neumorphic surfaces operate, the directional lighting model, when to use extrusions vs. recesses, and contrast principles for modern applications.
        </p>
      </header>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 2. SECTION 1: WHAT IS NEUMORPHISM */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            1. What is Neumorphism?
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            Unlike traditional Flat design (which eliminates depth entirely) or Skeuomorphism (which replicates textures with heavy gradients), <strong>Neumorphism (Soft UI)</strong> treats the user interface as a single continuous sheet of soft clay.
          </p>
        </div>

        {/* Text + Side Example Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3.5 text-sm text-neo-primary/80 leading-relaxed">
            <p>
              Elements do not float in disconnected layers above the background. Instead, shapes are extruded directly out of the canvas background or pressed into it.
            </p>
            <p>
              Because the element surface color is identical to the canvas background (<code className="text-neo-secondary">#e6e7ee</code> in light mode, <code className="text-neo-secondary">#1a1a1a</code> in dark mode), visual boundaries are formed purely through <strong>light and shadow</strong>.
            </p>
          </div>

          {/* Interactive Side Example */}
          <div className="md:col-span-5 p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3 text-center">
            <div className="text-xs font-bold text-neo-primary/70 uppercase tracking-wide">Live Surface Interaction</div>
            <div className="py-3 flex justify-center">
              <NeumorphicSwitch
                checked={demoSwitch}
                onChange={setDemoSwitch}
                label={demoSwitch ? 'Relay Active' : 'Standby'}
              />
            </div>
            <p className="text-xs text-neo-primary/65">
              The switch well is recessed, while the thumb is extruded.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 3. SECTION 2: THE 135° LIGHTING PRINCIPLE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            2. The Directional Lighting Model
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            To make shapes feel tangible and cohesive, every shadow in the interface must share one consistent light direction.
          </p>
        </div>

        {/* Text + Side Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3.5 text-sm text-neo-primary/80 leading-relaxed">
            <p>
              Neumorphia uses a <strong>135° simulated light source</strong> positioned at the top-left corner of the screen:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neo-primary/80">
              <li>
                <strong>Top-Left Highlight:</strong> A crisp reflection where the surface catches the incoming light.
              </li>
              <li>
                <strong>Bottom-Right Dark Shadow:</strong> A soft diffused shadow cast onto the canvas below.
              </li>
            </ul>
            <p>
              When both shadow coordinates are paired together, our eyes naturally perceive smooth, physical elevation.
            </p>
          </div>

          {/* Interactive Side Example */}
          <div className="md:col-span-5 p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3 text-center">
            <div className="text-xs font-bold text-neo-primary/70 uppercase tracking-wide">Shadow Coordination</div>
            <div className="py-4 flex justify-center">
              <div className="w-32 h-20 rounded-xl shadow-neo-raised-md bg-neo-surface border border-neo-border flex flex-col items-center justify-center text-xs font-bold text-neo-primary">
                <span>Raised Extrusion</span>
                <span className="text-[11px] font-mono text-neo-secondary mt-0.5">Top-Left Light</span>
              </div>
            </div>
            <p className="text-xs text-neo-primary/65">
              Top-left highlight + bottom-right drop shadow.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 4. SECTION 3: RAISED VS INSET STATES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            3. The Two Core States: Raised vs. Inset
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            Neumorphic design relies on only two physical states. Understanding when to use each is essential for intuitive usability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: Raised */}
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-3">
            <h3 className="text-sm font-bold text-neo-primary">Raised Surfaces (Extrusions)</h3>
            <p className="text-xs text-neo-primary/80 leading-relaxed">
              Use raised elements for objects that can be pushed, clicked, or manipulated.
            </p>
            <div className="text-xs font-bold text-neo-secondary pt-1">Best for:</div>
            <ul className="list-disc pl-4 text-xs text-neo-primary/75 space-y-1.5">
              <li>Primary buttons & action triggers</li>
              <li>Floating toolbar docks</li>
              <li>Surface cards & container panels</li>
              <li>Unpressed tactile push keys</li>
            </ul>
          </div>

          {/* Column B: Inset */}
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-inset-sm border border-neo-border space-y-3">
            <h3 className="text-sm font-bold text-neo-primary">Inset Surfaces (Recesses)</h3>
            <p className="text-xs text-neo-primary/80 leading-relaxed">
              Use inset elements for wells, tracks, or states that have already been activated.
            </p>
            <div className="text-xs font-bold text-neo-secondary pt-1">Best for:</div>
            <ul className="list-disc pl-4 text-xs text-neo-primary/75 space-y-1.5">
              <li>Text inputs & search wells</li>
              <li>Slider tracks & progress trenches</li>
              <li>Status pills & telemetry badges</li>
              <li>Active / pressed button states</li>
            </ul>
          </div>
        </div>

        {/* Live Example Toggle */}
        <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="text-sm font-bold text-neo-primary">Interactive Comparison</div>
            <p className="text-xs text-neo-primary/65">
              Click the button below to toggle between raised and inset physics.
            </p>
          </div>
          <button
            onClick={() => setDemoRaised(!demoRaised)}
            className={`px-5 py-2.5 rounded-neo-control text-xs font-bold transition-all ${
              demoRaised
                ? 'shadow-neo-raised-md hover:shadow-neo-raised-lg bg-neo-surface text-neo-secondary border border-neo-border'
                : 'shadow-neo-inset-md bg-neo-well/40 text-neo-secondary border border-neo-border'
            }`}
          >
            {demoRaised ? 'Current: Raised Element' : 'Current: Inset Well'}
          </button>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 5. SECTION 4: WHAT IS NEUMORPHISM BEST USED FOR */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            4. What is Neumorphism Best Used For?
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            Neumorphic design is exceptionally tactile, but it should be used with intention rather than applied indiscriminately across an entire application.
          </p>
        </div>

        {/* Good vs Bad Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-3">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              Ideal Use Cases
            </div>
            <ul className="space-y-2.5 text-xs text-neo-primary/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Hardware & Audio Interfaces:</strong> Dials, volume sliders, push pads, and media playback transports.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Telemetry & Smart Home:</strong> Control centers, temperature sliders, toggle panels, and radial gauges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Calculators & Keypads:</strong> OTP pin inputs, number pads, and physical keycap triggers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Focused Dashboard Cards:</strong> Highlighting critical KPIs and trend summaries.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-3">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
              Avoid Using For
            </div>
            <ul className="space-y-2.5 text-xs text-neo-primary/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Dense Text & Reading Feeds:</strong> Long articles, documentation bodies, or blogs (keep reading surfaces clean and flat).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Complex Multi-Column Forms:</strong> 20+ form inputs on one page create visual fatigue if every field has heavy depth.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Floating Modals over Dark Backdrops:</strong> Dual light shadows create white halos over dark backdrop overlays.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 6. SECTION 5: COLOR & CONTRAST RULES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            5. Color & Contrast Rules
          </h2>
          <p className="text-sm text-neo-primary/85 leading-relaxed">
            Early neumorphic designs were criticized for low contrast. Neumorphia DevKit solves this with calibrated text colors and soft status tones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="text-xs font-bold text-neo-primary">Light Mode (#e6e7ee)</div>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Uses deep charcoal mineral text (<code className="text-neo-secondary">#2b2e42</code>) for crisp AAA readability against gray clay.
            </p>
            <div className="pt-1">
              <NeumorphicBadge color="info">Slate Denim</NeumorphicBadge>
            </div>
          </div>

          <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="text-xs font-bold text-neo-primary">Dark Mode (#1a1a1a)</div>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Uses high-contrast light text (<code className="text-neo-secondary">#f1f3f5</code>) with soft pastel LED accents that prevent eye strain.
            </p>
            <div className="pt-1">
              <NeumorphicBadge color="success">Sage Emerald</NeumorphicBadge>
            </div>
          </div>

          <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-2.5 text-left">
            <div className="text-xs font-bold text-neo-primary">Status Indicators</div>
            <p className="text-xs text-neo-primary/75 leading-relaxed">
              Muted, low-chroma tones rather than harsh neon primaries to blend smoothly with clay shadows.
            </p>
            <div className="pt-1">
              <NeumorphicBadge color="warning">Warm Amber</NeumorphicBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 7. NAVIGATION BANNER */}
      <footer className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-left">
          <h3 className="text-sm font-bold text-neo-primary">Ready to explore the components?</h3>
          <p className="text-xs text-neo-primary/70">
            Browse our catalog of 22 tactile React components with copyable TSX and CSS code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('playground')}
            className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all"
          >
            Open Sandbox
          </button>
          <button
            onClick={() => onNavigate('components')}
            className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
          >
            Browse Components →
          </button>
        </div>
      </footer>
    </div>
  );
};
