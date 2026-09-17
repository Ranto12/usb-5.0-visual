import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'USB-5.0 VISUALS | Photography · Videography · Content Creation',
  description:
    'USB-5.0 VISUALS adalah studio kreatif profesional yang menyediakan layanan fotografi, videografi sinematik, dan pembuatan konten berkualitas tinggi.',
  keywords: ['photography', 'videography', 'content creation', 'fotografi wisuda', 'video cinematic', 'web development'],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'USB-5.0 VISUALS',
    description: 'Photography · Videography · Content Creation',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${GeistMono.variable}`}>
      <body className="bg-brand-black text-white antialiased font-mono">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
