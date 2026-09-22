import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import getReadingTime from 'reading-time';
import GithubSlugger from 'github-slugger';
import type { Locale } from './i18n';

const contentRoot = path.join(process.cwd(), 'content');

const baseSlugger = new GithubSlugger();
/** Slug único para taxonomias/anchors — github-slugger em todo lugar. */
export const slugify = (value: string) => baseSlugger.slug(value);

export interface EntryMeta {
  slug: string;
  dir: string;
  title: string;
  description: string;
  date: string;
  categories: string[];
  tags: string[];
}

export interface Entry extends EntryMeta {
  html: string;
  readingMinutes: number;
  toc: { id: string; text: string; depth: number }[];
}

interface MdNode {
  type?: string;
  value?: string;
  depth?: number;
  children?: MdNode[];
}

function nodeText(node: MdNode): string {
  if (node.value) return node.value;
  return (node.children ?? []).map(nodeText).join('');
}

function mdFile(dir: string, locale: Locale): string | null {
  const localized = locale === 'en' ? 'index.en.md' : 'index.md';
  const fallback = locale === 'en' ? 'index.md' : 'index.en.md';
  for (const name of [localized, fallback]) {
    const file = path.join(dir, name);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeStringify);

async function parseEntry(dir: string, locale: Locale): Promise<Entry | null> {
  const file = mdFile(dir, locale);
  if (!file) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  if (data.draft === true) return null;

  const mdast = processor.parse(content);
  const slugger = new GithubSlugger();
  const toc = (mdast.children ?? [])
    .filter((n: MdNode) => n.type === 'heading' && (n.depth === 2 || n.depth === 3))
    .map((n: MdNode) => {
      const text = nodeText(n);
      return { id: slugger.slug(text), text, depth: n.depth ?? 2 };
    });

  const html = (await processor.process(content)).toString();

  return {
    slug: data.slug ?? path.basename(dir),
    dir: path.basename(dir),
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ? new Date(data.date).toISOString() : '',
    categories: data.categories ?? [],
    tags: data.tags ?? [],
    html,
    readingMinutes: Math.max(1, Math.round(getReadingTime(content).minutes)),
    toc,
  };
}

function entryDirs(kind: 'post' | 'page'): string[] {
  const base = path.join(contentRoot, kind);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(base, d.name));
}

export async function getPosts(locale: Locale): Promise<Entry[]> {
  const posts = await Promise.all(entryDirs('post').map((d) => parseEntry(d, locale)));
  return posts
    .filter((p): p is Entry => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string, locale: Locale): Promise<Entry | null> {
  const posts = await getPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
  return (await getPosts(locale)).map((p) => p.slug);
}

/** Páginas de conteúdo (markdown). layouts especiais (archives/search) têm rotas próprias. */
export async function getPages(locale: Locale): Promise<Entry[]> {
  const pages = await Promise.all(entryDirs('page').map((d) => parseEntry(d, locale)));
  return pages.filter((p): p is Entry => p !== null);
}

export async function getPage(slug: string, locale: Locale): Promise<Entry | null> {
  const pages = await getPages(locale);
  return pages.find((p) => p.slug === slug) ?? null;
}

export async function getPageSlugs(locale: Locale): Promise<string[]> {
  return (await getPages(locale)).map((p) => p.slug);
}

export interface Taxonomy {
  name: string;
  slug: string;
  count: number;
}

async function collectTaxonomy(locale: Locale, field: 'tags' | 'categories'): Promise<Taxonomy[]> {
  const posts = await getPosts(locale);
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const term of post[field]) counts.set(term, (counts.get(term) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const getTags = (locale: Locale) => collectTaxonomy(locale, 'tags');
export const getCategories = (locale: Locale) => collectTaxonomy(locale, 'categories');

export async function getPostsByTaxonomy(
  locale: Locale,
  field: 'tags' | 'categories',
  taxonomySlug: string,
): Promise<Entry[]> {
  const posts = await getPosts(locale);
  return posts.filter((p) => p[field].some((term) => slugify(term) === taxonomySlug));
}

export function formatDate(iso: string, locale: Locale): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}
