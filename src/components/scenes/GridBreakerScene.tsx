'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface GridBreakerSceneProps {
  lang: string;
  floatingText?: string;
  mainImageUrl?: string;
  sideImage1Url?: string;
  sideImage2Url?: string;
}

export default function GridBreakerScene({
  lang,
  floatingText,
  mainImageUrl,
  sideImage1Url,
  sideImage2Url,
}: GridBreakerSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const images = scene.querySelectorAll('.scene-gridbreaker__image');
      images.forEach((img, i) => {
        gsap.fromTo(img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        gsap.fromTo(img.parentElement!,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 1.3,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top 88%',
            },
          }
        );
      });

      const floatEl = scene.querySelector('.scene-gridbreaker__text-float');
      if (floatEl) {
        gsap.fromTo(floatEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: floatEl, start: 'top 92%' },
          }
        );
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sceneRef} className="scene-gridbreaker" id="gridbreaker">
      <div className="scene-gridbreaker__layout">
        <div className="scene-gridbreaker__main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="scene-gridbreaker__image"
            src={mainImageUrl || '/webp/bibimbap.webp'}
            alt="Korean Bibimbap presentation"
            loading="lazy"
          />
          <div className="scene-gridbreaker__text-float">
            {floatingText || d('grid.floatingText', lang)}
          </div>
        </div>
        <div className="scene-gridbreaker__side scene-gridbreaker__side--top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="scene-gridbreaker__image"
            src={sideImage1Url || '/webp/ttopoki.webp'}
            alt="Tteokbokki spicy rice cakes"
            loading="lazy"
          />
        </div>
        <div className="scene-gridbreaker__side scene-gridbreaker__side--bottom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="scene-gridbreaker__image"
            src={sideImage2Url || '/webp/cziken.webp'}
            alt="Korean Fried Chicken close-up"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}