# Design System — Terminal Portfolio

## Overview

Terminal-inspired design system for a personal developer portfolio. The system is based on minimalism, monospace typography, and retro terminal aesthetics. It uses design tokens, theme switching, and strict visual rules to ensure consistency.

Supports three themes:
- green (default terminal)
- mono (black & white)
- ibm (amber terminal)

---

## Design Principles

- Monospace-first typography
- No rounded corners
- Minimal color usage with strong contrast
- Semantic tokens over hardcoded values
- Visual hierarchy through spacing, not decoration
- Terminal metaphors in UI (commands, comments, cursor)

---

## Tokens

### Colors

#### Semantic Tokens

| Token | Description |
|------|------------|
| primary | Main actions, active elements |
| secondary | Secondary actions |
| success | Positive states |
| info | Neutral informational states |
| warning | Attention states |
| error | Destructive states |
| text-primary | Main text |
| text-secondary | Secondary text |
| text-muted | Low emphasis text |
| bg-primary | Main background |
| bg-secondary | Secondary background |
| bg-tertiary | Elevated surfaces |
| border | Borders |
| divider | Subtle separators |
| focus | Focus state |

---

### Theme: green

```css
:root[data-theme="green"] {
  --bg-primary: #0a0e0a;
  --bg-secondary: #0f1410;
  --bg-tertiary: #151b16;

  --text-primary: #d1fae5;
  --text-secondary: #86efac;
  --text-muted: #4d7c5f;

  --primary: #4ade80;
  --primary-hover: #22c55e;
  --primary-active: #16a34a;

  --secondary: #38bdf8;
  --secondary-hover: #0ea5e9;

  --success: #4ade80;
  --info: #38bdf8;
  --warning: #facc15;
  --error: #f87171;

  --border: #1f2937;
  --divider: #111827;
  --focus: #4ade80;

  --glow: 0 0 8px rgba(74, 222, 128, 0.4);
}
```

---

### Theme: mono

```css
:root[data-theme="mono"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #171717;

  --text-primary: #f5f5f5;
  --text-secondary: #a3a3a3;
  --text-muted: #525252;

  --primary: #ffffff;
  --primary-hover: #d4d4d4;
  --primary-active: #a3a3a3;

  --secondary: #737373;

  --success: #d4d4d4;
  --info: #a3a3a3;
  --warning: #e5e5e5;
  --error: #fafafa;

  --border: #262626;
  --divider: #1a1a1a;
  --focus: #ffffff;

  --glow: 0 0 6px rgba(255, 255, 255, 0.2);
}
```

---

### Theme: ibm

```css
:root[data-theme="ibm"] {
  --bg-primary: #0c0b08;
  --bg-secondary: #14120d;
  --bg-tertiary: #1c1a14;

  --text-primary: #ffe8b0;
  --text-secondary: #ffd166;
  --text-muted: #a16207;

  --primary: #ffb000;
  --primary-hover: #f59e0b;
  --primary-active: #d97706;

  --secondary: #facc15;

  --success: #ffb000;
  --info: #facc15;
  --warning: #fde047;
  --error: #fb923c;

  --border: #2a2115;
  --divider: #1a140d;
  --focus: #ffb000;

  --glow: 0 0 10px rgba(255, 176, 0, 0.35);
}
```

---

## Typography

### Font Families

```css
--font-body: "JetBrains Mono", monospace;
--font-heading: "Share Tech Mono", monospace;
--font-fallback: ui-monospace, SFMono-Regular, Menlo, monospace;
```

### Type Scale

```css
--text-xs: 12px;
--text-sm: 14px;
--text-md: 16px;
--text-lg: 20px;
--text-xl: 28px;
--text-2xl: 36px;
--text-3xl: 48px;
```

### Usage

| Element        | Font            | Size    |
| -------------- | --------------- | ------- |
| Body           | JetBrains Mono  | 14–16px |
| UI / Labels    | JetBrains Mono  | 13–14px |
| Section titles | Share Tech Mono | 20px    |
| Hero heading   | Share Tech Mono | 36–48px |
| ASCII art      | JetBrains Mono  | 12–14px |

---

## Spacing

8px base grid.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
```

---

## Layout

### Container

```css
--container-width: 960px;
--container-padding: 16px;
```

* Centered layout
* Narrow width to mimic terminal window
* Vertical rhythm driven by spacing tokens

---

## Components

### Buttons

```css
.button {
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--primary);
  font-family: var(--font-body);
}

.button:hover {
  background: var(--primary);
  color: var(--bg-primary);
}
```

Rules:

* No border-radius
* No shadows (except optional glow)
* Hover inverts colors

---

### Links

Format:

```
gh://username
mail://email
```

Rules:

* No icons
* Always monospace
* Color = primary

---

### Progress Bars

```css
.progress {
  height: 3px;
  background: var(--divider);
}

.progress-fill {
  height: 100%;
  background: var(--primary);
}
```

Rules:

* Fixed height: 3px
* No rounded corners
* No gradients

---

### Section Headers

Format:

```
// projects
// skills
// contact
```

Rules:

* Use heading font
* Lowercase
* Prefixed with `//`

---

## Effects

### Cursor

```css
.cursor::after {
  content: "█";
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

---

### Scanlines

```css
--scanline: repeating-linear-gradient(
  to bottom,
  rgba(255,255,255,0.03),
  rgba(255,255,255,0.03) 1px,
  transparent 1px,
  transparent 3px
);
```

Usage:

* Overlay on entire page
* Very low opacity

---

### Glow

```css
.glow {
  box-shadow: var(--glow);
}
```

Usage:

* Active elements only
* Avoid overuse

---

## Decorative Elements

Optional:

* ASCII art
* Matrix rain
* Subtle grid or hex pattern background
* Noise overlay

Restrictions:

* Must not reduce readability
* Must not compete with content

---

## Theming

Supported values:

* green
* mono
* ibm

Switching themes must only change CSS variables.

---

## Accessibility

* Maintain WCAG contrast ratios
* Avoid pure neon on pure black without softening
* Ensure focus states are visible
* Avoid relying only on color for meaning

---

## Implementation Notes

* Avoid hardcoded colors
* Prefer utility classes for layout
* Keep components stateless and theme-aware
* Compatible with Tailwind via config mapping
