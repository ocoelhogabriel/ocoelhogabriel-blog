'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    PagefindUI?: new (opts: {
      element: string;
      showSubResults?: boolean;
      showImages?: boolean;
    }) => unknown;
  }
}

/** Busca estática via Pagefind — índice gerado no postbuild sobre out/. */
export function SearchBox() {
  const loaded = useRef(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${base}/pagefind/pagefind-ui.css`;
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = `${base}/pagefind/pagefind-ui.js`;
    script.onload = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({
          element: '#pagefind-search',
          showSubResults: true,
          showImages: false,
        });
      }
    };
    document.body.appendChild(script);
  }, [base]);

  return <div id="pagefind-search" className="mt-6" />;
}
