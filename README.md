<div align="center">
  <img src="public/og-image.svg" alt="Neumorphia DevKit Banner" width="100%" style="border-radius: 16px; margin-bottom: 24px;" />

  # Neumorphia DevKit
  ### Production-Grade Neumorphic (Soft UI) Component Registry for Tailwind CSS & React

  <p align="center">
    <a href="https://neumorphia-devkit.vercel.app"><strong>Explore Live Documentation & Sandbox »</strong></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18+" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v3_%26_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Accessibility-WCAG_AAA-10B981?style=flat-square" alt="WCAG AAA" />
    <img src="https://img.shields.io/badge/License-MIT-4F46E5?style=flat-square" alt="License MIT" />
  </p>
</div>

---

## 🌟 Overview

**Neumorphia DevKit** is a developer-first, copy-paste component registry and design system that brings authentic, tactile **Neumorphism (Soft UI)** to modern web applications. 

Unlike early conceptual Dribbble shots from 2020 that suffered from low contrast and accessibility flaws, Neumorphia DevKit is engineered from the ground up with:
- **135° Simulated Lighting Physics:** Balanced directional top-left highlights and bottom-right drop shadows.
- **WCAG 2.1 AAA Contrast:** Deep mineral charcoal text (`#2b2e42`) in Light Mode (8.44:1) and radiant pastel accents on charcoal clay (`#1a1a1a`) in Dark Mode (12.65:1).
- **Zero-Contrast Clay Surfaces:** Shapes extruded directly from or recessed into the canvas sheet (`--nms-bg-color`).
- **28+ Production Components:** Copy-paste TypeScript + Tailwind TSX components across 5 categories.
- **Interactive Sandbox:** Real-time directional lighting, distance, and blur tuner with 1-click CSS and Tailwind code export.
- **AI Agent Skill Ready:** Includes `.cursorrules` and system prompts for Cursor, Windsurf, Copilot, and Claude Code.

---

## 🚀 Quickstart Installation (3 Easy Steps)

### Step 1: Install Supporting Packages
```bash
# npm
npm install lucide-react framer-motion clsx tailwind-merge

# pnpm
pnpm add lucide-react framer-motion clsx tailwind-merge

# bun
bun add lucide-react framer-motion clsx tailwind-merge
```

---

### Step 2: Add CSS Variables
Paste the base lighting tokens into your global stylesheet (e.g. `src/index.css` or `app/globals.css`):

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

  /* 135° Directional Shadow Offsets */
  --nms-shadow-dark: #b8b9be;
  --nms-shadow-light: #ffffff;

  /* Muted Semantic Status Tones */
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
  --nms-input-text: #d0d0d0;
  --nms-border-color: rgba(255, 255, 255, 0.08);
  --nms-focus-border: #5b7db1;

  /* 135° Directional Shadow Offsets */
  --nms-shadow-dark: #0a0a0a;
  --nms-shadow-light: #282828;

  /* Soft Pastel Semantic Tones */
  --nms-info-color: #7aa2dc;
  --nms-success-color: #68b684;
  --nms-warning-color: #d8a952;
  --nms-danger-color: #d97078;
  --nms-secondary-color: #7aa2dc;
}
```

---

### Step 3: Extend Tailwind Configuration
Add the custom elevation shadows, colors, and border radii into `tailwind.config.ts`:

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

## 📦 Component Catalog (28 Production Components)

| Category | Components Included |
| :--- | :--- |
| **Actions & Triggers** | `Buttons`, `PushButton` (Mechanical Tactile Keycap with active depression) |
| **Forms & Selection** | `Inputs`, `Switch`, `Checkbox`, `RadioGroup`, `Slider`, `RangeSlider`, `PinInput` (OTP), `Kbd` (Keycaps) |
| **Navigation & Layout** | `Tabs`, `Accordion`, `Dock` (macOS-style Dock), `Pagination`, `Stepper` |
| **Feedback & Progress** | `Progress`, `Divider` (Engraved Grooves), `Alert`, `Badge`, `StatCard`, `Gauge`, `Skeleton` |
| **Overlays & Surfaces** | `Card`, `Dialog` (Modal), `Tooltip`, `Avatar`, `DropdownMenu`, `Toast` |

---

## 📐 Lighting Physics & Mathematical Model

Neumorphia simulates a directional light source stationed at the top-left corner (**135° angle**):

```
       Incoming 135° Light
              \
               \    [-Xpx, -Ypx Light Highlight (#ffffff)]
                v  +-------------------------------------+
                   |                                     |
                   |      TACTILE NEUMORPHIC SURFACE     |
                   |                                     |
                   +-------------------------------------+
                    [+Xpx, +Ypx Dark Shadow (#b8b9be)]
```

### Elevation Scales
- **`shadow-neo-raised-sm`**: Subtle extrusion (badges, status tags).
- **`shadow-neo-raised-md`**: Standard elevation (buttons, control triggers, cards).
- **`shadow-neo-raised-lg`**: Elevated floating depth (hero cards, toolbars).
- **`shadow-neo-inset-sm`**: Subtle recess (input fields, switches).
- **`shadow-neo-inset-md`**: Active depressed state (pressed buttons, slider tracks).
- **`shadow-neo-inset-lg`**: Deep trench (progress bars, telemetry meters).

---

## 🤖 AI Agent Skills & System Prompts

Teach **Cursor** (`.cursorrules`), **Windsurf** (`.windsurfrules`), **GitHub Copilot** (`copilot-instructions.md`), and **Claude Code** (`CLAUDE.md`) how to generate authentic Neumorphic components using our system prompt:

```markdown
# Neumorphia DevKit — AI Coding Agent Rules
You are an expert Frontend Engineer specialized in Neumorphic (Soft UI) design.
When generating components:
1. Always use 'bg-neo-surface' or 'bg-neo-base' (zero-contrast clay background).
2. Pair dual 135° directional shadows ('shadow-neo-raised-md', 'shadow-neo-inset-sm').
3. Use 'text-neo-primary' (#2b2e42 light / #f1f3f5 dark) for WCAG AAA contrast.
4. Add 'border border-neo-border' and smooth rounded corners ('rounded-neo-control').
5. Never use generic flat white cards or single black drop shadows.
```

---

## 👤 Author & Credits

**Neumorphia DevKit** is designed and maintained by **Ali Benkarrouch**:
- **GitHub:** [@ben4ali](https://github.com/ben4ali)
- **Repository:** [https://github.com/ben4ali/Neumorphia.DevKit](https://github.com/ben4ali/Neumorphia.DevKit)

---

## 📄 License

Distributed under the **MIT License**. Free for commercial and personal use.
