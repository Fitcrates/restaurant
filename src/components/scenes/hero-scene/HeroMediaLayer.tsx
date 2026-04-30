import React from 'react';

type HeroMediaLayerProps = {
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  scrubVideoRef: React.RefObject<HTMLVideoElement | null>;
};

export default function HeroMediaLayer({
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  scrubVideoRef,
}: HeroMediaLayerProps) {
  // Position offset (in pixels) to shift the video
  const scrubOffsetX = 0;
  const scrubOffsetY = 0;

  // Perspective tilt (in degrees) to match camera angle
  const scrubPerspective = 1000;
  const scrubTiltX = 0; // Rotate forward/backward (try 1 or -1)
  const scrubTiltY = 0; // Rotate left/right

  // Origin point for the tilt. 'top center' pins the top edge so it doesn't lower/create gaps!
  const scrubTransformOrigin = 'center center';

  // Scale multiplier to hide any bottom/side gaps caused by heavy tilting
  const scrubScale = 1;

  return (
    <>
      <div ref={loopStackRef} className="hero-loop-stack">
        <video
          ref={loopVideoARef}
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-canvas hero-canvas--loop-a"
        >
          <source src="/noChpsticks.webm" type="video/webm" />
        </video>
        <video
          ref={loopVideoBRef}
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-canvas hero-canvas--loop-b"
        >
          <source src="/noChpsticks.webm" type="video/webm" />
        </video>
      </div>
      {/* Wrapper protects our offset/tilt from being overwritten by GSAP's native scale updates */}
      <div
        className="hero-scrub-wrapper"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          transform: `perspective(${scrubPerspective}px) translate(${scrubOffsetX}px, ${scrubOffsetY}px) scale(${scrubScale}) rotateX(${scrubTiltX}deg) rotateY(${scrubTiltY}deg)`,
          transformOrigin: scrubTransformOrigin,
          willChange: 'transform'
        }}
      >
        <video
          ref={scrubVideoRef}
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          className="hero-canvas hero-canvas--scrub"
          onLoadedData={(event) => {
            (event.target as HTMLVideoElement).currentTime = 0.001;
          }}
        >
          <source src="/meatFlipNew.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}
