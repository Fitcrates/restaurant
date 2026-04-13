'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HERO_SEQUENCE_FRAME_COUNT, HERO_SEQUENCE_SOURCES } from '@/lib/hero-sequence';

import { getPhase, phaseProgress, type HeroPhase } from './heroScene.helpers';

gsap.registerPlugin(ScrollTrigger);

type UseHeroSceneAnimationFramesParams = {
  sceneRef: React.RefObject<HTMLElement | null>;
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  sequenceCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  gradientRef: React.RefObject<HTMLDivElement | null>;
  exitRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  smokeRef: React.RefObject<HTMLDivElement | null>;
  onTextIntroReady?: () => void;
};

export default function useHeroSceneAnimationFrames({
  sceneRef,
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  sequenceCanvasRef,
  gradientRef,
  exitRef,
  vignetteRef,
  smokeRef,
  onTextIntroReady,
}: UseHeroSceneAnimationFramesParams) {
  const activeLoopIndexRef = useRef<0 | 1>(0);
  const isLoopCrossfadingRef = useRef(false);
  const currentPhaseRef = useRef<HeroPhase>('intro');
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const drawnFrameIndexRef = useRef(-1);
  const rafIdRef = useRef(0);
  const lastTickAtRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const highestLoadedFrameRef = useRef(0);
  const sequenceReadyRef = useRef(false);
  const sequenceUnavailableRef = useRef(false);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const canvas = sequenceCanvasRef.current;
    if (!scene || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;

    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    const getLerpFactor = (response: number, deltaSeconds: number) =>
      1 - Math.exp(-response * Math.min(deltaSeconds, 0.05));

    const progressResponse = isTouchDevice ? 10 : 14;
    const frameResponse = isTouchDevice ? 12 : 18;

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

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(window.innerWidth * dpr);
      const height = Math.round(window.innerHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawImageCover = (image: HTMLImageElement) => {
      resizeCanvas();

      const sourceWidth = image.naturalWidth || canvas.width;
      const sourceHeight = image.naturalHeight || canvas.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const sourceRatio = sourceWidth / sourceHeight;
      const targetRatio = canvasWidth / canvasHeight;

      let drawWidth = sourceWidth;
      let drawHeight = sourceHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (sourceRatio > targetRatio) {
        drawWidth = sourceHeight * targetRatio;
        offsetX = (sourceWidth - drawWidth) / 2;
      } else {
        drawHeight = sourceWidth / targetRatio;
        offsetY = (sourceHeight - drawHeight) / 2;
      }

      ctx2d.drawImage(
        image,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
      );
    };

    const drawFrameByIndex = (index: number) => {
      const image = imagesRef.current[index];
      if (!image || drawnFrameIndexRef.current === index) return;
      drawImageCover(image);
      drawnFrameIndexRef.current = index;
    };

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.loading = 'eager';
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load hero frame: ${src}`));
      });

    const preloadSequence = async () => {
      if (sequenceUnavailableRef.current) return;

      const firstFrame = await loadImage('/Frame0.webp').catch(() => null);
      if (!firstFrame) {
        sequenceReadyRef.current = false;
        sequenceUnavailableRef.current = true;
        return;
      }

      imagesRef.current = [firstFrame];
      highestLoadedFrameRef.current = 0;
      sequenceReadyRef.current = true;
      drawFrameByIndex(0);

      for (let index = 1; index < HERO_SEQUENCE_FRAME_COUNT; index += 1) {
        const frame = await loadImage(HERO_SEQUENCE_SOURCES[index]).catch(() => null);
        if (!frame) {
          sequenceUnavailableRef.current = true;
          break;
        }

        imagesRef.current[index] = frame;
        highestLoadedFrameRef.current = index;
      }
    };

    const updatePhase = (progress: number, phase: HeroPhase) => {
      const loopStack = loopStackRef.current;
      if (!loopStack) return;

      const localProgress = phaseProgress(progress, phase);
      const sequenceVisible = sequenceReadyRef.current;

      switch (phase) {
        case 'intro': {
          gsap.set(loopStack, { opacity: 1, scale: 1 + localProgress * 0.0035 });
          gsap.set(canvas, { opacity: 0, scale: 1 });
          gsap.set(gradientRef.current, { opacity: 1 + localProgress * 0.18 });
          gsap.set(vignetteRef.current, { opacity: 1 + localProgress * 0.36 });
          gsap.set(smokeRef.current, { opacity: 0.08 + localProgress * 0.08, y: -(localProgress * 12) });
          gsap.set(exitRef.current, { opacity: 0 });
          break;
        }
        case 'crossfade': {
          gsap.set(loopStack, { opacity: 1, scale: 1.002 + localProgress * 0.002 });
          gsap.set(canvas, { opacity: sequenceVisible ? 0.2 + localProgress * 0.8 : 0, scale: 1.001 + localProgress * 0.002 });
          gsap.set(gradientRef.current, { opacity: 1.16 + localProgress * 0.18 });
          gsap.set(vignetteRef.current, { opacity: 1.24 + localProgress * 0.18 });
          gsap.set(smokeRef.current, { opacity: 0.14 + localProgress * 0.06, y: -12 - localProgress * 14 });
          gsap.set(exitRef.current, { opacity: 0 });
          break;
        }
        case 'flip': {
          gsap.set(loopStack, { opacity: sequenceVisible ? 1 - localProgress * 0.9 : 1 });
          gsap.set(canvas, { opacity: sequenceVisible ? 0.72 + localProgress * 0.28 : 0, scale: 1.003 + localProgress * 0.005 });
          gsap.set(gradientRef.current, { opacity: 1.36 + localProgress * 0.12 });
          gsap.set(vignetteRef.current, { opacity: 1.42 + localProgress * 0.12 });
          gsap.set(smokeRef.current, { opacity: 0.22, y: -28 });
          gsap.set(exitRef.current, { opacity: 0 });
          break;
        }
        case 'hold': {
          gsap.set(loopStack, { opacity: sequenceVisible ? 0 : 1 });
          gsap.set(canvas, { opacity: sequenceVisible ? 1 : 0, scale: 1.008 + localProgress * 0.004 });
          gsap.set(gradientRef.current, { opacity: 1.48 + localProgress * 0.28 });
          gsap.set(vignetteRef.current, { opacity: 1.54 + localProgress * 0.16 });
          gsap.set(smokeRef.current, { opacity: 0.24 + localProgress * 0.08, y: -28 - localProgress * 12 });
          gsap.set(exitRef.current, { opacity: 0 });
          break;
        }
        case 'exit': {
          gsap.set(loopStack, { opacity: sequenceVisible ? 0 : 1 });
          gsap.set(canvas, { opacity: sequenceVisible ? 1 - localProgress * 0.65 : 0, scale: 1.012 + localProgress * 0.004 });
          gsap.set(gradientRef.current, { opacity: 1.8 });
          gsap.set(vignetteRef.current, { opacity: 1.68 });
          gsap.set(smokeRef.current, { opacity: 0.3 - localProgress * 0.14, y: -40 });
          gsap.set(exitRef.current, { opacity: 0.08 + localProgress * 0.18 });
          break;
        }
      }
    };

    if (prefersReducedMotion) {
      playActiveLoop();
      gsap.set(loopStackRef.current, { opacity: 1 });
      gsap.set(canvas, { opacity: 0 });
      gsap.set(exitRef.current, { opacity: 0 });
      gsap.set(smokeRef.current, { opacity: 0.08, y: 0 });
      gsap.set(vignetteRef.current, { opacity: 1 });
      return;
    }

    const gsapCtx = gsap.context(() => {
      const runIntro = () => {
        const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        const [loopA] = getLoops();

        if (loopA) {
          introTl.fromTo(
            loopA,
            { scale: 1.003, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' },
            0
          );
        }

        introTl.fromTo('.hero-brand-line', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }, 0);
        introTl.fromTo('.hero-title-row', { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.35);
        introTl.fromTo('.hero-subtitle-line', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.78);
        introTl.fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
      };

      const tick = (now: number) => {
        const lastTickAt = lastTickAtRef.current || now;
        const deltaSeconds = (now - lastTickAt) / 1000;
        lastTickAtRef.current = now;

        renderedProgressRef.current +=
          (targetProgressRef.current - renderedProgressRef.current) *
          getLerpFactor(progressResponse, deltaSeconds);

        if (Math.abs(targetProgressRef.current - renderedProgressRef.current) < 0.0008) {
          renderedProgressRef.current = targetProgressRef.current;
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

        if (sequenceReadyRef.current && phase !== 'intro' && phase !== 'crossfade') {
          const flipProgress = phase === 'flip' ? phaseProgress(renderedProgressRef.current, 'flip') : 1;
          const targetFrame = flipProgress * (HERO_SEQUENCE_FRAME_COUNT - 1);

          renderedFrameRef.current +=
            (targetFrame - renderedFrameRef.current) *
            getLerpFactor(frameResponse, deltaSeconds);

          const frameIndex = Math.max(
            0,
            Math.min(
              Math.round(renderedFrameRef.current),
              Math.min(highestLoadedFrameRef.current, HERO_SEQUENCE_FRAME_COUNT - 1)
            )
          );
          drawFrameByIndex(frameIndex);
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      void preloadSequence();
      playActiveLoop();
      resizeCanvas();
      onTextIntroReady?.();
      runIntro();
      rafIdRef.current = requestAnimationFrame(tick);

      window.addEventListener('resize', resizeCanvas);

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
          targetProgressRef.current = self.progress;
          currentPhaseRef.current = getPhase(self.progress);
        },
      });

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, sceneRef);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      gsapCtx.revert();
    };
  }, [
    sceneRef,
    loopVideoARef,
    loopVideoBRef,
    loopStackRef,
    sequenceCanvasRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
    onTextIntroReady,
  ]);
}
