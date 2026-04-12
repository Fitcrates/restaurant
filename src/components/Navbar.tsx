'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { d } from '@/lib/utils/i18n';

interface NavbarProps {
  lang?: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = lang || (pathname.startsWith('/pl') ? 'pl' : pathname.startsWith('/ko') ? 'ko' : 'en');
  const availableLangs = ['en', 'pl', 'ko'];

  const navItems = [
    { href: '#hero', label: d('nav.fire', currentLang) },
    { href: '#process', label: d('nav.craft', currentLang) },
    { href: '#dishes', label: d('nav.signature', currentLang) },
    { href: '#atmosphere', label: d('nav.atmosphere', currentLang) },
    { href: '#menu', label: d('nav.menu', currentLang) },
    { href: '#cta', label: d('nav.reserve', currentLang) },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  /** Handle nav link clicks — #hero scrolls to very top of page */
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#hero') {
      e.preventDefault();
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__left">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navbar__link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href={`/${currentLang}`}
          className="navbar__brand"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {'HWA / \u706B'}
        </Link>

        <div className="navbar__right">
          <div className="navbar__lang" style={{ display: 'flex', gap: '0.75rem' }}>
            {availableLangs.map(l => (
              <Link
                key={l}
                href={pathname.replace(`/${currentLang}`, `/${l}`)}
                style={{
                  color: currentLang === l ? 'var(--text-primary)' : 'var(--text-secondary)',
                  pointerEvents: currentLang === l ? 'none' : 'auto'
                }}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className={`navbar__burger ${mobileOpen ? 'is-open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'is-open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        id="mobile-nav-panel"
        className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav__header">
          <span className="mobile-nav__brand">{'HWA / \u706B'}</span>
          <div className="mobile-nav__header-actions">
            <div className="mobile-nav__lang" style={{ display: 'flex', gap: '0.75rem' }}>
              {availableLangs.map(l => (
                <Link
                  key={l}
                  href={pathname.replace(`/${currentLang}`, `/${l}`)}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: currentLang === l ? 'var(--text-primary)' : 'var(--text-secondary)',
                    pointerEvents: currentLang === l ? 'none' : 'auto'
                  }}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <button
              type="button"
              className="mobile-nav__close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="mobile-nav__links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav__link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

