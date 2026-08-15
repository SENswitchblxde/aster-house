'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/content/site';

function AsterMark({ className = '' }: { className?: string }) {
  // Six-rayed aster. Sits between the two words as a printer's asterism.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      </g>
    </svg>
  );
}

export function Wordmark({
  tone = 'ink',
  className = '',
}: {
  tone?: 'ink' | 'paper';
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-[0.42em] font-display uppercase leading-none tracking-[0.13em] ${
        tone === 'paper' ? 'text-paper-light' : 'text-ink'
      } ${className}`}
    >
      {/* Mark leads, as it does on the printed jackets. */}
      <AsterMark className="h-[0.68em] w-[0.68em] shrink-0 text-burgundy" />
      <span>Aster House Books</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-editorial ${
        scrolled
          ? 'border-b border-ink/10 bg-paper/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-text focus:text-sm focus:text-paper-light"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-shelf items-center justify-between gap-8 px-6 py-5 sm:px-10 lg:px-14">
        <Link href="/" aria-label="Aster House Books — home" className="shrink-0">
          <Wordmark className="text-[1.02rem] sm:text-[1.15rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`relative font-text text-[0.8rem] tracking-[0.02em] transition-colors duration-300 ${
                isActive(item.href)
                  ? 'text-burgundy'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-burgundy transition-transform duration-500 ease-editorial ${
                  isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/start-your-book"
            className="hidden bg-burgundy px-6 py-3.5 font-text text-[0.7rem] font-medium uppercase tracking-[0.16em] text-paper-light transition-all duration-300 ease-editorial hover:bg-burgundy-deep hover:tracking-[0.2em] sm:inline-block"
          >
            Start your book
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-editorial ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-editorial ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation — a title page, not a drawer of links */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.75rem] z-40 overflow-y-auto bg-paper px-6 pb-12 pt-6 lg:hidden"
      >
        <nav aria-label="Primary mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-t border-ink/12">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-5"
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span
                    className={`font-display text-[2rem] leading-none ${
                      isActive(item.href) ? 'text-burgundy' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="eyebrow text-ink-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/start-your-book"
          className="mt-10 block bg-burgundy px-6 py-5 text-center font-text text-[0.78rem] font-medium uppercase tracking-[0.18em] text-paper-light"
        >
          Start your book
        </Link>

        <p className="mt-10 font-text text-sm text-ink-faint">
          Independent Publishing &amp; Editorial Studio
          <br />
          India &bull; Working globally
        </p>
      </div>
    </header>
  );
}
