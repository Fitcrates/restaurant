import { NextResponse } from 'next/server';

/* ── Simple in-memory rate limiting (demo) ── */
const rateLimit = new Map<string, number[]>();
const RATE_WINDOW = 60_000; // 1 minute
const RATE_MAX = 5;         // max 5 per minute

function checkRate(ip: string): boolean {
  const now = Date.now();
  const stamps = (rateLimit.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (stamps.length >= RATE_MAX) return false;
  stamps.push(now);
  rateLimit.set(ip, stamps);
  return true;
}

/* ── Sanitisation helpers ── */
function sanitize(input: string, maxLen = 500): string {
  return input
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/[<>"'`;(){}\[\]]/g, '') // strip dangerous chars
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  return /^\d{7,15}$/.test(cleaned);
}

/* ── POST handler ── */
export async function POST(request: Request) {
  try {
    /* Rate limit */
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRate(ip)) {
      return NextResponse.json(
        { error: 'rate_limit', message: 'Too many requests' },
        { status: 429 },
      );
    }

    const body = await request.json();

    /* Honeypot — bots fill hidden "website" field → fake success */
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    /* Timing check — reject if form submitted in < 3 s */
    const loadTime = Number(body._t);
    if (!loadTime || Date.now() - loadTime < 3000) {
      return NextResponse.json(
        { error: 'validation', message: 'Invalid submission' },
        { status: 400 },
      );
    }

    /* Sanitise */
    const name = sanitize(body.name || '', 100);
    const email = sanitize(body.email || '', 254);
    const phone = sanitize(body.phone || '', 30);
    const date = sanitize(body.date || '', 20);
    const time = sanitize(body.time || '', 10);
    const guests = Number(body.guests);
    const specialRequests = sanitize(body.specialRequests || '', 1000);

    /* Validate */
    const errors: Record<string, string> = {};

    if (!name || name.length < 2) errors.name = 'Name is required';
    if (!isValidEmail(email)) errors.email = 'Valid email is required';
    if (!isValidPhone(phone)) errors.phone = 'Valid phone is required';

    // Date — must be today or later
    if (!date) {
      errors.date = 'Date is required';
    } else {
      const parsed = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(parsed.getTime()) || parsed < today) {
        errors.date = 'Date must be in the future';
      }
    }

    if (!time) errors.time = 'Time is required';
    if (!guests || guests < 1 || guests > 20) errors.guests = 'Invalid guest count';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'validation', errors }, { status: 400 });
    }

    /*
     * ── In production: integrate with booking system / send email ──
     * For this demo we log and return success.
     */
    console.log('[Reservation]', { name, email, phone, date, time, guests, specialRequests });

    return NextResponse.json({ success: true, message: 'Reservation request received' });
  } catch {
    return NextResponse.json(
      { error: 'server', message: 'Internal server error' },
      { status: 500 },
    );
  }
}
