import { t, type Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-copper/25 mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-xs text-dim tracking-[0.2em] uppercase">
        ❧ {t(locale, 'footerLine')} · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
