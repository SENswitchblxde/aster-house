import Link from 'next/link';
import Container from './Container';
import { Wordmark } from './Header';
import { footerNav, site } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/12 bg-paper-deep">
      <Container wide className="py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[1.3rem]" />
            <p className="mt-6 max-w-xs font-text text-[0.95rem] leading-relaxed text-ink-soft">
              {site.descriptor}
            </p>
            <p className="mt-8 font-text text-sm text-ink-faint">{site.location}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block font-text text-sm text-burgundy link-draw"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Services">
            <h2 className="eyebrow text-ink-faint">Services</h2>
            <ul className="mt-6 space-y-3">
              {footerNav.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-text text-[0.95rem] text-ink-soft link-draw hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The house">
            <h2 className="eyebrow text-ink-faint">The house</h2>
            <ul className="mt-6 space-y-3">
              {footerNav.house.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-text text-[0.95rem] text-ink-soft link-draw hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-ink-faint">Begin</h2>
            <Link
              href="/start-your-book"
              className="mt-6 inline-block border border-ink/25 px-6 py-4 font-text text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper-light"
            >
              Start your book
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-text text-[0.8rem] text-ink-faint">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-text text-[0.8rem] text-ink-faint link-draw hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
