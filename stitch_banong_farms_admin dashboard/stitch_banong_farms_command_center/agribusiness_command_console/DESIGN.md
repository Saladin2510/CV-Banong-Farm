---
name: Agribusiness Command Console
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#594136'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#e3e0dd'
  outline-variant: '#e1bfb0'
  surface-tint: '#9f4200'
  primary: '#9f4200'
  on-primary: '#ffffff'
  primary-container: '#fe6e00'
  on-primary-container: '#582100'
  inverse-primary: '#ffb692'
  secondary: '#635d58'
  on-secondary: '#ffffff'
  secondary-container: '#e7ded7'
  on-secondary-container: '#68625c'
  tertiary: '#835500'
  on-tertiary: '#ffffff'
  tertiary-container: '#ce8d25'
  on-tertiary-container: '#482c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb692'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#eae1da'
  secondary-fixed-dim: '#cdc5be'
  on-secondary-fixed: '#1f1b17'
  on-secondary-fixed-variant: '#4b4641'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb954'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
  surface-soft: '#edebe9'
  surface-muted: '#f3f4f6'
  surface-elevated: '#ffffff'
  on-surface-muted: '#797067'
  outline-strong: '#d1d5dc'
  primary-strong: '#ff6b00'
  primary-focus: '#f97015'
  shell-base: rgba(0, 0, 0, 0.70)
  shell-border: rgba(255, 255, 255, 0.12)
  on-shell: '#ffffff'
  on-shell-muted: rgba(255, 255, 255, 0.70)
  status-mock-bg: '#fef9c2'
  status-mock-fg: '#874b00'
  status-planned-bg: '#f3f4f6'
  status-planned-fg: '#364153'
  status-development-bg: '#dbeafe'
  status-development-fg: '#1447e6'
  status-integrated-bg: '#f3e8ff'
  status-integrated-fg: '#8200da'
  status-production-bg: '#dcfce7'
  status-production-fg: '#016630'
  danger: '#fb2c36'
  warning: '#edb200'
  info: '#3080ff'
  success: '#00c758'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4rem
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '600'
    lineHeight: 1.125rem
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.05em
  telemetry-code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
  space-3xl: 4rem
  shell-header-height: 4rem
  shell-sidebar-expanded: 16rem
  shell-sidebar-collapsed: 4rem
  content-max-width: 87.5rem
---

## Brand & Style

This design system serves an operational command center tailored for precision agribusiness and infrastructure surveillance. The brand personality blends institutional reliability with tactical precision: deliberate, data-dense, technical, and alert. It strikes an exact equilibrium between an operational Security Operations Center (SOC) dashboard and an ergonomic workspace.

The design movement combines **Glassmorphism (restricted to the framing shell)** with **Refined Technical Minimalism (the interior workspace)**:
- The outer application chrome (sidebar, top header, status rails) is executed as a dark, frosted glass visor (black at 70% opacity with backdrop diffusion) that frames the analytical core.
- The inner operational canvas is warm, tactile, and document-like, anchored in warm off-white `#FCFAF7` and muted earthen dark tones `#423D38`.
- Vibrant high-vis orange (`#FE6E00`) acts as the critical telemetry beacon, reserved exclusively for active states, operational alerts, primary CTAs, active telemetry traces, and focus targets.
- The UI eschews playful consumer trends, neon-saturated cyber-tropes, and sterile enterprise gray palettes in favor of a focused, mission-critical instrument feel.

## Colors

The palette establishes a dual-tier ecosystem: a crisp, warm light canvas bounded by dark translucent structural framing.

### Structural Roles
- **Primary (`#FE6E00`):** The operational beacon. Used strictly for interactive triggers, active navigation markers, key chart plots, and immediate system alerts.
- **Secondary (`#423D38`):** Deep warm umber-slate used for primary typography and dark analytical structures. Replaces harsh synthetic black to preserve eye comfort across long monitoring shifts.
- **Tertiary (`#FFB74D`):** Warm amber accent used for secondary metrics, chart gradients, and transitional system conditions.
- **Neutral (`#FCFAF7`):** The natural stone/paper background canvas. It prevents glare common to pure `#FFFFFF` sheets without drifting into cool corporate slate.

### Shell & Chrome Layers
- The header and sidebar occupy `rgba(0, 0, 0, 0.70)` with a fine `rgba(255, 255, 255, 0.12)` boundary line. Navigation elements inside this layer default to `on-shell-muted` and punch to solid `#FE6E00` when active.

### Operational State Tokens
- Multi-tier lifecycle states (Mock, Planned, Development, Integrated, Production) use low-saturation pastel backings with high-contrast saturated text to prevent cognitive overload across dense data tables.

## Typography

The typography strategy leverages `Inter` for exceptional neutral clarity across dense operational tables, controls, and telemetry panels, supplemented by `JetBrains Mono` for hardware signatures, GPS coordinates, sensor feeds, and status codes.

### Hierarchy & Treatment Rules
- **Operational Headers:** Page and dashboard headers remain tight and compact. Instead of expansive marketing typography, titles cap at `1.5rem` to `2rem` to maximize vertical viewport space for analytics.
- **Data Labels (`label-sm`):** System labels, grid column headers, and metric units employ uppercase transforms with `0.05em` letter spacing for fast glanceability under high-stress conditions.
- **Telemetry Precision (`telemetry-code`):** Sensor timestamps, device identifiers, and geo-coordinates must always render in tabular monospace figures to avoid shifting column layouts during real-time streaming updates.

## Layout & Spacing

The spatial architecture is a locked-shell command framework surrounding a fluid-max content canvas.

