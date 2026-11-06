import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, XIcon } from 'lucide-react';
import { Program } from '../../types';
import { getTeachers } from '../../data/teachers';
import { formatDateRange, formatPrice } from '../../utils/format';
import { durationLabel, focusLabels, kindLabels } from '../../utils/labels';
import { Button } from '../ui/Button';

interface ProgramDetailPanelProps {
  program: Program | null;
  onClose: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ProgramDetailPanel({ program, onClose }: ProgramDetailPanelProps) {
  const navigate = useNavigate();
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {program ?
      <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={program.title}>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          onClick={onClose}
          className="absolute inset-0 bg-sand-900/50 backdrop-blur-sm" />
        
          <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease }}
          className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-surface shadow-lift">
          
            <div className="relative shrink-0">
              <img src={program.image} alt="" className="h-52 w-full object-cover" />
              <div className="absolute inset-0 bg-sand-900/35" />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close programme details"
              className="glass-dark absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white">
              
                <XIcon className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <p className="eyebrow text-sand-200">
                  {kindLabels[program.kind]} · {focusLabels[program.focus]}
                </p>
                <h2 className="mt-1.5 font-display text-3xl font-light leading-tight text-white">{program.title}</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line pb-6 sm:grid-cols-4">
                {[
              { label: 'Dates', value: formatDateRange(program.startDate, program.endDate) },
              { label: 'Length', value: durationLabel(program.durationDays) },
              { label: 'Cohort', value: `${program.capacity} places` },
              { label: 'From', value: formatPrice(program.priceUsd) }].
              map((item) =>
              <div key={item.label} className="flex flex-col gap-1">
                    <dt className="text-[0.625rem] uppercase tracking-widest text-muted">{item.label}</dt>
                    <dd className="text-sm font-medium text-ink">{item.value}</dd>
                  </div>
              )}
              </dl>

              <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">{program.summary}</p>
              <p className="mt-3 text-sm text-muted">
                <span className="text-ink">Level:</span> {program.level}
              </p>

              <section className="mt-8">
                <h3 className="eyebrow text-terracotta-600 dark:text-terracotta-300">A day here</h3>
                <ol className="mt-4 border-l border-line">
                  {program.rhythm.map((entry) =>
                <li key={entry.time} className="relative flex gap-4 pb-4 pl-5 last:pb-0">
                      <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-sage-400" />
                      <span className="w-12 shrink-0 font-display text-base text-ink">{entry.time}</span>
                      <span className="text-sm leading-relaxed text-muted">{entry.activity}</span>
                    </li>
                )}
                </ol>
              </section>

              <section className="mt-8">
                <h3 className="eyebrow text-terracotta-600 dark:text-terracotta-300">What is included</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {program.includes.map((item) =>
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                      {item}
                    </li>
                )}
                </ul>
              </section>

              <section className="mt-8">
                <h3 className="eyebrow text-terracotta-600 dark:text-terracotta-300">Led by</h3>
                <ul className="mt-4 flex flex-col gap-4">
                  {getTeachers(program.teacherIds).map((teacher) =>
                <li key={teacher.id} className="flex items-center gap-3.5">
                      <img src={teacher.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">{teacher.name}</p>
                        <p className="truncate text-xs text-muted">{teacher.role}</p>
                      </div>
                    </li>
                )}
                </ul>
              </section>
            </div>

            <div className="glass-panel flex shrink-0 items-center justify-between gap-4 border-x-0 border-b-0 px-5 py-4 sm:px-7">
              <div>
                <p className="font-display text-xl font-light text-ink">{formatPrice(program.priceUsd)}</p>
                <p className="text-xs text-muted">{program.spotsLeft} of {program.capacity} places remaining</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    navigate(`/contact?topic=${encodeURIComponent(`${program.title} (${formatDateRange(program.startDate, program.endDate)})`)}`);
                  }}>
                  
                  Ask a question
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    onClose();
                    navigate(`/book?program=${program.id}`);
                  }}>
                  
                  Reserve a place
                </Button>
              </div>
            </div>
          </motion.aside>
        </div> :
      null}
    </AnimatePresence>);

}