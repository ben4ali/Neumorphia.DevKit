<div align="center">
  <img src="public/og-image.svg" alt="Neumorphia DevKit Banner" width="100%" style="border-radius: 16px; margin-bottom: 24px;" />

  # Neumorphia DevKit
  ### Production-Grade Neumorphic (Soft UI) Component Registry for Tailwind CSS &amp; React

  <p align="center">
    <a href="https://neumorphia-devkit.vercel.app"><strong>Live Documentation &amp; Sandbox »</strong></a>
  </p>

  <p align="center">
    <a href="https://www.npmjs.com/package/neumorphia-devkit"><img src="https://img.shields.io/npm/v/neumorphia-devkit?style=flat-square&color=3d5a80" alt="npm version" /></a>
    <img src="https://img.shields.io/badge/React-18%2B-3d5a80?style=flat-square&logo=react&logoColor=white" alt="React 18+" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v3_%26_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Accessibility-WCAG_AAA-2d6a4f?style=flat-square" alt="WCAG AAA" />
    <img src="https://img.shields.io/badge/License-MIT-4a5568?style=flat-square" alt="License MIT" />
  </p>
</div>

---

## Overview

**Neumorphia DevKit** is a developer-first component registry and design system engineered to bring tactile, authentic **Neumorphism (Soft UI)** to modern React and Tailwind CSS applications.

Unlike legacy aesthetic mockups that lacked contrast and accessibility, Neumorphia DevKit is built upon rigorous mathematical lighting principles and production-ready engineering:

- **135° Directional Lighting Physics**: Dual-offset highlights and drop shadows calculated along a consistent top-left specular vector.
- **WCAG 2.1 AAA Accessibility**: Deep mineral charcoal typography (`#2b2e42`) in Light Mode (8.44:1 contrast ratio) and radiant pastel accents on dark clay (`#1a1a1a`) in Dark Mode (12.65:1 contrast ratio).
- **Zero-Contrast Clay Substrates**: Controls are extruded directly from or carved into the background sheet (`--nms-bg-color`), eliminating unnatural floating card seams.
- **28+ Production Components**: Fully-functional TypeScript + Tailwind TSX components spanning Actions, Forms, Navigation, Feedback, and Surfaces.
- **CLI &amp; Direct Integration**: Add components in seconds using `npx neumorphia-devkit add <component>` or 1-click copy from the component source viewer.
- **AI Agent Skill Ready**: Includes structured prompt specifications for Cursor (`.cursorrules`), Windsurf, Copilot, and Claude Code.

---

## CLI Installation

You can add any component directly to your project using the official CLI:

```bash
# npm
npx neumorphia-devkit add <component-name>

# pnpm
pnpm dlx neumorphia-devkit add <component-name>

# bun
bunx neumorphia-devkit add <component-name>
```

### Examples
```bash
npx neumorphia-devkit add range-slider
npx neumorphia-devkit add button
npx neumorphia-devkit add gauge
npx neumorphia-devkit add tabs
```

Alternatively, download directly via `curl`:
```bash
curl -o src/components/ui/RangeSlider.tsx https://raw.githubusercontent.com/ben4ali/Neumorphia.DevKit/main/src/registry/components/RangeSlider.tsx
```

---

## Manual Setup Guide

### Step 1: Install Dependencies
```bash
npm install lucide-react framer-motion clsx tailwind-merge
```

---

