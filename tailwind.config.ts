import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          base: 'var(--nms-bg-color)',
          surface: 'var(--nms-bg-color)',
          well: 'var(--nms-hover-bg)',
          delete: 'var(--nms-delete-bg)',
          primary: 'var(--nms-text-color)',
          input: 'var(--nms-input-text)',
          border: 'var(--nms-border-color)',
          focus: 'var(--nms-focus-border)',
          info: 'var(--nms-info-color)',
          success: 'var(--nms-success-color)',
          warning: 'var(--nms-warning-color)',
          danger: 'var(--nms-danger-color)',
          neutral: 'var(--nms-neutral-color)',
          accent: 'var(--nms-accent-color)',
          secondary: 'var(--nms-secondary-color)',
        },
      },
      boxShadow: {
        /* Harmonized Raised Extrusions */
        'neo-raised-sm': '3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light)',
        'neo-raised-md': '6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light)',
        'neo-raised-lg': '9px 9px 18px var(--nms-shadow-dark), -9px -9px 18px var(--nms-shadow-light)',

        /* Harmonized Inset Recesses */
        'neo-inset-sm': 'inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light)',
        'neo-inset-md': 'inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light)',
        'neo-inset-lg': 'inset 6px 6px 14px var(--nms-shadow-dark), inset -6px -6px 14px var(--nms-shadow-light)',

        /* Destructive & Inset Active States */
        'neo-delete': '3px 3px 6px var(--nms-delete-shadow-dark), -3px -3px 6px var(--nms-delete-shadow-light)',
        'neo-delete-inset': 'inset 2px 2px 4px var(--nms-delete-shadow-dark), inset -2px -2px 4px var(--nms-delete-shadow-light)',
        'neo-hover-inset': 'inset 4px 4px 8px var(--nms-hover-shadow-dark), inset -4px -4px 8px var(--nms-hover-shadow-light)',
      },
      borderRadius: {
        'neo-control': '0.55rem',
        'neo-badge': '0.25rem',
        'neo-card': '0.75rem',
        'neo-card-lg': '1.0rem',
        'neo-pill': '9999px',
      },
      fontFamily: {
        sans: ['"Nunito"', '"Nunito Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
