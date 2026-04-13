import React from 'react';

import { d } from '@/lib/utils/i18n';

type HeroTextLayerProps = {
  lang: string;
  tagline?: string;
  subtitle?: string;
};

const HeroTextLayer = React.forwardRef<HTMLDivElement, HeroTextLayerProps>(
  ({ lang, tagline, subtitle }, ref) => {
    return (
      <div ref={ref} className="hero-text-inner">
        <div className="hero-brand-line">
          <span className="hero-brand-tag">{tagline || d('hero.tagline', lang)}</span>
          <span className="hero-brand-sub">{d('hero.brandSub', lang)}</span>
        </div>

        <div className="hero-title-block">
          <div className="hero-title-row">
            <span className="hero-title-word hero-title-word--xl">{d('hero.word1', lang)}</span>
            <span className="hero-title-word hero-title-word--xl hero-title-word--offset">
              {d('hero.word2', lang)}
            </span>
          </div>
          <div className="hero-title-row hero-title-row--accent">
            <span className="hero-title-word hero-title-word--xxl">{d('hero.word3', lang)}</span>
            <span className="hero-title-word hero-title-word--xl hero-title-word--italic hero-title-word--accent">
              {d('hero.word4', lang)}
            </span>
          </div>
        </div>

        <div className="hero-subtitle-line">
          <p className="hero-subtitle-text">{subtitle || d('hero.subtitle', lang)}</p>
          <div className="hero-scroll-cue">
            <span className="hero-scroll-label">{d('hero.scrollCue', lang)}</span>
            <span className="hero-scroll-arrow">→</span>
          </div>
        </div>
      </div>
    );
  }
);

HeroTextLayer.displayName = 'HeroTextLayer';

export default HeroTextLayer;
