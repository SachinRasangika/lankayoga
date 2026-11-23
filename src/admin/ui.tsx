import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export const adminFieldClass =
  'box-border w-full min-w-0 max-w-full min-h-12 rounded-xl border border-line bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none sm:min-h-0 sm:py-2.5 sm:text-sm';

export function Field({
  label,
  hint,
  children,
  className
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange
}: {
  value: T;
  options: {value: T;label: string;}[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 sm:py-1.5 sm:text-[0.8125rem]',
              selected ?
                'border-sage-700 bg-sage-800 text-sand-50 dark:border-sage-200 dark:bg-sage-200 dark:text-sage-900' :
                'border-line text-muted hover:border-sage-300 hover:text-ink'
            )}>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
