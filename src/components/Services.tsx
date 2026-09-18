'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceItem {
  slug: string;
  order: number;
  tag: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  icon: string;
}

const serviceIcons = [
  // Graduation cap
  <svg key="grad" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
  // Camera
  <svg key="cam" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>,
  // Film
  <svg key="film" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-5.25A1.125 1.125 0 013.375 12h.75m-.75 7.5v-5.25M6 18.375A1.125 1.125 0 007.125 19.5h9.75A1.125 1.125 0 0018 18.375V12m0 6.375h1.5c.621 0 1.125-.504 1.125-1.125V12m-3.75 6.375v-5.25M21 12h-1.5M6 12H3.375M21 12v-5.25A1.125 1.125 0 0019.875 5.625H4.125A1.125 1.125 0 003 6.75V12M21 12h-7.5m-10.5 0H3m5.25-5.25h7.5" />
  </svg>,
  // Scissors / editing
  <svg key="edit" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
  </svg>,
  // Code / web
  <svg key="web" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>,
];

// Map icon string from CMS to actual icon element
const iconMap: Record<string, React.ReactNode> = {
  graduation: serviceIcons[0],
  camera: serviceIcons[1],
  film: serviceIcons[2],
  edit: serviceIcons[3],
  web: serviceIcons[4],
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Services({ services: cmsServices }: { services: ServiceItem[] }) {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView();

  // Build service list: use CMS data if available, else fall back to translations
  const serviceList = cmsServices.length > 0
    ? cmsServices.map((s) => ({
        slug: s.slug,
        icon: iconMap[s.icon] ?? serviceIcons[0],
        title: language === 'id' ? s.title_id : s.title_en,
        description: language === 'id' ? s.description_id : s.description_en,
        tag: s.tag,
      }))
    : t.services.items.map((s, i) => ({
        slug: '',
        icon: serviceIcons[i],
        title: s.title,
        description: s.description,
        tag: s.tag,
      }));

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <span
            className={`inline-block text-brand-accent text-overline font-semibold tracking-widest uppercase mb-3 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            — What We Offer —
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t.services.title}
          </h2>
          <p
            className={`text-slate-600 text-body sm:text-lg max-w-xl mx-auto transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tag={service.tag}
              delay={index * 100}
              inView={inView}
              index={index}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  tag,
  delay,
  inView,
  index,
  slug,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  delay: number;
  inView: boolean;
  index: number;
  slug: string;
}) {
  const isLast = index === 4;

    const handleClick = () => {
    let pricingSlug = slug;
    if (slug === 'editing-video-foto') pricingSlug = 'editing';
    
    // Dispatch event for PriceList to change active tab
    if (pricingSlug) {
      window.dispatchEvent(new CustomEvent('selectPricingCategory', { detail: pricingSlug }));
    }
    
    // Scroll to pricing
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      const y = pricingEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-brand-bone/60 hover:bg-white border border-slate-200 rounded-2xl p-6 card-hover shadow-sm hover:shadow-md hover:border-brand-accent/30 cursor-pointer transition-all duration-500 ${
        isLast ? 'sm:col-span-2 lg:col-span-1' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay + 300}ms` }}
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-5 group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>

      {/* Tag */}
      <span className="text-overline font-semibold text-brand-accent/70 tracking-widest uppercase mb-2 block">{tag}</span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-brand-accent transition-colors tracking-tight">{title}</h3>

      {/* Description */}
      <p className="text-slate-600 text-caption leading-relaxed">{description}</p>

      {/* Arrow */}
      <div className="mt-5 flex items-center gap-1 text-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
        <span className="text-sm font-semibold">Learn more</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}
