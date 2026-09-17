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
    <section id="pricing" className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-12">
          <span
            className={`inline-block text-brand-red text-sm font-semibold tracking-widest uppercase mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            — Transparent Pricing —
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-black text-white mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.pricing.title}
          </h2>
          <p
            className={`text-gray-400 text-base sm:text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
                  ? 'bg-brand-red text-white shadow-lg shadow-red-900/30'
                  : 'bg-brand-dark border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
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
                <h3 className="text-2xl font-bold text-white">
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-dark border border-brand-red/20 rounded-2xl px-8 py-6">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold mb-1">💬 {t.pricing.note}</p>
              <p className="text-gray-400 text-sm">Dapatkan penawaran terbaik yang sesuai kebutuhan Anda</p>
            </div>
            <a
              href="https://wa.me/6285840385667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
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
      className={`relative flex flex-col bg-brand-dark rounded-2xl overflow-hidden card-hover border transition-all duration-300 ${
        pkg.popular
          ? 'border-brand-red shadow-lg shadow-red-900/20'
          : 'border-white/5'
      }`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-brand-red text-white text-xs font-bold text-center py-1.5 tracking-wider">
          ⭐ MOST POPULAR
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${pkg.popular ? 'pt-10' : ''}`}>
        {/* Name */}
        <h4 className="text-lg font-bold text-white mb-4">{pkg.name}</h4>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className={`text-3xl font-black ${pkg.popular ? 'text-brand-red' : 'text-white'}`}>
              {pkg.price}
            </span>
            {pkg.unit && (
              <span className="text-gray-400 text-sm mb-1">{pkg.unit}</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <svg
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-brand-red' : 'text-green-400'}`}
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
              ? 'bg-brand-red hover:bg-red-700 text-white shadow-md shadow-red-900/30'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
          }`}
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}
