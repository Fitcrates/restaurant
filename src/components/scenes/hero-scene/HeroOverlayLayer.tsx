import React from 'react';

type HeroOverlayLayerProps = {
  gradientRef: React.RefObject<HTMLDivElement | null>;
  exitRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  smokeRef: React.RefObject<HTMLDivElement | null>;
};

export default function HeroOverlayLayer({
  gradientRef,
  exitRef,
  vignetteRef,
  smokeRef,
}: HeroOverlayLayerProps) {
  return (
    <>
      <div ref={gradientRef} className="hero-gradient-overlay" />
      <div ref={smokeRef} className="hero-smoke-overlay" />
      <div ref={vignetteRef} className="hero-vignette" />
      <div ref={exitRef} className="hero-exit-overlay" />
    </>
  );
}

