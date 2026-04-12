'use client';

import React, { useEffect, useRef } from 'react';

import HeroMediaLayerPremium from './hero-scene/HeroMediaLayerPremium';
import HeroOverlayLayer from './hero-scene/HeroOverlayLayer';
import HeroTextLayer from './hero-scene/HeroTextLayer';
import useHeroSceneAnimationPremium from './hero-scene/useHeroSceneAnimationPremium';

interface HeroScenePremiumProps {
  lang: string;
  heading?: string;
  tagline?: string;
  subtitle?: string;
}

export default function HeroScenePremium({
  lang,
  heading,
  tagline,
  subtitle,
}: HeroScenePremiumProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const loopVideoARef = useRef<HTMLVideoElement>(null);
  const loopVideoBRef = useRef<HTMLVideoElement>(null);
  const loopStackRef = useRef<HTMLDivElement>(null);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loopA = loopVideoARef.current;
    const loopB = loopVideoBRef.current;
    const feature = featureVideoRef.current;

    const normalizeVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
    };

    const tryPlay = (video: HTMLVideoElement | null) => {
      if (!video) return;
      normalizeVideo(video);
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    const ensurePlayback = () => {
      tryPlay(loopA);
      tryPlay(loopB);
      if (feature) normalizeVideo(feature);
    };

    ensurePlayback();
    document.addEventListener('visibilitychange', ensurePlayback);
    window.addEventListener('pageshow', ensurePlayback);

    return () => {
      document.removeEventListener('visibilitychange', ensurePlayback);
      window.removeEventListener('pageshow', ensurePlayback);
    };
  }, []);

  useHeroSceneAnimationPremium({
    sceneRef,
    loopVideoARef,
    loopVideoBRef,
    loopStackRef,
    featureVideoRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
  });

  return (
    <section ref={sceneRef} className="hero-scene" id="hero" aria-label={heading || undefined}>
      <HeroMediaLayerPremium
        loopVideoARef={loopVideoARef}
        loopVideoBRef={loopVideoBRef}
        loopStackRef={loopStackRef}
        featureVideoRef={featureVideoRef}
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
