import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import PriceList from '@/components/PriceList';
import About from '@/components/About';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {
  getServices,
  getPortfolio,
  getPricingCategories,
  getHero,
  getAbout,
  getContactInfo,
  getBookingSettings,
} from '@/lib/content';

export const revalidate = 60;

export default async function Home() {
  const [services, portfolio, pricingCategories, heroData, aboutData, contactData, bookingSettings] =
    await Promise.all([
      getServices(),
      getPortfolio(),
      getPricingCategories(),
      getHero(),
      getAbout(),
      getContactInfo(),
      getBookingSettings(),
    ]);

  return (
    <main className="min-h-screen bg-brand-bone">
      <Navbar contactData={contactData} />
      <Hero heroData={heroData} />
      <Services services={services} />
      <Portfolio portfolio={portfolio} />
      <PriceList pricingCategories={pricingCategories} />
      <About aboutData={aboutData} />
      <Booking bookingSettings={bookingSettings} />
      <Contact contactData={contactData} />
      <Footer contactData={contactData} />
    </main>
  );
}
