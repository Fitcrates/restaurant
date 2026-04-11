'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

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
    { name: d('dishes.kobe.name', lang), description: d('dishes.kobe.desc', lang), price: '320 PLN', imageUrl: '/kobe_striploin.png' },
    { name: d('dishes.gejang.name', lang), description: d('dishes.gejang.desc', lang), price: '180 PLN', imageUrl: '/ganjang_gejang.png' },
    { name: d('dishes.samgyeopsal.name', lang), description: d('dishes.samgyeopsal.desc', lang), price: '110 PLN', imageUrl: '/samgyeopsal.png' },
    { name: d('dishes.bulgogi.name', lang), description: d('dishes.bulgogi.desc', lang), price: '160 PLN', imageUrl: '/wagyubulgogi.png' },
    { name: d('dishes.galbi.name', lang), description: d('dishes.galbi.desc', lang), price: '140 PLN', imageUrl: '/galbi.png' },
    { name: d('dishes.japchae.name', lang), description: d('dishes.japchae.desc', lang), price: '65 PLN', imageUrl: '/japchae.png' },
    { name: d('dishes.doenjang.name', lang), description: d('dishes.doenjang.desc', lang), price: '55 PLN', imageUrl: '/doenjang.png' },
  ];

  const displayDishes = dishes && dishes.length > 0 ? dishes : defaultDishes;

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!wrapper || !scene || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Calculate scrollWidth dynamically in functions to avoid stale closures
        const getScrollWidth = () => track.scrollWidth - window.innerWidth + 100;

        gsap.to(track, {
          x: () => -getScrollWidth(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${getScrollWidth()}`,
            scrub: 1,
            pin: scene,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [displayDishes.length]);

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
                    src={dish.imageUrl || '/dish.png'}
                    alt={dish.name}
                    loading="lazy"
                  />
                </div>
                <div className="scene-dishes__card-info">
                  <h3 className="scene-dishes__card-name">{dish.name}</h3>
                  <p className="scene-dishes__card-desc">{dish.description}</p>
                  {dish.price && (
                    <span className="scene-dishes__card-price">{dish.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
