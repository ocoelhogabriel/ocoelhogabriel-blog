// Gera og:image por post — mesma cartolina do card-matriz, na tinta do Dev Log.
// Saída: public/og/<slug>.png (pt) e public/en/og/<slug>.png (en).
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = join(ROOT, 'content/post');
const TEMPLATE = readFileSync(join(ROOT, 'assets/og/post-card.svg'), 'utf8');
const FONT_DIR = join(ROOT, 'assets/og/fonts');
const INK = '#8C9FC7';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text, max = 30) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > 3) {
    lines.length = 3;
    lines[2] = lines[2].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

function truncate(text, max = 90) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function svgFor({ title, sub, eyebrow }) {
  const lines = wrap(title);
  const n = lines.length;
  const fs = n === 1 ? 62 : n === 2 ? 52 : 42;
  const lh = fs * 1.18;
  const midY = 300;
  const startY = midY - ((n - 1) * lh) / 2;
  const titleBlock = lines
    .map(
      (line, i) =>
        `<text x="600" y="${Math.round(startY + i * lh)}" text-anchor="middle" font-family="Marcellus, 'Times New Roman', serif" font-size="${fs}" fill="#EFE9DC" letter-spacing="-0.5">${esc(line)}</text>`,
    )
    .join('\n  ');
  const ornamentY = Math.round(midY + ((n - 1) * lh) / 2 + 55);
  return TEMPLATE.replaceAll('%INK%', INK)
    .replaceAll('%EYEBROW%', esc(eyebrow))
    .replace('%TITLE_BLOCK%', titleBlock)
    .replaceAll('%ORNAMENT_Y%', String(ornamentY))
    .replace('%ODY1%', String(ornamentY - 10))
    .replace('%ODY2%', String(ornamentY + 10))
    .replace('%SUB_Y%', String(ornamentY + 62))
    .replace('%SUB%', esc(sub));
}

function render(svg, out) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: false, defaultFontFamily: 'Spectral' },
  });
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, resvg.render().asPng());
}

let count = 0;
for (const dir of readdirSync(POSTS)) {
  const pt = join(POSTS, dir, 'index.md');
  const en = join(POSTS, dir, 'index.en.md');
  if (existsSync(pt)) {
    const { data } = matter(readFileSync(pt, 'utf8'));
    render(
      svgFor({ title: data.title, sub: truncate(data.description ?? ''), eyebrow: 'DEV LOG' }),
      join(ROOT, 'public/og', `${data.slug ?? dir}.png`),
    );
    count++;
  }
  if (existsSync(en)) {
    const { data } = matter(readFileSync(en, 'utf8'));
    render(
      svgFor({ title: data.title, sub: truncate(data.description ?? ''), eyebrow: 'DEV LOG' }),
      join(ROOT, 'public/en/og', `${data.slug ?? dir}.png`),
    );
    count++;
  }
}
console.log(`build-og: ${count} og cards gerados`);
