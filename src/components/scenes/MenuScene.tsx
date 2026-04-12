'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

interface MenuSceneProps {
  lang: string;
  heading?: string;
  label?: string;
  items?: MenuItem[];
}

export default function MenuScene({ lang, heading, label, items }: MenuSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  const defaultItems: MenuItem[] = [
    { name: d('dishes.kobe.name', lang), description: d('menu.kobe.desc', lang), price: '320 PLN', imageUrl: '/webp/kobe_striploin.webp' },
    { name: d('dishes.samgyeopsal.name', lang), description: d('menu.samgyeopsal.desc', lang), price: '110 PLN', imageUrl: '/webp/samgyeopsal.webp' },
    { name: d('dishes.bulgogi.name', lang), description: d('menu.bulgogi.desc', lang), price: '160 PLN', imageUrl: '/webp/wagyubulgogi.webp' },
    { name: d('dishes.gejang.name', lang), description: d('menu.gejang.desc', lang), price: '180 PLN', imageUrl: '/webp/ganjang_gejang.webp' },
    { name: d('dishes.galbi.name', lang), description: d('menu.galbi.desc', lang), price: '140 PLN', imageUrl: '/webp/galbi.webp' },
    { name: d('dishes.japchae.name', lang), description: d('menu.japchae.desc', lang), price: '65 PLN', imageUrl: '/webp/japchae.webp' },
    { name: d('dishes.doenjang.name', lang), description: d('menu.doenjang.desc', lang), price: '55 PLN', imageUrl: '/webp/doenjang.webp' },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Header
    const header = scene.querySelector('.scene-menu__header');
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Stagger items
    const menuItems = scene.querySelectorAll('.scene-menu__item');
    menuItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sceneRef} className="scene-menu" id="menu">
      <div className="container-narrow">
        <div className="scene-menu__header">
          <div className="text-meta" style={{ color: 'var(--accent-ember)', marginBottom: '1.5rem' }}>
            {label || d('menu.label', lang)}
          </div>
          <h2 className="text-heading">
            {heading || d('menu.heading', lang)}
          </h2>
        </div>

        <ul className="scene-menu__list">
          {displayItems.map((item, i) => (
            <li key={i} className="scene-menu__item">
              <div>
                <div className="scene-menu__item-name">{item.name}</div>
                {item.description && (
                  <div className="scene-menu__item-desc">{item.description}</div>
                )}
              </div>
              <div className="scene-menu__item-meta">
                <div className="scene-menu__item-media" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || '/webp/dish.webp'}
                    alt=""
                    className="scene-menu__item-media-image"
                    loading="lazy"
                  />
                </div>
                <div className="scene-menu__item-price">{item.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
