import Link from 'next/link';
import { localePath, altLocalePath, t, type Locale } from '@/lib/i18n';
import { site } from '@/lib/config';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Props {
  locale: Locale;
  currentPath: string;
}

export function SiteHeader({ locale, currentPath }: Props) {
  const links = [
    { href: localePath(locale, '/'), label: t(locale, 'articles'), match: '/' },
    { href: localePath(locale, '/about'), label: t(locale, 'about'), match: '/about' },
    { href: localePath(locale, '/archives'), label: t(locale, 'archives'), match: '/archives' },
    { href: localePath(locale, '/search'), label: t(locale, 'search'), match: '/search' },
  ];

  return (
    <header className="border-b border-ink/25 bg-desk/85 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href={localePath(locale, '/')}
          className="group flex items-center gap-3 font-display text-lg text-bone tracking-[-0.015em] hover:text-ink transition-colors"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img/avatar-artistic.png`}
            alt=""
            width={32}
            height={32}
            className="rounded-full border border-ink/45 shadow-[0_0_0_2px_hsl(var(--desk-h)),0_0_0_3px_rgb(var(--ink-rgb)/0.35)] group-hover:border-ink transition-colors"
          />
          {site.name}
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          {links.map((link) => {
            const active =
              link.match === '/' ? currentPath === '/' : currentPath.startsWith(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-ink ${
                  active
                    ? 'text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink/70'
                    : 'text-dim'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={altLocalePath(locale, currentPath)}
            className="text-[11px] uppercase tracking-[0.22em] text-dim border border-ink/30 rounded px-2 py-1 hover:text-ink hover:border-ink/60 transition-colors"
            hrefLang={locale === 'pt' ? 'en' : 'pt-BR'}
          >
            {locale === 'pt' ? 'EN' : 'PT'}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
