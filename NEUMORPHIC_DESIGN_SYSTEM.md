# Neumorphic UI Design System Specification

> **Document Type:** Design System Architecture & Extraction Specification  
> **Source Target:** Legacy Neumorphic Theme (`src/app/neumorphism.css`, `src/app/globals.css`, React Component Library)  
> **Status:** Reverse-Engineered & Formally Documented

---

## Executive Summary

This document provides a comprehensive extraction and reverse-engineering of the custom **Neumorphic (Soft UI)** design system implemented within this application. It details the underlying physics model (light/shadow interplay), color math, geometric tokens, component states, and flags existing implementation inconsistencies with mathematical harmonizations.

---

## 1. Color System & Surfaces

Neumorphic UI relies on zero-contrast or near-zero-contrast surface-to-background boundaries, where shapes and depth are defined strictly through lighting highlights and drop shadows rather than flat border boundaries.

### 1.1 Base Background & Surface Colors

| Theme Mode | Color Variable | HEX | RGB | HSL | Surface Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Light (Default)** | `--nms-bg-color` | `#e6e7ee` | `rgb(230, 231, 238)` | `hsl(233, 19%, 92%)` | Canvas background & extruded card surface |
| **Light (Delete Variant)** | `--nms-delete-bg` | `#eee6e6` | `rgb(238, 230, 230)` | `hsl(0, 18%, 92%)` | Destructive action surface |
| **Light (Hover Active)** | `--nms-hover-bg` | `#b7bdc6` | `rgb(183, 189, 198)` | `hsl(216, 12%, 75%)` | Depressed / inner button hover surface |
| **Dark (`body.dark`)** | `--nms-bg-color` | `#1a1a1a` | `rgb(26, 26, 26)` | `hsl(0, 0%, 10%)` | Canvas background & extruded card surface |
| **Dark (Delete Variant)** | `--nms-delete-bg` | `#2a1a1a` | `rgb(42, 26, 26)` | `hsl(0, 24%, 13%)` | Destructive action surface (Dark) |
| **Dark (Hover Active)** | `--nms-hover-bg` | `#2d2d2d` | `rgb(45, 45, 45)` | `hsl(0, 0%, 18%)` | Depressed / inner button hover surface (Dark) |

---

### 1.2 Text Colors & Contrast Evaluations

| Token / Role | Target Variable | Light Mode Value | Contrast Ratio (Light) | Dark Mode Value | Contrast Ratio (Dark) | WCAG Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Text** | `--nms-text-color` | `#31344b` | **8.44:1** (on `#e6e7ee`) | `#e5e5e5` | **12.65:1** (on `#1a1a1a`) | **AAA (Pass)** |
| **Input Text** | `--nms-input-text` | `#44476A` | **5.67:1** (on `#e6e7ee`) | `#d0d0d0` | **10.15:1** (on `#1a1a1a`) | **AA (Pass)** |
| **Muted Text** | `--muted-foreground` | `#8b8b8b` | **2.21:1** (on `#e6e7ee`) | `#a3a3a3` | **6.12:1** (on `#1a1a1a`) | **Light: Fail (< 4.5:1)** / Dark: AA |
| **Destructive Text** | `.nms-danger` | `#A91E2C` | **5.45:1** (on `#e6e7ee`) | `#f87171` | **5.68:1** (on `#1a1a1a`) | **AA (Pass)** |

---

### 1.3 Accent, Indicator & Semantic Colors

Used for status badges, metric highlights, active glows, and focus rings:

| Semantic Class | Light Mode Value | Dark Mode Value | Usage Context |
| :--- | :--- | :--- | :--- |
| `--nms-focus-border` | `#A3BFFA` (`rgb(163, 191, 250)`) | `#4a9eff` (`rgb(74, 158, 255)`) | Form input focus ring & outline |
| `.nms-success` | `#18634B` (`rgb(24, 99, 75)`) | `#4ade80` (`rgb(74, 222, 128)`) | Verified badges, positive metrics |
| `.nms-danger` | `#A91E2C` (`rgb(169, 30, 44)`) | `#f87171` (`rgb(248, 113, 113)`) | Error validation, destructive states |
| `.nms-info` | `#0056B3` (`rgb(0, 86, 179)`) | `#60a5fa` (`rgb(96, 165, 250)`) | Info banners, tag badges |
| `.nms-secondary` | `#2D4CC8` (`rgb(45, 76, 200)`) | `#5985fd` (`rgb(89, 133, 253)`) | Primary buttons, counter labels |
| `.nms-warning` | `#A57C20` (`rgb(165, 124, 32)`) | `#fbbf24` (`rgb(251, 191, 36)`) | Warning banners, quota counters |
| `.nms-magenta` | `#8a00d5` (`rgb(138, 0, 213)`) | `#e879f9` (`rgb(232, 121, 249)`) | Utilization badges, analytic tags |

