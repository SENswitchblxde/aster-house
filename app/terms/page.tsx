import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms governing the use of the Aster House Books website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        lede="Website terms. Publishing, editorial and ghostwriting work is governed by a separate signed agreement for each project."
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="prose-editorial mx-auto max-w-[42rem]">
            <p>
              This page is a placeholder. Replace it with website terms reviewed by a lawyer before
              launch. It should cover, at minimum:
            </p>
            <ul>
              <li>ownership of website content and the Aster House Books name and marks</li>
              <li>that prices shown are indicative starting points, not offers</li>
              <li>that sample editions are design specimens and not published titles</li>
              <li>that no sales, rankings or outcomes are guaranteed</li>
              <li>confidentiality of submitted manuscripts and that submission creates no obligation</li>
              <li>limitation of liability and governing law</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
