import type { Metadata } from 'next';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About Aster House — an independent publishing and editorial studio',
  description:
    'Aster House is an independent publishing and editorial studio based in India, working with authors globally. Editorial judgment, craft, transparency and author ownership.',
  alternates: { canonical: '/about' },
};

const beliefs = [
  {
    title: 'Editorial matters.',
    body: 'A book that has not been properly edited is a manuscript with a cover on it. Every project starts with someone reading the whole thing and saying what they actually think.',
  },
  {
    title: 'Design matters.',
    body: 'A book is an object as well as a text. The trim size, the paper, the measure, the way the title breaks across three lines — these are not finishing touches, they are the reading experience.',
  },
  {
    title: 'Production matters.',
    body: 'A file that looks right on screen can arrive from press looking wrong. We specify, proof and check, because the author only sees the version that comes out of the box.',
  },
  {
    title: 'Authors should understand the publishing process.',
    body: 'Nobody should sign a contract they cannot read or pay for a service they cannot describe. If we cannot explain what a line item does, it should not be on the invoice.',
  },
  {
    title: 'Authors should retain meaningful control of their work.',
    body: 'Your copyright is yours. The rights you licence are written down, limited and time-bound. You approve the cover, the edit and the final files before anything is printed.',
  },
];

const team = [
  {
    role: 'Editorial',
    name: 'Editorial direction',
    body: 'Manuscript assessment, developmental editing and the decision about what a book actually needs. Our editors have worked across trade fiction, academic monographs and commissioned nonfiction.',
  },
  {
    role: 'Design',
    name: 'Design & production',
    body: 'Covers, interiors, typesetting and print. Every sample edition on this site was designed and specified in-house, down to the paper weight.',
  },
  {
    role: 'Writing',
    name: 'Ghostwriting',
    body: 'Interviewers and writers who work in long form: founder stories, professional books, memoirs and family histories, drafted in the author’s voice.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Publishing is more than putting a book into print."
        lede="Aster House is an independent publishing and editorial studio. We are based in India and work with authors anywhere."
      />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SectionHeading eyebrow="Who we are" title="A studio, not a factory." />
            <Reveal delay={100} className="max-w-measure space-y-6 font-text text-body text-ink-soft">
              <p>
                Aster House was started because there is a wide gap in publishing and not much sitting
                in it. On one side, traditional houses acquire a very small number of books and take
                years to do it. On the other, a great many services will convert a Word file into a
                paperback and call that publishing.
              </p>
              <p>
                In between are the books that deserve a proper editor, a designer who reads them, and
                someone who knows what happens on press — but whose authors have no route to any of
                that. Those are the books we want.
              </p>
              <p>
                We work on a small number of projects at a time. We say no to manuscripts we cannot
                improve and to projects where the author&apos;s expectations and the market&apos;s
                reality have not met. That is not exclusivity. It is the only way the work stays good.
              </p>
              <p className="border-l-2 border-burgundy pl-6 text-ink">
                We are new. Our first list is in progress, and the books on this site are sample
                editions rather than published titles. We would rather tell you that than borrow
                credibility we have not earned yet.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 sm:py-32">
        <Container wide>
          <SectionHeading eyebrow="Principles" title="What we believe" />
          <div className="mt-16 grid gap-x-14 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 70}>
                <div className="border-t-2 border-burgundy py-8">
                  <h3 className="font-display text-[1.7rem] leading-tight text-ink">{b.title}</h3>
                  <p className="mt-4 max-w-md font-text text-body text-ink-soft">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="The team"
            title="Three kinds of person make a book."
            lede="Editorial, design and writing sit in the same studio and talk to each other, which is why a cover here is designed by someone who has read the manuscript."
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {team.map((t, i) => (
              <Reveal key={t.role} delay={i * 90}>
                <div className="border-t border-ink/15 pt-7">
                  <p className="eyebrow text-burgundy">{t.role}</p>
                  <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-ink">{t.name}</h3>
                  <p className="mt-4 font-text text-body text-ink-soft">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150} className="mt-14">
            <p className="max-w-measure font-text text-[0.95rem] leading-relaxed text-ink-faint">
              Named biographies and photographs will be added here as the studio grows. We would
              rather leave this section honest and short than fill it with stock portraits.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