### Spatial Rhythm
- Built on a strict 4px/8px modular base. Dense controls utilize `space-xs` (8px) and `space-sm` (12px), while inter-card rhythm operates at `space-lg` (24px).
- Dashboard cards and operational metric groups use unified 24px inner padding (`space-lg`) to balance information density against visual breathing room.

### Responsive Breakpoints & Reflow
- **Desktop (>= 1280px):** Permanent `16rem` (256px) frosted glass sidebar. Central content area constrained to a maximum width of `87.5rem` (1400px) with 32px horizontal padding. Multi-metric rows render 3 to 4 cards wide.
- **Tablet (768px - 1279px):** Sidebar collapses to an icon-only `4rem` (64px) dark rail. Content reflows into 2-column modules. Inner content padding reduces to 24px.
- **Mobile (< 768px):** Sidebar collapses into a slide-over glass drawer triggered via header hamburger. Top header locks to `4rem` (64px) with fixed z-index. Dashboard cards reflow into a single column with 16px lateral padding.

## Elevation & Depth

Visual hierarchy uses a dual-environment model: glassmorphic refraction for the framing architecture, and crisp, restrained structural planes for the workspace.

### The Chrome Layer (Shell)
- **Sidebar & Header:** Renders with `backdrop-filter: blur(12px)` over a `rgba(0, 0, 0, 0.70)` surface. A hairline 1px stroke (`rgba(255, 255, 255, 0.12)`) defines the right and bottom boundaries. No drop shadows are cast downward onto the workspace, maintaining a clean visual seam.

### The Workspace Layer
- **Standard Cards:** Background `#FFFFFF` sitting atop the `#FCFAF7` canvas. Depth is achieved via an ultra-subtle border `1px solid #E3E0DD` paired with a soft ambient shadow: `0 1px 3px rgba(66, 61, 56, 0.04), 0 1px 2px rgba(66, 61, 56, 0.02)`. Heavy ambient drop shadows are strictly prohibited.
- **Interactive Surfaces & Dropdowns:** `0 4px 12px rgba(66, 61, 56, 0.08)`, edged with `#D1D5DC`.
- **Modals & Overlays:** Suspended with `0 20px 25px rgba(0, 0, 0, 0.15), 0 8px 10px rgba(0, 0, 0, 0.05)` over a dark frosted backdrop blur (`rgba(0, 0, 0, 0.50)` with `blur(4px)`).
- **Telemetry Visualizations:** Bar fills and area plots avoid high-saturation solid blocks; they leverage 60% opacity fills (`rgba(254, 110, 0, 0.60)`) with a crisp 1.5px solid border to keep data distinct from card backgrounds.

## Shapes

The geometric personality is structured and surgical:
- **Macro Framing (Shell):** 0px sharp boundary on the shell perimeter to anchor the application to the display hardware.
- **Analytical Cards & Modules:** 12px (`rounded-lg`) corner radii to soften data panels without introducing juvenile or overly rounded aesthetics.
- **Form Elements & Standard Action Buttons:** 8px (`rounded-md`) corner radii, ensuring compact target density.
- **Inputs & Micro-switches:** 6px (`rounded-sm`) corner radii for crisp mechanical alignment.
- **Status Indicators & Sensor Badges:** Pill-shaped (`9999px`) to immediately distinguish categorical attributes and status states from clickable rectangular buttons.

## Components

### Buttons
- **Primary:** Solid `#FE6E00` fill with `#FFFFFF` text (`label-md`). Height 40px, horizontal padding 16px, 8px radius. Hover shifts to `#FF6B00`. Focus ring exhibits a 2px offset with `#F97015`.
- **Secondary:** Surface `#EDEBE9` with `#423D38` text. Border 1px solid `#E3E0DD`. Hover lightens to `#F3F4F6`.
- **Shell Ghost Action:** Transparent background within the dark shell. Normal state is `rgba(255, 255, 255, 0.70)` text/icon. Hover becomes `rgba(255, 255, 255, 0.12)` background with `#FFFFFF` text.

### Form Inputs & Search
- **Workspace Form Inputs:** Height 40px. `#FFFFFF` background, 1px `#E3E0DD` border, 8px radius. Text `#423D38`. Focus transitions border to `#FE6E00` with an outer 3px ring of `rgba(254, 110, 0, 0.15)`.
- **Shell Global Search:** Height 36px. Translucent `rgba(255, 255, 255, 0.10)` background with `rgba(255, 255, 255, 0.15)` border. Text `#FFFFFF`. Focus ring transitions to `#FE6E00`.

### Status Badges & Chips
- Fully rounded (`rounded-pill`), 24px height, horizontal padding 10px. Uses uppercase `label-sm` (11px, 600 weight).
- Fills utilize semantic pastel tints with saturated text (e.g., Production: `#DCFCE7` background with `#016630` text; In Development: `#DBEAFE` with `#1447E6` text).

### Metric & Telemetry Cards
- Surface `#FFFFFF`, border 1px solid `#E3E0DD`, internal padding 24px, radius 12px.
- Features a two-tiered hierarchy: small uppercase tracking label (`label-sm`, `#797067`) above, accompanied by an optional operational health dot (green/orange/danger), with primary numerical output rendered in 28px bold figures accompanied by monospace trend units.

### Data Tables
- Header height 48px. Header background is `rgba(254, 110, 0, 0.04)` with `#423D38` uppercase text (`label-sm`).
- Cell row height 48px, horizontal cell padding 16px. Border-bottom 1px solid `#F3F4F6`. Alternate row striping is avoided; hover reveals a delicate `#FCFAF7` highlight.

### Checkboxes & Radio Controls
- 18px square (checkbox) or circle (radio), 1.5px border `#D1D5DC`. Checked state fills `#FE6E00` with white glyph, omitting multi-color gradients.