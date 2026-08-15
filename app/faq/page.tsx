import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import FAQItem from '@/components/FAQItem';
import CTASection from '@/components/CTASection';
import { faqs } from '@/content/faq';

export const metadata: Metadata = {
  title: 'FAQ — publishing, ghostwriting and editing questions answered',
  description:
    'Copyright, costs, ISBNs, print runs, distribution, timelines and guarantees. Straight answers to the questions authors ask before commissioning a book.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="The things authors ask first."
        lede="Rights, costs, timelines and what we will not promise. If something is missing here, ask us directly."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i, 6) * 40}>
                <FAQItem item={item} />
              </Reveal>
            ))}
            <div className="border-t border-ink/15" />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Still deciding?"
        title="Tell us about your book."
        body="Most of these questions have a more useful answer once we know what the book is. Send us the details and we will answer specifically."
        bookSlug="cities-without-maps"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
