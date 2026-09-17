'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroData {
  tagline: { id: string; en: string };
  subtitle: { id: string; en: string };
  stats: readonly { val: string; label: string }[];
}

export default function Hero({ heroData }: { heroData: HeroData | null }) {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.4}px`;
      }
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Use CMS data if available, otherwise fall back to translations
  const tagline = heroData ? (language === 'id' ? heroData.tagline.id : heroData.tagline.en) : t.hero.tagline;
  const subtitle = heroData ? (language === 'id' ? heroData.subtitle.id : heroData.subtitle.en) : t.hero.subtitle;
  const stats = heroData ? heroData.stats : [
        { val: '200+', label: 'Happy Clients' },
        { val: '500+', label: 'Projects' },
        { val: '3+', label: 'Years' },
      ];

  const taglineLines = tagline.split('\n');

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 20% 50%, rgba(227, 6, 19, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(227, 6, 19, 0.05) 0%, transparent 60%)',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/hero-usb/1920/1080')`,
          filter: 'grayscale(60%) contrast(1.2)',
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating red orb */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-red/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-brand-red/5 blur-3xl animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 rounded-full px-4 py-2 mb-8"
          style={{ animation: 'fadeIn 0.6s ease-out 0.2s both' }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
          <span className="text-brand-red text-sm font-medium tracking-wider">Photography · Videography · Content Creation</span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none"
          style={{ animation: 'slideUp 0.7s ease-out 0.4s both' }}
        >
          {taglineLines.map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-gradient">{line}</span>
              ) : (
                <span className="text-white">{line}</span>
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: 'slideUp 0.7s ease-out 0.6s both' }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ animation: 'slideUp 0.7s ease-out 0.8s both' }}
        >
          <button
            onClick={() => scrollToSection('#portfolio')}
            className="group flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t.hero.ctaPortfolio}
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="group flex items-center gap-2 bg-transparent border-2 border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t.hero.ctaContact}
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 text-center"
          style={{ animation: 'fadeIn 0.7s ease-out 1s both' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-2xl font-black text-brand-red">{s.val}</span>
              <span className="text-gray-500 text-xs font-medium tracking-wider uppercase mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-gray-500 text-xs tracking-widest uppercase">{t.hero.scrollDown}</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-brand-red to-transparent animate-pulse" />
      </div>
    </section>
  );
}
