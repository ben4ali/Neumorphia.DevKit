import React from 'react';
import { AppView } from '../hooks/useRegistry';

interface ExamplesPageProps {
  onNavigate: (view: AppView, componentId?: string) => void;
}

export const ExamplesPage: React.FC<ExamplesPageProps> = ({ onNavigate }) => {
  const examples = [
    {
      id: 'music' as AppView,
      title: 'Audiophile Music & Spotify Player',
      category: 'Audio Streaming Workstation',
      shortDescription: 'Tactile audio player with spinning vinyl turntable, tracklists, and DAC telemetry.',
      image: '/examples/music-preview.png',
      fallbackColor: 'from-zinc-900 via-neutral-900 to-black',
    },
    {
      id: 'iot' as AppView,
      title: 'Industrial IoT Telemetry Console',
      category: 'Hardware & Sensor UI',
      shortDescription: 'Hardware telemetry dashboard with live analog gauges, sensor relays, and environmental calibration.',
      image: '/examples/iot-preview.png',
      fallbackColor: 'from-neutral-900 via-zinc-900 to-black',
    },
    {
      id: 'calculator' as AppView,
      title: 'Scientific Calculator FX-990',
      category: 'Precision Hardware & Math',
      shortDescription: 'Tactile scientific calculator with recessed LCD display, trig functions, and calculation tape.',
      image: '/examples/calculator-preview.png',
      fallbackColor: 'from-zinc-900 via-slate-900 to-black',
    },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left pb-24">
      {/* Return Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <button
          onClick={() => onNavigate('home')}
          className="self-start px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Documentation</span>
        </button>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-secondary px-3 py-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/30 border border-neo-border">
          Neumorphia Application Templates
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neo-primary">
          Examples
        </h1>
        <p className="text-sm text-neo-primary/75 max-w-xl">
          Random quick examples of UI built with Neumorphia DevKit. Click any template to explore the live interactive application.
        </p>
      </div>

      {/* Engraved Divider */}
      <div className="nms-divider-h" />

      {/* Full-Bleed 5px Padded Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group p-[5px] rounded-2xl bg-neo-surface shadow-neo-raised-md hover:shadow-neo-raised-lg border border-neo-border cursor-pointer transition-all duration-300 overflow-hidden relative"
          >
            {/* Screenshot Image Container */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 isolate">
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = 'flex';
                }}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Graceful Tactile Visual Placeholder (No Emojis) */}
              <div
                style={{ display: 'none' }}
                className={`w-full h-full bg-gradient-to-br ${item.fallbackColor} p-6 rounded-xl flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white/90 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    Interactive
                  </span>
                </div>
              </div>

              {/* Black-to-Shadow Overlay with White Overlapping Text (Fade on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent rounded-xl flex flex-col justify-end p-5 text-left pointer-events-none space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neo-secondary transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {item.category}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h2>
                <p className="text-xs text-zinc-300 leading-relaxed drop-shadow-sm line-clamp-2 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {item.shortDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



