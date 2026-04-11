'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeUpTarget from '../motion/FadeUpTarget';

gsap.registerPlugin(ScrollTrigger);

export default function AtmosphereSection({ subtitle, imageUrl = '/atmosphere.png' }: { subtitle?: string, imageUrl?: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;
    
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{ height: '70svh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-base)' }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={imageRef} src={imageUrl} alt="Atmosphere" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div ref={imageRef as any} style={{ width: '100%', height: '100%', backgroundColor: '#0f0f0f' }} />
        )}
      </div>
      
      <div className="section-padding" style={{ textAlign: 'center' }}>
         <FadeUpTarget delay={0.1}>
           <p className="text-body" style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)' }}>
             {subtitle || 'Przestrzeń zaprojektowana tak, aby nic nie odwracało uwagi od tego, co znajduje się na Twoim talerzu.'}
           </p>
         </FadeUpTarget>
      </div>
    </section>
  );
}
