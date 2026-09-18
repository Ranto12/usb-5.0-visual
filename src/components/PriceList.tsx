'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PricingPackage {
  name: string;
  price: string;
  unit_id: string;
  unit_en: string;
  popular: boolean;
  features_id: string;
  features_en: string;
}

interface PricingCategory {
  slug: string;
  order: number;
  icon: string;
  name_id: string;
  name_en: string;
  packages: PricingPackage[];
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

export default function PriceList({ pricingCategories: cmsCategories }: { pricingCategories: PricingCategory[] }) {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState(0);

  // Listen for custom event to change active category
  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const slug = customEvent.detail;
      const idx = cmsCategories.findIndex(cat => cat.slug === slug);
      if (idx !== -1) {
        setActiveCategory(idx);
      }
    };
    window.addEventListener('selectPricingCategory', handleSelectCategory);
    return () => window.removeEventListener('selectPricingCategory', handleSelectCategory);
  }, [cmsCategories]);


  // Use CMS data if available, fallback to translations
  const categories = cmsCategories.length > 0
    ? cmsCategories.map((cat) => ({
        name: language === 'id' ? cat.name_id : cat.name_en,
        icon: cat.icon,
        packages: cat.packages.map((pkg) => ({
          name: pkg.name,
          price: pkg.price,
          unit: language === 'id' ? pkg.unit_id : pkg.unit_en,
          popular: pkg.popular,
          features: (language === 'id' ? pkg.features_id : pkg.features_en)
            .split('\n')
            .map((f) => f.trim())
            .filter(Boolean),
        })),
      }))
    : t.pricing.categories.map((cat) => ({
        name: cat.name,
        icon: cat.icon,
        packages: cat.packages.map((pkg) => ({
          name: pkg.name,
          price: pkg.price,
          unit: pkg.unit ?? '',
          popular: pkg.popular ?? false,
          features: pkg.features,
        })),
      }));

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-12">
          <span
            className={`inline-block text-brand-accent text-overline font-semibold tracking-widest uppercase mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            — Transparent Pricing —
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.pricing.title}
          </h2>
          <p
            className={`text-slate-600 text-body sm:text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-10 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === idx
                  ? 'bg-brand-accent text-white shadow-md shadow-blue-900/20'
                  : 'bg-brand-bone border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 shadow-sm'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="hidden sm:block">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category */}
        <div>
          {categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className={`transition-all duration-500 ${activeCategory === catIdx ? 'block' : 'hidden'}`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.packages.map((pkg, pkgIdx) => (
                  <PriceCard key={pkgIdx} pkg={pkg} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-bone border border-brand-accent/30 rounded-2xl px-8 py-6 shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-slate-900 font-semibold mb-1">💬 {t.pricing.note}</p>
              <p className="text-slate-600 text-caption">Dapatkan penawaran terbaik yang sesuai kebutuhan Anda</p>
            </div>
            <a
              href="https://wa.me/6285840385667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {t.pricing.contactUs}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Package {
  name: string;
  price: string;
  unit: string;
  features: string[];
  popular?: boolean;
}

function PriceCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={`relative flex flex-col bg-brand-bone/60 hover:bg-white rounded-2xl overflow-hidden card-hover border transition-all duration-300 shadow-sm ${
        pkg.popular
          ? 'border-brand-accent shadow-lg shadow-blue-900/10 ring-1 ring-brand-accent'
          : 'border-slate-200 hover:shadow-md'
      }`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-brand-accent text-white text-xs font-bold text-center py-1.5 tracking-wider">
          ⭐ MOST POPULAR
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${pkg.popular ? 'pt-10' : ''}`}>
        {/* Name */}
        <h4 className="text-lg font-semibold text-slate-900 tracking-tight mb-4">{pkg.name}</h4>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className={`text-3xl font-extrabold font-mono ${pkg.popular ? 'text-brand-accent' : 'text-slate-900'}`}>
              {pkg.price}
            </span>
            {pkg.unit && (
              <span className="text-slate-500 text-sm mb-1">{pkg.unit}</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mb-6" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-caption text-slate-600">
              <svg
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-brand-accent' : 'text-emerald-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://wa.me/6285840385667"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 block text-center py-3 rounded-full text-sm font-bold transition-all duration-200 ${
            pkg.popular
              ? 'bg-brand-accent hover:bg-brand-accent-hover text-white shadow-md shadow-blue-900/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm'
          }`}
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}
