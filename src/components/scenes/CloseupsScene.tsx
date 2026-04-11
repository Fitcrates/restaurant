'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

interface CloseupItem {
  imageUrl: string;
  caption?: string;
}

interface CloseupsSceneProps {
  lang: string;
  items?: CloseupItem[];
}

export default function CloseupsScene({ lang, items }: CloseupsSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  const defaultItems: CloseupItem[] = [
    { imageUrl: '/thegrill2.png', caption: d('closeups.item1', lang) },
    { imageUrl: '/detail2.png', caption: d('closeups.item2', lang) },
    { imageUrl: '/detail.png', caption: d('closeups.item3', lang) },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const images = scene.querySelectorAll('.scene-closeups__image');
    images.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    const captions = scene.querySelectorAll('.scene-closeups__caption');
    captions.forEach((cap) => {
      gsap.fromTo(cap,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: cap, start: 'top 92%' },
        }
      );
    });
  }, []);

  return (
    <section ref={sceneRef} className="scene-closeups" id="closeups">
      <div className="scene-closeups__grid">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className={`scene-closeups__item ${i === 0 ? 'scene-closeups__item--tall' : 'scene-closeups__item--wide'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="scene-closeups__image"
              src={item.imageUrl}
              alt={item.caption || ''}
              loading="lazy"
            />
            {item.caption && (
              <div className="scene-closeups__caption" style={{ padding: '3rem 2rem 2rem 2rem', background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 60%, transparent 100%)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--accent-warm)' }}>{d('closeups.focusLabel', lang)} {String(i + 1).padStart(2, '0')}</span>
                  <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1 }}>
                    {item.caption}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
