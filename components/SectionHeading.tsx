import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  folio,
  title,
  lede,
  align = 'left',
  tone = 'ink',
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string;
  folio?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'ink' | 'paper';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const dark = tone === 'paper';
  return (
    <Reveal className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <Eyebrow
          folio={folio}
          tone={dark ? 'paper' : 'ink'}
          className={`mb-6 ${align === 'center' ? 'justify-center' : ''}`}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={`font-display text-display-md ${dark ? 'text-paper-light' : 'text-ink'} ${
          align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'
        }`}
      >
        {title}
      </Tag>
      {lede && (
        <div
          className={`mt-7 text-lede ${dark ? 'text-paper/75' : 'text-ink-soft'} ${
            align === 'center' ? 'mx-auto max-w-measure' : 'max-w-measure'
          }`}
        >
          {lede}
        </div>
      )}
    </Reveal>
  );
}
