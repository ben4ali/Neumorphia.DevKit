import { useState, useEffect, useCallback } from 'react';
import { registry, getAllComponents, getComponentById } from '../registry';
import { RegistryComponent, ComponentVariant } from '../types/registry';

export type AppView = 'home' | 'components' | 'docs' | 'playground' | 'ai' | 'iot' | 'music' | 'calculator' | 'examples';

interface ParsedRoute {
  view: AppView;
  componentId: string;
  variantId: string;
  isLegacyQuery: boolean;
}

/**
 * Parses current URL (pathname and search params) to determine active view, component, and variant.
 * Provides backwards compatibility for legacy ?view= and ?c= query parameters.
 */
export function parseCurrentRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { view: 'home', componentId: 'buttons', variantId: 'raised', isLegacyQuery: false };
  }

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);
  const viewQuery = params.get('view') as AppView | null;
  const cQuery = params.get('c');
  const vQuery = params.get('v') || 'raised';

  // 1. Backwards compatibility for legacy query parameters (?view=..., ?c=...)
  if (viewQuery || cQuery) {
    let resolvedView: AppView = 'home';
    if (viewQuery && ['home', 'components', 'docs', 'playground', 'ai', 'iot', 'music', 'calculator', 'examples'].includes(viewQuery)) {
      resolvedView = viewQuery;
    } else if (cQuery) {
      resolvedView = 'components';
    }

    const componentId = cQuery || 'buttons';
    return {
      view: resolvedView,
      componentId,
      variantId: vQuery,
      isLegacyQuery: true,
    };
  }

  // 2. Clean Pathname Routing
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0 || segments[0] === 'home') {
    return { view: 'home', componentId: 'buttons', variantId: vQuery, isLegacyQuery: false };
  }

  const primary = segments[0].toLowerCase();

  if (primary === 'components') {
    const compId = segments[1] || 'buttons';
    return { view: 'components', componentId: compId, variantId: vQuery, isLegacyQuery: false };
  }

  if (primary === 'examples') {
    const sub = segments[1]?.toLowerCase();
    if (sub === 'iot' || sub === 'music' || sub === 'calculator') {
      return { view: sub as AppView, componentId: 'buttons', variantId: vQuery, isLegacyQuery: false };
    }
    return { view: 'examples', componentId: 'buttons', variantId: vQuery, isLegacyQuery: false };
  }

  if (['docs', 'playground', 'ai', 'iot', 'music', 'calculator', 'examples'].includes(primary)) {
    return { view: primary as AppView, componentId: 'buttons', variantId: vQuery, isLegacyQuery: false };
  }

  return { view: 'home', componentId: 'buttons', variantId: vQuery, isLegacyQuery: false };
}

/**
 * Builds clean RESTful URLs for given route parameters.
 */
export function buildRouteUrl(view: AppView, componentId?: string, variantId?: string): string {
  let path = '/';
  if (view === 'components') {
    path = componentId ? `/components/${componentId}` : '/components';
  } else if (view === 'home') {
    path = '/';
  } else {
    path = `/${view}`;
  }

  if (view === 'components' && variantId && variantId !== 'raised') {
    return `${path}?v=${encodeURIComponent(variantId)}`;
  }
  return path;
}

export function useRegistry() {
  const initialRoute = parseCurrentRoute();

  const [activeView, setActiveView] = useState<AppView>(initialRoute.view);
  const [activeComponentId, setActiveComponentId] = useState<string>(initialRoute.componentId);
  const [activeVariantId, setActiveVariantId] = useState<string>(initialRoute.variantId);

  // Upgrade legacy query URL to clean path in history on initial load
  useEffect(() => {
    if (initialRoute.isLegacyQuery) {
      const cleanUrl = buildRouteUrl(
        initialRoute.view,
        initialRoute.view === 'components' ? initialRoute.componentId : undefined,
        initialRoute.variantId !== 'raised' ? initialRoute.variantId : undefined
      );
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  const currentComponent: RegistryComponent =
    getComponentById(activeComponentId) || registry.buttons;

  const currentVariant: ComponentVariant =
    currentComponent.variants.find((v) => v.id === activeVariantId) ||
    currentComponent.variants[0];

  const selectView = useCallback((view: AppView) => {
    setActiveView(view);
    const url = buildRouteUrl(view, view === 'components' ? activeComponentId : undefined);
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeComponentId]);

  const selectComponent = useCallback((id: string, variantId?: string) => {
    const targetComp = getComponentById(id);
    if (!targetComp) return;
    setActiveView('components');
    setActiveComponentId(id);
    const targetVar = variantId || targetComp.variants[0]?.id || 'raised';
    setActiveVariantId(targetVar);

    const isDefaultVar = targetVar === targetComp.variants[0]?.id;
    const url = buildRouteUrl('components', id, isDefaultVar ? undefined : targetVar);
    window.history.pushState({}, '', url);
  }, []);

  const selectVariant = useCallback((variantId: string) => {
    setActiveVariantId(variantId);
    const targetComp = getComponentById(activeComponentId);
    const isDefaultVar = targetComp?.variants[0]?.id === variantId;
    const url = buildRouteUrl('components', activeComponentId, isDefaultVar ? undefined : variantId);
    window.history.pushState({}, '', url);
  }, [activeComponentId]);

  // Synchronize state when user uses browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      setActiveView(route.view);
      setActiveComponentId(route.componentId);
      setActiveVariantId(route.variantId);
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
