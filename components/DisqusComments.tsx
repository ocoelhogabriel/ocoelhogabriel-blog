'use client';

import { useEffect } from 'react';
import { site } from '@/lib/config';

interface Props {
  identifier: string;
  url: string;
  title: string;
}

declare global {
  interface Window {
    DISQUS?: { reset: (opts: object) => void };
    disqus_config?: () => void;
  }
}

export function DisqusComments({ identifier, url, title }: Props) {
  useEffect(() => {
    const config = function (this: { page: Record<string, string> }) {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config,
      });
      return;
    }

    window.disqus_config = config;
    const script = document.createElement('script');
    script.src = `https://${site.disqusShortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(Date.now()));
    script.async = true;
    document.body.appendChild(script);
  }, [identifier, url, title]);

  return <div id="disqus_thread" className="mt-12" />;
}
