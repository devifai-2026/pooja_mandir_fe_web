import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

const baseClasses = cn(
  'relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden',
  'rounded-full px-10 py-4 text-[1rem] font-semibold',
  'transition-[transform,box-shadow,background-color,border-color] duration-300',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'enabled:hover:-translate-y-[3px] enabled:active:-translate-y-px enabled:active:scale-[0.98]',
  'motion-reduce:transition-none',
);

const variantClasses = {
  primary: cn(
    'bg-[linear-gradient(135deg,#D4AF37,#FFD700)] text-indigo-deep',
    'shadow-[0_10px_30px_rgba(212,175,55,0.3)]',
    'enabled:hover:shadow-[0_16px_40px_rgba(212,175,55,0.5)]',
    // shimmer sweep
    "after:pointer-events-none after:absolute after:-top-1/2 after:-left-1/2 after:h-[200%] after:w-[200%] after:content-['']",
    'after:bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.35),transparent)]',
    'after:animate-shimmer motion-reduce:after:animate-none',
  ),
  secondary: cn(
    'border-[1.5px] border-gold bg-transparent text-gold',
    'enabled:hover:border-gold-light enabled:hover:bg-gold/10',
    'enabled:hover:shadow-[0_10px_28px_rgba(212,175,55,0.2)]',
  ),
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...rest}>
      {children}
    </button>
  );
}
