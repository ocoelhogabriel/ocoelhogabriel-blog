import { getPosts } from '@/lib/content';
import { site } from '@/lib/config';
import { localePath } from '@/lib/i18n';

export const dynamic = 'force-static';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const posts = await getPosts('pt');
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site.url}${localePath('pt', `/p/${p.slug}`)}</link>
      <guid isPermaLink="true">${site.url}${localePath('pt', `/p/${p.slug}`)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <content:encoded><![CDATA[${p.html}]]></content:encoded>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(site.title.pt)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.tagline.pt)}</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
