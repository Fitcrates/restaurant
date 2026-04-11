/**
 * Sanity Studio — mounted at /studio
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'HWA Studio',
  description: 'Content management for HWA restaurant',
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
