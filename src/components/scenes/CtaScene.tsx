'use client';

import { useLayoutEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { d } from '@/lib/utils/i18n';

gsap.registerPlugin(ScrollTrigger);

/* ── Validation helpers ── */
function sanitize(v: string): string {
  return v.replace(/<[^>]*>/g, '').replace(/[<>"'`;(){}\[\]]/g, '').trim();
}
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}
function isValidPhone(v: string) {
  return /^\+?\d[\d\s\-().]{6,18}$/.test(v.trim());
}
function isFutureDate(v: string) {
  const dt = new Date(v);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(dt.getTime()) && dt >= today;
}

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00',
];

interface CtaSceneProps {
  lang: string;
  heading?: string;
  locationLabel?: string;
  locationValue?: string;
  hoursLabel?: string;
  hoursValue?: string;
}

export default function CtaScene({
  lang,
  heading,
  locationLabel,
  locationValue,
  hoursLabel,
  hoursValue,
}: CtaSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const loadTimeRef = useRef(0);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '', specialRequests: '', website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* ── GSAP entrance animation ── */
  useLayoutEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(scene.querySelectorAll('.scene-cta__reveal'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const els = scene.querySelectorAll<HTMLElement>('.scene-cta__reveal');
      els.forEach((el, i) => {
        const isForm = el.classList.contains('scene-cta__reveal--form');

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: isForm ? 0.9 : 1,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  /* ── Client-side validation ── */
  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!sanitize(form.name) || sanitize(form.name).length < 2) e.name = d('cta.err.name', lang);
    if (!isValidEmail(form.email)) e.email = d('cta.err.email', lang);
    if (!isValidPhone(form.phone)) e.phone = d('cta.err.phone', lang);
    if (!form.date || !isFutureDate(form.date)) e.date = d('cta.err.date', lang);
    if (!form.time) e.time = d('cta.err.time', lang);
    if (!form.guests) e.guests = d('cta.err.guests', lang);
    return e;
  }

  /* ── Submit handler ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitize(form.name),
          email: sanitize(form.email),
          phone: sanitize(form.phone),
          date: form.date,
          time: form.time,
          guests: Number(form.guests),
          specialRequests: sanitize(form.specialRequests),
          website: form.website, // honeypot
          _t: loadTimeRef.current, // timestamp check
        }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrors({ _form: d('cta.form.errorRateLimit', lang) });
        return;
      }

      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus('idle');
      } else {
        setStatus('error');
        setErrors({ _form: d('cta.form.errorGeneric', lang) });
      }
    } catch {
      setStatus('error');
      setErrors({ _form: d('cta.form.errorGeneric', lang) });
    }
  }

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  }

  /* ── Today's date string for input min ── */
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section ref={sceneRef} className="scene-cta" id="cta">
      <h2 className="scene-cta__heading scene-cta__reveal">
        {heading || d('cta.heading', lang)}
      </h2>

      {/* ── Reservation Form ── */}
      {status === 'success' ? (
        <div className="reservation-form reservation-form__success">
          <div className="reservation-form__success-icon">✓</div>
          <h3 className="reservation-form__success-heading">
            {d('cta.form.successHeading', lang)}
          </h3>
          <p className="reservation-form__success-text">
            {d('cta.form.successText', lang)}
          </p>
        </div>
      ) : (
        <form
          className="reservation-form scene-cta__reveal scene-cta__reveal--form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          {/* Honeypot — invisible to humans */}
          <div aria-hidden="true" className="reservation-form__honeypot">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>

          <div className="reservation-form__grid">
            {/* Name */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-name">
                {d('cta.form.name', lang)}
              </label>
              <input
                className={`reservation-form__input ${errors.name ? 'reservation-form__input--error' : ''}`}
                type="text"
                id="res-name"
                maxLength={100}
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="reservation-form__error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-email">
                {d('cta.form.email', lang)}
              </label>
              <input
                className={`reservation-form__input ${errors.email ? 'reservation-form__input--error' : ''}`}
                type="email"
                id="res-email"
                maxLength={254}
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <span className="reservation-form__error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-phone">
                {d('cta.form.phone', lang)}
              </label>
              <input
                className={`reservation-form__input ${errors.phone ? 'reservation-form__input--error' : ''}`}
                type="tel"
                id="res-phone"
                maxLength={25}
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <span className="reservation-form__error">{errors.phone}</span>}
            </div>

            {/* Date */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-date">
                {d('cta.form.date', lang)}
              </label>
              <input
                className={`reservation-form__input ${errors.date ? 'reservation-form__input--error' : ''}`}
                type="date"
                id="res-date"
                min={todayStr}
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              {errors.date && <span className="reservation-form__error">{errors.date}</span>}
            </div>

            {/* Time */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-time">
                {d('cta.form.time', lang)}
              </label>
              <select
                className={`reservation-form__select ${errors.time ? 'reservation-form__input--error' : ''}`}
                id="res-time"
                value={form.time}
                onChange={(e) => handleChange('time', e.target.value)}
              >
                <option value="">{d('cta.form.timePlaceholder', lang)}</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <span className="reservation-form__error">{errors.time}</span>}
            </div>

            {/* Guests */}
            <div className="reservation-form__field">
              <label className="reservation-form__label" htmlFor="res-guests">
                {d('cta.form.guests', lang)}
              </label>
              <select
                className={`reservation-form__select ${errors.guests ? 'reservation-form__input--error' : ''}`}
                id="res-guests"
                value={form.guests}
                onChange={(e) => handleChange('guests', e.target.value)}
              >
                <option value="">{d('cta.form.guestsPlaceholder', lang)}</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? d('cta.guest', lang) : d('cta.guests', lang)}
                  </option>
                ))}
              </select>
              {errors.guests && <span className="reservation-form__error">{errors.guests}</span>}
            </div>

            {/* Special Requests */}
            <div className="reservation-form__field reservation-form__field--full">
              <label className="reservation-form__label" htmlFor="res-special">
                {d('cta.form.special', lang)}
              </label>
              <textarea
                className="reservation-form__textarea"
                id="res-special"
                maxLength={1000}
                rows={3}
                placeholder={d('cta.form.specialPlaceholder', lang)}
                value={form.specialRequests}
                onChange={(e) => handleChange('specialRequests', e.target.value)}
              />
            </div>
          </div>

          {/* Global error */}
          {errors._form && (
            <p className="reservation-form__error reservation-form__error--global">
              {errors._form}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="cta-button reservation-form__submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? d('cta.form.sending', lang) : d('cta.form.submit', lang)}
          </button>
        </form>
      )}

      {/* ── Location & Hours info ── */}
      <div className="scene-cta__info scene-cta__reveal">
        <div className="scene-cta__info-block">
          <span className="text-meta" style={{ color: 'var(--text-secondary)' }}>
            {locationLabel || d('cta.location.label', lang)}
          </span>
          <span className="text-body" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
            {locationValue || d('cta.location.value', lang)}
          </span>
        </div>
        <div className="scene-cta__info-block">
          <span className="text-meta" style={{ color: 'var(--text-secondary)' }}>
            {hoursLabel || d('cta.hours.label', lang)}
          </span>
          <span className="text-body" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
            {hoursValue || d('cta.hours.value', lang)}
          </span>
        </div>
      </div>
    </section>
  );
}
