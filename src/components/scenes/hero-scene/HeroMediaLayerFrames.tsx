import React from 'react';
import Image from 'next/image';

type HeroMediaLayerFramesProps = {
  loopVideoARef: React.RefObject<HTMLVideoElement | null>;
  loopVideoBRef: React.RefObject<HTMLVideoElement | null>;
  loopStackRef: React.RefObject<HTMLDivElement | null>;
  sequenceCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  shouldLoadMotionMedia: boolean;
  idleMediaReady: boolean;
  onIdleMediaReady: () => void;
};

export default function HeroMediaLayerFrames({
  loopVideoARef,
  loopVideoBRef,
  loopStackRef,
  sequenceCanvasRef,
  shouldLoadMotionMedia,
  idleMediaReady,
  onIdleMediaReady,
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
      <div className={`hero-poster-layer${idleMediaReady ? ' is-hidden' : ''}`} aria-hidden="true">
        <Image
          src="/Frame0.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="hero-poster-frame"
        />
      </div>

      <div ref={loopStackRef} className="hero-loop-stack">
        {shouldLoadMotionMedia ? (
          <>
            <video
              ref={loopVideoARef}
              poster="/Frame0.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              onLoadedMetadata={(event) => applyVideoFlags(event.currentTarget)}
              onCanPlay={(event) => {
                applyVideoFlags(event.currentTarget);
                onIdleMediaReady();
              }}
              className="hero-canvas hero-canvas--loop-a"
            >
              <source src="/noChpsticks.webm" type="video/webm" />
              <source src="/Nochopsticks.mp4" type="video/mp4" />
            </video>

            <video
              ref={loopVideoBRef}
              poster="/Frame0.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              onLoadedMetadata={(event) => applyVideoFlags(event.currentTarget)}
              className="hero-canvas hero-canvas--loop-b"
            >
              <source src="/noChpsticks.webm" type="video/webm" />
              <source src="/Nochopsticks.mp4" type="video/mp4" />
            </video>
          </>
        ) : null}
      </div>

      <div className="hero-scrub-wrapper hero-sequence-layer">
        <canvas ref={sequenceCanvasRef} className="hero-canvas hero-sequence-canvas" />
      </div>
    </>
  );
}
