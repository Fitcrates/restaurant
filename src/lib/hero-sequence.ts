export const HERO_SEQUENCE_FRAME_COUNT = 48;

const padFrame = (frame: number) => String(frame).padStart(4, '0');

export const HERO_SEQUENCE_SOURCES = Array.from(
  { length: HERO_SEQUENCE_FRAME_COUNT },
  (_, index) => `/hero-sequence/frame_${padFrame(index + 1)}.webp`
);

export const getHeroSequenceSource = (index: number) =>
  HERO_SEQUENCE_SOURCES[Math.max(0, Math.min(index, HERO_SEQUENCE_SOURCES.length - 1))];
