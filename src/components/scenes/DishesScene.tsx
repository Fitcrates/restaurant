'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { d } from '@/lib/utils/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Dish {
  name: string;
  description: string;
  price?: string;
  imageUrl?: string;
}

interface DishesSceneProps {
  lang: string;
  heading?: string;
  dishes?: Dish[];
}

export default function DishesScene({ lang, heading, dishes }: DishesSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const defaultDishes: Dish[] = [
    { name: d('dishes.kobe.name', lang), description: d('dishes.kobe.desc', lang), imageUrl: '/webp/kobe_striploin.webp' },
    { name: d('dishes.gejang.name', lang), description: d('dishes.gejang.desc', lang), imageUrl: '/webp/ganjang_gejang.webp' },
    { name: d('dishes.samgyeopsal.name', lang), description: d('dishes.samgyeopsal.desc', lang), imageUrl: '/webp/samgyeopsal.webp' },
    { name: d('dishes.bulgogi.name', lang), description: d('dishes.bulgogi.desc', lang), imageUrl: '/webp/wagyubulgogi.webp' },
    { name: d('dishes.galbi.name', lang), description: d('dishes.galbi.desc', lang), imageUrl: '/webp/galbi.webp' },
    { name: d('dishes.japchae.name', lang), description: d('dishes.japchae.desc', lang), imageUrl: '/webp/japchae.webp' },
    { name: d('dishes.doenjang.name', lang), description: d('dishes.doenjang.desc', lang), imageUrl: '/webp/doenjang.webp' },
  ];

  const displayDishes = dishes && dishes.length > 0 ? dishes : defaultDishes;

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      // Calculate scrollWidth dynamically in functions to avoid stale closures
      // Ensure we don't return a negative value, which breaks the `end` property
      const getScrollWidth = () => Math.max(0, track.scrollWidth - window.innerWidth + 100);

      // Only initialize ScrollTrigger if there is actual overflow to scroll
      if (getScrollWidth() > 0) {
        gsap.fromTo(track,
          { x: 0 },
          {
            x: () => -getScrollWidth(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: () => `+=${getScrollWidth()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    // Recalculate ScrollTrigger once custom fonts are fully loaded
    // to prevent layout height shifts from causing trigger jumps
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, { scope: wrapperRef, dependencies: [displayDishes.length] });

  return (
    <div ref={wrapperRef} className="scene-dishes-wrapper" id="dishes">
      <div ref={sceneRef} className="scene-dishes">
        <div className="scene-dishes__header">
          <div className="scene-dishes__label">{d('dishes.label', lang)}</div>
          <h2 className="text-heading-lg">{heading || d('dishes.heading', lang)}</h2>
        </div>

        <div className="scene-dishes__track-wrapper">
          <div ref={trackRef} className="scene-dishes__track">
            {displayDishes.map((dish, i) => (
              <div key={i} className="scene-dishes__card">
                <div className="scene-dishes__card-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="scene-dishes__card-image"
                    src={dish.imageUrl || '/webp/dish.webp'}
                    alt={dish.name}
                    loading="lazy"
                  />
                </div>
                <div className="scene-dishes__card-info">
                  <h3 className="scene-dishes__card-name">{dish.name}</h3>
                  <p className="scene-dishes__card-desc">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
