'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent({ lang }: { lang: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('hwa-cookie-consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hwa-cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('hwa-cookie-consent', 'declined');
    setIsVisible(false);
  };

  const isPl = lang === 'pl';

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg-elevated, #1a1a1a)',
        color: 'var(--text-primary, #f5f0e8)',
        padding: '1rem 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 9999,
        borderTop: '1px solid var(--border-medium, #333)',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ flex: '1 1 300px', fontSize: '0.9rem', lineHeight: 1.5 }}>
        {isPl
          ? 'Wykorzystujemy pliki cookie, aby zapewnić najlepsze doświadczenia na naszej stronie internetowej oraz aby pomóc w analizie ruchu zgodnie z prawodawstwem UE.'
          : 'We use cookies to ensure you get the best experience on our website and to help analyzing traffic in accordance with EU legislation.'}
        {' '}
        <a href={`/${lang}/privacy-policy`} style={{ color: 'var(--accent-warm, #ff6b35)', textDecoration: 'underline' }}>
          {isPl ? 'Przeczytaj naszą Politykę Prywatności' : 'Read our Privacy Policy'}
        </a>.
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          aria-label={isPl ? 'Odrzuć pliki cookie' : 'Decline cookies'}
          style={{
            fontFamily: 'inherit',
            minWidth: '120px',
            textAlign: 'center',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary, #a8a29e)',
            border: '1px solid var(--border-subtle, #555)',
            padding: '0.75rem 1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          {isPl ? 'Odrzuć' : 'Decline'}
        </button>
        <button
          onClick={handleAccept}
          aria-label={isPl ? 'Akceptuj pliki cookie' : 'Accept cookies'}
          style={{
            fontFamily: 'inherit',
            minWidth: '120px',
            textAlign: 'center',
            backgroundColor: 'var(--text-primary, #f5f0e8)',
            color: 'var(--bg-base, #0a0a0a)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          {isPl ? 'Akceptuj' : 'Accept'}
        </button>
      </div>
    </div>
  );
}
