// Produção: Vercel (blog.ocoelhogabriel.dev) — serve na raiz, basePath "".
// O BASE_PATH e a detecção de public/CNAME ficam como caminho dormante
// caso um mirror no GitHub Pages seja reativado.
import fs from 'node:fs';

const hasCustomDomain = fs.existsSync(new URL('./public/CNAME', import.meta.url));
const basePath = hasCustomDomain ? '' : (process.env.BASE_PATH ?? '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
