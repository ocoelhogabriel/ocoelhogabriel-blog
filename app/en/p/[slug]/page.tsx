import { getPostSlugs, getPost } from '@/lib/content';
import { PostPage } from '@/components/pages';
import { site } from '@/lib/config';
import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs('en')).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug, 'en');
  if (!post) return {};
  return {
    title: `${post.title} · ${site.title.en}`,
    description: post.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PostPage slug={slug} locale="en" />;
}
