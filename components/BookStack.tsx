import type { Book } from '@/content/books';
import BookCover from './BookCover';

/**
 * The hero composition: three standing editions, one square to the reader,
 * one turned away, one behind. Shadows fall on a shelf plane rather than
 * floating, so the books read as objects instead of thumbnails.
 */
export default function BookStack({ books }: { books: Book[] }) {
  const [front, middle, back] = books;

  return (
    <div className="relative w-full" style={{ perspective: '1600px' }}>
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[34rem]">
        {back && (
          <div
            className="absolute left-[38%] top-[2%] w-[42%] origin-bottom transition-transform duration-1000 ease-editorial"
            style={{ transform: 'rotateY(-16deg) rotateZ(1.5deg)' }}
          >
            <BookCover book={back} />
          </div>
        )}
        {middle && (
          <div
            className="absolute left-[2%] top-[12%] w-[45%] origin-bottom transition-transform duration-1000 ease-editorial"
            style={{ transform: 'rotateY(13deg) rotateZ(-2deg)' }}
          >
            <BookCover book={middle} />
          </div>
        )}
        {front && (
          <div className="absolute left-[26%] top-[22%] w-[50%]">
            <BookCover book={front} />
          </div>
        )}
        {/* the shelf */}
        <div
          aria-hidden="true"
          className="absolute bottom-[-2%] left-[8%] right-[8%] h-px bg-ink/15"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-6%] left-[14%] right-[14%] h-8 rounded-[50%] blur-xl"
          style={{ background: 'rgba(37,35,33,0.22)' }}
        />
      </div>
    </div>
  );
}
