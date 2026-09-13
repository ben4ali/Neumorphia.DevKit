import React from 'react';

export type ComponentCategory =
  | 'Actions'
  | 'Forms & Selection'
  | 'Navigation'
  | 'Feedback & Progress'
  | 'Overlays & Surfaces';

export type PropControlType = 'boolean' | 'select' | 'text' | 'number' | 'radio';

export interface PropControlOption {
  label: string;
  value: any;
}

export interface PropControl {
  name: string;
  label: string;
  type: PropControlType;
  defaultValue: any;
  options?: PropControlOption[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  previewComponent: React.ComponentType<{ props: Record<string, any> }>;
  defaultProps?: Record<string, any>;
  controls?: PropControl[];
  codeSnippets: {
    tailwind: string | ((props: Record<string, any>) => string);
    css: string | ((props: Record<string, any>) => string);
  };
}

export interface TokenReference {
  name: string;
  type: 'shadow' | 'color' | 'radius' | 'transition';
  cssVariable: string;
  tailwindClass?: string;
  description: string;
}

export interface SubComponentInfo {
  name: string;
  description: string;
  props?: string;
}

export interface RegistryComponent {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  badge?: 'Core' | 'New' | 'Flagship' | 'Updated';
  variants: ComponentVariant[];
  tokens?: TokenReference[];
  subcomponents?: SubComponentInfo[];
}

export type MasterRegistry = Record<string, RegistryComponent>;
