import { formatDate, getPosts, slugify, type Entry } from '@/lib/content';
import { localePath, t, type Locale } from '@/lib/i18n';
import { site } from '@/lib/config';
import { PostList } from './PostList';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MarkdownBody } from './MarkdownBody';
import { DisqusComments } from './DisqusComments';
import { SearchBox } from './SearchBox';
import Link from 'next/link';

function Shell({
  locale,
  currentPath,
  children,
}: {
  locale: Locale;
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-desk studio-light font-body text-bone">
      <SiteHeader locale={locale} currentPath={currentPath} />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 sm:py-14">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export async function HomePage({ locale }: { locale: Locale }) {
  const posts = await getPosts(locale);
  return (
    <Shell locale={locale} currentPath="/">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.32em] text-ink mb-3">
          {site.tagline[locale]}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-bone tracking-[-0.015em]">
          {t(locale, 'articles')}
        </h1>
      </header>
      <PostList posts={posts} locale={locale} />
    </Shell>
  );
}

function TaxonomyChips({ entry, locale }: { entry: Entry; locale: Locale }) {
  const items = [
    ...entry.categories.map((name) => ({
      name,
      href: localePath(locale, `/categories/${slugify(name)}`),
    })),
    ...entry.tags.map((name) => ({
      name,
      href: localePath(locale, `/tags/${slugify(name)}`),
    })),
  ];
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {items.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className="text-[11px] uppercase tracking-[0.18em] text-dim border border-ink/30 rounded px-2 py-1 hover:text-ink hover:border-ink/60 transition-colors"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

export async function PostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const posts = await getPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const path = `/p/${post.slug}`;

  return (
    <Shell locale={locale} currentPath={path}>
      <article>
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.22em] text-dim mb-3">
            {formatDate(post.date, locale)} · {post.readingMinutes} {t(locale, 'minRead')}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-bone tracking-[-0.015em] leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="font-body italic text-lg text-dim mt-3">{post.description}</p>
          )}
          <TaxonomyChips entry={post} locale={locale} />
        </header>

        {post.toc.length > 2 && (
          <nav className="border border-ink/25 rounded-md bg-stock px-5 py-4 mb-10">
            <p className="engraved-title text-[11px] uppercase text-ink mb-3">
              {t(locale, 'toc')}
            </p>
            <ul className="space-y-1.5">
              {post.toc.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.depth - 2) * 1.25}rem` }}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-dim hover:text-ink transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <MarkdownBody html={post.html} />

        <div className="mt-16 pt-8 border-t border-ink/25">
          <p className="engraved-title text-[11px] uppercase text-ink mb-2">
            {t(locale, 'comments')}
          </p>
          <DisqusComments
            identifier={post.dir}
            url={`${site.url}${localePath(locale, path)}`}
            title={post.title}
          />
        </div>
      </article>
    </Shell>
  );
}

export async function MarkdownPage({ slug, locale }: { slug: string; locale: Locale }) {
  const { getPage } = await import('@/lib/content');
  const page = await getPage(slug, locale);
  if (!page) return null;

  return (
    <Shell locale={locale} currentPath={`/${page.slug}`}>
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-bone tracking-[-0.015em]">
          {page.title}
        </h1>
        {page.description && (
          <p className="font-body italic text-lg text-dim mt-3">{page.description}</p>
        )}
      </header>
      <MarkdownBody html={page.html} />
    </Shell>
  );
}

export async function ArchivesPage({ locale }: { locale: Locale }) {
  const posts = await getPosts(locale);
  const byYear = new Map<string, Entry[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4) || '—';
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <Shell locale={locale} currentPath="/archives">
      <h1 className="engraved-title text-sm uppercase mb-8">{t(locale, 'archives')}</h1>
      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} className="mb-10">
          <h2 className="font-display text-2xl text-ink mb-2">{year}</h2>
          <PostList posts={yearPosts} locale={locale} />
        </section>
      ))}
    </Shell>
  );
}

export function SearchPage({ locale }: { locale: Locale }) {
  return (
    <Shell locale={locale} currentPath="/search">
      <h1 className="engraved-title text-sm uppercase mb-2">{t(locale, 'searchHeading')}</h1>
      <SearchBox />
    </Shell>
  );
}

export async function TaxonomyPage({
  taxonomySlug,
  field,
  locale,
}: {
  taxonomySlug: string;
  field: 'tags' | 'categories';
  locale: Locale;
}) {
  const { getPostsByTaxonomy } = await import('@/lib/content');
  const posts = await getPostsByTaxonomy(locale, field, taxonomySlug);
  const label =
    posts[0]?.[field].find((name) => slugify(name) === taxonomySlug) ?? taxonomySlug;

  return (
    <Shell locale={locale} currentPath={`/${field === 'tags' ? 'tags' : 'categories'}/${taxonomySlug}`}>
      <p className="text-xs uppercase tracking-[0.32em] text-dim mb-3">
        {t(locale, field === 'tags' ? 'tags' : 'categories')}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-bone tracking-[-0.015em] mb-10">
        {label}
      </h1>
      <PostList posts={posts} locale={locale} />
    </Shell>
  );
}