---

## 2. Light & Shadow Matrix (The Neumorphic Core)

### 2.1 Lighting Model Geometry

The Neumorphic illusion is powered by a **single simulated directional light source**:
- **Light Position:** Top-Left quadrant ($135^\circ$ angle of incidence / pointing towards bottom-right).
- **Extruded (Convex/Raised) Elements:**
  - Positive offset `(+X, +Y)` projects a **Dark Shadow** toward the bottom-right.
  - Negative offset `(-X, -Y)` creates a **Light Highlight** along the top-left edge.
- **Recessed (Concave/Inset) Elements:**
  - Inset positive offset `inset (+X, +Y)` creates an inner shadow cast by the top-left lip.
  - Inset negative offset `inset (-X, -Y)` creates an inner illuminated edge on the bottom-right floor.

```
       [ Simulated Light Source: Top-Left ]
                  \
                   \
        -X, -Y      v
      +-------------------+
      | (Light Highlight) |
      |                   |
      |   EXTRUDED BODY   |
      |                   |
      |     (Dark Shadow) |
      +-------------------+
                     +X, +Y
```

---

### 2.2 Shadow Variables & Specifications

| Shadow Token | Light Theme Value | Dark Theme Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--nms-shadow-dark` | `#b8b9be` (`hsl(230, 4%, 73%)`) | `#0f0f0f` (`hsl(0, 0%, 6%)`) | Core dark drop/inset shadow |
| `--nms-shadow-light` | `#ffffff` (`hsl(0, 0%, 100%)`) | `#2a2a2a` (`hsl(0, 0%, 16%)`) | Core specular light highlight |
| `--nms-delete-shadow-dark` | `#bdafaf` (`hsl(0, 10%, 71%)`) | `#1a0f0f` (`hsl(0, 27%, 8%)`) | Destructive button dark shadow |
| `--nms-delete-shadow-light` | `#fff4f4` (`hsl(0, 100%, 98%)`) | `#3a2a2a` (`hsl(0, 16%, 20%)`) | Destructive button light highlight |
| `--nms-hover-shadow-dark` | `#95969a` (`hsl(230, 2%, 59%)`) | `#0a0a0a` (`hsl(0, 0%, 4%)`) | High-intensity inset dark shadow |
| `--nms-hover-shadow-light` | `#d5d4d4` (`hsl(0, 1%, 83%)`) | `#404040` (`hsl(0, 0%, 25%)`) | High-intensity inset light highlight |

---

### 2.3 Shadow State Matrix (Exact CSS box-shadow Definitions)

| Elevation State | Target Element / Class | Exact CSS `box-shadow` Property | Dark Shadow Parameters | Light Highlight Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **High Extruded (Default Card)** | `.nms-card` | `6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light) !important` | X: `6px`, Y: `6px`, Blur: `12px`, Spread: `0` | X: `-6px`, Y: `-6px`, Blur: `12px`, Spread: `0` |
| **Raised Action (Button Default)** | `.nms-btn` | `3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light)` | X: `3px`, Y: `3px`, Blur: `6px`, Spread: `0` | X: `-3px`, Y: `-3px`, Blur: `6px`, Spread: `0` |
| **Destructive Action** | `.nms-delete-btn` | `3px 3px 6px var(--nms-delete-shadow-dark), -3px -3px 6px var(--nms-delete-shadow-light)` | X: `3px`, Y: `3px`, Blur: `6px`, Spread: `0` | X: `-3px`, Y: `-3px`, Blur: `6px`, Spread: `0` |
| **Depressed / Inset (Forms, Pressed Buttons, Badges)** | `.nms-form-control`, `.nms-inner-card`, `.nms-inner-btn`, `.nms-btn:hover`, `.nms-badge` | `inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light) !important` | Inset X: `2px`, Y: `2px`, Blur: `5px`, Spread: `0` | Inset X: `-3px`, Y: `-3px`, Blur: `7px`, Spread: `0` |
| **Deep Inset (Strong Recessed)** | `.nms-inner-card-strong` | `inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light) !important` | Inset X: `4px`, Y: `4px`, Blur: `8px`, Spread: `0` | Inset X: `-4px`, Y: `-4px`, Blur: `8px`, Spread: `0` |
| **Active Depressed Hover** | `.nms-inner-btn:hover` | `inset 4px 4px 8px var(--nms-hover-shadow-dark), inset -4px -4px 8px var(--nms-hover-shadow-light) !important` | Inset X: `4px`, Y: `4px`, Blur: `8px`, Spread: `0` | Inset X: `-4px`, Y: `-4px`, Blur: `8px`, Spread: `0` |
| **Subdued Floating (Card Hover)** | `.nms-card-hover:hover` | `2px 2px 10px var(--nms-shadow-dark), -2px -2px 10px var(--nms-shadow-light) !important` | X: `2px`, Y: `2px`, Blur: `10px`, Spread: `0` | X: `-2px`, Y: `-2px`, Blur: `10px`, Spread: `0` |