### Step 2: Configure CSS Variables
Add the core directional lighting tokens into your global stylesheet (e.g., `src/index.css` or `app/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Light Theme Surface (#e6e7ee) */
  --nms-bg-color: #e6e7ee;
  --nms-hover-bg: #b7bdc6;
  --nms-delete-bg: #eee6e6;
  --nms-text-color: #2b2e42;
  --nms-input-text: #44476A;
  --nms-border-color: #D1D9E6;
  --nms-focus-border: #9fb3db;

  /* 135° Directional Shadow Coordinates */
  --nms-shadow-dark: #b8b9be;
  --nms-shadow-light: #ffffff;

  /* Semantic Tones */
  --nms-info-color: #3d5a80;
  --nms-success-color: #2d6a4f;
  --nms-warning-color: #8c6227;
  --nms-danger-color: #9e3b47;
  --nms-secondary-color: #3d5a80;
}

:root.dark, html.dark, body.dark, .dark {
  /* Dark Theme Surface (#1a1a1a) */
  --nms-bg-color: #1a1a1a;
  --nms-hover-bg: #2d2d2d;
  --nms-delete-bg: #2a1a1a;
  --nms-text-color: #f1f3f5;
  --nms-input-text: #e0e2e6;
  --nms-border-color: rgba(255, 255, 255, 0.035);
  --nms-focus-border: #5b7db1;

  /* 135° Directional Shadow Coordinates */
  --nms-shadow-dark: #0a0a0a;
  --nms-shadow-light: #282828;

  /* Semantic Tones */
  --nms-info-color: #7aa2dc;
  --nms-success-color: #68b684;
  --nms-warning-color: #d8a952;
  --nms-danger-color: #d97078;
  --nms-secondary-color: #7aa2dc;
}
```

---

### Step 3: Extend Tailwind Configuration
In your `tailwind.config.ts`, register the elevation tokens and colors:

```ts
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
          primary: 'var(--nms-text-color)',
          border: 'var(--nms-border-color)',
          focus: 'var(--nms-focus-border)',
          secondary: 'var(--nms-secondary-color)',
          info: 'var(--nms-info-color)',
          success: 'var(--nms-success-color)',
          warning: 'var(--nms-warning-color)',
          danger: 'var(--nms-danger-color)',
        },
      },
      boxShadow: {
        'neo-raised-sm': '3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light)',
        'neo-raised-md': '6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light)',
        'neo-raised-lg': '9px 9px 18px var(--nms-shadow-dark), -9px -9px 18px var(--nms-shadow-light)',
        'neo-inset-sm': 'inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light)',
        'neo-inset-md': 'inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light)',
        'neo-inset-lg': 'inset 6px 6px 14px var(--nms-shadow-dark), inset -6px -6px 14px var(--nms-shadow-light)',
      },
      borderRadius: {
        'neo-control': '0.55rem',
        'neo-badge': '0.25rem',
        'neo-card': '0.75rem',
        'neo-card-lg': '1.0rem',
        'neo-pill': '9999px',
      },
      fontFamily: {
        sans: ['"Nunito"', '"Nunito Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## Component Catalog

| Category | Component | Description |
| :--- | :--- | :--- |
| **Actions** | `Button` | Standard, subtle, and semantic tactile buttons with active click depression |
| | `PushButton` | Mechanical keycap with tactile travel and spring resistance |
| **Forms &amp; Selection** | `Input` | Recessed tactile text input with focus ring |
| | `Textarea` | Deep inset multi-line editor with smooth scroll track |
| | `Select` | Concave custom dropdown select with chevron indicator |
| | `Switch` | Dual-state tactile toggle with sliding pill carriage |
| | `Checkbox` | Inset check box with animated SVG checkmark |
| | `Radio` | Recessed radio ring with elevated core indicator |
| | `Slider` | Continuous horizontal track with tactile grab thumb |
| | `RangeSlider` | Dual-thumb interval selector with pointer capture bounds |
| | `PinInput` | Segmented OTP security verification fields |
| | `Kbd` | Realistic extruded keyboard keycaps with press action |
| **Navigation** | `Tabs` | Pill-encased segmented controller with sliding indicator |
| | `Accordion` | Smoothly collapsible sections with engraved division |
| | `Dock` | Floating macOS-style control dock with tooltips |
| | `Pagination` | Numbered page navigation with active well states |
| | `Stepper` | Multi-step progress timeline with completed checkpoints |
| **Feedback** | `Progress` | Recessed horizontal progress bar with active gradient fill |
| | `Gauge` | Circular radial meter with SVG arc progression and centered readout |
| | `Divider` | Dual-line engraved directional seam |
| | `Alert` | Soft status alerts with semantic icon badging |
| | `Badge` | Inset and extruded micro status chips |
| | `StatCard` | Metric analytics card with percentage change delta |
| | `Skeleton` | Shimmering placeholder pulse for loading states |
| **Surfaces &amp; Overlays** | `Card` | Tactile content container with Level 2 elevation |
| | `Dialog` | Elevated modal dialog with darkened backdrop |
| | `Tooltip` | Floating micro-label with directional arrow |
| | `Avatar` | Circular user profile badge with avatar groups |
| | `DropdownMenu` | Floating popover menu with smooth item hover depression |
| | `Toast` | Dismissible notification snackbar with timeout indicator |

---

## Directional Lighting Model

Neumorphism calculates light vectors from a virtual light source positioned at **135° (top-left)**:

```text
       Incoming 135° Light
              \
               \    [-Xpx, -Ypx Light Highlight]
                v  +-------------------------------------+
                   |                                     |
                   |      TACTILE NEUMORPHIC SURFACE     |
                   |                                     |
                   +-------------------------------------+
                    [+Xpx, +Ypx Dark Shadow]
```

### Elevation Matrix
- **`shadow-neo-raised-sm`**: Micro-elevation (chips, badges, small controls).
- **`shadow-neo-raised-md`**: Standard elevation (buttons, cards, popovers).
- **`shadow-neo-raised-lg`**: Heavy floating depth (hero structures, floating modals).
- **`shadow-neo-inset-sm`**: Subtle recess (input fields, wells, checkboxes).
- **`shadow-neo-inset-md`**: Active depression (pressed buttons, slider grooves).
- **`shadow-neo-inset-lg`**: Deep cavity (gauges, progress tracks).

---

## AI Agent Integration

You can provide the following instructions to **Cursor** (`.cursorrules`), **Windsurf** (`.windsurfrules`), **Copilot**, or **Claude Code** (`CLAUDE.md`) to generate authentic Neumorphic components automatically:

```markdown
# Neumorphia DevKit — AI Coding Agent Rules
You are an expert Frontend Engineer specialized in Neumorphic (Soft UI) design.
When generating components:
1. Always use 'bg-neo-surface' or 'bg-neo-base' (zero-contrast clay background).
2. Pair dual 135° directional shadows ('shadow-neo-raised-md', 'shadow-neo-inset-sm').
3. Use 'text-neo-primary' (#2b2e42 light / #f1f3f5 dark) for WCAG AAA contrast.
4. Add 'border border-neo-border/40 dark:border-white/[0.03]' and smooth rounded corners ('rounded-neo-control').
5. Never use generic flat white cards or single black drop shadows.
```

---

## Author &amp; Credits

**Neumorphia DevKit** is engineered and maintained by **Ali Benkarrouch**:
- GitHub: [@ben4ali](https://github.com/ben4ali)
- Repository: [https://github.com/ben4ali/Neumorphia.DevKit](https://github.com/ben4ali/Neumorphia.DevKit)
- Package: [https://www.npmjs.com/package/neumorphia-devkit](https://www.npmjs.com/package/neumorphia-devkit)

---

## License

Distributed under the **MIT License**. Free for commercial and personal use.
