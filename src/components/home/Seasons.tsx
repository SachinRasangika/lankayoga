import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { seasons } from '../../data/seasons';
import { cn } from '../../utils/cn';

const ease = [0.23, 1, 0.32, 1] as const;

export function Seasons() {
  const [activeId, setActiveId] = useState(seasons[0].id);
  const active = seasons.find((season) => season.id === activeId) ?? seasons[0];

  return (
    <Section tone="warm">
      <SectionIntro eyebrow="When to come" title="The year has four moods" />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative h-[22rem] overflow-hidden rounded-[1.75rem] bg-sand-900 sm:h-[30rem] lg:col-span-7 lg:h-[34rem]">
          <AnimatePresence mode="sync">
            <motion.img
              key={active.id}
              src={active.image}
              alt={active.alt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0 h-full w-full object-cover" />
            
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-sand-900/45" />
          <p className="absolute bottom-6 left-6 font-display text-4xl font-light text-white sm:text-5xl">
            {active.months}
          </p>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <ul role="tablist" aria-label="Seasons" className="flex flex-col">
            {seasons.map((season) => {
              const selected = season.id === active.id;
              return (
                <li key={season.id} className="border-t border-line last:border-b">
                  <button
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActiveId(season.id)}
                    className="group flex w-full items-baseline gap-5 py-5 text-left">
                    
                    <span
                      className={cn(
                        'w-24 shrink-0 text-[0.6875rem] uppercase tracking-widest transition-colors duration-200 ease-calm',
                        selected ? 'text-terracotta-600 dark:text-terracotta-300' : 'text-muted'
                      )}>
                      
                      {season.months}
                    </span>
                    <span
                      className={cn(
                        'font-display text-2xl font-light tracking-tight transition-colors duration-200 ease-calm sm:text-[1.75rem]',
                        selected ? 'text-ink' : 'text-muted group-hover:text-ink'
                      )}>
                      
                      {season.name}
                    </span>
                  </button>
                </li>);

            })}
          </ul>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease }}
            role="tabpanel"
            aria-label={active.name}
            className="mt-8 flex flex-col gap-4">
            
            <p className="max-w-sm font-display text-[1.5rem] font-light leading-[1.25] text-ink">{active.line}</p>
            <p className="text-sm text-muted">
              Best for <span className="text-ink">{active.goodFor}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </Section>);

}