'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

type Category = 'all' | 'photo' | 'video' | 'web';

interface PortfolioItem {
  slug: string;
  title: string;
  subtitle: string;
  category: 'photo' | 'video' | 'web';
  image_file?: string | null;
  image_url?: string | null;
  image_width: number;
  image_height: number;
  order: number;
  featured: boolean;
  link_url?: string | null;
  link_label?: string | null;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Portfolio({ portfolio: cmsPortfolio }: { portfolio: PortfolioItem[] }) {
  const { t } = useLanguage();
  const { ref, inView } = useInView();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const filters: { key: Category; label: string }[] = [
    { key: 'all', label: t.portfolio.filterAll },
    { key: 'photo', label: t.portfolio.filterPhoto },
    { key: 'video', label: t.portfolio.filterVideo },
    { key: 'web', label: t.portfolio.filterWeb },
  ];

  const allItems = cmsPortfolio;
  const filtered = activeFilter === 'all' ? allItems : allItems.filter((i) => i.category === activeFilter);

  // Close lightbox on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="portfolio" className="section-padding bg-brand-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-12">
          <span
            className={`inline-block text-brand-accent text-overline font-semibold tracking-widest uppercase mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            — Our Work —
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.portfolio.title}
          </h2>
          <p
            className={`text-slate-600 text-body sm:text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-10 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-brand-accent text-white shadow-md shadow-blue-900/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-slate-900 hover:border-slate-900 shadow-sm'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, index) => (
            <div
              key={item.slug}
              className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer bg-white border border-slate-200 shadow-sm transition-all duration-500"
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setLightbox(item)}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingBottom: `${(item.image_height / item.image_width) * 100}%` }}
              >
                <Image
                  src={item.image_file || item.image_url || 'https://picsum.photos/seed/placeholder/600/800'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-bold text-sm truncate">{item.title}</p>
                  <p className="text-gray-300 text-xs">{item.subtitle}</p>
                </div>

                {/* Top-right: category badge + external link */}
                <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-brand-accent text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
                    {item.category}
                  </span>
                  {item.link_url && (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka ${item.title}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-brand-accent transition-colors p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: `${lightbox.image_width}/${lightbox.image_height}`, maxHeight: '75vh' }}>
              <Image
                src={lightbox.image_file || lightbox.image_url || 'https://picsum.photos/seed/placeholder/600/800'}
                alt={lightbox.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-xl">{lightbox.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{lightbox.subtitle}</p>
              {lightbox.link_url && (
                <a
                  href={lightbox.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {lightbox.link_label || 'Lihat Project'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
