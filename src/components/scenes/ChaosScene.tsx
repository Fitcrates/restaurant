'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface ChaosSceneProps {
  lang: string;
  bigText1?: string;
  bigText2?: string;
  bigText3?: string;
  smallText?: string;
  imageUrl?: string;
}

export default function ChaosScene({ lang, bigText1, bigText2, bigText3, smallText, imageUrl }: ChaosSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const blocks = scene.querySelectorAll('.scene-chaos__text-block');

      blocks.forEach((block) => {
        const isRight = block.classList.contains('scene-chaos__text-block--right');
        const isCenter = block.classList.contains('scene-chaos__text-block--center');
        const fromX = isCenter ? 0 : isRight ? 24 : -24;
        const fromY = isCenter ? 50 : 22;

        gsap.fromTo(block,
          { opacity: 0, xPercent: fromX, y: fromY },
          {
            opacity: 1, xPercent: 0, y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top 95%',
              end: 'top 52%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Parallax on background image
      const bgImg = scene.querySelector('.scene-chaos__bg-image');
      if (bgImg) {
        gsap.fromTo(bgImg,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sceneRef} className="scene-chaos" id="chaos">
      <div className="scene-chaos__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="scene-chaos__bg-image"
          src={imageUrl || '/webp/hero-bg.webp'}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="scene-chaos__overlay" />

      <div className="scene-chaos__content">
        <div className="scene-chaos__text-block scene-chaos__text-block--left">
          <span className="scene-chaos__big-text">
            {bigText1 || d('chaos.big1', lang)}
          </span>
        </div>

        <div className="scene-chaos__text-block scene-chaos__text-block--right" style={{ marginTop: '-0.5em' }}>
          <span className="scene-chaos__big-text">
            {bigText2 || d('chaos.big2', lang)}
          </span>
        </div>

        <div className="scene-chaos__text-block scene-chaos__text-block--left" style={{ marginTop: '-0.3em' }}>
          <span className="scene-chaos__big-text scene-chaos__ember">
            {bigText3 || d('chaos.big3', lang)}
          </span>
        </div>

        <div className="scene-chaos__text-block scene-chaos__text-block--center" style={{ marginTop: '3rem' }}>
          <p className="scene-chaos__small-text" style={{ margin: '0 auto' }}>
            {smallText || d('chaos.small', lang)}
          </p>
        </div>
      </div>
    </section>
  );
}
