/**
 * NOT IN USE.
 *
 * Aster House has no published authors yet, and inventing praise would
 * undermine the one thing this site is selling. The component exists so
 * that real quotes can be dropped in the moment there are real quotes.
 */
export type TestimonialData = {
  quote: string;
  attribution: string;
  role: string;
  bookTitle?: string;
};

export default function Testimonial({ data }: { data: TestimonialData }) {
  return (
    <figure className="max-w-3xl">
      <blockquote className="font-display text-display-sm leading-snug text-ink">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 font-text text-sm text-ink-soft">
        <span className="font-medium text-ink">{data.attribution}</span>
        <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
        <span>{data.role}</span>
        {data.bookTitle && <cite className="not-italic text-ink-faint">{data.bookTitle}</cite>}
      </figcaption>
    </figure>
  );
}
