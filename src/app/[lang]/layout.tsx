import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'HWA / \u706B — Premium Korean BBQ',
  description:
    'Mastery of the Flame. Premium Korean dining experience in Warsaw. Fire, precision, and the art of Korean BBQ.',
  openGraph: {
    title: 'HWA / \u706B — Premium Korean BBQ',
    description: 'Mastery of the Flame. Premium Korean dining experience.',
    type: 'website',
  },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css"
          as="style"
        />
      </head>
      <body>
        <Navbar lang={lang} />
        {children}
      </body>
    </html>
  );
}
