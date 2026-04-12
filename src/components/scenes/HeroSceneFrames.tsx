'use client';

import React, { useEffect, useRef } from 'react';

import HeroMediaLayerFrames from './hero-scene/HeroMediaLayerFrames';
import HeroOverlayLayer from './hero-scene/HeroOverlayLayer';
import HeroTextLayer from './hero-scene/HeroTextLayer';
import useHeroSceneAnimationFrames from './hero-scene/useHeroSceneAnimationFrames';

interface HeroSceneFramesProps {
  lang: string;
  heading?: string;
  tagline?: string;
  subtitle?: string;
}

export default function HeroSceneFrames({
  lang,
  heading,
  tagline,
  subtitle,
}: HeroSceneFramesProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const loopVideoARef = useRef<HTMLVideoElement>(null);
  const loopVideoBRef = useRef<HTMLVideoElement>(null);
  const loopStackRef = useRef<HTMLDivElement>(null);
  const sequenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loopA = loopVideoARef.current;
    const loopB = loopVideoBRef.current;

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
    };

    ensurePlayback();
    document.addEventListener('visibilitychange', ensurePlayback);
    window.addEventListener('pageshow', ensurePlayback);

    return () => {
      document.removeEventListener('visibilitychange', ensurePlayback);
      window.removeEventListener('pageshow', ensurePlayback);
    };
  }, []);

  useHeroSceneAnimationFrames({
    sceneRef,
    loopVideoARef,
    loopVideoBRef,
    loopStackRef,
    sequenceCanvasRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
  });

  return (
    <section ref={sceneRef} className="hero-scene" id="hero" aria-label={heading || undefined}>
      <HeroMediaLayerFrames
        loopVideoARef={loopVideoARef}
        loopVideoBRef={loopVideoBRef}
        loopStackRef={loopStackRef}
        sequenceCanvasRef={sequenceCanvasRef}
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
