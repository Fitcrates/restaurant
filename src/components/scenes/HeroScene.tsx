'use client';

import React, { useEffect, useRef } from 'react';

import HeroMediaLayer from './hero-scene/HeroMediaLayer';
import HeroOverlayLayer from './hero-scene/HeroOverlayLayer';
import HeroTextLayer from './hero-scene/HeroTextLayer';
import useHeroSceneAnimation from './hero-scene/useHeroSceneAnimation';

interface HeroSceneProps {
  lang: string;
  heading?: string;
  tagline?: string;
  subtitle?: string;
}

export default function HeroScene({ lang, heading, tagline, subtitle }: HeroSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const loopVideoARef = useRef<HTMLVideoElement>(null);
  const loopVideoBRef = useRef<HTMLVideoElement>(null);
  const loopStackRef = useRef<HTMLDivElement>(null);
  const scrubVideoRef = useRef<HTMLVideoElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loopVideoARef.current && loopVideoARef.current.paused) {
      loopVideoARef.current.play().catch(() => {});
    }
  }, []);

  useHeroSceneAnimation({
    sceneRef,
    loopVideoARef,
    loopVideoBRef,
    loopStackRef,
    scrubVideoRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
  });

  return (
    <section ref={sceneRef} className="hero-scene" id="hero" aria-label={heading || undefined}>
      <HeroMediaLayer
        loopVideoARef={loopVideoARef}
        loopVideoBRef={loopVideoBRef}
        loopStackRef={loopStackRef}
        scrubVideoRef={scrubVideoRef}
      />

      <div ref={stageRef} className="hero-stage">
        <HeroOverlayLayer
          gradientRef={gradientRef}
          exitRef={exitRef}
          vignetteRef={vignetteRef}
          smokeRef={smokeRef}
        />
        <HeroTextLayer ref={textRef} lang={lang} tagline={tagline} subtitle={subtitle} />
      </div>
    </section>
  );
}
