import { RegistryComponent } from '../types/registry';
import { AppView } from '../hooks/useRegistry';

export const SITE_CONFIG = {
  name: 'Neumorphia DevKit',
  shortName: 'Neumorphia',
  url: 'https://neumorphia-devkit.vercel.app',
  author: 'Ali Benkarrouch',
  authorUrl: 'https://github.com/ben4ali',
  repoUrl: 'https://github.com/ben4ali/Neumorphia.DevKit',
  ogImage: 'https://neumorphia-devkit.vercel.app/og-image.png',
  twitterHandle: '@ben4ali',
  themeColor: '#e6e7ee',
  darkThemeColor: '#1a1a1a',
  defaultKeywords: [
    'Neumorphism',
    'Neumorphic UI',
    'Soft UI',
    'Tailwind CSS',
    'React components',
    'UI registry',
    '135 degree lighting physics',
    'extrusion shadows',
    'tactile UI design',
    'accessible neumorphism',
    'dark mode neumorphism',
    'CSS box-shadow generator',
    'shadcn for soft ui',
    'React Bits'
  ],
};

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  keywords: string[];
}

export const FAQ_DATA = [
  {
    question: 'What is Neumorphism in web design?',
    answer:
      'Neumorphism (Soft UI) is a tactile UI design paradigm where user interface elements are extruded directly from or pressed into a continuous background surface. Instead of relying on hard borders or layered floating planes, shapes are defined using dual 135° directional light highlights and drop shadows.',
  },
  {
    question: 'How does Neumorphia DevKit fix low contrast in Soft UI?',
    answer:
      'Neumorphia DevKit resolves accessibility and contrast limitations by calibrating surface luminance against deep mineral charcoal text (#2b2e42) in Light Mode (8.44:1 AAA contrast) and radiant pastel tones against charcoal clay (#1a1a1a) in Dark Mode (12.65:1 AAA contrast), exceeding WCAG 2.1 AAA standards.',
  },
  {
    question: 'Can I use Neumorphia components with Tailwind CSS v3 and v4?',
    answer:
      'Yes. Neumorphia DevKit is fully compatible with Tailwind CSS v3 and v4. Every component provides copy-paste Tailwind TSX code using custom arbitrary shadow utilities, as well as standalone Vanilla CSS custom properties.',
  },
  {
    question: 'How does the 135-degree directional lighting model work?',
    answer:
      'The 135° directional lighting model simulates an ambient light source positioned at the top-left corner of the screen. Extrusions cast a bright highlight along the top-left contour and a soft dark shadow along the bottom-right contour.',
  },
  {
    question: 'Does Neumorphia DevKit support Dark Mode?',
    answer:
      'Yes. All 28+ components support seamless Dark Mode with inverted shadow physics, engraved separators, and high-contrast semantic indicators.',
  },
];

/**
 * Returns dynamic SEO metadata based on the current page and active component
 */
export function getMetadataForRoute(
  view: AppView,
  component?: RegistryComponent
): PageMetadata {
  const baseUrl = SITE_CONFIG.url;

  switch (view) {
    case 'components':
      if (component) {
        return {
          title: `${component.title} — Neumorphic Tailwind Component | ${SITE_CONFIG.name}`,
          description: `Free, accessible Neumorphic ${component.title} component built with Tailwind CSS and raw CSS. Includes interactive preview, dark mode, ${component.variants.length} variants, and copyable code.`,
          canonicalUrl: `${baseUrl}/?view=components&c=${component.id}`,
          ogType: 'article',
          ogImage: SITE_CONFIG.ogImage,
          keywords: [
            ...SITE_CONFIG.defaultKeywords,
            component.title,
            `Neumorphic ${component.title}`,
            `${component.title} Tailwind`,
            `${component.title} Soft UI`,
            component.category,
          ],
        };
      }
      return {
        title: `Component Registry — 28+ Tactile Soft UI Components | ${SITE_CONFIG.name}`,
        description:
          'Explore our complete catalog of 28+ production-ready Neumorphic React components. Copy-paste buttons, inputs, dials, switches, badges, and dashboard widgets for Tailwind CSS.',
        canonicalUrl: `${baseUrl}/?view=components`,
        ogType: 'website',
        ogImage: SITE_CONFIG.ogImage,
        keywords: SITE_CONFIG.defaultKeywords,
      };

    case 'playground':
      return {
        title: `Neumorphic Shadow & CSS Generator | ${SITE_CONFIG.name}`,
        description:
          'Generate mathematically harmonized Neumorphic box-shadows, extrusion depths, and Tailwind tokens in real time with our live Soft UI playground.',
        canonicalUrl: `${baseUrl}/?view=playground`,
        ogType: 'website',
        ogImage: SITE_CONFIG.ogImage,
        keywords: [
          ...SITE_CONFIG.defaultKeywords,
          'CSS shadow generator',
          'Neumorphism generator',
          'Soft UI generator',
          'Tailwind shadow generator',
          'box-shadow calculator',
        ],
      };

    case 'docs':
      return {
        title: `Installation & Quickstart Guide | ${SITE_CONFIG.name}`,
        description:
          'Add authentic Neumorphic styling to your React & Tailwind application in three easy steps with balanced 135° lighting physics and CSS variables.',
        canonicalUrl: `${baseUrl}/?view=docs`,
        ogType: 'article',
        ogImage: SITE_CONFIG.ogImage,
        keywords: [
          ...SITE_CONFIG.defaultKeywords,
          'Neumorphism installation',
          'Tailwind CSS setup',
          'Soft UI CSS variables',
          'Neumorphic quickstart',
        ],
      };

    case 'ai':
      return {
        title: `AI Prompts & Agent Skills (.cursorrules) | ${SITE_CONFIG.name}`,
        description:
          'Equip modern AI coding agents (Cursor, Windsurf, GitHub Copilot, Claude Code, and ChatGPT) with authentic Neumorphic system prompts, .cursorrules, and component request templates.',
        canonicalUrl: `${baseUrl}/?view=ai`,
        ogType: 'article',
        ogImage: SITE_CONFIG.ogImage,
        keywords: [
          ...SITE_CONFIG.defaultKeywords,
          'Cursor rules Neumorphism',
          '.cursorrules',
          'Windsurf rules',
          'Claude Code CLAUDE.md',
          'Copilot instructions',
          'AI coding prompts',
          'Agent skill Soft UI',
          'LLM system prompt',
        ],
      };

    case 'home':
    default:
      return {
        title: `${SITE_CONFIG.name} — Modern Neumorphic UI Components for Tailwind & CSS`,
        description:
          'A production-grade, accessible Neumorphic (Soft UI) component registry. Copy-paste tactile buttons, inputs, tabs, and dashboards with balanced 135° lighting and Dark Mode support.',
        canonicalUrl: `${baseUrl}/`,
        ogType: 'website',
        ogImage: SITE_CONFIG.ogImage,
        keywords: SITE_CONFIG.defaultKeywords,
      };
  }
}

