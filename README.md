# ocoelhogabriel-blog

Dev log de Gabriel Coelho — pt-BR na raiz, inglês em `/en`. Next.js 15 com
export estático, busca via Pagefind, comentários via Disqus. Produção na
Vercel em `https://blog.ocoelhogabriel.dev`.

Identidade visual: "Card on the Desk" (print-shop, committed-dark) — tokens
canônicos no meta-repo `ocoelhogabriel-eco-system/brand/`.

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera out/ + índice Pagefind (postbuild)
npm run lint       # tsc --noEmit
```

## Conteúdo

Markdown em `content/` — posts em `content/post/<slug>/index.md`
(`index.en.md` para a versão EN), páginas em `content/page/`. Drafts usam
`draft: true` no frontmatter.

Rotas: `/p/:slug` posts · `/about` `/archives` `/search` páginas ·
`/tags/:tag` `/categories/:cat` taxonomias · `/index.xml` RSS por idioma ·
`sitemap.xml` + `robots.txt` gerados no build.

## Deploy

Push em `main` → produção Vercel no domínio. Branch/PR → preview deployment
(hml). O caminho `BASE_PATH` + `public/CNAME` (mirror GitHub Pages) ficou
dormante — reativável sem mexer no app.
