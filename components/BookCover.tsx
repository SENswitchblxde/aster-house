import type { Book } from '@/content/books';

/**
 * Covers are drawn, not photographed.
 *
 * Every sample edition is composed in CSS and SVG from the same set of
 * layout variants, which means the "photography" on this site is always
 * sharp, always on-brand, weighs nothing, and can be restyled from
 * content/books.ts. Sizing is handled with container query units so a
 * cover is typographically identical at 90px and at 900px.
 */

type Props = {
  book: Book;
  /** Rendering size class. Controls width only; type scales with the box. */
  className?: string;
  /** Adds the spine + page-edge treatment. Off for flat catalogue grids. */
  physical?: boolean;
  priority?: boolean;
};

function Imprint({ fg }: { fg: string }) {
  return (
    <span
      style={{
        color: fg,
        fontSize: '2.6cqw',
        letterSpacing: '0.28em',
        opacity: 0.75,
        fontWeight: 500,
      }}
      className="font-text uppercase"
    >
      Aster House
    </span>
  );
}

function CoverArt({ book }: { book: Book }) {
  const { variant, bg, fg, accent, face, tracking } = book.cover;
  const faceClass =
    face === 'text' ? 'font-text' : face === 'book' ? 'font-book' : 'font-display';

  const words = book.title.split(' ');

  switch (variant) {
    case 'stack':
      return (
        <div className="flex h-full flex-col justify-between" style={{ padding: '9cqw 8cqw' }}>
          <div style={{ width: '22%', height: '0.9cqw', background: accent }} />
          <div>
            <h3
              className={faceClass}
              style={{ color: fg, fontSize: '13.5cqw', lineHeight: 0.92, letterSpacing: '-0.02em' }}
            >
              {words.map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </h3>
            {book.subtitle && (
              <p
                className="font-text uppercase"
                style={{ color: fg, opacity: 0.7, fontSize: '3cqw', letterSpacing: '0.2em', marginTop: '5cqw' }}
              >
                {book.subtitle}
              </p>
            )}
          </div>
          <Imprint fg={fg} />
        </div>
      );

    case 'rule':
      return (
        <div
          className="flex h-full flex-col items-center justify-between text-center"
          style={{ padding: '12cqw 9cqw' }}
        >
          <div style={{ width: '100%', height: '1px', background: accent, opacity: 0.9 }} />
          <div>
            <h3
              className={faceClass}
              style={{ color: fg, fontSize: '12cqw', lineHeight: 1.02, letterSpacing: '-0.01em' }}
            >
              {book.title}
            </h3>
            {book.subtitle && (
              <p
                className="font-text uppercase"
                style={{ color: accent, fontSize: '3cqw', letterSpacing: '0.28em', marginTop: '6cqw' }}
              >
                {book.subtitle}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-center" style={{ gap: '5cqw' }}>
            <div style={{ width: '100%', height: '1px', background: accent, opacity: 0.9 }} />
            <Imprint fg={fg} />
          </div>
        </div>
      );

    case 'arc':
      return (
        <div className="relative h-full">
          <svg
            viewBox="0 0 200 300"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path d="M-10 210C40 120 120 96 210 96" fill="none" stroke={accent} strokeWidth="1.5" />
            <path d="M-10 240C50 150 130 128 210 128" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="150" cy="99" r="4" fill={accent} />
          </svg>
          <div className="relative flex h-full flex-col justify-between" style={{ padding: '9cqw 8cqw' }}>
            <Imprint fg={fg} />
            <div>
              <h3
                className={faceClass}
                style={{ color: fg, fontSize: '11cqw', lineHeight: 0.98, letterSpacing: '-0.015em' }}
              >
                {book.title}
              </h3>
              {book.subtitle && (
                <p
                  className="font-text uppercase"
                  style={{ color: fg, opacity: 0.75, fontSize: '2.9cqw', letterSpacing: '0.24em', marginTop: '5cqw' }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="relative h-full">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 5.4%, ${fg}1f 5.4%, ${fg}1f calc(5.4% + 1px))`,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0"
            style={{ left: '16%', width: '1px', background: accent, opacity: 0.55 }}
          />
          <div className="relative flex h-full flex-col justify-between" style={{ padding: '9cqw 8cqw' }}>
            <Imprint fg={fg} />
            <div>
              <h3
                className={faceClass}
                style={{
                  color: fg,
                  fontSize: '8.6cqw',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  fontWeight: 500,
                }}
              >
                {book.title}
              </h3>
              {book.subtitle && (
                <p
                  className="font-text"
                  style={{ color: accent, fontSize: '3.4cqw', lineHeight: 1.4, marginTop: '4cqw' }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case 'band':
      return (
        <div className="relative h-full">
          <div
            aria-hidden="true"
            className="absolute inset-x-0"
            style={{ top: '58%', height: '9%', background: accent }}
          />
          <div className="relative flex h-full flex-col justify-between" style={{ padding: '9cqw 8cqw' }}>
            <Imprint fg={fg} />
            <div style={{ paddingBottom: '30%' }}>
              <h3
                className={faceClass}
                style={{
                  color: fg,
                  fontSize: '9.5cqw',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  fontWeight: 500,
                }}
              >
                {book.title}
              </h3>
              {book.subtitle && (
                <p
                  className="font-text uppercase"
                  style={{ color: fg, opacity: 0.65, fontSize: '2.8cqw', letterSpacing: '0.2em', marginTop: '4cqw' }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case 'frame':
      return (
        <div className="relative h-full" style={{ padding: '7cqw' }}>
          <div
            className="flex h-full flex-col items-center justify-between text-center"
            style={{ border: `1px solid ${accent}`, padding: '9cqw 7cqw' }}
          >
            <Imprint fg={fg} />
            <div>
              <h3
                className={faceClass}
                style={{ color: fg, fontSize: '10cqw', lineHeight: 1.02, letterSpacing: '-0.01em' }}
              >
                {book.title}
              </h3>
              <div style={{ width: '18%', height: '1px', background: accent, margin: '6cqw auto' }} />
              {book.subtitle && (
                <p
                  className="font-text uppercase"
                  style={{ color: fg, opacity: 0.7, fontSize: '2.7cqw', letterSpacing: '0.22em', lineHeight: 1.6 }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>
            <span
              className="font-text uppercase"
              style={{ color: accent, fontSize: '2.5cqw', letterSpacing: '0.24em' }}
            >
              {book.category}
            </span>
          </div>
        </div>
      );

    case 'field':
    default:
      return (
        <div className="relative h-full">
          <svg viewBox="0 0 200 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M100 62 L146 118 L100 174 L54 118 Z" fill={accent} />
            <path d="M100 174 C100 210 84 224 92 252" fill="none" stroke={accent} strokeWidth="1.5" />
            <path d="M54 118 L146 118 M100 62 L100 174" stroke={bg} strokeOpacity="0.35" strokeWidth="1" />
          </svg>
          <div className="relative flex h-full flex-col justify-between" style={{ padding: '9cqw 8cqw' }}>
            <Imprint fg={fg} />
            <div>
              <h3
                className={faceClass}
                style={{
                  color: fg,
                  fontSize: tracking ? '7cqw' : '9.5cqw',
                  lineHeight: 1.02,
                  letterSpacing: tracking ?? '-0.01em',
                  textTransform: tracking ? 'uppercase' : 'none',
                }}
              >
                {book.title}
              </h3>
              {book.subtitle && (
                <p
                  className="font-text uppercase"
                  style={{ color: fg, opacity: 0.7, fontSize: '2.7cqw', letterSpacing: '0.22em', marginTop: '5cqw' }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default function BookCover({ book, className = '', physical = true }: Props) {
  const { bg } = book.cover;

  return (
    <div
      className={`relative ${className}`}
      style={{ containerType: 'inline-size' }}
      aria-label={`Sample edition cover: ${book.title}`}
      role="img"
    >
      <div
        className="relative aspect-[2/3] w-full overflow-hidden transition-transform duration-700 ease-editorial"
        style={{
          background: bg,
          boxShadow: physical
            ? '0 1px 1px rgba(37,35,33,0.10), 0 10px 26px -12px rgba(37,35,33,0.42), 0 30px 60px -30px rgba(37,35,33,0.30)'
            : '0 1px 2px rgba(37,35,33,0.10)',
        }}
      >
        <CoverArt book={book} />

        {physical && (
          <>
            {/* spine roll — the light falling into the gutter */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0"
              style={{
                width: '7%',
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.34), rgba(0,0,0,0.10) 42%, rgba(255,255,255,0.10) 78%, rgba(0,0,0,0.05))',
              }}
            />
            {/* fore-edge highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0"
              style={{ width: '1.5%', background: 'rgba(255,255,255,0.14)' }}
            />
          </>
        )}
      </div>
    </div>
  );
}
