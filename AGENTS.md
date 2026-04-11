<!-- BEGIN:nextjs-agent-rules -->
You are a senior frontend architect, UX designer, and creative developer.

Your task is to help define and implement a premium interactive demo website for a fictional Korean restaurant brand.

Important context:
This is NOT my portfolio website itself.
This is a fictional branded demo project that I will showcase inside my portfolio to demonstrate what kind of premium websites I can build for clients.

The project should feel like a polished concept case study for a high-end Korean restaurant, with strong visual storytelling, dark cinematic art direction, and modern scroll-based interactions.

The goal is to design something elegant, immersive, and premium — not a generic restaurant template.

==================================================
CORE PROJECT REQUIREMENTS
==================================================

Tech stack:
- Next.js App Router
- TypeScript
- Sanity CMS
- Bilingual: Polish and English
- Shared CSS architecture preferred over isolated CSS per component
- Project already initialized in Next.js
- Content for all sections must be editable via Sanity
- Text content must be editable in both Polish and English
- The implementation should be maintainable, scalable, and production-oriented
- The visual result should feel premium and portfolio-worthy
- The code should not be overengineered

Animation direction:
- Use GSAP + ScrollTrigger for premium scroll-based interactions where needed
- Use CSS transitions for simpler interactions
- Do NOT rely on Framer Motion as the primary animation system
- Motion should be subtle, cinematic, and performance-aware
- Mobile version must be simpler than desktop
- Respect prefers-reduced-motion

Hero direction:
- Hero is based on a short looping visual built from a generated Korean BBQ image/video
- The hero shows grill, fire, smoke, and heat distortion
- No hand interaction, no object manipulation, no fake complex AI motion
- Motion should focus on:
  - fire flicker
  - smoke drift
  - subtle heat distortion
  - slight push-in / scale
  - optional light sweep
- The result should feel premium and restrained, not flashy

Visual direction:
- Dark background
- Cinematic editorial feeling
- Seoul-at-night mood
- Premium Korean dining inspiration
- Sharp typography
- Minimal, elegant UI
- No cliché "Asian theme" visual stereotypes
- No overuse of glassmorphism
- No overloaded animation
- No generic corporate aesthetics

Typography:
- Use SUIT as the main typeface
- The typography should feel modern, clean, premium, and appropriate for both Latin and Korean-inspired visual tone
- Avoid gimmicky decorative fonts

==================================================
IMPORTANT ARCHITECTURAL DECISIONS
==================================================

Use these architectural assumptions in your recommendations:

1. The website is a fixed-structure landing page, not a flexible page builder.
Do NOT propose a highly dynamic block-based builder unless there is a very strong reason.
This is one curated demo page with a known section order.

2. Sanity should manage editable content, not layout logic.
Sanity should store:
- text
- localized text
- images
- dish items
- CTA labels
- contact data
- menu preview content
- SEO content

Sanity should NOT manage:
- animation types
- section ordering
- spacing rules
- global design tokens
- component logic
- visual system settings

3. Prefer a singleton document in Sanity for the landing page.
Use a stable, explicit structure such as:
- seo
- hero
- brandStatement
- process
- signatureDishes
- atmosphere
- menuPreview
- cta

4. Bilingual content should be modeled with localized field objects, for example:
- localizedString { pl, en }
- localizedText { pl, en }

5. Styling should use a shared design system approach:
- global CSS files or centralized styling layers
- CSS variables / tokens
- shared layout primitives
- shared typography rules
- shared section spacing rules
Do NOT default to separate CSS modules for every component unless justified.

6. Use server components by default.
Use client components only where needed for:
- animations
- language switcher interaction
- specific interactive UI

==================================================
WHAT I NEED FROM YOU
==================================================

Please provide a full implementation and design specification for this project.

Structure the response with clear headings and detailed recommendations.

==================================================
1. BRAND CONCEPT
==================================================

Invent a fictional premium Korean restaurant brand.
Provide:
- brand name
- short naming rationale
- concept
- target audience
- positioning
- mood
- art direction summary

The brand should feel modern, premium, atmospheric, and visually strong.
It should fit dark cinematic storytelling.

==================================================
2. WEBSITE STORY / NARRATIVE FLOW
==================================================

Describe the full story of the page from top to bottom.
The page should feel like a journey through the restaurant experience.

Explain:
- what emotional role each section plays
- what commercial role each section plays
- how the user moves through the story
- how the page builds desire and credibility

The narrative should feel like:
fire → philosophy → craft → dishes → atmosphere → invitation

==================================================
3. FINAL SECTION STRUCTURE
==================================================

Define the final recommended fixed section structure for the landing page.

For each section provide:
- section name
- purpose
- key message
- what it should visually present
- suggested layout
- what content is editable in Sanity
- what motion/animation is appropriate
- how it supports the overall story

Recommended sections should be something like:
- Hero
- Brand Statement
- Process / Fire / Ingredients
- Signature Dishes
- Atmosphere / Interior Experience
- Menu Preview
- Reservation / Final CTA

Keep the number of sections focused and realistic.
Avoid bloated structure.

==================================================
4. HERO SECTION — DETAILED EXECUTION PLAN
==================================================

Provide a detailed hero section plan.

The hero uses a short looping visual based on Korean BBQ:
- grill
- meat
- fire
- smoke
- heat

No hand. No complex manipulations.

