import React from 'react';

type HeroMediaLayerFramesProps = {
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  sequenceCanvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function HeroMediaLayerFrames({
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  sequenceCanvasRef,
}: HeroMediaLayerFramesProps) {
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
        <canvas ref={sequenceCanvasRef} className="hero-canvas hero-sequence-canvas" />
      </div>
    </>
  );
}
