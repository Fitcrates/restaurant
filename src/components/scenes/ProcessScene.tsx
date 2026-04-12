'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  title: string;
  description: string;
  imageUrl?: string;
}

interface ProcessSceneProps {
  lang: string;
  steps?: ProcessStep[];
}

export default function ProcessScene({ lang, steps }: ProcessSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  const defaultSteps: ProcessStep[] = [
    { title: d('process.step1.title', lang), description: d('process.step1.desc', lang), imageUrl: '/webp/charcoal.webp' },
    { title: d('process.step2.title', lang), description: d('process.step2.desc', lang), imageUrl: '/webp/ingredients.webp' },
    { title: d('process.step3.title', lang), description: d('process.step3.desc', lang), imageUrl: '/webp/dish.webp' },
    { title: d('process.step4.title', lang), description: d('process.step4.desc', lang), imageUrl: '/webp/servegrill.webp' },
  ];

  const processSteps = steps && steps.length > 0 ? steps : defaultSteps;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // On mobile, skip sticky behavior — just show all steps
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        if (prefersReducedMotion) return;

        const leftCol = scene.querySelector('.scene-process__left');
        const panels = scene.querySelectorAll('.scene-process__image-panel');
        const stepElements = scene.querySelectorAll('.scene-process__step');

        ScrollTrigger.create({
          trigger: scene,
          start: 'top top',
          end: 'bottom bottom',
          pin: leftCol,
          pinSpacing: false,
        });

        // Make first step active by default
        stepElements[0]?.classList.add('is-active');

        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              stepElements.forEach(s => s.classList.remove('is-active'));
              stepElements[i]?.classList.add('is-active');
            },
            onEnterBack: () => {
              stepElements.forEach(s => s.classList.remove('is-active'));
              stepElements[i]?.classList.add('is-active');
            },
          });
        });
      });
    }, sceneRef);

    return () => ctx.revert();
  }, [processSteps.length]);

  return (
    <div ref={sceneRef} className="scene-process" id="process">
      {/* DESKTOP VIEW */}
      <div className="scene-process__desktop">
        <div className="scene-process__sticky-wrap">
          <div className="scene-process__left">
            {processSteps.map((step, i) => (
              <div key={i} className={`scene-process__step ${i === 0 ? 'is-active' : ''}`}>
                <div className="scene-process__step-number">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="scene-process__step-title">{step.title}</h3>
                <p className="scene-process__step-desc">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="scene-process__right">
            {processSteps.map((step, i) => (
              <div key={i} className="scene-process__image-panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="scene-process__image"
                  src={step.imageUrl || '/webp/dish.webp'}
                  alt={step.title}
                  loading="lazy"
                />
                <div className="scene-process__image-overlay" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE STACKING CARDS VIEW */}
      <div className="scene-process__mobile">
        {processSteps.map((step, i) => (
          <div 
            key={i} 
            className="scene-process__mobile-card" 
            style={{ zIndex: i + 1 }}
          >
            <div className="scene-process__mobile-card-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scene-process__mobile-card-image"
                src={step.imageUrl || '/webp/dish.webp'}
                alt={step.title}
                loading="lazy"
              />
              <div className="scene-process__mobile-card-overlay" />
            </div>
            
            <div className="scene-process__mobile-card-content">
              <div className="scene-process__step-number" style={{ marginBottom: '1rem' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="scene-process__step-title" style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
                {step.title}
              </h3>
              <p className="scene-process__step-desc" style={{ fontSize: '1rem', marginBottom: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
