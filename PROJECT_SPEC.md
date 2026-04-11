# Premium Korean Restaurant Demo — Advanced Creative Specification

==================================================
## CORE IDEA
==================================================

This is NOT a standard landing page.

This is an **immersive scroll experience** inspired by editorial design, Awwwards-level websites, and cinematic storytelling.

The page should feel like:
- a visual story
- a brand film
- a digital experience

NOT:
- a simple section-based layout
- a generic restaurant page
- a UI template

==================================================
## CREATIVE DIRECTION
==================================================

Visual style:
- dark cinematic Korean fine dining
- strong typography mixed with imagery
- asymmetrical layouts
- overlapping elements
- large text blocks
- editorial / magazine feel

Inspiration:
- immersive storytelling websites
- experimental layouts
- large typography + image composition
- sections blending into each other

==================================================
## STRUCTURE — NOT SECTIONS, BUT SCENES
==================================================

The page is composed of **10–12 SCENES**, not simple sections.

Each scene:
- has a strong visual identity
- transitions into the next
- may overlap
- may break grid rules intentionally

==================================================
## FULL PAGE FLOW
==================================================

### SCENE 1 — HERO (FIRE INTRO)
- full screen video (MUST be used) F:\StronyInternetowe\Demka\KoreanRestaurant\public\grill.mp4
- korean bbq grill, fire, smoke
- minimal text
- cinematic intro

Scroll:
- video slightly scales F:\StronyInternetowe\Demka\KoreanRestaurant\public\grill.mp4
- smoke becomes more visible
- fade into next scene

---

### SCENE 2 — TYPOGRAPHY IMPACT
- black background
- MASSIVE typography
- broken into lines across screen

Layout:
- text not centered
- spans multiple lines and positions
- some italic / contrast styles

Example:
"Fire defines flavor.
Time defines depth."

---

### SCENE 3 — SPLIT VISUAL + TEXT
- left: text blocks
- right: large image (food or fire)

BUT:
- not symmetric
- overlapping
- image partially cropped

---

### SCENE 4 — PROCESS STORY (STICKY SCROLL)
- sticky section

Left:
- text changes with scroll

Right:
- image changes (fire / meat / charcoal)

Steps:
1. Fire
2. Ingredient
3. Precision
4. Serve

---

### SCENE 5 — CHAOTIC TYPOGRAPHY + IMAGE
- overlapping typography
- large background image
- text layered on top

Inspired by editorial magazines

---

### SCENE 6 — SIGNATURE DISHES (HORIZONTAL SCROLL)
- horizontal scroll section
- large cards
- each dish fills most of viewport

Scroll:
vertical scroll → horizontal movement

---

### SCENE 7 — CLOSE-UP MOMENTS
- multiple stacked images
- macro shots (meat, texture, fire)
- minimal text

---

### SCENE 8 — ATMOSPHERE (FULL BLEED)
- full screen interior image
- slow zoom
- text floating over

---

### SCENE 9 — GRID BREAKER
- broken grid layout
- images offset
- text blocks floating

Like:
- one big image
- 2 smaller ones overlapping

---

### SCENE 10 — MENU PREVIEW
- elegant list
- minimal UI
- lots of spacing

---

### SCENE 11 — FINAL STATEMENT
- strong typography again
- emotional close

---

### SCENE 12 — CTA
- simple
- minimal
- strong

==================================================
## HERO — STRICT REQUIREMENTS
==================================================

The hero MUST use video. F:\StronyInternetowe\Demka\KoreanRestaurant\public\grill.mp4

Video:
- 4–6 seconds loop
- fire + grill + smoke
- optimized (low size)

Effects:
- subtle scale (1 → 1.05)
- smoke overlay
- gradient overlay

NO:
- heavy GSAP timeline
- complex scrub
- fake motion

==================================================
## LAYOUT RULES
==================================================

- NOT every section centered
- break alignment intentionally
- mix:
  - left aligned
  - right aligned
  - centered
- overlapping elements allowed
- use negative space heavily

==================================================
## TYPOGRAPHY
==================================================

Font:
- SUIT

Rules:
- very large headings
- mix weights
- occasional italic contrast
- text can overflow containers
- use line breaks creatively

==================================================
## ANIMATION STRATEGY
==================================================

Use:
- GSAP + ScrollTrigger ONLY where needed

Animations:
- fade up
- slight translateY
- image scale
- parallax

Advanced:
- horizontal scroll section
- sticky sections

DO NOT:
- overanimate everything
- use complex timelines everywhere

==================================================
## SANITY STRATEGY
==================================================

Use singleton:
landingPage

But:
DO NOT make layout dynamic

Sanity controls:
- text
- images
- dishes
- CTA
- labels

NOT:
- layout
- animation
- ordering

==================================================
## NEXT.JS STRUCTURE
==================================================

Hardcode scene order in page.tsx:

<Hero />
<TypographyScene />
<SplitScene />
<ProcessScene />
<ChaosScene />
<DishesScene />
<CloseupsScene />
<AtmosphereScene />
<GridBreakerScene />
<MenuScene />
<FinalScene />
<CtaScene />

==================================================
## GOAL
==================================================

The final result should feel like:
- premium interactive concept
- not a template
- not safe
- not generic

It should look like something that could win an Awwwards honorable mention.

==================================================