'use client';

import { useEffect, useState } from 'react';

/**
 * Mesa à noite (default, committed-dark) ↔ mesa à luz do dia.
 * Persiste em localStorage 'theme'; init script no layout evita FOUC.
 */
export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      // storage indisponível (modo privado) — tema segue só na sessão
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Modo escuro' : 'Modo claro'}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 text-dim transition-colors hover:border-ink/60 hover:text-ink"
    >
      {light ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
