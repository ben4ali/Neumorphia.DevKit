import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../hooks/useRegistry';
import { NeumorphicSwitch } from '../registry/components/Switch';
import { NeumorphicBadge } from '../registry/components/Badge';

interface HomePageProps {
  onNavigate: (view: AppView, componentId?: string) => void;
}

/**
 * True Differential Gravitational Physics Simulation
 * v(theta) = sqrt(v_top^2 + 2 * g * (1 - cos(theta)))
 * Provides 100% continuous, butter-smooth acceleration downwards and deceleration upwards with zero stutter or ticks.
 */
const KineticRollercoasterOrbital: React.FC = () => {
  const carriageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0; // Starts at 0 rad (top / 12 o'clock)
    let lastTime: number | null = null;
    let animId: number;

    const v_top = 1.5; // Smooth coasting velocity at apex
    const g_factor = 14.5; // Heavy gravitational pull for dramatic high-speed descent

    const step = (now: number) => {
      if (lastTime !== null) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        // Instantaneous physics velocity:
        const speed = Math.sqrt(v_top * v_top + 2 * g_factor * (1 - Math.cos(angle)));
        angle += speed * dt;
        if (angle >= Math.PI * 2) {
          angle -= Math.PI * 2;
        }

        if (carriageRef.current) {
          const deg = (angle * 180) / Math.PI;
          carriageRef.current.style.transform = `rotate(${deg}deg)`;
        }
      }
      lastTime = now;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={carriageRef}
      className="absolute inset-0 w-full h-full rounded-full flex items-start justify-center pointer-events-none will-change-transform"
    >
      {/* Tactile Capsule / Pill inside the skinny track */}
      <div className="w-7 h-3 rounded-full bg-neo-surface shadow-neo-raised-sm border border-neo-border/30 dark:border-white/[0.03] -translate-y-1.5 flex items-center justify-center">
        <div className="w-2.5 h-1 rounded-full bg-neo-secondary/70 shadow-sm" />
      </div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoRaised, setDemoRaised] = useState(true);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left pb-28">
      {/* 1. DOCUMENT TITLE / HERO HEADER (Strict Single-Row on Desktop) */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
        {/* Left text content (6 cols) */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/30 border border-neo-border/40 dark:border-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-neo-secondary animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary">
              Design System &amp; Reference Manual
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neo-primary leading-[1.15]">
            Understanding Neumorphic UI Design
          </h1>

          <p className="text-base sm:text-lg text-neo-primary/80 leading-relaxed max-w-xl font-normal">
            A developer’s practical handbook for Soft UI. This guide covers how Neumorphic surfaces operate, the directional lighting model, when to use extrusions vs. recesses, and contrast principles for modern applications.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('components')}
              className="px-6 py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-secondary transition-all"
            >
              Explore 28+ Components →
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className="px-6 py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-primary transition-all"
            >
              Interactive Sandbox
            </button>
          </div>
        </div>

        {/* Right Unique Orbital Kinetic Track with Gravitational Rollercoaster Pill (6 cols) */}
        <div className="lg:col-span-6 flex items-center justify-center relative py-4 select-none">
          {/* Main Kinetic Assembly Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[300px] sm:h-[340px] flex items-center justify-center">
            {/* Skinny Orbital Track Ring (Outer Track) */}
            <div className="w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-neo-border/30 dark:border-white/[0.03] shadow-neo-inset-sm bg-neo-well/15 flex items-center justify-center relative">
              {/* Revolving Orbital Carriage with Real Calculus Physics */}
              <KineticRollercoasterOrbital />

              {/* Central Tactile Clay Disc Assembly */}
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full shadow-neo-raised-md bg-neo-surface border border-neo-border/30 dark:border-white/[0.03] flex items-center justify-center relative">
                {/* Core Inset Well */}
                <div className="w-28 h-28 sm:w-34 sm:h-34 rounded-full shadow-neo-inset-lg bg-neo-well/40 border border-neo-border/30 dark:border-white/[0.03] flex items-center justify-center relative">
                  {/* Floating Central Tactile Clay Dome */}
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neo-surface shadow-neo-raised-lg border border-neo-border/30 dark:border-white/[0.03] flex items-center justify-center cursor-pointer z-20 group relative"
                    animate={{
                      y: [-3, 3, -3],
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                      scale: { type: 'spring', stiffness: 400, damping: 17 },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
            className={`px-5 py-2.5 rounded-neo-control text-xs font-bold transition-all ${demoRaised
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
                <span><strong>Hardware &amp; Audio Interfaces:</strong> Dials, volume sliders, push pads, and media playback transports.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Telemetry &amp; Smart Home:</strong> Control centers, temperature sliders, toggle panels, and radial gauges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Calculators &amp; Keypads:</strong> OTP pin inputs, number pads, and physical keycap triggers.</span>
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
                <span><strong>Dense Text &amp; Reading Feeds:</strong> Long articles, documentation bodies, or blogs (keep reading surfaces clean and flat).</span>
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

        {/* Application UI Examples Section directly below use cases */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neo-primary">
                Explore Real-World UI Examples
              </h3>
              <p className="text-xs text-neo-primary/70">
                Click any preview below to explore the live interactive application.
              </p>
            </div>

            <button
              onClick={() => onNavigate('examples')}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
            >
              All Examples →
            </button>
          </div>

          {/* 3-Column Minimalist Full-Bleed Example Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Example 1: Music App */}
            <div
              onClick={() => onNavigate('music')}
              className="group p-[5px] rounded-2xl bg-neo-surface shadow-neo-raised-md hover:shadow-neo-raised-lg border border-neo-border cursor-pointer transition-all duration-300 overflow-hidden relative"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 isolate">
                <img
                  src="/examples/music-preview.png"
                  alt="Audiophile Music & Spotify Player"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Graceful placeholder without emojis */}
                <div
                  style={{ display: 'none' }}
                  className="w-full h-full bg-gradient-to-br from-zinc-900 via-neutral-900 to-black p-5 rounded-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Audio Workstation
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white/90 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Black to Shadow Gradient Overlay with White Text (Fade on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent rounded-xl flex flex-col justify-end p-4 text-left pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neo-secondary mb-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Audio App • Spotify Style
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Audiophile Music &amp; Spotify Player
                  </h4>
                </div>
              </div>
            </div>

            {/* Example 2: IoT Console */}
            <div
              onClick={() => onNavigate('iot')}
              className="group p-[5px] rounded-2xl bg-neo-surface shadow-neo-raised-md hover:shadow-neo-raised-lg border border-neo-border cursor-pointer transition-all duration-300 overflow-hidden relative"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 isolate">
                <img
                  src="/examples/iot-preview.png"
                  alt="Industrial IoT Telemetry Console"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Graceful placeholder without emojis */}
                <div
                  style={{ display: 'none' }}
                  className="w-full h-full bg-gradient-to-br from-neutral-900 via-zinc-900 to-black p-5 rounded-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Hardware Telemetry
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white/90 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Black to Shadow Gradient Overlay with White Text (Fade on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent rounded-xl flex flex-col justify-end p-4 text-left pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neo-secondary mb-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Hardware UI • Industrial IoT
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Industrial IoT Telemetry Console
                  </h4>
                </div>
              </div>
            </div>

            {/* Example 3: Scientific Calculator */}
            <div
              onClick={() => onNavigate('calculator')}
              className="group p-[5px] rounded-2xl bg-neo-surface shadow-neo-raised-md hover:shadow-neo-raised-lg border border-neo-border cursor-pointer transition-all duration-300 overflow-hidden relative sm:col-span-2 lg:col-span-1"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 isolate">
                <img
                  src="/examples/calculator-preview.png"
                  alt="Scientific Calculator FX-990"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const fb = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Graceful placeholder without emojis */}
                <div
                  style={{ display: 'none' }}
                  className="w-full h-full bg-gradient-to-br from-zinc-900 via-slate-900 to-black p-5 rounded-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Precision Keypad
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white/90 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Black to Shadow Gradient Overlay with White Text (Fade on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent rounded-xl flex flex-col justify-end p-4 text-left pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neo-secondary mb-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Hardware UI • Math Keypad
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    Scientific Calculator FX-990
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Engraved Divider */}
      <div className="nms-divider-h" />

      {/* 6. SECTION 5: COLOR & CONTRAST RULES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neo-primary">
            5. Color &amp; Contrast Rules
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
            Browse our catalog of 28+ tactile React components with copyable TSX and CSS code.
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
            onClick={() => onNavigate('examples')}
            className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all"
          >
            View Examples Hub
          </button>
          <button
            onClick={() => onNavigate('components')}
            className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all"
          >
            Browse Components →
          </button>
        </div>
      </footer>
    </div>
  );
};
