'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface SplitSceneProps {
  lang: string;
  label?: string;
  heading?: string;
  body?: string;
  imageUrl?: string;
}

export default function SplitScene({ lang, label, heading, body, imageUrl }: SplitSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      gsap.fromTo(imageRef.current,
        { yPercent: -12, scale: 1.05 },
        {
          yPercent: 12, scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    // Text stagger
    const textEls = scene.querySelectorAll('.scene-split__label, .scene-split__heading, .scene-split__body');
    textEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.3,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sceneRef} className="scene-split" id="split">
      <div className="scene-split__grid">
        <div className="scene-split__text">
          <div className="scene-split__label">
            {label || d('split.label', lang)}
          </div>
          <h2 className="scene-split__heading">
            {heading || d('split.heading', lang)}
          </h2>
          <p className="scene-split__body">
            {body || d('split.body', lang)}
          </p>
        </div>
        <div className="scene-split__image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            className="scene-split__image"
            src={imageUrl || '/bornfire.png'}
            alt="Korean BBQ preparation"
            loading="lazy"
          />
          <div className="scene-split__image-overlay" />
        </div>
      </div>
    </section>
  );
}