---

## 3. Geometry & Typography

### 3.1 Border Radius Scales

| Token / Usage | Measured CSS Value | Tailwind Class Equivalent | Component Application |
| :--- | :--- | :--- | :--- |
| **Control Radius** | `0.55rem` (8.8px) | `rounded-[0.55rem]` / `rounded-lg` | `.nms-form-control`, `.nms-select` |
| **Small / Badge Radius** | `0.25rem` (4px) | `rounded` | `.nms-badge`, tags, switch thumb |
| **Container Radius (Medium)** | `0.625rem` (10px) / `0.75rem` (12px) | `rounded-lg` / `rounded-xl` | `.nms-card`, `.nms-inner-card`, dialog panels |
| **Container Radius (Large)** | `1.0rem` (16px) | `rounded-2xl` | Sign-in auth card, password reset modal |
| **Pill / Circular** | `9999px` | `rounded-full` | Action buttons, filter pills, switch track, avatar rings |

---

### 3.2 Border Outlines & Edge Definitions

To maintain crisp definition on lower contrast screens, subtle semi-transparent borders are applied:

- **Card Multi-Border Definition:**
  ```css
  border: 0.0625rem solid var(--nms-border-color); /* Light: #D1D9E6 | Dark: #2d2d2d */
  ```
- **Hover Edge State:**
  ```css
  border-color: var(--nms-border-color-hover); /* Light: #d1d9e65c | Dark: #2d2d2d9c */
  ```
- **Focus Ring Edge State:**
  ```css
  border-color: var(--nms-focus-border); /* Light: #A3BFFA | Dark: #4a9eff */
  outline: none;
  ```

---

### 3.3 Typography & Font Rules

- **Primary Font Family:** `Nunito Sans`, `sans-serif` (via `--font-nunito-sans`)
- **Button Typography:**
  - Font Size: `1rem` (16px)
  - Letter Spacing: `0.025em` (`tracking-wide`)
  - Font Weight: `500` / `600` (`font-medium` / `font-semibold`)
- **Form Controls:**
  - Font Size: `1rem` (16px)
  - Font Weight: `300` (`font-light`)
  - Line Height: `1.5`
- **Badges & Microcopy:**
  - Font Size: `0.7rem` (11.2px)
  - Font Weight: `600` (`font-semibold`)
- **Standard Transitions:**
  - Controls: `transition: all 0.3s ease-in-out`
  - Cards & Buttons: `transition: all 0.2s ease`

---

## 4. Component Inventory

### 4.1 Buttons

#### A. Standard Action Button (`.nms-btn`)
- **Default State:**
  ```css
  background-color: var(--nms-bg-color);
  color: var(--nms-text-color);
  border: 0.0625rem solid var(--nms-border-color);
  box-shadow: 3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light);
  letter-spacing: 0.025em;
  cursor: pointer;
  transition: all 0.2s ease;
  ```
- **Hover / Pressed State:**
  - Visually sinks into the canvas, switching from extruded outer shadow to depressed inner shadow:
  ```css
  box-shadow: inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light) !important;
  border-color: var(--nms-border-color) !important;
  ```

#### B. Destructive Action Button (`.nms-delete-btn`)
- **Default State:**
  ```css
  background-color: var(--nms-delete-bg);
  border-color: var(--nms-delete-border);
  box-shadow: 3px 3px 6px var(--nms-delete-shadow-dark), -3px -3px 6px var(--nms-delete-shadow-light);
  ```

