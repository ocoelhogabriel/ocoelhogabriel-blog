import { getPostSlugs } from '@/lib/content';
import { PostPage } from '@/components/pages';
import { site } from '@/lib/config';
import type { Metadata } from 'next';
import { getPost } from '@/lib/content';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs('pt')).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug, 'pt');
  if (!post) return {};
  return {
    title: `${post.title} · ${site.title.pt}`,
    description: post.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PostPage slug={slug} locale="pt" />;
}
