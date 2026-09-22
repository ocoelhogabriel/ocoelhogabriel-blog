import { getPageSlugs, getPage } from '@/lib/content';
import { MarkdownPage } from '@/components/pages';
import { site } from '@/lib/config';
import type { Metadata } from 'next';

export const dynamicParams = false;

const RESERVED = new Set(['archives', 'search']);

export async function generateStaticParams() {
  return (await getPageSlugs('pt'))
    .filter((slug) => !RESERVED.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug, 'pt');
  if (!page) return {};
  return { title: `${page.title} · ${site.title.pt}`, description: page.description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MarkdownPage slug={slug} locale="pt" />;
}
