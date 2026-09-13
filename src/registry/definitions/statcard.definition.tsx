import React from 'react';
import { RegistryComponent } from '../../types/registry';
import { NeumorphicStatCard } from '../components/StatCard';
import { Activity, Cpu, Users, Zap } from 'lucide-react';

export const statCardDefinition: RegistryComponent = {
  id: 'stat-card',
  title: 'KPI & Metric Cards',
  category: 'Feedback & Progress',
  description:
    'Level 2 Raised card featuring prominent metric values, icon receptacles, and embedded recessed trend pills showing positive/negative percentage changes.',
  tokens: [
    {
      name: 'Metric Card Chassis',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-raised-md',
      description: 'Level 2 Raised container with 0.75rem / 1.0rem radius',
    },
    {
      name: 'Trend Pill Well',
      type: 'shadow',
      cssVariable: '--nms-shadow-dark, --nms-shadow-light',
      tailwindClass: 'shadow-neo-inset-sm',
      description: 'Embedded recessed pill showing percentage deltas',
    },
  ],
  variants: [
    {
      id: 'stat-grid',
      name: 'Metric Cards Grid',
      description: 'KPI summary cards for dashboards and performance overviews.',
      previewComponent: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          <NeumorphicStatCard
            title="Active Sessions"
            value="84,291"
            subtitle="Concurrent WebSocket connections"
            change={{ value: '+14.2%', positive: true }}
            icon={<Users className="w-4 h-4 text-neo-secondary" />}
          />
          <NeumorphicStatCard
            title="Cluster Latency"
            value="14.8 ms"
            subtitle="p99 edge inference response"
            change={{ value: '-8.4%', positive: true }}
            icon={<Zap className="w-4 h-4 text-neo-warning" />}
          />
          <NeumorphicStatCard
            title="Memory Saturation"
            value="78.2%"
            subtitle="32.4 GB / 48.0 GB provisioned"
            change={{ value: '+5.1%', positive: false }}
            icon={<Cpu className="w-4 h-4 text-neo-danger" />}
          />
          <NeumorphicStatCard
            title="Throughput Rate"
            value="1.24 M/s"
            subtitle="Vector embeddings processed"
            change={{ value: '+22.6%', positive: true }}
            icon={<Activity className="w-4 h-4 text-neo-success" />}
          />
        </div>
      ),
      codeSnippets: {
        tailwind: `import { NeumorphicStatCard } from '@/components/StatCard';
import { Users } from 'lucide-react';

export function StatDemo() {
  return (
    <NeumorphicStatCard
      title="Active Sessions"
      value="84,291"
      subtitle="Concurrent WebSocket connections"
      change={{ value: '+14.2%', positive: true }}
      icon={<Users className="w-4 h-4" />}
    />
  );
}`,
        css: `/* Neumorphic KPI Card */
.nms-stat-card {
  background-color: var(--nms-bg-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 1rem;
  padding: 1.25rem;
}`,
      },
    },
  ],
};
