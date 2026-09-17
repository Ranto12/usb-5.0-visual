'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface AboutStat {
  value: string;
  label_id: string;
  label_en: string;
}

interface AboutData {
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  description1: { id: string; en: string };
  description2: { id: string; en: string };
  image_file?: string | null;
  image_url?: string | null;
  stats: readonly { value: string; label_id: string; label_en: string }[];
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

export default function About({ aboutData }: { aboutData: AboutData | null }) {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView();

  const valueIcons = [
    <svg key="q" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>,
    <svg key="t" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="c" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>,
  ];

  return (
    <section id="about" className="section-padding bg-brand-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src={aboutData?.image_file || aboutData?.image_url || 'https://picsum.photos/seed/about-usb/800/1000'}
                alt="USB-5.0 VISUALS Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-brand-dark border border-brand-red/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Certified Studio</p>
                  <p className="text-gray-400 text-xs">Professional Equipment</p>
                </div>
              </div>
            </div>

            {/* Red accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-brand-red/10 border border-brand-red/20 -z-10" />
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <span className="inline-block text-brand-red text-sm font-semibold tracking-widest uppercase mb-3">
              — About USB-5.0 VISUALS —
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {aboutData ? (language === 'id' ? aboutData.title.id : aboutData.title.en) : t.about.title}
            </h2>
            <p className="text-brand-red font-medium mb-6 text-lg">
              {aboutData ? (language === 'id' ? aboutData.subtitle.id : aboutData.subtitle.en) : t.about.subtitle}
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              {aboutData ? (language === 'id' ? aboutData.description1.id : aboutData.description1.en) : t.about.description1}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {aboutData ? (language === 'id' ? aboutData.description2.id : aboutData.description2.en) : t.about.description2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {(aboutData?.stats || t.about.stats).map((stat, idx) => (
                <div key={idx} className="bg-brand-dark rounded-xl p-4 text-center border border-white/5">
                  <span className="block text-2xl font-black text-brand-red">
                    {(stat as AboutStat).value ?? (stat as { value: string }).value}
                  </span>
                  <span className="text-gray-400 text-xs mt-1 block">
                    {(stat as AboutStat).label_id
                      ? (language === 'id' ? (stat as AboutStat).label_id : (stat as AboutStat).label_en)
                      : (stat as { label: string }).label}
                  </span>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="space-y-4">
              {t.about.values.map((val, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red flex-shrink-0">
                    {valueIcons[idx]}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{val.title}</h4>
                    <p className="text-gray-400 text-sm">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
