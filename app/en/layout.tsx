import type { Metadata, Viewport } from 'next';
import { Marcellus, Spectral } from 'next/font/google';
import { site } from '@/lib/config';
import '../globals.css';

const display = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title.en,
  description: site.tagline.en,
  openGraph: {
    title: site.title.en,
    description: site.tagline.en,
    url: `${site.url}/en`,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-desk font-body text-bone antialiased">{children}</body>
    </html>
  );
}
