import type { Stage } from '@/content/process';

export default function ProcessStep({
  stage,
  tone = 'ink',
}: {
  stage: Stage;
  tone?: 'ink' | 'paper';
}) {
  const dark = tone === 'paper';
  return (
    <li
      className={`grid grid-cols-[3.5rem_1fr] gap-x-5 border-t py-8 sm:grid-cols-[5rem_minmax(0,14rem)_1fr] sm:gap-x-8 sm:py-10 ${
        dark ? 'border-paper/20' : 'border-ink/15'
      }`}
    >
      <span
        className={`font-display text-2xl tabular-nums sm:text-3xl ${
          dark ? 'text-paper/45' : 'text-ink-faint'
        }`}
      >
        {stage.n}
      </span>
      <h3
        className={`font-text text-[0.78rem] font-medium uppercase tracking-[0.2em] pt-2 sm:pt-3 ${
          dark ? 'text-paper-light' : 'text-ink'
        }`}
      >
        {stage.title}
      </h3>
      <p
        className={`col-start-2 mt-3 max-w-lg font-text text-body sm:col-start-3 sm:mt-0 sm:pt-2 ${
          dark ? 'text-paper/70' : 'text-ink-soft'
        }`}
      >
        {stage.body}
      </p>
    </li>
  );
}
