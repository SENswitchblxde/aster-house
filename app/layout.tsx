import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, Cormorant_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/content/site';
import './globals.css';

const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const text = DM_Sans({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
});

const book = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-book',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aster House Books — Independent Publishing & Editorial Studio',
    template: '%s — Aster House Books',
  },
  description:
    'Aster House Books is an independent publishing and editorial studio in India, working with authors globally. Assisted publishing, nonfiction ghostwriting, manuscript editing, book design and bespoke book production.',
  keywords: [
    'book publishing India',
    'assisted publishing India',
    'self publishing India',
    'ghostwriting India',
    'nonfiction ghostwriting',
    'memoir ghostwriting',
    'book editing services',
    'manuscript editing',
    'book design',
    'book printing',
    'family history books',
    'corporate history books',
    'bespoke books',
    'academic publishing',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Aster House Books — Independent Publishing & Editorial Studio',
    description:
      'You bring the story. We make the book. Publishing, ghostwriting, editorial and book production for authors in India and worldwide.',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    description: site.descriptor,
    url: site.url,
    email: site.email,
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    areaServed: 'Worldwide',
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} ${book.variable}`}
    >
      <body className="font-text antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
