import { getCategories } from '@/lib/content';
import { TaxonomyPage } from '@/components/pages';
import { site } from '@/lib/config';
import { t } from '@/lib/i18n';
import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCategories('pt')).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return { title: `${category} · ${t('pt', 'categories')} · ${site.title.pt}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <TaxonomyPage taxonomySlug={category} field="categories" locale="pt" />;
}
