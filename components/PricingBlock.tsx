import Link from 'next/link';
import type { PriceLine } from '@/content/pricing';

export default function PricingBlock({ line }: { line: PriceLine }) {
  return (
    <Link
      href={line.href}
      className="group grid grid-cols-1 gap-2 border-t border-ink/15 py-7 transition-colors duration-500 hover:border-burgundy sm:grid-cols-[minmax(0,16rem)_1fr_auto] sm:items-baseline sm:gap-8"
    >
      <h3 className="font-display text-2xl text-ink">
        <span className="link-draw">{line.service}</span>
      </h3>
      <p className="max-w-md font-text text-[0.95rem] leading-relaxed text-ink-soft">{line.note}</p>
      <p className="font-text text-[0.8rem] font-medium uppercase tracking-[0.16em] text-burgundy sm:text-right">
        {line.price}
      </p>
    </Link>
  );
}
