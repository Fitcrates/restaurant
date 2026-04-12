'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  HERO_SCRUB_FPS,
  getFlipTargetTime,
  getPhase,
  phaseProgress,
  quantizeTimeToFrame,
  type HeroPhase,
} from './heroScene.helpers';

gsap.registerPlugin(ScrollTrigger);

type UseHeroSceneAnimationPremiumParams = {
  sceneRef: React.RefObject<HTMLElement | null>;
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  featureVideoRef: React.RefObject<HTMLVideoElement | null>;
  gradientRef: React.RefObject<HTMLDivElement | null>;
  exitRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  smokeRef: React.RefObject<HTMLDivElement | null>;
};

export default function useHeroSceneAnimationPremium({
  sceneRef,
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  featureVideoRef,
  gradientRef,
  exitRef,
  vignetteRef,
  smokeRef,
}: UseHeroSceneAnimationPremiumParams) {
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
  const getLerpFactor = (response: number, deltaSeconds: number) =>
    1 - Math.exp(-response * Math.min(deltaSeconds, 0.05));

  const currentPhaseRef = useRef<HeroPhase>('intro');
  const activeLoopIndexRef = useRef<0 | 1>(0);
  const isLoopCrossfadingRef = useRef(false);
  const scrubTargetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const videoTargetTimeRef = useRef(0);
  const rafIdRef = useRef(0);
  const lastTickAtRef = useRef(0);
  const lastFeatureSeekAtRef = useRef(0);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isWebkit =
      typeof navigator !== 'undefined' &&
      /WebKit/i.test(navigator.userAgent) &&
      !/Chrome|CriOS|EdgiOS/i.test(navigator.userAgent);
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;

    const motionConfig = {
      progressResponse: isWebkit ? 8.5 : isTouchDevice ? 11 : 15,
      videoResponse: isWebkit ? 7 : isTouchDevice ? 10 : 13,
      safeEndOffset: isWebkit ? 0.08 : 0.02,
      seekThreshold: isWebkit ? 0.28 : isTouchDevice ? 0.32 : 0.36,
      reverseThreshold: isWebkit ? 0.1 : isTouchDevice ? 0.08 : 0.07,
      minSeekIntervalMs: isWebkit ? 44 : isTouchDevice ? 30 : 22,
      playbackDeadzone: isWebkit ? 0.03 : isTouchDevice ? 0.024 : 0.018,
      maxPlaybackRate: isWebkit ? 1.1 : isTouchDevice ? 1.25 : 1.45,
      minPlaybackRate: 0.9,
      rateGain: isWebkit ? 1.4 : isTouchDevice ? 1.8 : 2.2,
    };

    const getLoops = () => [loopVideoARef.current, loopVideoBRef.current] as const;

    const playActiveLoop = () => {
      const [a, b] = getLoops();
      const active = activeLoopIndexRef.current === 0 ? a : b;
      const standby = activeLoopIndexRef.current === 0 ? b : a;
      if (!active || !standby) return;

      active.loop = true;
      standby.loop = true;
      gsap.set(active, { opacity: 1, scale: 1 });
      gsap.set(standby, { opacity: 0, scale: 1 });
      standby.pause();
      standby.currentTime = 0;
      active.play().catch(() => {});
    };

    const startLoopCrossfade = () => {
      if (isLoopCrossfadingRef.current) return;
      const [a, b] = getLoops();
      const active = activeLoopIndexRef.current === 0 ? a : b;
      const standby = activeLoopIndexRef.current === 0 ? b : a;
      if (!active || !standby) return;

      isLoopCrossfadingRef.current = true;
      standby.currentTime = 0;
      standby.play().catch(() => {});

      gsap.timeline({
        defaults: { duration: 2, ease: 'power1.inOut' },
        onComplete: () => {
          active.pause();
          active.currentTime = 0;
          activeLoopIndexRef.current = activeLoopIndexRef.current === 0 ? 1 : 0;
          isLoopCrossfadingRef.current = false;
        },
      })
        .to(standby, { opacity: 1, duration: 1.6 }, 0)
        .to(active, { opacity: 0, duration: 1.8 }, 0.4);
    };

    const resetFeatureVideo = (video: HTMLVideoElement | null, time = 0.001) => {
      if (!video) return;
      video.pause();
      video.playbackRate = 1;
      video.currentTime = time;
      videoTargetTimeRef.current = time;
    };

    if (prefersReducedMotion) {
      playActiveLoop();
      gsap.set(loopStackRef.current, { opacity: 1 });
      gsap.set(featureVideoRef.current, { opacity: 0 });
      gsap.set(exitRef.current, { opacity: 0 });
      gsap.set(smokeRef.current, { opacity: 0.08, y: 0 });
      gsap.set(vignetteRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const runIntro = () => {
        const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        const [loopA] = getLoops();

        if (loopA) {
          introTl.fromTo(
            loopA,
            { scale: 1.004, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' },
            0
          );
        }

        introTl.fromTo('.hero-brand-line', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 }, 0);
        introTl.fromTo('.hero-title-word', { opacity: 0, y: 100, rotateX: 12 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.3, stagger: 0.1 }, 0.4);
        introTl.fromTo('.hero-subtitle-line', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9);
        introTl.fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
      };

      const syncFeatureVideo = (video: HTMLVideoElement, desiredTime: number, phase: HeroPhase, now: number) => {
        const duration = video.duration && isFinite(video.duration) ? video.duration : 4;
        const safeEnd = Math.max(duration - motionConfig.safeEndOffset, 0);
        const currentTime = video.currentTime;
        const delta = desiredTime - currentTime;
        const absDelta = Math.abs(delta);
        const canSeek = now - lastFeatureSeekAtRef.current >= motionConfig.minSeekIntervalMs;

        if (phase === 'flip') {
          if (delta > motionConfig.playbackDeadzone) {
            video.playbackRate = clamp(
              1 + delta * motionConfig.rateGain,
              motionConfig.minPlaybackRate,
              motionConfig.maxPlaybackRate
            );
            if (video.paused) void video.play().catch(() => {});
          } else {
            video.playbackRate = 1;
          }

          if (absDelta > motionConfig.seekThreshold && canSeek) {
            video.currentTime = quantizeTimeToFrame(desiredTime, HERO_SCRUB_FPS, safeEnd);
            lastFeatureSeekAtRef.current = now;
          }
          return;
        }

        if (phase === 'hold' || phase === 'exit') {
          if (currentTime < safeEnd - motionConfig.playbackDeadzone) {
            video.playbackRate = 1;
            if (video.paused) void video.play().catch(() => {});
          } else {
            video.pause();
            video.playbackRate = 1;
            if (absDelta > motionConfig.playbackDeadzone && canSeek) {
              video.currentTime = quantizeTimeToFrame(desiredTime, HERO_SCRUB_FPS, safeEnd);
              lastFeatureSeekAtRef.current = now;
            }
          }
          return;
        }

        video.pause();
        video.playbackRate = 1;

        if (delta < -motionConfig.reverseThreshold && canSeek) {
          video.currentTime = quantizeTimeToFrame(desiredTime, HERO_SCRUB_FPS, safeEnd);
          lastFeatureSeekAtRef.current = now;
        }
      };

      const updatePhase = (progress: number, phase: HeroPhase) => {
        const loopStack = loopStackRef.current;
        const feature = featureVideoRef.current;
        if (!loopStack || !feature) return;

        const localProgress = phaseProgress(progress, phase);

        switch (phase) {
          case 'intro': {
            gsap.set(loopStack, { opacity: 1, scale: 1 + localProgress * 0.003 });
            gsap.set(feature, { opacity: 0, scale: 1 });
            gsap.set(gradientRef.current, { opacity: 1 + localProgress * 0.18 });
            gsap.set(vignetteRef.current, { opacity: 1 + localProgress * 0.34 });
            gsap.set(smokeRef.current, { opacity: 0.08 + localProgress * 0.08, y: -(localProgress * 12) });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'crossfade': {
            gsap.set(loopStack, { opacity: 1, scale: 1.002 + localProgress * 0.002 });
            gsap.set(feature, { opacity: localProgress, scale: 1.001 + localProgress * 0.002 });
            gsap.set(gradientRef.current, { opacity: 1.18 + localProgress * 0.18 });
            gsap.set(vignetteRef.current, { opacity: 1.26 + localProgress * 0.18 });
            gsap.set(smokeRef.current, { opacity: 0.15 + localProgress * 0.06, y: -12 - localProgress * 14 });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'flip': {
            const duration = feature.duration && isFinite(feature.duration) ? feature.duration : 4;
            if (duration > 0) {
              videoTargetTimeRef.current = getFlipTargetTime(localProgress, duration);
            }

            gsap.set(loopStack, { opacity: 0 });
            gsap.set(feature, { opacity: 1, scale: 1.004 + localProgress * 0.0055 });
            gsap.set(gradientRef.current, { opacity: 1.38 + localProgress * 0.12 });
            gsap.set(vignetteRef.current, { opacity: 1.44 + localProgress * 0.12 });
            gsap.set(smokeRef.current, { opacity: 0.22, y: -28 });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'hold': {
            gsap.set(loopStack, { opacity: 0 });
            gsap.set(feature, { opacity: 1, scale: 1.009 + localProgress * 0.004 });
            gsap.set(gradientRef.current, { opacity: 1.5 + localProgress * 0.28 });
            gsap.set(vignetteRef.current, { opacity: 1.56 + localProgress * 0.16 });
            gsap.set(smokeRef.current, { opacity: 0.24 + localProgress * 0.08, y: -28 - localProgress * 12 });
            gsap.set(exitRef.current, { opacity: localProgress * 0.24 });
            break;
          }
          case 'exit': {
            gsap.set(loopStack, { opacity: 0 });
            gsap.set(feature, { opacity: 1 - localProgress * 0.65, scale: 1.013 + localProgress * 0.004 });
            gsap.set(gradientRef.current, { opacity: 1.82 });
            gsap.set(vignetteRef.current, { opacity: 1.7 });
            gsap.set(smokeRef.current, { opacity: 0.3 - localProgress * 0.14, y: -40 });
            gsap.set(exitRef.current, { opacity: 0.24 + localProgress * 0.52 });
            break;
          }
        }
      };

      const tick = (now: number) => {
        const feature = featureVideoRef.current;
        const lastTickAt = lastTickAtRef.current || now;
        const deltaSeconds = (now - lastTickAt) / 1000;
        lastTickAtRef.current = now;

        renderedProgressRef.current +=
          (scrubTargetProgressRef.current - renderedProgressRef.current) *
          getLerpFactor(motionConfig.progressResponse, deltaSeconds);

        if (Math.abs(scrubTargetProgressRef.current - renderedProgressRef.current) < 0.0008) {
          renderedProgressRef.current = scrubTargetProgressRef.current;
        }

        const phase = getPhase(renderedProgressRef.current);
        updatePhase(renderedProgressRef.current, phase);

        const [a, b] = getLoops();
        const active = activeLoopIndexRef.current === 0 ? a : b;
        if (
          active &&
          active.duration > 0 &&
          !isLoopCrossfadingRef.current &&
          active.currentTime >= active.duration - 2.5
        ) {
          startLoopCrossfade();
        }

        if (feature && (phase === 'flip' || phase === 'hold' || phase === 'exit')) {
          if (feature.readyState >= 2) {
            const duration = feature.duration && isFinite(feature.duration) ? feature.duration : 4;
            const safeEnd = Math.max(duration - motionConfig.safeEndOffset, 0);
            const rawTarget = phase === 'flip' ? videoTargetTimeRef.current : safeEnd;

            videoTargetTimeRef.current +=
              (rawTarget - videoTargetTimeRef.current) * getLerpFactor(motionConfig.videoResponse, deltaSeconds);

            syncFeatureVideo(feature, clamp(videoTargetTimeRef.current, 0, safeEnd), phase, now);
          }
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      const handlePhaseChange = (prev: HeroPhase, next: HeroPhase) => {
        const feature = featureVideoRef.current;

        switch (next) {
          case 'intro': {
            playActiveLoop();
            resetFeatureVideo(feature, 0.001);
            scrubTargetProgressRef.current = 0;
            renderedProgressRef.current = 0;
            lastTickAtRef.current = 0;
            break;
          }
          case 'crossfade': {
            if (prev === 'intro') resetFeatureVideo(feature, 0.001);
            lastTickAtRef.current = 0;
            break;
          }
          case 'flip': {
            lastFeatureSeekAtRef.current = 0;
            if (feature) {
              if (prev === 'intro' || prev === 'crossfade') {
                resetFeatureVideo(feature, 0.001);
              }
              void feature.play().catch(() => {});
            }
            lastTickAtRef.current = 0;
            break;
          }
          case 'hold': {
            lastTickAtRef.current = 0;
            break;
          }
          case 'exit': {
            if (feature) feature.playbackRate = 1;
            break;
          }
        }
      };

      playActiveLoop();
      resetFeatureVideo(featureVideoRef.current, 0.001);
      runIntro();
      rafIdRef.current = requestAnimationFrame(tick);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: '14% top',
            scrub: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        })
        .to('.hero-subtitle-line, .hero-scroll-cue', { opacity: 0, y: -30, duration: 0.3 })
        .to('.hero-title-block', { opacity: 0, y: -50, duration: 0.4 }, 0.1)
        .to('.hero-brand-line', { opacity: 0, y: -30, duration: 0.3 }, 0.3);

      ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          scrubTargetProgressRef.current = progress;
          const nextPhase = getPhase(progress);

          if (nextPhase !== currentPhaseRef.current) {
            handlePhaseChange(currentPhaseRef.current, nextPhase);
            currentPhaseRef.current = nextPhase;
          }
        },
      });
    }, sceneRef);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [
    sceneRef,
    loopVideoARef,
    loopVideoBRef,
    loopStackRef,
    featureVideoRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
  ]);
}