#### C. Pre-Depressed / Inset Button (`.nms-inner-btn`)
- **Default State:**
  ```css
  box-shadow: inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light);
  border-color: var(--nms-border-color);
  ```
- **Hover State:**
  ```css
  background-color: var(--nms-hover-bg);
  box-shadow: inset 4px 4px 8px var(--nms-hover-shadow-dark), inset -4px -4px 8px var(--nms-hover-shadow-light) !important;
  ```

---

### 4.2 Form Controls

#### A. Text Inputs & TextAreas (`.nms-form-control`)
- **Structure:**
  ```css
  display: block;
  width: 100%;
  height: calc(1.5em + 1.2rem + 0.0625rem); /* ~44px */
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  font-weight: 300;
  color: var(--nms-input-text);
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.55rem;
  box-shadow: inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light);
  transition: all 0.3s ease-in-out;
  ```
- **Focus State:**
  ```css
  outline: none;
  border-color: var(--nms-focus-border);
  ```

#### B. Dropdown Select (`.nms-select`)
- **Structure:**
  - Matches `.nms-form-control` dimensions with embedded chevron indicator:
  ```css
  appearance: none;
  padding: 0.6rem 1.75rem 0.6rem 0.75rem;
  background: url("data:image/svg+xml,...") no-repeat right 0.75rem center/8px 10px;
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  border-radius: 0.55rem;
  ```

#### C. Switches & Toggles (`Switch` Component)
- **Track (Root):** Pill container (`rounded-full`) utilizing `.nms-form-control` recessed shadow (`w-[36px] h-[15px]`).
- **Thumb:** Extruded rounded square (`h-3 w-3 rounded bg-white shadow-lg`), sliding `translate-x-4` on checked state.

---

### 4.3 Containers & Surfaces

#### A. Extruded Card (`.nms-card`)
- **Structure:**
  ```css
  background-color: var(--nms-bg-color);
  border: 0.0625rem solid var(--nms-border-color);
  box-shadow: 6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light) !important;
  color: var(--nms-text-color);
  transition: all 0.2s ease-in-out;
  ```

#### B. Inset Well / Inner Card (`.nms-inner-card`)
- **Structure:**
  ```css
  box-shadow: inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light) !important;
  border-color: var(--nms-border-color) !important;
  ```

#### C. Deep Inset Well (`.nms-inner-card-strong`)
- **Structure:**
  ```css
  box-shadow: inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light) !important;
  border-color: var(--nms-border-color) !important;
  ```

---

### 4.4 State Indicators & Badges

#### Inset Status Badge (`.nms-badge`)
- **Structure:**
  ```css
  box-shadow: inset 2px 2px 5px var(--nms-shadow-dark), inset -3px -3px 7px var(--nms-shadow-light);
  background-color: transparent;
  font-size: 0.7rem;
  font-weight: 600;
  border: 0.0625rem solid var(--nms-border-color);
  ```
- **Semantic Badges:** Combines `.nms-badge` with semantic text classes (`.nms-info`, `.nms-secondary`, `.nms-magenta`, `.nms-success`, `.nms-warning`, `.nms-danger`).

---

## 5. Identified Inconsistencies & Optimization Notes

### 5.1 Critical Architectural Inconsistencies

1. **Broken Select Shadow Override:**
   - **Location:** `src/app/neumorphism.css` (lines 146 & 162)
   - **Issue:** Line 146 sets a Neumorphic dual inset shadow (`box-shadow: inset 2px 2px 5px ..., inset -3px -3px 7px ...;`), but Line 162 subsequently overrides it with a generic single shadow `box-shadow: inset 0 1px 2px rgba(38,40,51,0.075);`.
   - **Impact:** Dropdowns render with flat Bootstrap-like shadows instead of Neumorphic depth.

2. **Asymmetrical Inset Shadow Coordinates:**
   - **Location:** `.nms-inner-card`, `.nms-form-control`, `.nms-badge`
   - **Issue:** Uses `inset 2px 2px 5px` for dark shadow vs `inset -3px -3px 7px` for light highlight.
   - **Impact:** Light source appears skewed with uneven diffusion between shadow and specular highlight.

3. **Inverted Card Hover Elevation:**
   - **Location:** `.nms-card-hover:hover`
   - **Issue:** Resting state has `6px 6px 12px` shadow. Hover reduces it to `2px 2px 10px`.
   - **Impact:** Hovering makes cards physically sink down instead of floating up toward the user.

