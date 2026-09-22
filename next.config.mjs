// BASE_PATH é resolvido no workflow de deploy ("" local, "/<repo>" no Pages).
// Com domínio customizado (public/CNAME) o site serve na raiz — basePath vira "".
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
