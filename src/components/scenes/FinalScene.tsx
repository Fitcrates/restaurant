'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface FinalSceneProps {
  lang: string;
  heading?: string;
  subtitle?: string;
}

export default function FinalScene({ lang, heading, subtitle }: FinalSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const headingEl = scene.querySelector('.scene-final__heading');
      const subEl = scene.querySelector('.scene-final__sub');

      if (headingEl) {
        gsap.fromTo(headingEl,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0,
            duration: 1.6,
            ease: 'power3.out',
            clearProps: 'opacity,y,transform',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      if (subEl) {
        gsap.fromTo(subEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
            clearProps: 'opacity,y,transform',
            scrollTrigger: {
              trigger: subEl,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sceneRef} className="scene-final" id="final">
      <div className="scene-final__content">
        <h2 className="scene-final__heading">
          {heading || d('final.heading', lang)}
        </h2>
        <p className="scene-final__sub">
          {subtitle || d('final.subtitle', lang)}
        </p>
      </div>
    </section>
  );
}