4. **Redundant & Conflicting Card Borders:**
   - **Location:** `.nms-card` (lines 50–56)
   - **Issue:** Declares `border: .0625rem solid rgba(243,247,250,0.05);` and overrides individual sides before overriding the entire border again with `border-color: var(--nms-border-color);`.

5. **Tailwind Shadow Collisions:**
   - **Location:** Various components (e.g. `client-form.tsx`, `sign-in.tsx`)
   - **Issue:** Code mixes `nms-card` with Tailwind utility classes (`shadow-sm`, `shadow-xl`). Because `.nms-card` uses `!important`, Tailwind utilities are rendered inert.

---

### 5.2 Mathematical Harmonization Matrix

To resolve all inconsistencies and create a physically cohesive lighting system, the shadows are normalized below according to a proportional scale:

$$\text{Blur} = 2 \times \text{Offset}, \quad \text{Specular Highlight} = -\text{Offset}$$

```
================================================================================
                    PROPOSED HARMONIZED NEUMORPHIC MATRIX
================================================================================
```

| Elevation Level | State / Component | Harmonized CSS `box-shadow` |
| :--- | :--- | :--- |
| **Level 0 (Flat/Base)** | Canvas / Unselected | `none` |
| **Level 1 Inset (Shallow Depressed)** | Inputs (`.nms-form-control`, `.nms-select`), Badges (`.nms-badge`), Pressed Buttons | `inset 2px 2px 4px var(--nms-shadow-dark), inset -2px -2px 4px var(--nms-shadow-light)` |
| **Level 2 Inset (Deep Depressed)** | Wells (`.nms-inner-card`), Empty State Containers | `inset 4px 4px 8px var(--nms-shadow-dark), inset -4px -4px 8px var(--nms-shadow-light)` |
| **Level 1 Raised (Interactive Element)** | Buttons Default (`.nms-btn`), Switch Knobs | `3px 3px 6px var(--nms-shadow-dark), -3px -3px 6px var(--nms-shadow-light)` |
| **Level 2 Raised (Containers & Cards)** | Resting Cards (`.nms-card`), Floating Menus | `6px 6px 12px var(--nms-shadow-dark), -6px -6px 12px var(--nms-shadow-light)` |
| **Level 3 Raised (Card Hover / Float)** | Hovered Cards (`.nms-card-hover:hover`) | `9px 9px 18px var(--nms-shadow-dark), -9px -9px 18px var(--nms-shadow-light)` |

---

### 5.3 Modern Design System Export Token Schema (CSS Variables)

When migrating or refactoring into a modern CSS token structure or Tailwind plugin, the following unified token structure is recommended:

```css
:root {
  /* Surface Tokens */
  --surface-base: #e6e7ee;
  --surface-hover: #b7bdc6;
  --surface-destructive: #eee6e6;
  
  /* Text & Stroke Tokens */
  --text-primary: #31344b;
  --text-input: #44476a;
  --border-subtle: #d1d9e6;
  --border-focus: #a3bffa;

  /* Lighting Tokens */
  --light-shadow-dark: #b8b9be;
  --light-shadow-light: #ffffff;

  /* Harmonized Neumorphic Elevations */
  --elevation-raised-sm: 3px 3px 6px var(--light-shadow-dark), -3px -3px 6px var(--light-shadow-light);
  --elevation-raised-md: 6px 6px 12px var(--light-shadow-dark), -6px -6px 12px var(--light-shadow-light);
  --elevation-raised-lg: 9px 9px 18px var(--light-shadow-dark), -9px -9px 18px var(--light-shadow-light);
  --elevation-inset-sm: inset 2px 2px 4px var(--light-shadow-dark), inset -2px -2px 4px var(--light-shadow-light);
  --elevation-inset-md: inset 4px 4px 8px var(--light-shadow-dark), inset -4px -4px 8px var(--light-shadow-light);
}

body.dark {
  /* Dark Surface Tokens */
  --surface-base: #1a1a1a;
  --surface-hover: #2d2d2d;
  --surface-destructive: #2a1a1a;

  /* Dark Text & Stroke Tokens */
  --text-primary: #e5e5e5;
  --text-input: #d0d0d0;
  --border-subtle: #2d2d2d;
  --border-focus: #4a9eff;

  /* Dark Lighting Tokens */
  --light-shadow-dark: #0f0f0f;
  --light-shadow-light: #2a2a2a;
}
```
