import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Aster House handles enquiries, manuscripts and personal data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy" lede="What we collect, why, and what we do not do with it." />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="prose-editorial mx-auto max-w-[42rem]">
            <p>
              This page is a placeholder. Replace it with a privacy notice reviewed by a lawyer in
              your jurisdiction before launch. It should cover, at minimum:
            </p>
            <ul>
              <li>what personal data the enquiry form collects and why</li>
              <li>how uploaded manuscripts are stored, who can read them, and for how long</li>
              <li>the lawful basis for processing and how consent can be withdrawn</li>
              <li>third-party processors (hosting, email, analytics, form handling)</li>
              <li>how to request access to, correction of, or deletion of your data</li>
              <li>a contact address for data protection queries</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
