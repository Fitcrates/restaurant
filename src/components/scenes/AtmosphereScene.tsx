'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface AtmosphereSceneProps {
  lang: string;
  heading?: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function AtmosphereScene({ lang, heading, subtitle, imageUrl }: AtmosphereSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Slow zoom out
    gsap.fromTo(imageRef.current,
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

    // Text fade up
    const content = scene.querySelector('.scene-atmosphere__content');
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: scene, start: 'top 40%' },
        }
      );
    }
  }, []);

  return (
    <section ref={sceneRef} className="scene-atmosphere" id="atmosphere">
      <div className="scene-atmosphere__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          className="scene-atmosphere__image"
          src={imageUrl || '/webp/atmosphere1 (1).webp'}
          alt="Restaurant atmosphere"
          loading="lazy"
        />
      </div>
      <div className="scene-atmosphere__overlay" />

      <div className="scene-atmosphere__content" style={{ opacity: 0 }}>
        <h2 className="scene-atmosphere__heading">
          {heading || d('atmos.heading', lang)}
        </h2>
        <p className="scene-atmosphere__subtitle">
          {subtitle || d('atmos.subtitle', lang)}
        </p>
      </div>
    </section>
  );
}
