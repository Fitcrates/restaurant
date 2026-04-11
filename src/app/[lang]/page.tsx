import { client } from '@/sanity/lib/client';
import { landingPageQuery } from '@/sanity/lib/queries';
import { t } from '@/lib/utils/i18n';
import type { Metadata, ResolvingMetadata } from 'next';

// Scenes — hardcoded order per PROJECT_SPEC
import HeroScene from '@/components/scenes/HeroScene';
import TypographyScene from '@/components/scenes/TypographyScene';
import SplitScene from '@/components/scenes/SplitScene';
import ProcessScene from '@/components/scenes/ProcessScene';
import ChaosScene from '@/components/scenes/ChaosScene';
import DishesScene from '@/components/scenes/DishesScene';
import CloseupsScene from '@/components/scenes/CloseupsScene';
import AtmosphereScene from '@/components/scenes/AtmosphereScene';
import GridBreakerScene from '@/components/scenes/GridBreakerScene';
import MenuScene from '@/components/scenes/MenuScene';
import FinalScene from '@/components/scenes/FinalScene';
import CtaScene from '@/components/scenes/CtaScene';
import CookieConsent from '@/components/CookieConsent';

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const isPl = lang === 'pl';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: isPl ? 'HWA / \u706B — Premium Koreańskie BBQ' : 'HWA / \u706B — Premium Korean BBQ',
    description: isPl
      ? 'Mistrzostwo ognia. Premium doświadczenie w stolicy. Ogień, precyzja i sztuka koreańskiego BBQ.'
      : 'Mastery of the Flame. Premium Korean dining experience in Warsaw. Fire, precision, and the art of Korean BBQ.',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'pl': '/pl',
      },
    },
    openGraph: {
      title: isPl ? 'HWA / \u706B — Premium Koreańskie BBQ' : 'HWA / \u706B — Premium Korean BBQ',
      description: isPl ? 'Przeżyj kulinarne mistrzostwo.' : 'Mastery of the Flame. Premium Korean dining experience.',
      type: 'website',
      images: [
        {
          url: '/kobe_striploin.png',
          width: 1200,
          height: 630,
          alt: isPl ? 'Koreańskie BBQ z najwyższej półki' : 'Premium Korean BBQ',
        }
      ]
    }
  };
}

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Attempt to fetch Sanity data — gracefully fall back to defaults
  const data = await client.fetch(landingPageQuery).catch(() => null);

  // ── Map Sanity data to localized props ──────────────────────────
  // Hero
  const heroHeading = data?.hero ? t(data.hero.heading, lang) : undefined;
  const heroTagline = data?.hero ? t(data.hero.tagline, lang) : undefined;
  const heroSubtitle = data?.hero ? t(data.hero.subtitle, lang) : undefined;

  // Typography Impact
  const typoLine1 = data?.brandStatement ? t(data.brandStatement.line1, lang) : undefined;
  const typoLine2 = data?.brandStatement ? t(data.brandStatement.line2, lang) : undefined;
  const typoLine3 = data?.brandStatement ? t(data.brandStatement.line3, lang) : undefined;
  const typoBody = data?.brandStatement ? t(data.brandStatement.body, lang) : undefined;

  // Split scene (philosophy)
  const splitLabel = data?.philosophy ? t(data.philosophy.label, lang) : undefined;
  const splitHeading = data?.philosophy ? t(data.philosophy.heading, lang) : undefined;
  const splitBody = data?.philosophy ? t(data.philosophy.body, lang) : undefined;
  const splitImage = data?.philosophy?.imageUrl;

  // Process
  const processSteps = data?.process?.length
    ? data.process.map((p: any) => ({
      title: t(p.title, lang),
      description: t(p.description, lang),
      imageUrl: p.imageUrl,
    }))
    : undefined;

  // Chaos
  const chaosBig1 = data?.chaos ? t(data.chaos.bigText1, lang) : undefined;
  const chaosBig2 = data?.chaos ? t(data.chaos.bigText2, lang) : undefined;
  const chaosSmall = data?.chaos ? t(data.chaos.smallText, lang) : undefined;
  const chaosImage = data?.chaos?.imageUrl;

  // Dishes
  const dishesHeading = data?.dishes ? t(data.dishes.heading, lang) : undefined;
  const dishItems = data?.signatureDishes?.length
    ? data.signatureDishes.map((dd: any) => ({
      name: t(dd.name, lang),
      description: t(dd.description, lang),
      price: dd.price,
      imageUrl: dd.imageUrl,
    }))
    : undefined;

  // Atmosphere
  const atmosHeading = data?.atmosphere ? t(data.atmosphere.heading, lang) : undefined;
  const atmosSubtitle = data?.atmosphere ? t(data.atmosphere.subtitle, lang) : undefined;
  const atmosImage = data?.atmosphere?.imageUrl;

  // Menu
  const menuHeading = data?.menuPreview ? t(data.menuPreview.heading, lang) : undefined;
  const menuLabel = data?.menuPreview ? t(data.menuPreview.label, lang) : undefined;
  const menuItems = data?.menuPreview?.items?.length
    ? data.menuPreview.items.map((m: any) => ({
      name: t(m.name, lang),
      description: t(m.description, lang),
      price: m.price,
    }))
    : undefined;

  // Final statement
  const finalHeading = data?.finalStatement ? t(data.finalStatement.heading, lang) : undefined;
  const finalSubtitle = data?.finalStatement ? t(data.finalStatement.subtitle, lang) : undefined;

  // CTA
  const ctaHeading = data?.cta ? t(data.cta.heading, lang) : undefined;
  const ctaLocationLabel = data?.cta ? t(data.cta.locationLabel, lang) : undefined;
  const ctaLocationValue = data?.cta ? t(data.cta.locationValue, lang) : undefined;
  const ctaHoursLabel = data?.cta ? t(data.cta.hoursLabel, lang) : undefined;
  const ctaHoursValue = data?.cta ? t(data.cta.hoursValue, lang) : undefined;

  return (
    <main>
      {/* SCENE 1 — Fire Intro */}
      <HeroScene
        lang={lang}
        heading={heroHeading}
        tagline={heroTagline}
        subtitle={heroSubtitle}
      />

      {/* SCENE 2 — Typography Impact */}
      <TypographyScene
        lang={lang}
        line1={typoLine1}
        line2={typoLine2}
        line3={typoLine3}
        body={typoBody}
      />

      {/* SCENE 3 — Split Visual + Text */}
      <SplitScene
        lang={lang}
        label={splitLabel}
        heading={splitHeading}
        body={splitBody}
        imageUrl={splitImage}
      />

      {/* SCENE 4 — Process Story (Sticky Scroll) */}
      <ProcessScene lang={lang} steps={processSteps} />

      {/* SCENE 5 — Chaotic Typography + Image */}
      <ChaosScene
        lang={lang}
        bigText1={chaosBig1}
        bigText2={chaosBig2}
        smallText={chaosSmall}
        imageUrl={chaosImage}
      />

      {/* SCENE 6 — Signature Dishes (Horizontal Scroll) */}
      <DishesScene lang={lang} heading={dishesHeading} dishes={dishItems} />

      {/* SCENE 7 — Close-up Moments */}
      <CloseupsScene lang={lang} />

      {/* SCENE 8 — Atmosphere (Full Bleed) */}
      <AtmosphereScene
        lang={lang}
        heading={atmosHeading}
        subtitle={atmosSubtitle}
        imageUrl={atmosImage}
      />

      {/* SCENE 9 — Grid Breaker */}
      <GridBreakerScene lang={lang} />

      {/* SCENE 10 — Menu Preview */}
      <MenuScene
        lang={lang}
        heading={menuHeading}
        label={menuLabel}
        items={menuItems}
      />

      {/* SCENE 11 — Final Statement */}
      <FinalScene lang={lang} heading={finalHeading} subtitle={finalSubtitle} />

      {/* SCENE 12 — CTA / Reservation */}
      <CtaScene
        lang={lang}
        heading={ctaHeading}
        locationLabel={ctaLocationLabel}
        locationValue={ctaLocationValue}
        hoursLabel={ctaHoursLabel}
        hoursValue={ctaHoursValue}
      />

      {/* EU Cookie banner */}
      <CookieConsent lang={lang} />

      {/* Footer */}
      <footer
        className="site-footer"
        style={{
          padding: '2rem var(--space-x)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
        aria-label="Site Footer"
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="site-footer__brand" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>{'HWA / \u706B'}</span>
          <span className="site-footer__copy" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{'\u00A9'} {new Date().getFullYear()}</span>
          <a href={`/${lang}/privacy-policy`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
            {lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}
          </a>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {lang === 'pl' ? 'Stworzone przez ' : 'Created by '}
          <a
            href="https://appcrates.pl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit AppCrates.pl (opens in a new tab)"
            style={{ color: 'var(--accent-warm)', textDecoration: 'none', fontWeight: 500 }}
          >
            appcrates.pl
          </a>
        </div>
      </footer>
    </main>
  );
}

