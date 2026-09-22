import { getTags } from '@/lib/content';
import { TaxonomyPage } from '@/components/pages';
import { site } from '@/lib/config';
import { t } from '@/lib/i18n';
import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getTags('pt')).map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag} · ${t('pt', 'tags')} · ${site.title.pt}` };
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return <TaxonomyPage taxonomySlug={tag} field="tags" locale="pt" />;
}
