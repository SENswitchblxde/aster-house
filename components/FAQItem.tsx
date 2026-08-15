import Link from 'next/link';
import type { FaqItem as Item } from '@/content/faq';

/**
 * Native <details> — keyboard accessible, works without JavaScript,
 * and printable, which matters for a page people forward to a spouse.
 */
export default function FAQItem({ item }: { item: Item }) {
  return (
    <details className="group border-t border-ink/15 py-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
        <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-burgundy sm:text-2xl">
          {item.q}
        </h3>
        <span
          aria-hidden="true"
          className="mt-2 shrink-0 font-text text-lg leading-none text-burgundy transition-transform duration-500 ease-editorial group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="max-w-measure pt-5">
        <p className="font-text text-body text-ink-soft">{item.a}</p>
        {item.link && (
          <Link
            href={item.link.href}
            className="mt-4 inline-block font-text text-[0.72rem] font-medium uppercase tracking-[0.16em] text-burgundy link-draw"
          >
            {item.link.label}
          </Link>
        )}
      </div>
    </details>
  );
}
