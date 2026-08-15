import Button from './Button';
import Container from './Container';
import Reveal from './Reveal';
import BookCover from './BookCover';
import { bookBySlug } from '@/content/books';

/**
 * The closing invitation. One book stands beside it — the only decoration
 * on the page, and the whole point of the company.
 */
export default function CTASection({
  eyebrow = 'Start here',
  title = 'Have a book in mind?',
  body = "Whether you have a finished manuscript, a half-formed idea or a story you've been carrying for years, we'd like to hear about it.",
  cta = { label: 'Start your book', href: '/start-your-book' },
  bookSlug = 'a-life-in-letters',
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
  bookSlug?: string;
}) {
  const book = bookBySlug(bookSlug);

  return (
    <section className="bg-ink py-24 text-paper-light sm:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-paper/50">{eyebrow}</p>
            <h2 className="mt-7 max-w-2xl font-display text-display-lg">{title}</h2>
            <p className="mt-7 max-w-measure text-lede text-paper/75">{body}</p>
            <div className="mt-11">
              <Button href={cta.href} variant="primary" size="lg">
                {cta.label}
              </Button>
            </div>
          </Reveal>

          {book && (
            <Reveal delay={120} className="justify-self-center lg:justify-self-end">
              <div className="w-[13rem] sm:w-[16rem]">
                <BookCover book={book} />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
