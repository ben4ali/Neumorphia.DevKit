import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../hooks/useRegistry';
import { NeumorphicButton } from '../registry/components/Button';
import { NeumorphicSlider } from '../registry/components/Slider';
import { NeumorphicSwitch } from '../registry/components/Switch';
import { NeumorphicBadge } from '../registry/components/Badge';

interface MusicAppPageProps {
  onNavigate?: (view: AppView, componentId?: string) => void;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  plays: string;
}

export const MusicAppPage: React.FC<MusicAppPageProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [progress, setProgress] = useState(38);
  const [volume, setVolume] = useState(74);
  const [hiFiMode, setHiFiMode] = useState(true);
  const [activeNav, setActiveNav] = useState('discover');

  const tracks: Track[] = [
    { id: 1, title: 'Tactile Resonance', artist: 'Neumorphia Lab', album: 'Soft Horizons', duration: '3:42', plays: '1.4M' },
    { id: 2, title: 'Midnight Clay Horizon', artist: 'Acoustic Strata', album: 'Analog Monolith', duration: '4:15', plays: '890K' },
    { id: 3, title: '135° Ambient Shadows', artist: 'Lunar Frequency', album: 'Soft Horizons', duration: '5:02', plays: '2.1M' },
    { id: 4, title: 'Extruded Waves', artist: 'Subtle Geometry', album: 'Clay & Glass', duration: '3:18', plays: '640K' },
    { id: 5, title: 'Recessed Pulse', artist: 'Neumorphia Lab', album: 'Dual Lighting EP', duration: '4:44', plays: '1.8M' },
    { id: 6, title: 'Velvet Diffusion', artist: 'Mono Form', album: 'Spatial Tone', duration: '3:56', plays: '410K' },
  ];

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left pb-36">
      {/* 0. RETURN NAVIGATION BAR */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate ? onNavigate('examples') : undefined}
          className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Return to Examples</span>
        </button>

        <span className="text-xs font-mono font-bold text-neo-secondary uppercase tracking-wider px-3 py-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/30 border border-neo-border">
          Live Template • Spotify Audio Hub
        </span>
      </div>

      {/* 1. TOP HEADER & FEATURED HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Featured Album Hero Banner (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border flex flex-col md:flex-row items-center gap-6 text-left">
          {/* Tactile Album Art Vinyl Disc */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl shadow-neo-raised-lg bg-neo-surface border border-neo-border flex items-center justify-center flex-shrink-0 p-3">
            {/* Spinning Groove Rings */}
            <motion.div
              className="w-full h-full rounded-full shadow-neo-inset-md bg-neo-well/40 border border-neo-border flex items-center justify-center relative"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              {/* Concentric vinyl tracks */}
              <div className="w-28 h-28 rounded-full shadow-neo-raised-sm bg-neo-surface border border-neo-border/50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full shadow-neo-inset-sm bg-neo-well/60 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-neo-secondary shadow-sm" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Meta & Actions */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <NeumorphicBadge color="info">FEATURED PLAYLIST</NeumorphicBadge>
              <span className="text-xs font-mono font-bold text-neo-secondary">
                24-BIT • 192 kHz LOSSLESS
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-neo-primary tracking-tight">
              Midnight Clay Vibrations
            </h1>

            <p className="text-xs text-neo-primary/70 max-w-md leading-relaxed">
              Curated analog soundscapes and binaural ambient frequencies engineered with acoustic Neumorphic warmth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={togglePlay}
                className="px-6 py-2.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-secondary transition-all flex items-center gap-2"
              >
                <span>{isPlaying ? 'PAUSE' : 'PLAY ALBUM'}</span>
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`px-4 py-2.5 rounded-neo-control text-xs font-bold transition-all border ${
                  isLiked
                    ? 'shadow-neo-inset-sm bg-neo-well/40 text-neo-secondary border-neo-border'
                    : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/70 border-neo-border hover:shadow-neo-raised-md'
                }`}
              >
                {isLiked ? '♥ IN LIBRARY' : '♡ ADD'}
              </button>
            </div>
          </div>
        </div>

        {/* Audio Engine Stats Card (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border flex flex-col justify-between space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-neo-border/50">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-primary">
              DAC Audio Engine
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neo-primary/80">
              <span>Bitrate Streaming</span>
              <span className="font-mono font-bold text-neo-secondary">9,216 kbps</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neo-primary/80">
              <span>Dynamic Range</span>
              <span className="font-mono font-bold text-neo-primary">124 dB</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neo-primary/80">
              <span>THD+N Distortion</span>
              <span className="font-mono font-bold text-emerald-500">0.0002%</span>
            </div>
          </div>

          <div className="pt-2 p-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-between">
            <div className="text-left">
              <span className="text-xs font-bold text-neo-primary block">Hi-Fi Bit-Perfect</span>
              <span className="text-[10px] text-neo-primary/60">Direct Hardware Pass</span>
            </div>
            <NeumorphicSwitch checked={hiFiMode} onChange={setHiFiMode} />
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: SIDEBAR + PLAYLIST TRACKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Library Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Nav Links */}
          <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4 text-left">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neo-primary">
              Music Library
            </h2>

            <div className="space-y-2">
              {[
                { id: 'discover', label: 'Discover New Mixes', count: 'Weekly' },
                { id: 'library', label: 'Saved Albums', count: '38' },
                { id: 'liked', label: 'Liked Tracks', count: '142' },
                { id: 'recent', label: 'Recently Played', count: '6h ago' },
              ].map((item) => {
                const isSelected = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full p-3.5 rounded-neo-control transition-all flex items-center justify-between text-xs font-bold border ${
                      isSelected
                        ? 'shadow-neo-inset-md bg-neo-well/40 text-neo-secondary border-neo-border'
                        : 'shadow-neo-raised-sm bg-neo-surface text-neo-primary/80 border-neo-border hover:shadow-neo-raised-md'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-neo-primary/60">{item.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curated Playlists */}
          <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3 text-left">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neo-primary">
              Your Playlists
            </h2>

            <div className="space-y-2">
              {['Deep Focus Clay', 'Synthwave Neumorph', 'Acoustic Chamber', 'Late Night Coding'].map((pl, idx) => (
                <div
                  key={pl}
                  className="p-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-neo-secondary" />
                    <span className="font-bold text-neo-primary">{pl}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neo-primary/60">{18 + idx * 7} tracks</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Tracklist Table (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-6 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-neo-border/50">
            <div>
              <h2 className="text-base font-bold text-neo-primary">Playlist Tracks</h2>
              <p className="text-xs text-neo-primary/60">6 songs • 25 minutes total</p>
            </div>
            <NeumorphicBadge color="success">HQ Audio</NeumorphicBadge>
          </div>

          {/* Tracks List */}
          <div className="space-y-3">
            {tracks.map((track, idx) => {
              const isCurrent = currentTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-neo-control transition-all flex items-center justify-between gap-4 border cursor-pointer ${
                    isCurrent
                      ? 'shadow-neo-inset-md bg-neo-well/40 border-neo-border'
                      : 'shadow-neo-raised-sm bg-neo-surface border-neo-border hover:shadow-neo-raised-md'
                  }`}
                >
                  {/* Play Number / Animated Wave */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold text-neo-secondary">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-3 bg-neo-secondary animate-pulse" />
                          <span className="w-0.5 h-2 bg-neo-secondary animate-pulse" />
                          <span className="w-0.5 h-3.5 bg-neo-secondary animate-pulse" />
                        </div>
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="min-w-0">
                      <span className={`text-sm font-bold truncate block ${isCurrent ? 'text-neo-secondary' : 'text-neo-primary'}`}>
                        {track.title}
                      </span>
                      <span className="text-xs text-neo-primary/60 truncate block">
                        {track.artist} • {track.album}
                      </span>
                    </div>
                  </div>

                  {/* Right Plays & Duration */}
                  <div className="flex items-center gap-6 font-mono text-xs text-neo-primary/70 flex-shrink-0">
                    <span className="hidden sm:inline">{track.plays}</span>
                    <span className="font-bold">{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. FIXED BOTTOM AUDIOPHILE PLAYER DECK */}
      <div className="fixed bottom-4 left-4 right-4 max-w-6xl mx-auto z-40 p-4 sm:p-5 rounded-neo-card-lg bg-neo-surface shadow-2xl border border-neo-border shadow-neo-raised-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Now Playing Info */}
        <div className="flex items-center gap-3.5 min-w-[200px] text-left">
          <div className="w-12 h-12 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-neo-secondary shadow-sm" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-neo-primary truncate block">
              {currentTrack.title}
            </span>
            <span className="text-[11px] text-neo-primary/60 truncate block">
              {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Center: Transport Controls & Scrubber */}
        <div className="flex-1 max-w-xl w-full space-y-2">
          {/* Buttons Row */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`text-xs font-mono font-bold transition-colors ${
                isShuffle ? 'text-neo-secondary' : 'text-neo-primary/50 hover:text-neo-primary'
              }`}
            >
              SHUF
            </button>

            <button
              onClick={prevTrack}
              className="p-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary"
            >
              ⏮ PREV
            </button>

            <button
              onClick={togglePlay}
              className="px-5 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-black text-neo-secondary"
            >
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary"
            >
              NEXT ⏭
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`text-xs font-mono font-bold transition-colors ${
                isRepeat ? 'text-neo-secondary' : 'text-neo-primary/50 hover:text-neo-primary'
              }`}
            >
              REP
            </button>
          </div>

          {/* Time Scrubber Slider */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-neo-primary/60">1:24</span>
            <div className="flex-1">
              <NeumorphicSlider value={progress} onChange={setProgress} min={0} max={100} step={1} />
            </div>
            <span className="text-[10px] font-mono text-neo-primary/60">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Right: Volume & Output */}
        <div className="hidden lg:flex items-center gap-4 min-w-[200px] justify-end">
          <span className="text-xs font-mono font-bold text-neo-primary/60">VOL</span>
          <div className="w-24">
            <NeumorphicSlider value={volume} onChange={setVolume} min={0} max={100} step={1} />
          </div>
          <NeumorphicBadge color="info">STUDIO</NeumorphicBadge>
        </div>
      </div>
    </div>
  );
};
