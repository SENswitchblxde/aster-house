import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'quiet' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-3 font-text uppercase tracking-[0.16em] text-[0.72rem] font-medium transition-all duration-300 ease-editorial';

const variants: Record<Variant, string> = {
  primary:
    'bg-burgundy text-paper-light px-7 py-4 hover:bg-burgundy-deep hover:tracking-[0.2em]',
  secondary:
    'border border-ink/25 text-ink px-7 py-4 hover:border-ink hover:bg-ink hover:text-paper-light',
  onDark:
    'border border-paper/35 text-paper-light px-7 py-4 hover:bg-paper-light hover:text-ink hover:border-paper-light',
  quiet: 'text-burgundy link-draw py-1',
};

const sizes: Record<Size, string> = {
  md: '',
  lg: 'px-9 py-5 text-[0.78rem]',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${variant === 'quiet' ? '' : sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {variant === 'quiet' && <span aria-hidden="true">&rarr;</span>}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
