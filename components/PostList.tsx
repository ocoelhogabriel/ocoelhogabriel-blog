import Link from 'next/link';
import { formatDate, type Entry } from '@/lib/content';
import { localePath, t, type Locale } from '@/lib/i18n';

/** Fileiras gravadas de posts — ícone+label à esquerda, meta à direita, filete entre linhas. */
export function PostList({ posts, locale }: { posts: Entry[]; locale: Locale }) {
  if (posts.length === 0) {
    return <p className="text-dim italic">{t(locale, 'noPosts')}</p>;
  }
  return (
    <ul className="divide-y divide-ink/20">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={localePath(locale, `/p/${post.slug}`)}
            className="group flex items-baseline justify-between gap-4 py-5"
          >
            <span className="min-w-0">
              <span className="font-display text-lg text-bone group-hover:text-ink transition-colors block">
                {post.title}
              </span>
              {post.description && (
                <span className="block text-sm text-dim mt-1 leading-relaxed">
                  {post.description}
                </span>
              )}
            </span>
            <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-dim">
              {formatDate(post.date, locale)} · {post.readingMinutes} {t(locale, 'minRead')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
