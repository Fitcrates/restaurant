'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface TypographySceneProps {
  lang: string;
  line1?: string;
  line2?: string;
  line3?: string;
  body?: string;
}

export default function TypographyScene({ lang, line1, line2, line3, body }: TypographySceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = scene.querySelectorAll('.scene-typography__line');
    const divider = scene.querySelector('.scene-typography__divider');
    const bodyEl = scene.querySelector('.scene-typography__body');

    lines.forEach((line) => {
      const isRight = line.classList.contains('scene-typography__line--right');
      const fromX = isRight ? 24 : -24;
      const fromY = 22;

      gsap.fromTo(line,
        { opacity: 0, xPercent: fromX, y: fromY },
        {
          opacity: 1, xPercent: 0, y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 95%',
            end: 'top 52%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    if (divider) {
      gsap.fromTo(divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (bodyEl) {
      gsap.fromTo(bodyEl,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: bodyEl,
            start: 'top 95%',
            end: 'top 60%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sceneRef} className="scene-typography" id="typography">
      <div className="scene-typography__inner">
        <span className="scene-typography__line">
          {line1 || d('typo.line1', lang)}
        </span>
        <span className="scene-typography__line scene-typography__line--indent">
          <em>{line2 || d('typo.line2', lang)}</em>
        </span>
        <span className="scene-typography__line scene-typography__line--right scene-typography__line--accent">
          {line3 || d('typo.line3', lang)}
        </span>
        <div className="scene-typography__divider" style={{ transformOrigin: 'left center' }} />
        <p className="scene-typography__body" style={{ marginTop: '2rem' }}>
          {body || d('typo.body', lang)}
        </p>
      </div>
    </section>
  );
}
