import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={cn(
        // base glass card
        'relative cursor-pointer overflow-hidden rounded-[18px]',
        'bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(245,240,232,0.82))] backdrop-blur-xl',
        'border border-gold/20',
        'shadow-[0_20px_40px_rgba(128,0,32,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]',
        'transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        // hover lift + deeper shadow + gold-foil edge via border color + gold glow ring
        'hover:-translate-y-2.5 hover:scale-[1.012] hover:border-gold/70',
        'hover:shadow-[0_32px_64px_rgba(128,0,32,0.18),0_0_0_1px_rgba(212,175,55,0.5),0_8px_24px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(255,255,255,0.6)]',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
