export type HeroPhase = 'intro' | 'crossfade' | 'flip' | 'hold' | 'exit';
export const HERO_SCRUB_FPS = 30;

type PhaseRange = {
  start: number;
  end: number;
};

export const HERO_PHASES: Record<HeroPhase, PhaseRange> = {
  intro: { start: 0.0, end: 0.1 },
  crossfade: { start: 0.1, end: 0.18 },
  flip: { start: 0.18, end: 0.82 },
  hold: { start: 0.82, end: 0.92 },
  exit: { start: 0.92, end: 1.0 },
};

export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  if (inMax === inMin) return outMin;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const phaseProgress = (progress: number, phase: HeroPhase) => {
  const { start, end } = HERO_PHASES[phase];
  return clamp01((progress - start) / (end - start));
};

export const getPhase = (progress: number): HeroPhase => {
  if (progress < HERO_PHASES.intro.end) return 'intro';
  if (progress < HERO_PHASES.crossfade.end) return 'crossfade';
  if (progress < HERO_PHASES.flip.end) return 'flip';
  if (progress < HERO_PHASES.hold.end) return 'hold';
  return 'exit';
};

export const getFlipTargetTime = (localProgress: number, duration: number) => {
  const p = clamp01(localProgress);
  const safeEnd = Math.max(duration - 0.001, 0);
  const eased = p < 0.5
    ? 4 * p * p * p
    : 1 - Math.pow(-2 * p + 2, 3) / 2;

  if (eased <= 0.18) {
    return mapRange(eased, 0, 0.18, 0, safeEnd * 0.16);
  }

  if (eased <= 0.82) {
    return mapRange(eased, 0.18, 0.82, safeEnd * 0.16, safeEnd * 0.84);
  }

  return mapRange(eased, 0.82, 1, safeEnd * 0.84, safeEnd);
};

export const quantizeTimeToFrame = (time: number, fps: number, safeEnd: number) => {
  if (fps <= 0) return Math.max(0, Math.min(time, safeEnd));
  const frameDuration = 1 / fps;
  const frameIndex = Math.round(time / frameDuration);
  return Math.max(0, Math.min(frameIndex * frameDuration, safeEnd));
};
