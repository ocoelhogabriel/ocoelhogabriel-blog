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
  title: site.title.pt,
  description: site.tagline.pt,
  openGraph: {
    title: site.title.pt,
    description: site.tagline.pt,
    url: site.url,
    siteName: site.name,
    locale: 'pt_BR',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title.pt,
    description: site.tagline.pt,
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e10',
};

const themeInit = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-desk font-body text-bone antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
