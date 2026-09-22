import Link from 'next/link';
import { localePath, t, type Locale } from '@/lib/i18n';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function NotFound({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen flex flex-col bg-desk studio-light font-body text-bone">
      <SiteHeader locale={locale} currentPath="/404" />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-6xl text-copper mb-6">❧ 404</p>
        <h1 className="font-display text-2xl text-bone mb-8">{t(locale, 'notFound')}</h1>
        <Link
          href={localePath(locale, '/')}
          className="text-copper underline decoration-copper/40 hover:decoration-copper transition-colors"
        >
          ← {t(locale, 'articles')}
        </Link>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
