'use client';

import React, { useEffect, useState } from 'react';

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
  const sceneRef = React.useRef<HTMLElement>(null);

  const loopVideoARef = React.useRef<HTMLVideoElement>(null);
  const loopVideoBRef = React.useRef<HTMLVideoElement>(null);
  const loopStackRef = React.useRef<HTMLDivElement>(null);
  const sequenceCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const gradientRef = React.useRef<HTMLDivElement>(null);
  const exitRef = React.useRef<HTMLDivElement>(null);
  const vignetteRef = React.useRef<HTMLDivElement>(null);
  const smokeRef = React.useRef<HTMLDivElement>(null);
  const [shouldLoadMotionMedia, setShouldLoadMotionMedia] = useState(false);
  const [idleMediaReady, setIdleMediaReady] = useState(false);
  const [textIntroReady, setTextIntroReady] = useState(false);

  useEffect(() => {
    const isMobileViewport = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    let rafA: number | null = null;
    let rafB: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadMotionMedia = () => {
      setShouldLoadMotionMedia(true);
    };

    const scheduleLoad = () => {
      rafA = window.requestAnimationFrame(() => {
        rafB = window.requestAnimationFrame(() => {
          timeoutId = setTimeout(loadMotionMedia, isMobileViewport ? 120 : 40);
        });
      });
    };

    scheduleLoad();

    return () => {
      if (rafA !== null) {
        window.cancelAnimationFrame(rafA);
      }
      if (rafB !== null) {
        window.cancelAnimationFrame(rafB);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadMotionMedia) return;

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
  }, [shouldLoadMotionMedia]);

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
    onTextIntroReady: () => setTextIntroReady(true),
  });

  return (
    <section
      ref={sceneRef}
      className={`hero-scene hero-scene--frames${textIntroReady ? ' is-text-ready' : ''}`}
      id="hero"
      aria-label={heading || undefined}
    >
      <HeroMediaLayerFrames
        loopVideoARef={loopVideoARef}
        loopVideoBRef={loopVideoBRef}
        loopStackRef={loopStackRef}
        sequenceCanvasRef={sequenceCanvasRef}
        shouldLoadMotionMedia={shouldLoadMotionMedia}
        idleMediaReady={idleMediaReady}
        onIdleMediaReady={() => setIdleMediaReady(true)}
      />

      <div className="hero-stage">
        <HeroOverlayLayer
          gradientRef={gradientRef}
          exitRef={exitRef}
          vignetteRef={vignetteRef}
          smokeRef={smokeRef}
        />
        <HeroTextLayer lang={lang} tagline={tagline} subtitle={subtitle} />
      </div>
    </section>
  );
}
