import type { ReactNode } from 'react';

/**
 * The running head. Used to label a section the way a printed book labels
 * a part opener — never as decoration.
 */
export default function Eyebrow({
  children,
  folio,
  tone = 'ink',
  className = '',
}: {
  children: ReactNode;
  folio?: string;
  tone?: 'ink' | 'burgundy' | 'paper';
  className?: string;
}) {
  const colour =
    tone === 'burgundy' ? 'text-burgundy' : tone === 'paper' ? 'text-paper/70' : 'text-ink-faint';

  return (
    <p className={`eyebrow flex items-baseline gap-3 ${colour} ${className}`}>
      {folio && (
        <>
          <span className="tabular-nums">{folio}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
