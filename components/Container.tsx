import type { ReactNode } from 'react';

export default function Container({
  children,
  className = '',
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-10 lg:px-14 ${wide ? 'max-w-shelf' : 'max-w-[80rem]'} ${className}`}
    >
      {children}
    </div>
  );
}
