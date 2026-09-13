import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Program } from '../../types';
import { formatDateRange, formatPrice } from '../../utils/format';
import { durationLabel, focusLabels } from '../../utils/labels';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onSelect(program)}
        className="grid w-full grid-cols-1 items-center gap-5 border-b border-line py-6 text-left transition-colors duration-200 ease-calm hover:border-sage-400 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-7">
        
        <div className="overflow-hidden rounded-2xl">
          <img
            src={program.image}
            alt=""
            loading="lazy"
            className="h-28 w-full object-cover transition-transform duration-[450ms] ease-calm group-hover:scale-[1.05] sm:h-20" />
          
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-2xl font-light leading-tight tracking-tight text-ink sm:text-[1.75rem]">
            {program.title}
          </h3>
          <p className="text-sm text-muted">
            {formatDateRange(program.startDate, program.endDate)} · {durationLabel(program.durationDays)} ·{' '}
            {focusLabels[program.focus]}
          </p>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <span className="font-display text-xl font-light text-ink">{formatPrice(program.priceUsd)}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-[transform,border-color,color] duration-200 ease-calm group-hover:translate-x-0.5 group-hover:border-sage-400 group-hover:text-ink">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </button>
    </article>);

}