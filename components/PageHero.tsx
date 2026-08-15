import type { ReactNode } from 'react';
import Container from './Container';
import Reveal from './Reveal';
import Eyebrow from './Eyebrow';

export default function PageHero({
  eyebrow,
  title,
  lede,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink/12 pb-20 pt-12 sm:pb-28 sm:pt-20">
      <Container wide>
        <div className={aside ? 'grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]' : ''}>
          <Reveal>
            <Eyebrow tone="burgundy">{eyebrow}</Eyebrow>
            <h1 className="mt-8 max-w-4xl font-display text-display-lg text-ink">{title}</h1>
            {lede && <div className="mt-9 max-w-measure text-lede text-ink-soft">{lede}</div>}
            {children && <div className="mt-11">{children}</div>}
          </Reveal>
          {aside && <Reveal delay={150}>{aside}</Reveal>}
        </div>
      </Container>
    </section>
  );
}
