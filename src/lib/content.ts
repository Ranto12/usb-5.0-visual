/**
 * Content reader — membaca data dari Keystatic JSON files
 * Fallback ke translations.ts jika file belum ada
 */

import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Reader instance
export const reader = createReader(process.cwd(), keystaticConfig);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ServiceItem {
  slug: string;
  order: number;
  tag: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  icon: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  subtitle: string;
  category: 'photo' | 'video' | 'web';
  image_url: string | null;
  image_width: number;
  image_height: number;
  order: number;
  featured: boolean;
}

export interface PricingPackage {
  name: string;
  price: string;
  unit_id: string;
  unit_en: string;
  popular: boolean;
  features_id: string;
  features_en: string;
}

export interface PricingCategory {
  slug: string;
  order: number;
  icon: string;
  name_id: string;
  name_en: string;
  packages: PricingPackage[];
}

export interface Testimonial {
  slug: string;
  name: string;
  role: string;
  avatar_url: string;
  rating: number;
  text_id: string;
  text_en: string;
  service: string;
  order: number;
}

// ─── Data Fetchers ────────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const slugs = await reader.collections.services.list();
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const item = await reader.collections.services.read(slug);
        if (!item) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { slug: _s, ...rest } = item as any;
        return { slug, ...rest } as ServiceItem;
      })
    );
    return items
      .filter((i): i is ServiceItem => i !== null)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const slugs = await reader.collections.portfolio.list();
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const item = await reader.collections.portfolio.read(slug);
        if (!item) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { slug: _slug, ...rest } = item as any;
        return { slug, ...rest } as PortfolioItem;
      })
    );
    return items
      .filter((i): i is PortfolioItem => i !== null)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order ?? 0) - (b.order ?? 0);
      });
  } catch {
    return [];
  }
}

export async function getPricingCategories(): Promise<PricingCategory[]> {
  try {
    const slugs = await reader.collections.pricingCategories.list();
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const item = await reader.collections.pricingCategories.read(slug);
        if (!item) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { slug: _slug, ...rest } = item as any;
        return { slug, ...rest } as PricingCategory;
      })
    );
    return items
      .filter((i): i is PricingCategory => i !== null)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const slugs = await reader.collections.testimonials.list();
    const items = await Promise.all(
      slugs.map(async (slug) => {
        const item = await reader.collections.testimonials.read(slug);
        if (!item) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { slug: _slug, ...rest } = item as any;
        return { slug, ...rest } as Testimonial;
      })
    );
    return items
      .filter((i): i is Testimonial => i !== null)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}

export async function getHero() {
  try {
    return await reader.singletons.hero.read();
  } catch {
    return null;
  }
}

export async function getAbout() {
  try {
    return await reader.singletons.about.read();
  } catch {
    return null;
  }
}

export async function getContactInfo() {
  try {
    return await reader.singletons.contact.read();
  } catch {
    return null;
  }
}

export async function getSiteSettings() {
  try {
    return await reader.singletons.siteSettings.read();
  } catch {
    return null;
  }
}


export async function getBookingSettings() {
  try {
    const data = await reader.singletons.bookingSettings.read();
    if (data) {
      return {
        start_hour: data.start_hour ?? 8,
        end_hour: data.end_hour ?? 20,
        slot_duration: data.slot_duration ?? 1,
        max_days_ahead: data.max_days_ahead ?? 30,
        closed_days: data.closed_days || ['0']
      };
    }
  } catch {}
  
  // Fallback
  return {
    start_hour: 8,
    end_hour: 20,
    slot_duration: 1,
    max_days_ahead: 30,
    closed_days: ['0']
  };
}
