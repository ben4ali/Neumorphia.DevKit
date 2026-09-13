import { useEffect } from 'react';
import { AppView } from './useRegistry';
import { RegistryComponent } from '../types/registry';
import { applySEO } from '../utils/seo';

export function useSEO(view: AppView, component?: RegistryComponent) {
  useEffect(() => {
    applySEO(view, component);
  }, [view, component]);
}
