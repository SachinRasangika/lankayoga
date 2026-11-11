import { useMemo } from 'react';
import { CalendarSearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgramFilters } from './ProgramFilters';
import { ProgramCard } from './ProgramCard';
import { Button } from '../ui/Button';
import { useProgramFilters } from '../../hooks/useProgramFilters';
import { formatMonthLabel } from '../../utils/format';
import { Program } from '../../types';

export function StayCalendar({
  eyebrow,
  title,
  image,
  imageAlt,
  programs,
  hideFocus = true,
  hideKind = false
}: {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  programs: Program[];
  hideFocus?: boolean;
  hideKind?: boolean;
}) {
  const { filters, update, reset, results, months, activeCount } = useProgramFilters(programs);

  const grouped = useMemo(() => {
    const open = results.filter((program) => program.openDates);
    const dated = results.filter((program) => !program.openDates);
    const map = new Map<string, Program[]>();
    dated.forEach((program) => {
      const key = program.startDate.slice(0, 7);
      map.set(key, [...(map.get(key) ?? []), program]);
    });
    return { open, months: Array.from(map.entries()) };
  }, [results]);

  return (
    <>
      <section className="relative isolate flex h-[46svh] min-h-[19rem] items-end overflow-hidden bg-sand-900">
        <motion.img
          src={image}
          alt={imageAlt}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 18, ease: 'linear' }}
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-sand-900/45" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-24">
          <p className="eyebrow text-sand-200">{eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-display text-[2.5rem] font-light leading-[1.04] tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative z-40 -mt-10">
          <ProgramFilters
            filters={filters}
            months={months}
            resultCount={results.length}
            activeCount={activeCount}
            hideFocus={hideFocus}
            hideKind={hideKind}
            onUpdate={update}
            onReset={reset} />
        </div>

        {results.length === 0 ?
          <div className="flex flex-col items-center gap-5 py-28 text-center">
            <CalendarSearchIcon className="h-7 w-7 text-sage-500" />
            <h2 className="font-display text-2xl font-light text-ink">Nothing on those dates</h2>
            <Button variant="secondary" size="sm" onClick={reset}>
              Clear filters
            </Button>
          </div> :
          <div className="flex flex-col gap-16 py-20 sm:py-24">
            {grouped.open.length ?
              <section aria-label="Open for any dates">
                <h2 className="font-display text-2xl font-light tracking-tight text-muted">
                  Open for any dates
                </h2>
                <div className="mt-5 border-t border-line">
                  {grouped.open.map((program) =>
                    <ProgramCard key={program.id} program={program} />
                  )}
                </div>
              </section> :
              null}
            {grouped.months.map(([monthKey, monthPrograms]) =>
              <section key={monthKey} aria-label={formatMonthLabel(`${monthKey}-01`)}>
                <h2 className="font-display text-2xl font-light tracking-tight text-muted">
                  {formatMonthLabel(`${monthKey}-01`)}
                </h2>
                <div className="mt-5 border-t border-line">
                  {monthPrograms.map((program) =>
                    <ProgramCard key={program.id} program={program} />
                  )}
                </div>
              </section>
            )}
          </div>}
      </div>

    </>
  );
}
