---
name: SharkAuth
description: Auth for the Agent Era.
colors:
  primary: "#ffffff"
  neutral-bg: "#000000"
  neutral-fg: "#ffffff"
  surface: "#0a0a0a"
  border: "#242424"
  muted: "#a6a6a6"
typography:
  display:
    fontFamily: "var(--font-inter), sans-serif"
    fontSize: "clamp(44px, 7.4vw, 96px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  body:
    fontFamily: "var(--font-inter), sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  serif-emphasis:
    fontFamily: "var(--font-serif), serif"
    fontStyle: "italic"
    fontWeight: 400
rounded:
  full: "999px"
  md: "14px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "56px"
components:
  button-primary:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: "{rounded.full}"
    padding: "11px 18px"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "11px 18px"
---

# Design System: SharkAuth

## 1. Overview

**Creative North Star: "The Void Engine"**

The SharkAuth visual system reflects a high-performance, invisible engine—powering the agent era with silent, absolute authority. It is a study in **Minimalist Luxury**, where every pixel must earn its place. The interface doesn't use decoration; it uses technical specs as its primary aesthetic driver.

The system explicitly rejects "generic vibe-coded slop." There are no colorful gradients, no playful rounded corners, and no unnecessary shadows. Instead, we use "Liquid Glass" and "Void Black" surfaces to create a sense of depth and precision.

**Key Characteristics:**
- **Extreme Contrast**: Pure black and pure white as the primary axis.
- **Technical Charisma**: Extensive use of monospaced data and serif italics for emphasis.
- **Atmospheric Depth**: Backdrop blurs and subtle grid overlays instead of traditional elevation.

## 2. Colors

A strictly monochrome palette designed for maximum focus and expert confidence.

### Primary
- **Stellar White** (#ffffff): Used for primary CTAs, headings, and critical information. It represents the "light" of truth and authority.

### Neutral
- **Void Black** (#000000): The infinite canvas. Used for the primary background to minimize eye strain and maximize contrast.
- **Abyssal Surface** (#0a0a0a): Used for cards and secondary regions to create subtle layering.
- **Muted Gray** (#a6a6a6): Used for secondary text and supporting metadata.
- **Iron Border** (#242424): Used for structural boundaries.

### Named Rules
**The 10% Rule.** Stellar White is used on ≤10% of any given surface. Its rarity is what gives it authority.

## 3. Typography

**Display Font:** Inter (Sans-serif)
**Body Font:** Inter (Sans-serif)
**Emphasis Font:** Custom Serif (Italic)
**Data Font:** Mono

**Character:** Technical but elegant. The pairing of Inter's geometric precision with an organic, italicized serif creates a "Human + Agent" tension that feels sophisticated and intentional.

### Hierarchy
- **Display** (500 weight, 44-96px, 1.02 line-height): Used for primary hero headings.
- **Title** (500 weight, 24-32px, 1.2 line-height): Used for section headers.
- **Body** (400 weight, 16-20px, 1.55 line-height): Used for primary reading.
- **Mono/Label** (500 weight, 11-13px, uppercase): Used for specs, tags, and technical details.

## 4. Elevation

SharkAuth rejects traditional drop shadows. Depth is achieved through "tonal layering" and physical light simulations (glass).

**The Liquid Glass Rule.** Depth is conveyed via backdrop-filters (blur) and internal glows (inner shadows/borders). Surfaces should feel like high-grade optics, not paper cards.

### Shadow Vocabulary
- **Void Glow** (0 6px 30px hsla(0,0%,100%,0.18)): Only used on primary buttons to make them feel "charged."

## 5. Components

### Buttons
- **Shape:** Full pill (999px)
- **Primary:** Stellar White background with Black text. Includes an inner white glow to feel tactile.
- **Ghost:** Subtle glass background (4% opacity) with white text and a low-contrast border.
- **Hover:** Subtle scale shifts and background brightness adjustments.

### Code Blocks
- **Style:** Deep Abyssal background (hsl 0 0% 5%) with Iron borders and 14px radius. 
- **Typography:** Mono font, high line-height for readability.

### Cards
- **Corner Style:** 1px Iron border or "Liquid Glass" blur.
- **Background:** Gradient of Abyssal surfaces (4% to 1% opacity).

## 6. Do's and Don'ts

### Do:
- **Do** use `font-style: italic` for the serif font when highlighting "agent era" or technical concepts.
- **Do** use 1px hairlines for all structural divisions.
- **Do** keep spacing generous (56px+ for sections) to maintain "Minimalist Luxury."

### Don't:
- **Don't** use identical card grids (icon + heading + text). Break the rhythm with different widths or technical specs.
- **Don't** use border-left greater than 1px as a colored accent.
- **Don't** use generic gradients or "vibe-coded" glassmorphism without purpose.
- **Don't** use colors outside the monochrome scale unless they are literal error/success states.
