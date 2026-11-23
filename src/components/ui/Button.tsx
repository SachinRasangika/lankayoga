import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onImage';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-sage-800 text-sand-50 hover:bg-sage-700 dark:bg-sage-200 dark:text-sage-900 dark:hover:bg-sage-100',
  secondary: 'border border-line bg-raised text-ink hover:border-sage-400 hover:text-sage-700 dark:hover:text-sage-200',
  ghost: 'text-ink hover:text-terracotta-600 dark:hover:text-terracotta-300',
  onImage: 'glass-dark text-white hover:bg-white/20'
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.8125rem]',
  md: 'px-6 py-3 text-sm'
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,transform] duration-200 ease-calm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
    variants[variant],
    sizes[size],
    className
  );
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>);

}

interface ButtonLinkProps extends BaseProps {
  to: string;
}

export function ButtonLink({ to, variant = 'primary', size = 'md', className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={classesFor(variant, size, className)}>
      {children}
    </Link>);

}

interface ButtonHrefProps extends BaseProps {
  href: string;
  external?: boolean;
}

export function ButtonHref({ href, variant = 'primary', size = 'md', className, children, external }: ButtonHrefProps) {
  return (
    <a
      href={href}
      className={classesFor(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  );
}