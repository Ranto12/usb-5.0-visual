'use client';

import { useLanguage } from '@/context/LanguageContext';

interface ContactData {
  socials: {
    whatsapp: string;
    instagram: string;
    instagram_url: string;
    youtube_url: string;
    tiktok_url: string;
  };
  location: { id: string; en: string };
  available: { id: string; en: string };
}

const ApertureIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="#E30613" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="16" r="5" fill="#E30613" />
    <line x1="16" y1="2" x2="16" y2="9" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="23" x2="16" y2="30" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="2" y1="16" x2="9" y2="16" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="23" y1="16" x2="30" y2="16" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6.34" y1="6.34" x2="11.41" y2="11.41" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20.59" y1="20.59" x2="25.66" y2="25.66" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="25.66" y1="6.34" x2="20.59" y2="11.41" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11.41" y1="20.59" x2="6.34" y2="25.66" stroke="#E30613" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Footer({ contactData }: { contactData: ContactData | null }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const waNumber = contactData?.socials.whatsapp || '6285840385667';
  const instagramUrl = contactData?.socials.instagram_url || 'https://instagram.com';
  const youtubeUrl = contactData?.socials.youtube_url || 'https://youtube.com';
  const tiktokUrl = contactData?.socials.tiktok_url || 'https://tiktok.com';

  const socialLinks = [
    {
      name: 'Instagram',
      href: instagramUrl,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${waNumber}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: youtubeUrl,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: tiktokUrl,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
        </svg>
      ),
    },
  ];

  const navSections = [
    {
      title: t.footer.quickLinks,
      links: [
        { label: t.nav.home, href: '#home' },
        { label: t.nav.services, href: '#services' },
        { label: t.nav.portfolio, href: '#portfolio' },
        { label: t.nav.pricing, href: '#pricing' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.contact, href: '#contact' },
      ],
    },
    {
      title: t.footer.services,
      links: [
        { label: 'Fotografi Wisuda', href: '#services' },
        { label: 'Fotografi Event', href: '#services' },
        { label: 'Videografi Sinematik', href: '#services' },
        { label: 'Editing Video & Foto', href: '#services' },
        { label: 'Web Development', href: '#services' },
      ],
    },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 mb-4 group">
              <ApertureIcon />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base tracking-widest group-hover:text-brand-red transition-colors">USB-5.0</span>
                <span className="text-brand-red font-semibold text-xs tracking-[0.3em]">VISUALS</span>
              </div>
            </button>
            <p className="text-gray-500 text-sm mb-2 font-medium">{t.footer.tagline}</p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">{t.footer.description}</p>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">{t.footer.followUs}</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-lg bg-brand-black border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav sections */}
          {navSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-gray-500 hover:text-white text-sm transition-colors text-left animated-underline"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="border-t border-white/5 bg-brand-red/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold">Siap bekerja sama dengan kami?</p>
              <p className="text-gray-400 text-sm">Konsultasi gratis via WhatsApp sekarang</p>
            </div>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
            <p>
              © {year} USB-5.0 VISUALS. {t.footer.rights}
            </p>
            <p className="flex items-center gap-1">
              {t.footer.madeWith}
              <span className="text-brand-red">❤</span>
              {t.footer.by}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
