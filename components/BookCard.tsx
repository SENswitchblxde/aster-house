import Link from 'next/link';
import type { Book } from '@/content/books';
import BookCover from './BookCover';

export default function BookCard({
  book,
  className = '',
  showNote = true,
}: {
  book: Book;
  className?: string;
  showNote?: boolean;
}) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={`group block ${className}`}
    >
      <div className="transition-transform duration-700 ease-editorial group-hover:-translate-y-2">
        <BookCover book={book} />
      </div>
      <div className="mt-6">
        {book.sample && (
          <p className="eyebrow text-burgundy">Sample edition</p>
        )}
        <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
          <span className="link-draw">{book.title}</span>
        </h3>
        <p className="mt-2 font-text text-sm text-ink-faint">{book.category}</p>
        {showNote && (
          <p className="mt-3 max-w-xs font-text text-[0.95rem] leading-relaxed text-ink-soft">
            {book.note}
          </p>
        )}
      </div>
    </Link>
  );
}
