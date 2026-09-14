import React, { useState } from 'react';
import { AppView } from '../hooks/useRegistry';
import { NeumorphicGauge } from '../registry/components/Gauge';
import { NeumorphicSwitch } from '../registry/components/Switch';
import { NeumorphicBadge } from '../registry/components/Badge';
import { NeumorphicRangeSlider } from '../registry/components/RangeSlider';
import { NeumorphicSlider } from '../registry/components/Slider';
import { NeumorphicProgress } from '../registry/components/Progress';
import { NeumorphicButton } from '../registry/components/Button';

interface IoTDashboardPageProps {
  onNavigate?: (view: AppView, componentId?: string) => void;
}

export const IoTDashboardPage: React.FC<IoTDashboardPageProps> = ({ onNavigate }) => {
  // State
  const [activeSensor, setActiveSensor] = useState('temp');
  const [systemActive, setSystemActive] = useState(true);
  const [autoClimate, setAutoClimate] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(65);
  const [tempRange, setTempRange] = useState<[number, number]>([19, 27]);
  const [activePreset, setActivePreset] = useState<'auto' | 'eco' | 'boost'>('auto');

  const sensors = [
    { id: 'temp', name: 'Temperature', value: '24.5 °C', status: 'Optimal', color: 'bg-emerald-500' },
    { id: 'humidity', name: 'Humidity', value: '48 %', status: 'Normal', color: 'bg-blue-500' },
    { id: 'pressure', name: 'Pressure', value: '101.3 kPa', status: 'Stable', color: 'bg-purple-500' },
    { id: 'air', name: 'Air Quality', value: '92 AQI', status: 'Good', color: 'bg-emerald-500' },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left pb-24">
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
          Live Template • Industrial IoT
        </span>
      </div>

      {/* 1. CLEAN HEADER */}
      <header className="p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/30 border border-neo-border text-xs font-semibold text-neo-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
            <NeumorphicBadge color="success">Node 01</NeumorphicBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neo-primary tracking-tight">
            IoT Sensor Dashboard
          </h1>
          <p className="text-sm text-neo-primary/60 font-medium">
            Live telemetry & environmental controls
          </p>
        </div>

        {/* Master Power Switch */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 px-5 py-3 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border">
            <span className="text-xs font-bold uppercase tracking-wider text-neo-primary">
              System Active
            </span>
            <NeumorphicSwitch
              checked={systemActive}
              onChange={setSystemActive}
            />
          </div>
        </div>
      </header>

      {/* 2. MAIN GRID: SIDEBAR + DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sensor Selectors */}
          <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neo-primary">
              Active Sensors
            </h2>

            <div className="space-y-3">
              {sensors.map((s) => {
                const isSelected = activeSensor === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSensor(s.id)}
                    className={`w-full p-4 rounded-neo-control transition-all flex items-center justify-between border text-left ${
                      isSelected
                        ? 'shadow-neo-inset-md bg-neo-well/40 border-neo-border text-neo-secondary'
                        : 'shadow-neo-raised-sm bg-neo-surface border-neo-border text-neo-primary hover:shadow-neo-raised-md'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${s.color}`} />
                        <span className="text-sm font-bold">{s.name}</span>
                      </div>
                      <span className="text-xs text-neo-primary/60">{s.status}</span>
                    </div>
                    <span className="text-sm font-extrabold font-mono text-neo-primary">
                      {s.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mode Presets */}
          <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neo-primary">
              Operating Modes
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <NeumorphicButton
                variant={activePreset === 'auto' ? 'inset' : 'raised'}
                size="sm"
                active={activePreset === 'auto'}
                onClick={() => setActivePreset('auto')}
                className="font-bold text-xs"
              >
                Auto
              </NeumorphicButton>
              <NeumorphicButton
                variant={activePreset === 'eco' ? 'inset' : 'raised'}
                size="sm"
                active={activePreset === 'eco'}
                onClick={() => setActivePreset('eco')}
                className="font-bold text-xs"
              >
                Eco
              </NeumorphicButton>
              <NeumorphicButton
                variant={activePreset === 'boost' ? 'inset' : 'raised'}
                size="sm"
                active={activePreset === 'boost'}
                onClick={() => setActivePreset('boost')}
                className="font-bold text-xs"
              >
                Boost
              </NeumorphicButton>
            </div>
          </div>

          {/* Device Storage */}
          <div className="p-6 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neo-primary">
              <span>Device Memory</span>
              <span className="text-neo-secondary font-mono">68%</span>
            </div>
            <NeumorphicProgress value={68} variant="info" size="md" showLabel={false} />
            <p className="text-[11px] text-neo-primary/60">
              13.6 GB of 20 GB used
            </p>
          </div>
        </div>

        {/* Right Dashboard Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 Main Gauges Card */}
          <div className="p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neo-primary">
                Live Captor Telemetry
              </h2>
              <NeumorphicBadge color="info">Realtime</NeumorphicBadge>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center py-4">
              <div className="space-y-3 text-center">
                <NeumorphicGauge
                  value={24.5}
                  max={50}
                  size={120}
                  strokeWidth={9}
                  unit="°C"
                  label="Temperature"
                  variant="info"
                />
                <span className="text-xs font-bold text-neo-primary block">
                  Ambient Temp
                </span>
              </div>

              <div className="space-y-3 text-center">
                <NeumorphicGauge
                  value={48}
                  max={100}
                  size={120}
                  strokeWidth={9}
                  unit="%"
                  label="Humidity"
                  variant="warning"
                />
                <span className="text-xs font-bold text-neo-primary block">
                  Relative Air
                </span>
              </div>

              <div className="space-y-3 text-center">
                <NeumorphicGauge
                  value={101.3}
                  max={150}
                  size={120}
                  strokeWidth={9}
                  unit="kPa"
                  label="Pressure"
                  variant="success"
                />
                <span className="text-xs font-bold text-neo-primary block">
                  Barometer
                </span>
              </div>

              <div className="space-y-3 text-center">
                <NeumorphicGauge
                  value={92}
                  max={100}
                  size={120}
                  strokeWidth={9}
                  unit="AQI"
                  label="Air Quality"
                  variant="info"
                />
                <span className="text-xs font-bold text-neo-primary block">
                  Clean Index
                </span>
              </div>
            </div>
          </div>

          {/* Controls & Calibration */}
          <div className="p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-6">
            <h2 className="text-base font-bold text-neo-primary">
              Control &amp; Thresholds
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Range Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-neo-primary">
                  <span>Temperature Comfort Range</span>
                  <span className="text-neo-secondary font-mono">
                    {tempRange[0]}°C — {tempRange[1]}°C
                  </span>
                </div>
                <NeumorphicRangeSlider
                  value={tempRange}
                  onChange={setTempRange}
                  min={10}
                  max={35}
                  step={1}
                />
              </div>

              {/* Single Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-neo-primary">
                  <span>Fan &amp; Airflow Speed</span>
                  <span className="text-neo-secondary font-mono">{fanSpeed}%</span>
                </div>
                <NeumorphicSlider
                  value={fanSpeed}
                  onChange={setFanSpeed}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            {/* Quick Toggle Switches */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neo-border/50">
              <div className="p-4 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neo-primary block">Auto Climate</span>
                  <span className="text-[11px] text-neo-primary/60">Dynamic response</span>
                </div>
                <NeumorphicSwitch checked={autoClimate} onChange={setAutoClimate} />
              </div>

              <div className="p-4 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neo-primary block">Night Mode</span>
                  <span className="text-[11px] text-neo-primary/60">Quiet operation</span>
                </div>
                <NeumorphicSwitch checked={nightMode} onChange={setNightMode} />
              </div>

              <div className="p-4 rounded-neo-control shadow-neo-inset-sm bg-neo-well/20 border border-neo-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neo-primary block">Push Alerts</span>
                  <span className="text-[11px] text-neo-primary/60">Instant notify</span>
                </div>
                <NeumorphicSwitch checked={alertsEnabled} onChange={setAlertsEnabled} />
              </div>
            </div>
          </div>

          {/* 4 Sleek Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-1">
              <span className="text-xs font-semibold text-neo-primary/60 block">24h Average</span>
              <div className="text-xl sm:text-2xl font-black text-neo-primary font-mono">23.8 °C</div>
              <span className="text-[10px] text-emerald-500 font-bold block">Stable ±0.4</span>
            </div>

            <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-1">
              <span className="text-xs font-semibold text-neo-primary/60 block">System Uptime</span>
              <div className="text-xl sm:text-2xl font-black text-neo-primary font-mono">99.9 %</div>
              <span className="text-[10px] text-emerald-500 font-bold block">14 days online</span>
            </div>

            <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-1">
              <span className="text-xs font-semibold text-neo-primary/60 block">Energy Used</span>
              <div className="text-xl sm:text-2xl font-black text-neo-primary font-mono">1.2 kWh</div>
              <span className="text-[10px] text-neo-secondary font-bold block">Eco mode</span>
            </div>

            <div className="p-5 rounded-neo-card bg-neo-surface shadow-neo-raised-sm border border-neo-border space-y-1">
              <span className="text-xs font-semibold text-neo-primary/60 block">Sensor Health</span>
              <div className="text-xl sm:text-2xl font-black text-neo-primary font-mono">100 %</div>
              <span className="text-[10px] text-emerald-500 font-bold block">All Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
