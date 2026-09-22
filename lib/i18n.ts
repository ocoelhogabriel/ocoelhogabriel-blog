export type Locale = 'pt' | 'en';
export const locales: Locale[] = ['pt', 'en'];

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' };

const strings = {
  pt: {
    articles: 'Artigos',
    about: 'Sobre',
    archives: 'Arquivos',
    search: 'Busca',
    minRead: 'min de leitura',
    toc: 'Sumário',
    comments: 'Comentários',
    noPosts: 'Nenhum artigo encontrado.',
    tags: 'Tags',
    categories: 'Categorias',
    searchHeading: 'Buscar artigos',
    footerLine: 'Impresso em pixels · São Paulo',
    notFound: 'Página não encontrada',
  },
  en: {
    articles: 'Posts',
    about: 'About',
    archives: 'Archives',
    search: 'Search',
    minRead: 'min read',
    toc: 'Contents',
    comments: 'Comments',
    noPosts: 'No posts found.',
    tags: 'Tags',
    categories: 'Categories',
    searchHeading: 'Search posts',
    footerLine: 'Printed in pixels · São Paulo',
    notFound: 'Page not found',
  },
} as const;

export type StringKey = keyof (typeof strings)['pt'];

export function t(locale: Locale, key: StringKey): string {
  return strings[locale][key];
}

/** Caminho interno já localizado: pt fica na raiz, en sob /en. */
export function localePath(locale: Locale, path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'pt') return p;
  return p === '/' ? '/en' : `/en${p}`;
}

/** Troca de idioma preservando o caminho atual. */
export function altLocalePath(locale: Locale, currentPath: string): string {
  return localePath(locale === 'pt' ? 'en' : 'pt', currentPath);
}
