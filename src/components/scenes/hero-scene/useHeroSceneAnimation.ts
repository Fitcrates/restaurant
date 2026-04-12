'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getPhase, phaseProgress, type HeroPhase } from './heroScene.helpers';

gsap.registerPlugin(ScrollTrigger);

type UseHeroSceneAnimationParams = {
  sceneRef: React.RefObject<HTMLElement | null>;
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  scrubVideoRef: React.RefObject<HTMLVideoElement | null>;
  gradientRef: React.RefObject<HTMLDivElement | null>;
  exitRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  smokeRef: React.RefObject<HTMLDivElement | null>;
};

export default function useHeroSceneAnimation({
  sceneRef,
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  scrubVideoRef,
  gradientRef,
  exitRef,
  vignetteRef,
  smokeRef,
}: UseHeroSceneAnimationParams) {
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
  const currentPhaseRef = useRef<HeroPhase>('intro');
  const idleLoopEnabledRef = useRef(false);
  const activeLoopIndexRef = useRef<0 | 1>(0);
  const isLoopCrossfadingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const isScrubSmoothingActiveRef = useRef(false);
  const scrollVelocityRef = useRef(0);
  const rafIdRef = useRef(0);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getLoops = () => [loopVideoARef.current, loopVideoBRef.current] as const;

    const pauseAllLoops = () => {
      const [a, b] = getLoops();
      if (a && !a.paused) a.pause();
      if (b && !b.paused) b.pause();
    };

    const playActiveLoop = () => {
      const [a, b] = getLoops();
      const active = activeLoopIndexRef.current === 0 ? a : b;
      const standby = activeLoopIndexRef.current === 0 ? b : a;
      if (!active || !standby) return;

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

      // Long cinematic cross-dissolve: 2s overlap sells the infinite loop
      const tl = gsap.timeline({
        defaults: { duration: 2, ease: 'power1.inOut' },
        onComplete: () => {
          active.pause();
          active.currentTime = 0;
          activeLoopIndexRef.current = activeLoopIndexRef.current === 0 ? 1 : 0;
          isLoopCrossfadingRef.current = false;
        },
      });

      // Fade standby up first (brief overlap at full opacity sells continuity)
      tl.to(standby, { opacity: 1, duration: 1.6 }, 0)
        .to(active, { opacity: 0, duration: 1.8 }, 0.4);
    };

    if (prefersReducedMotion) {
      idleLoopEnabledRef.current = true;
      playActiveLoop();
      gsap.set(loopStackRef.current, { opacity: 1 });
      gsap.set(scrubVideoRef.current, { opacity: 0 });
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
            { scale: 1.003, opacity: 0 },
            { scale: 1.0, opacity: 1, duration: 2.2, ease: 'power2.out' },
            0
          );
        }

        introTl.fromTo('.hero-brand-line', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 }, 0);
        introTl.fromTo('.hero-title-word', { opacity: 0, y: 100, rotateX: 12 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.3, stagger: 0.1 }, 0.4);
        introTl.fromTo('.hero-subtitle-line', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9);
        introTl.fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
        introTl.fromTo(gradientRef.current, { opacity: 0.3 }, { opacity: 1, duration: 2, ease: 'power1.inOut' }, 0);
      };

      idleLoopEnabledRef.current = true;
      playActiveLoop();
      runIntro();

      const tick = () => {
        const scrub = scrubVideoRef.current;

        if (idleLoopEnabledRef.current) {
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
        }

        if (scrub && isScrubSmoothingActiveRef.current) {
          const duration = scrub.duration || 0;
          if (duration > 0) {
            const safeTarget = clamp(targetTimeRef.current, 0, Math.max(duration - 0.001, 0));
            const delta = safeTarget - scrub.currentTime;

            // Simplify video scrubbing for iOS Safari.
            // Juggling play(), pause(), and playbackRate causes massive
            // lag and decoding pipeline stalls, especially with WebM on Apple devices.
            // GSAP's \`scrub: true\` already smooths \`targetTimeRef\`, so we just assign it.
            if (Math.abs(delta) > 0.01) {
              if (!scrub.paused) scrub.pause();
              scrub.currentTime = safeTarget;
            }
          }
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };
      rafIdRef.current = requestAnimationFrame(tick);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: '14% top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to('.hero-subtitle-line, .hero-scroll-cue', { opacity: 0, y: -30, duration: 0.3 })
        .to('.hero-title-block', { opacity: 0, y: -50, duration: 0.4 }, 0.1)
        .to('.hero-brand-line', { opacity: 0, y: -30, duration: 0.3 }, 0.3);

      ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          scrollVelocityRef.current = Math.abs(self.getVelocity());
          const nextPhase = getPhase(progress);

          if (nextPhase !== currentPhaseRef.current) {
            handlePhaseChange(currentPhaseRef.current, nextPhase);
            currentPhaseRef.current = nextPhase;
          }

          updatePhase(progress, nextPhase);
        },
      });

      function handlePhaseChange(prev: HeroPhase, next: HeroPhase) {
        const scrub = scrubVideoRef.current;
        const scrubDuration = scrub?.duration || 0;

        switch (next) {
          case 'intro': {
            idleLoopEnabledRef.current = true;
            if (scrub && !scrub.paused) scrub.pause();
            playActiveLoop();
            break;
          }
          case 'crossfade': {
            idleLoopEnabledRef.current = false;
            isScrubSmoothingActiveRef.current = false;
            scrollVelocityRef.current = 0;
            pauseAllLoops();
            if (prev === 'intro' && scrub) {
              scrub.currentTime = 0.001;
            }
            break;
          }
          case 'flip': {
            idleLoopEnabledRef.current = false;
            isScrubSmoothingActiveRef.current = true;
            scrollVelocityRef.current = 0;
            pauseAllLoops();
            if (scrub) {
              if (prev === 'crossfade' || prev === 'intro') scrub.currentTime = 0.001;
              scrub.pause();
            }
            break;
          }
          case 'hold': {
            idleLoopEnabledRef.current = false;
            isScrubSmoothingActiveRef.current = true;
            scrollVelocityRef.current = 0;
            pauseAllLoops();
            if (scrub) {
              scrub.pause();
              if (scrubDuration > 0) {
                targetTimeRef.current = Math.max(scrubDuration - 0.001, 0);
              }
            }
            break;
          }
          case 'exit': {
            isScrubSmoothingActiveRef.current = false;
            scrollVelocityRef.current = 0;
            if (scrub) scrub.pause();
            break;
          }
        }
      }

      function updatePhase(progress: number, phase: HeroPhase) {
        const scrub = scrubVideoRef.current;
        const loopStack = loopStackRef.current;
        if (!scrub || !loopStack) return;

        const localProgress = phaseProgress(progress, phase);

        switch (phase) {
          case 'intro': {
            gsap.set(loopStack, { opacity: 1, scale: 1 + localProgress * 0.003 });
            gsap.set(scrub, { opacity: 0 });
            gsap.set(vignetteRef.current, { opacity: 1 + localProgress * 0.4 });
            gsap.set(gradientRef.current, { opacity: 1 + localProgress * 0.2 });
            gsap.set(smokeRef.current, { opacity: 0.08 + localProgress * 0.1, y: -(localProgress * 15) });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'crossfade': {
            // Hold loopStack at 1 while scrub fades in over it to prevent dark overlay dip
            gsap.set(loopStack, { opacity: 1, scale: 1.003 + localProgress * 0.003 });
            gsap.set(scrub, { opacity: localProgress, scale: 1.003 + localProgress * 0.003 });
            gsap.set(gradientRef.current, { opacity: 1.2 + localProgress * 0.25 });
            gsap.set(vignetteRef.current, { opacity: 1.3 + localProgress * 0.2 });
            gsap.set(smokeRef.current, { opacity: 0.18 + localProgress * 0.05, y: -15 - localProgress * 15 });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'flip': {
            const duration = scrub.duration || 0;
            if (duration > 0) {
              targetTimeRef.current = duration * localProgress;
            }

            gsap.set(loopStack, { opacity: 0 });
            gsap.set(scrub, { opacity: 1, scale: 1.004 + localProgress * 0.007 });
            gsap.set(gradientRef.current, { opacity: 1.45 });
            gsap.set(vignetteRef.current, { opacity: 1.5 });
            gsap.set(smokeRef.current, { opacity: 0.22, y: -30 });
            gsap.set(exitRef.current, { opacity: 0 });
            break;
          }
          case 'hold': {
            gsap.set(loopStack, { opacity: 0 });
            gsap.set(scrub, { opacity: 1, scale: 1.012 + localProgress * 0.004 });
            gsap.set(gradientRef.current, { opacity: 1.5 + localProgress * 0.35 });
            gsap.set(vignetteRef.current, { opacity: 1.55 + localProgress * 0.15 });
            gsap.set(smokeRef.current, { opacity: 0.23 + localProgress * 0.09, y: -30 - localProgress * 10 });
            gsap.set(exitRef.current, { opacity: localProgress * 0.28 });
            break;
          }
          case 'exit': {
            gsap.set(loopStack, { opacity: 0 });
            gsap.set(scrub, { opacity: 1 - localProgress * 0.65, scale: 1.016 + localProgress * 0.004 });
            gsap.set(gradientRef.current, { opacity: 1.85 });
            gsap.set(vignetteRef.current, { opacity: 1.7 });
            gsap.set(smokeRef.current, { opacity: 0.3 - localProgress * 0.15, y: -40 });
            gsap.set(exitRef.current, { opacity: 0.28 + localProgress * 0.5 });
            break;
          }
        }
      }
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
    scrubVideoRef,
    gradientRef,
    exitRef,
    vignetteRef,
    smokeRef,
  ]);
}
