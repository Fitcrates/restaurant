'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
  heading,
  tagline,
  imageUrl = '/hero-bg.png',
}: {
  heading: string;
  tagline: string;
  imageUrl?: string;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Load-in animation
    gsap.fromTo(
      hero.querySelector('.hero-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      hero.querySelector('.hero-bg'),
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power1.inOut' }
    );

    // Parallax & Fade-out on scroll
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      // Only do parallax on desktop
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      gsap.to(hero.querySelector('.cinematic-overlay'), {
        background: 'radial-gradient(circle, transparent 0%, var(--bg-base) 100%)',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-bg" style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Atmospheric Grill"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="cinematic-overlay" />
      <div className="hero-content" style={{ opacity: 0 }}>
        <h1 className="text-display" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          {heading || 'Mistrzostwo Ognia.'}
        </h1>
        <p className="text-meta" style={{ marginTop: '1.5rem', color: 'var(--text-primary)', letterSpacing: '0.2em' }}>
          {tagline || 'HWA / 火'}
        </p>
      </div>
    </section>
  );
}
