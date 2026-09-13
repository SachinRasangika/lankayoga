import { useMemo, useState } from 'react';
import { parseISO } from 'date-fns';
import { Program, ProgramKind, WellnessFocus } from '../types';

export type FocusFilter = 'all' | WellnessFocus;
export type DurationFilter = 'all' | 'short' | 'week' | 'long';
export type KindFilter = 'all' | ProgramKind;

export interface ProgramFilterState {
  focus: FocusFilter;
  duration: DurationFilter;
  kind: KindFilter;
  month: string;
}

const initialState: ProgramFilterState = {
  focus: 'all',
  duration: 'all',
  kind: 'all',
  month: 'all'
};

function matchesDuration(days: number, filter: DurationFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'short') return days <= 7;
  if (filter === 'week') return days > 7 && days <= 14;
  return days > 14;
}

export function useProgramFilters(source: Program[], initial?: Partial<ProgramFilterState>) {
  const [filters, setFilters] = useState<ProgramFilterState>({ ...initialState, ...initial });

  const months = useMemo(() => {
    const seen = new Map<string, string>();
    source.forEach((program) => {
      const date = parseISO(program.startDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      seen.set(key, program.startDate);
    });
    return Array.from(seen.entries()).
    sort(([a], [b]) => a.localeCompare(b)).
    map(([key, iso]) => ({ key, iso }));
  }, [source]);

  const results = useMemo(
    () =>
    source.
    filter((program) => filters.focus === 'all' ? true : program.focus === filters.focus).
    filter((program) => filters.kind === 'all' ? true : program.kind === filters.kind).
    filter((program) => matchesDuration(program.durationDays, filters.duration)).
    filter((program) => {
      if (filters.month === 'all') return true;
      return program.startDate.slice(0, 7) === filters.month;
    }).
    sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [source, filters]
  );

  const activeCount = Object.entries(filters).filter(([, value]) => value !== 'all').length;

  function update<K extends keyof ProgramFilterState>(key: K, value: ProgramFilterState[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setFilters(initialState);
  }

  return { filters, update, reset, results, months, activeCount };
}