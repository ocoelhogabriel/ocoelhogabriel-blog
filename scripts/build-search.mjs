// Gera o índice Pagefind sobre out/.
// Com BASE_PATH (ex.: /ocoelhogabriel-blog no Pages), indexa uma cópia espelhada
// sob o prefixo para que as URLs dos resultados já saiam com o base path.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Domínio customizado (public/CNAME) serve na raiz — ignora BASE_PATH.
const hasCustomDomain = fs.existsSync(path.resolve('public/CNAME'));
const base = hasCustomDomain
  ? ''
  : (process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const out = path.resolve('out');
const staging = path.resolve('.pagefind-site');
const bundleOut = path.join(out, 'pagefind');
const pagefindBin = path.join('node_modules', '.bin', 'pagefind');

fs.rmSync(staging, { recursive: true, force: true });

let siteDir = out;
if (base) {
  const nested = path.join(staging, base);
  fs.mkdirSync(path.dirname(nested), { recursive: true });
  fs.cpSync(out, nested, { recursive: true });
  siteDir = staging;
}

execFileSync(
  pagefindBin,
  ['--site', siteDir, '--output-path', bundleOut],
  { stdio: 'inherit' },
);

fs.rmSync(staging, { recursive: true, force: true });
