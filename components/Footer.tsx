import Link from 'next/link';
import Container from './Container';
import { Wordmark } from './Header';
import SocialIcon from './SocialIcon';
import { footerNav, site, socials } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/12 bg-paper-deep">
      {/*
        Come say hi — the first thing in the footer, not a line of small print
        at the bottom of a column.
      */}
      <Container wide className="border-b border-ink/12 py-14 sm:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <h2 className="font-display text-[2.1rem] leading-none text-ink sm:text-[2.75rem]">
              Come say hi.
            </h2>
            <p className="mt-4 max-w-sm font-text text-[1rem] leading-relaxed text-ink-soft">
              We post about the books we&apos;re making, and the work that goes into them.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-x-10">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} — ${s.label} (opens in a new tab)`}
                  className="group relative inline-flex items-center gap-3 font-display text-[1.35rem] leading-none text-ink transition-colors duration-300 hover:text-burgundy sm:text-[1.6rem]"
                >
                  <SocialIcon src={s.icon} scale={s.scale} />
                  <span className="link-draw">{s.label}</span>
                  <span
                    aria-hidden="true"
                    className="font-text text-[0.75em] text-burgundy transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  >
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

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
