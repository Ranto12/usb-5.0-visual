'use client';

import { useState, useEffect, useCallback } from 'react';

type Lang = 'id' | 'en' | 'both';

// Keywords dalam label field yang menandakan bahasa
const ID_KEYWORDS = ['indonesia', '— bahasa', 'bahasa indonesia', '_id', 'indo'];
const EN_KEYWORDS = ['english', '— english', '_en', 'inggris'];

function matchesKeyword(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

/**
 * Scan semua label di dalam Keystatic dan hide/show
 * parent field wrapper berdasarkan bahasa yang dipilih.
 */
function applyLangFilter(lang: Lang) {
  if (lang === 'both') {
    // Show all — reset semua yang pernah disembunyikan
    document.querySelectorAll<HTMLElement>('[data-cms-hidden]').forEach((el) => {
      el.style.display = '';
      el.removeAttribute('data-cms-hidden');
    });
    return;
  }

  // Scan semua label di halaman
  document.querySelectorAll('label').forEach((label) => {
    const text = label.textContent || '';
    const isId = matchesKeyword(text, ID_KEYWORDS);
    const isEn = matchesKeyword(text, EN_KEYWORDS);

    if (!isId && !isEn) return; // bukan field bilingual, skip

    // Cari wrapper terdekat (biasanya div 2-3 level di atas label)
    let wrapper: HTMLElement | null = label.parentElement;
    for (let i = 0; i < 4; i++) {
      if (!wrapper) break;
      // Keystatic biasanya wrap field dalam div dengan min-height/padding
      if (wrapper.tagName === 'DIV' && wrapper !== document.body) {
        const style = window.getComputedStyle(wrapper);
        if (style.display !== 'inline') break;
      }
      wrapper = wrapper.parentElement;
    }
    if (!wrapper) wrapper = label.parentElement;

    const shouldHide =
      (lang === 'id' && isEn) ||
      (lang === 'en' && isId);

    if (shouldHide) {
      wrapper!.style.display = 'none';
      wrapper!.setAttribute('data-cms-hidden', '1');
    } else {
      // pastikan visible
      if (wrapper!.getAttribute('data-cms-hidden')) {
        wrapper!.style.display = '';
        wrapper!.removeAttribute('data-cms-hidden');
      }
    }
  });
}

export default function LangToggle() {
  const [lang, setLang] = useState<Lang>('both');

  const applyFilter = useCallback((l: Lang) => {
    applyLangFilter(l);
  }, []);

  // Restore preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('cms-lang') as Lang | null;
    if (saved && ['id', 'en', 'both'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  // Apply filter whenever lang changes + watch DOM changes (Keystatic navigates client-side)
  useEffect(() => {
    localStorage.setItem('cms-lang', lang);

    // Apply segera
    applyFilter(lang);

    // MutationObserver: re-apply setiap kali Keystatic render konten baru
    const observer = new MutationObserver(() => {
      applyFilter(lang);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [lang, applyFilter]);

  const buttons: { key: Lang; label: string }[] = [
    { key: 'both', label: '🌐 Semua Field' },
    { key: 'id',   label: '🇮🇩 Indonesia saja' },
    { key: 'en',   label: '🇬🇧 English only' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '7px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 1px 8px rgba(0,0,0,0.4)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#E30613', boxShadow: '0 0 6px #E30613',
        }} />
        <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em' }}>
          USB-5.0 VISUALS
        </span>
        <span style={{ color: '#475569', fontSize: 11 }}>Admin Panel</span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 16, background: '#1e293b', margin: '0 4px' }} />

      <span style={{ color: '#64748b', fontSize: 11, fontWeight: 500 }}>
        Tampilkan:
      </span>

      {/* Toggle buttons */}
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          style={{
            padding: '4px 12px',
            borderRadius: 999,
            border: lang === key ? '1px solid #E30613' : '1px solid #1e293b',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 11,
            color: lang === key ? '#fff' : '#64748b',
            background: lang === key ? '#E30613' : '#1e293b',
            transition: 'all 0.15s ease',
            outline: 'none',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (lang !== key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#E30613';
              (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
            }
          }}
          onMouseLeave={(e) => {
            if (lang !== key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#1e293b';
              (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
            }
          }}
        >
          {label}
        </button>
      ))}

      <span style={{ color: '#334155', fontSize: 10, marginLeft: 'auto' }}>
        Sembunyikan field bahasa yang tidak dibutuhkan
      </span>
    </div>
  );
}
