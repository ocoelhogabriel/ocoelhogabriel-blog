import Link from 'next/link';
import { localePath, t, type Locale } from '@/lib/i18n';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function NotFound({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen flex flex-col bg-desk studio-light font-body text-bone">
      <SiteHeader locale={locale} currentPath="/404" />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-16 sm:py-24 flex items-center justify-center">
        <div className="w-full max-w-md -rotate-1 rounded-xl border border-ink/25 bg-stock px-8 py-12 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
          <p className="engraved-title text-[11px] uppercase text-ink">
            {t(locale, 'notFoundEyebrow')}
          </p>
          <h1 className="font-display text-7xl text-bone my-6">404</h1>
          <p className="text-dim italic mb-8">{t(locale, 'notFoundMsg')}</p>
          <Link
            href={localePath(locale, '/')}
            className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink transition-colors"
          >
            ← {t(locale, 'notFoundBack')}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
