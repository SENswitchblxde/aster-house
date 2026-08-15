import Link from 'next/link';
import type { Service } from '@/content/services';

/**
 * Not a card. A column of a printed contents page: folio, rule, name, gloss,
 * and a link that draws its own underline.
 */
export default function ServiceBlock({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group flex h-full flex-col border-t border-ink/15 pt-7 transition-colors duration-500 hover:border-burgundy"
    >
      <span className="eyebrow text-ink-faint transition-colors duration-500 group-hover:text-burgundy">
        {service.folio}
      </span>
      <h3 className="mt-6 font-display text-[2.1rem] leading-none text-ink">{service.name}</h3>
      <p className="mt-5 max-w-sm font-text text-body text-ink-soft">{service.summary}</p>
      <span className="mt-8 inline-flex items-center gap-2 font-text text-[0.72rem] font-medium uppercase tracking-[0.16em] text-burgundy">
        <span className="link-draw">{service.ctaLabel}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
