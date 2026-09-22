// Ajustes finais do export estático.
// /404/ é renderizada com o layout do grupo (pt) — copiamos o HTML para
// out/404.html, que é o arquivo que os hosts servem em rotas não encontradas.
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const src = join(OUT, '404', 'index.html');
const dest = join(OUT, '404.html');

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('finalize-static: out/404.html gerado a partir de /404/');
} else {
  console.warn('finalize-static: out/404/index.html não encontrado — 404 default mantido');
}
