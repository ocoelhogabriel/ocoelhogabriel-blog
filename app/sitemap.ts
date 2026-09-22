import type { MetadataRoute } from 'next';
import { getPosts, getPages, getTags, getCategories } from '@/lib/content';
import { localePath, locales } from '@/lib/i18n';
import { site } from '@/lib/config';

export const dynamic = 'force-static';

const url = (path: string) => `${site.url}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const [posts, pages, tags, categories] = await Promise.all([
      getPosts(locale),
      getPages(locale),
      getTags(locale),
      getCategories(locale),
    ]);

    for (const path of ['/', '/about', '/archives', '/search']) {
      entries.push({ url: url(localePath(locale, path)), changeFrequency: 'weekly' });
    }
    for (const post of posts) {
      entries.push({
        url: url(localePath(locale, `/p/${post.slug}`)),
        lastModified: post.date || undefined,
      });
    }
    for (const page of pages) {
      entries.push({ url: url(localePath(locale, `/${page.slug}`)) });
    }
    for (const term of tags) {
      entries.push({ url: url(localePath(locale, `/tags/${term.slug}`)) });
    }
    for (const term of categories) {
      entries.push({ url: url(localePath(locale, `/categories/${term.slug}`)) });
    }
  }

  return entries;
}
