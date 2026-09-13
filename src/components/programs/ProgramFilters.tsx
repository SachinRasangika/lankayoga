import React from 'react';
import { RotateCcwIcon } from 'lucide-react';
import { DurationFilter, FocusFilter, KindFilter, ProgramFilterState } from '../../hooks/useProgramFilters';
import { formatMonthLabel } from '../../utils/format';
import { cn } from '../../utils/cn';

interface ProgramFiltersProps {
  filters: ProgramFilterState;
  months: {key: string;iso: string;}[];
  resultCount: number;
  activeCount: number;
  onUpdate: <K extends keyof ProgramFilterState>(key: K, value: ProgramFilterState[K]) => void;
  onReset: () => void;
}

const focusOptions: {value: FocusFilter;label: string;}[] = [
{ value: 'all', label: 'Everything' },
{ value: 'yoga', label: 'Yoga' },
{ value: 'ayurveda', label: 'Ayurveda' },
{ value: 'integrated', label: 'Both' }];


const durationOptions: {value: DurationFilter;label: string;}[] = [
{ value: 'all', label: 'Any length' },
{ value: 'short', label: 'Up to a week' },
{ value: 'week', label: '1 – 2 weeks' },
{ value: 'long', label: 'Longer' }];


const kindOptions: {value: KindFilter;label: string;}[] = [
{ value: 'all', label: 'All formats' },
{ value: 'retreat', label: 'Retreats' },
{ value: 'training', label: 'Training' },
{ value: 'panchakarma', label: 'Panchakarma' }];


const selectClass =
'rounded-full border border-line bg-surface px-4 py-2 text-[0.8125rem] text-ink transition-colors duration-200 ease-calm hover:border-sage-400 focus:border-sage-400 focus:outline-none';

export function ProgramFilters({
  filters,
  months,
  resultCount,
  activeCount,
  onUpdate,
  onReset
}: ProgramFiltersProps) {
  return (
    <div className="sticky top-[4.75rem] z-30 sm:top-[5.25rem]">
      <div className="glass-panel flex flex-col gap-4 rounded-3xl p-4 shadow-lift sm:flex-row sm:items-center sm:gap-5 sm:rounded-full sm:py-3 sm:pl-4 sm:pr-5">
        <div
          role="group"
          aria-label="Wellness focus"
          className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-line p-1">
          
          {focusOptions.map((option) => {
            const selected = option.value === filters.focus;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onUpdate('focus', option.value)}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-[background-color,color] duration-200 ease-calm',
                  selected ?
                  'bg-sage-800 text-sand-50 dark:bg-sage-200 dark:text-sage-900' :
                  'text-muted hover:text-ink'
                )}>
                
                {option.label}
              </button>);

          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="filter-duration">
            Duration
          </label>
          <select
            id="filter-duration"
            value={filters.duration}
            onChange={(event) => onUpdate('duration', event.target.value as DurationFilter)}
            className={selectClass}>
            
            {durationOptions.map((option) =>
            <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )}
          </select>

          <label className="sr-only" htmlFor="filter-kind">
            Format
          </label>
          <select
            id="filter-kind"
            value={filters.kind}
            onChange={(event) => onUpdate('kind', event.target.value as KindFilter)}
            className={selectClass}>
            
            {kindOptions.map((option) =>
            <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )}
          </select>

          <label className="sr-only" htmlFor="filter-month">
            Month
          </label>
          <select
            id="filter-month"
            value={filters.month}
            onChange={(event) => onUpdate('month', event.target.value)}
            className={selectClass}>
            
            <option value="all">Any month</option>
            {months.map((month) =>
            <option key={month.key} value={month.key}>
                {formatMonthLabel(month.iso)}
              </option>
            )}
          </select>
        </div>

        <div className="flex items-center gap-4 sm:ml-auto">
          <p className="whitespace-nowrap text-[0.8125rem] text-muted">
            <span className="font-medium text-ink">{resultCount}</span> dates
          </p>
          {activeCount > 0 ?
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.8125rem] font-medium text-terracotta-600 transition-colors duration-200 hover:text-terracotta-700 dark:text-terracotta-300">
            
              <RotateCcwIcon className="h-3.5 w-3.5" />
              Clear
            </button> :
          null}
        </div>
      </div>
    </div>);

}