Describe:
- composition
- typography placement
- overlays
- color treatment
- load-in behavior
- desktop scroll behavior
- mobile behavior
- reduced-motion fallback
- how the hero transitions into the next section

Be specific about:
- what should animate
- what should remain still
- what is controlled by scroll
- what should be looped independently
- how to keep it premium and simple

==================================================
5. TYPOGRAPHY SYSTEM
==================================================

Use SUIT as the main typeface.

Define:
- display typography
- heading system
- body typography
- small meta text / labels
- font weights
- line heights
- spacing logic
- uppercase rules
- letter spacing recommendations
- how to create a premium editorial feel with SUIT

Provide a practical hierarchy for desktop and mobile.

==================================================
6. COLOR SYSTEM AND UI LANGUAGE
==================================================

Define:
- background palette
- text palette
- accent palette
- border rules
- overlay treatment
- gradients
- button style
- card style
- input style
- section separators
- image treatment

Explain the visual language clearly.
The UI should feel premium, restrained, sharp, and editorial.
Avoid glassmorphism unless absolutely necessary.
If any transparency is used, it should be dark and subtle.

==================================================
7. NEXT.JS ARCHITECTURE
==================================================

Recommend a clean, maintainable architecture for a Next.js App Router project.

Include:
- route structure for bilingual site
- file/folder structure
- component structure
- section components
- shared layout components
- shared UI primitives
- data fetching layer
- sanity query organization
- locale utilities
- where to use server vs client components
- how to separate content mapping from presentation
- how to separate animation logic from content rendering

Please be practical and opinionated.

==================================================
8. SANITY CMS CONTENT MODEL
==================================================

Design the Sanity schema strategy for this project.

Important:
- Use a singleton page schema, not a full visual page builder
- All text content must be editable in both Polish and English
- All major section content should be editable from Sanity

Provide:
- recommended schema structure
- localized field objects
- singleton landing page schema
- section object schemas
- reusable item schemas
- dish item schema
- CTA fields
- contact fields
- opening hours if useful
- SEO fields

Also explain:
- why this structure is better than a dynamic sections array for this project
- how editors would work with it in practice

==================================================
9. INTERNATIONALIZATION STRATEGY
==================================================

Recommend the best implementation approach for Polish and English.

Include:
- route strategy (for example /pl and /en)
- middleware or redirect recommendations
- content fetching strategy
- utility functions for localized fields
- metadata handling
- language switcher behavior
- fallback rules
- how to avoid duplicated bilingual logic across components

==================================================
10. SHARED CSS / STYLING STRATEGY
==================================================

I prefer shared CSS architecture instead of separate CSS files per component unless there is a strong reason.

Recommend a styling system for this project.

Include:
- how to organize global/shared CSS
- CSS variable strategy
- typography tokens
- spacing tokens
- layout utilities
- section spacing patterns
- reusable classes
- animation helper classes
- responsive rules
- when component-specific styles are justified

The result should be scalable and clean.

==================================================
11. ANIMATION STRATEGY
==================================================

Recommend a premium animation strategy for this website.

Requirements:
- GSAP + ScrollTrigger for advanced scroll behavior
- CSS for simple transitions
- Keep performance high
- Avoid animation overload
- Mobile should have simplified motion
- Reduced motion must be supported

Explain:
- which sections should use scroll-triggered motion
- which sections should remain mostly static
- how to organize animation code
- how to avoid turning the app into an animation spaghetti monster
- what should animate via transform/opacity only
- how to approach hero effects practically

==================================================
12. CONTENT PLAN
==================================================

Provide example content ideas in both English and Polish for each main section.

The copy should feel like a modern premium Korean restaurant brand:
- concise
- atmospheric
- elegant
- not cheesy
- not over-written

Include examples for:
- hero
- brand statement
- process section
- dish cards
- atmosphere section
- CTA

==================================================
13. MOBILE AND PERFORMANCE STRATEGY
==================================================

This part is very important.

Provide specific recommendations for:
- how to simplify the experience on mobile
- what to reduce or remove on smaller screens
- hero fallback strategy
- image/video performance
- lazy loading
- font loading
- animation performance
- reduced-motion handling
- Lighthouse-friendly decisions

Avoid generic advice. Be specific.

==================================================
14. IMPLEMENTATION ROADMAP
==================================================

Give a step-by-step roadmap for building this project.

For example:
- project structure setup
- Sanity setup
- schema creation
- data querying
- bilingual setup
- shared styles
- static section implementation
- hero implementation
- animation layer
- mobile optimization
- final polish

The roadmap should be realistic for one developer building a polished demo project.

==================================================
15. PRACTICAL ENGINEERING RULES
==================================================

Give practical coding and architecture rules for this project.

Include guidance for:
- naming conventions
- file organization
- reusable patterns
- avoiding duplicate bilingual logic
- keeping Sanity integration maintainable
- separating data, view, and animation concerns
- keeping CSS consistent
- avoiding premature abstraction
- keeping the project elegant instead of overbuilt

==================================================
OUTPUT REQUIREMENTS
==================================================

The output must be:
- structured
- specific
- practical
- implementation-oriented
- opinionated where useful
- realistic for one developer
- not generic
- not bloated
- not a visual builder system
- not centered around excessive CMS flexibility

Where helpful, include:
- example folder structures
- example schema structures
- example utility patterns
- example section responsibilities

Focus on producing a final, improved project specification that is actually useful for implementation.
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
