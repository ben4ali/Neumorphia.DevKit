import { useState, useEffect } from 'react';
import { registry, getAllComponents, getComponentById } from '../registry';
import { RegistryComponent, ComponentVariant } from '../types/registry';

export type AppView = 'home' | 'components' | 'docs' | 'playground' | 'ai' | 'iot' | 'music' | 'calculator' | 'examples';

export function useRegistry() {
  const [activeView, setActiveView] = useState<AppView>(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as AppView;
    if (['home', 'components', 'docs', 'playground', 'ai', 'iot', 'music', 'calculator', 'examples'].includes(viewParam)) {
      return viewParam;
    }
    // If a component is directly requested, default view is components
    if (params.get('c')) {
      return 'components';
    }
    return 'home';
  });

  const [activeComponentId, setActiveComponentId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('c') || 'buttons';
  });

  const [activeVariantId, setActiveVariantId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('v') || 'raised';
  });

  const currentComponent: RegistryComponent =
    getComponentById(activeComponentId) || registry.buttons;

  const currentVariant: ComponentVariant =
    currentComponent.variants.find((v) => v.id === activeVariantId) ||
    currentComponent.variants[0];

  const selectView = (view: AppView) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    if (view !== 'components') {
      url.searchParams.delete('c');
      url.searchParams.delete('v');
    }
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectComponent = (id: string, variantId?: string) => {
    const targetComp = getComponentById(id);
    if (!targetComp) return;
    setActiveView('components');
    setActiveComponentId(id);
    const targetVar = variantId || targetComp.variants[0]?.id || '';
    setActiveVariantId(targetVar);

    const url = new URL(window.location.href);
    url.searchParams.set('view', 'components');
    url.searchParams.set('c', id);
    if (targetVar) url.searchParams.set('v', targetVar);
    window.history.pushState({}, '', url.toString());
  };

  const selectVariant = (variantId: string) => {
    setActiveVariantId(variantId);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'components');
    url.searchParams.set('c', activeComponentId);
    url.searchParams.set('v', variantId);
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') as AppView;
      const c = params.get('c') || 'buttons';
      const v = params.get('v') || 'raised';

      if (['home', 'components', 'docs', 'playground', 'ai', 'iot', 'music', 'examples'].includes(viewParam)) {
        setActiveView(viewParam);
      } else if (params.get('c')) {
        setActiveView('components');
      } else {
        setActiveView('home');
      }

      setActiveComponentId(c);
      setActiveVariantId(v);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    activeView,
    selectView,
    activeComponentId,
    activeVariantId,
    currentComponent,
    currentVariant,
    selectComponent,
    selectVariant,
    allComponents: getAllComponents(),
  };
}