/**
 * Builds compliant Schema.org JSON-LD Structured Data for the current route
 */
export function generateStructuredData(
  view: AppView,
  component?: RegistryComponent
): object[] {
  const schemas: object[] = [];

  // 1. WebSite Schema with SearchAction
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: 'Neumorphia Soft UI Registry',
    url: SITE_CONFIG.url,
    description:
      'Modern Neumorphic UI components and design system for Tailwind CSS and React.',
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/?view=components&c={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  // 2. Organization / Author Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon.svg`,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorUrl,
    },
    sameAs: [
      SITE_CONFIG.repoUrl,
      SITE_CONFIG.authorUrl,
    ],
  });

  // 3. Component-Level SoftwareSourceCode Schema
  if (view === 'components' && component) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': ['SoftwareSourceCode', 'CreativeWork'],
      name: `Neumorphic ${component.title}`,
      headline: `${component.title} — Neumorphic Tailwind Component`,
      description: component.description,
      programmingLanguage: ['TypeScript', 'Tailwind CSS', 'CSS3', 'React'],
      runtimePlatform: 'React 18+',
      applicationCategory: 'DeveloperApplication',
      codeRepository: SITE_CONFIG.repoUrl,
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.authorUrl,
      },
      creator: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.authorUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      keywords: `Neumorphic ${component.title}, Tailwind CSS, Soft UI, ${component.category}`,
    });
  }

  // 4. FAQPage Schema for Homepage, Docs & AI Prompts
  if (view === 'home' || view === 'docs' || view === 'ai') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}

/**
 * Synchronizes document head meta tags, OpenGraph, Twitter cards, canonical, and JSON-LD
 */
export function applySEO(view: AppView, component?: RegistryComponent): void {
  if (typeof document === 'undefined') return;

  const meta = getMetadataForRoute(view, component);
  const schemas = generateStructuredData(view, component);

  // 1. Document Title
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Primary Meta Tags
  setMeta('description', meta.description);
  setMeta('keywords', meta.keywords.join(', '));
  setMeta('author', SITE_CONFIG.author);
  setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 4. OpenGraph
  setMeta('og:title', meta.title, true);
  setMeta('og:description', meta.description, true);
  setMeta('og:type', meta.ogType, true);
  setMeta('og:url', meta.canonicalUrl, true);
  setMeta('og:image', meta.ogImage, true);
  setMeta('og:site_name', SITE_CONFIG.name, true);
  setMeta('og:locale', 'en_US', true);

  // 5. Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);
  setMeta('twitter:image', meta.ogImage);
  setMeta('twitter:creator', SITE_CONFIG.twitterHandle);
  setMeta('twitter:site', SITE_CONFIG.twitterHandle);

  // 6. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', meta.canonicalUrl);

  // 7. Inject JSON-LD Schema
  let jsonLdScript = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'seo-json-ld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = JSON.stringify(schemas, null, 2);
}
