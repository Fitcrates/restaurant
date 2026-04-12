import React from 'react';

type HeroMediaLayerSequenceProps = {
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  featureVideoRef: React.RefObject<HTMLVideoElement | null>;
  featureCanvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function HeroMediaLayerSequence({
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  featureVideoRef,
  featureCanvasRef,
}: HeroMediaLayerSequenceProps) {
  const applyVideoFlags = (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
  };

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
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onLoadedMetadata={(event) => applyVideoFlags(event.currentTarget)}
          className="hero-canvas hero-canvas--loop-a"
        >
          <source src="/noChpsticks.webm" type="video/webm" />
          <source src="/Nochopsticks.mp4" type="video/mp4" />
        </video>

        <video
          ref={loopVideoBRef}
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onLoadedMetadata={(event) => applyVideoFlags(event.currentTarget)}
          className="hero-canvas hero-canvas--loop-b"
        >
          <source src="/noChpsticks.webm" type="video/webm" />
          <source src="/Nochopsticks.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-scrub-wrapper hero-sequence-layer">
        <canvas ref={featureCanvasRef} className="hero-canvas hero-sequence-canvas" />
        <video
          ref={featureVideoRef}
          poster="/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="hero-sequence-source"
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            applyVideoFlags(video);
            video.currentTime = 0.001;
          }}
          onCanPlay={(event) => applyVideoFlags(event.currentTarget)}
        >
          <source src="/meatflip (1).mp4" type="video/mp4" />
          <source src="/meatFlipNew.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}
