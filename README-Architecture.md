# HWA / 火 — Premium Korean BBQ Demo

## 1. Overview
This codebase is a polished, production-ready concept case study for a fictional high-end Korean restaurant brand named **HWA** (Korean for "fire"). It is designed to act as a premium portfolio piece demonstrating advanced visual storytelling, robust technical architecture, and editorial-level frontend engineering. The goal is to provide a cinematic user journey through the restaurant's philosophy and menu.

## 2. Technical Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript 
- **Animation Engine:** GSAP (GreenSock Animation Platform) + ScrollTrigger
- **Styling Architecture:** Vanilla CSS (Global Design System Approach)
- **Internationalization (i18n):** Custom modular dictionary implementation supporting English (EN), Polish (PL), and Korean (KO).
- **Assets:** Next-Gen `.webp` image formats and highly compressed looping `.mp4` video elements.

## 3. Styling & Art Direction
The project breaks away from generic component templates, leaning entirely into a curated, raw, and high-end aesthetic inspired by Seoul nightlife and modern luxury dining.
- **Color Palette:** Pure dark mode orientation. Core background is a deep off-black utilizing warm ambient accent colors (`--accent-warm`) mapping to fire, embers, and cooked meat.
- **Typography:** Built heavily on the [SUIT Variable](https://sunn.us/suit/) typeface. It provides a sharp, premium editorial feel capable of holding its weight in both Latin and Korean Hangul scripts.
- **CSS Strategy:** Discarded CSS Modules/Tailwind in favor of a centralized `.css` architecture heavily utilizing BEM naming conventions (`.scene-process`, `.scene-menu__item`). Responsive clamping (e.g., `clamp(2rem, 8vh, 16rem)`) handles fluid macro-spacing.
- **Micro-interactions:** Restrained but impactful. Avoids generic floating elements, favoring purposeful image parallaxing, smooth color wipes, and cinematic scaling.

## 4. Narrative Flow & Scene Composition
The landing page operates strictly chronologically to build user desire:

1. **Hero Scene:** A dark layout introducing the brand visually. A looping fire/meat background scales subtly based on user interaction, immersing the user immediately without heavy load times.
2. **Split Scene:** Establishes the philosophy of heat and charcoal alongside bold typography.
3. **Process Scene:** Details the steps of preparation—utilizing a pinned GSAP column on Desktop and a beautiful native CSS `position: sticky` overlapping "card stack" on Mobile devices.
4. **Chaos Scene:** Parallaxing typographic layout acting as a visual breather/transition to break the grid flow.
5. **Menu & Signature Dishes:** Horizontal native scroll rails (on mobile) and pinned scrubbing paths (on desktop) specifically presenting high-quality food imagery.
6. **Atmosphere & CTA:** Dark, intimate photography of the restaurant settling the user, ending with a reservation call to action.

## 5. Mobile & Performance Strategies
- **Animation Fallbacks:** Used `gsap.matchMedia('(min-width: 769px)')` extensively. Desktop features full-bleed scrolljacking and pinned wrappers. Mobile often reverts to native device workflows like `overflow-x: auto` horizontal touch scrolling or `position: sticky` depth overlaps, maximizing mobile FPS.
- **Hardware Acceleration:** Intensive DOM shifts use `will-change: transform;` properties natively to prevent browser repaint thrashing.
- **React State Management:** Wrapped everything in `gsap.context()` inside `useLayoutEffect` to seamlessly handle React 18's strict-mode unmount sequences, preventing overlapping duplicated ScrollTrigger intersections. 
- **SEO & Manifest:** Fully configured `metadataBase`, dynamic `<head>` `<link>` injections for Webmanifests, and strictly injected OpenGraph SEO fallback data tailored heavily for the `/pl`, `/en`, and `/ko` localized variants.
