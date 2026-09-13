import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AudioLinesIcon } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { journeyMoments } from '../../data/dayJourney';
import { cn } from '../../utils/cn';

const ease = [0.23, 1, 0.32, 1] as const;
const HOLD_MS = 6500;

/**
 * The day, one moment at a time. It moves on its own at a walking pace and pauses
 * the instant you touch it, so nothing depends on scroll position.
 */
export function DayJourney() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = journeyMoments[index];

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % journeyMoments.length);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion]);

  return (
    <Section tone="base">
      <SectionIntro align="left" eyebrow="One day, dark to dark" title="The rhythm you are stepping into" />

      <div
        className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}>
        
        <div className="relative h-[22rem] overflow-hidden rounded-[1.75rem] bg-sand-900 sm:h-[30rem] lg:col-span-7 lg:h-[34rem]">
          <AnimatePresence mode="sync">
            <motion.img
              key={active.id}
              src={active.image}
              alt={active.alt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.3, ease }, scale: { duration: 7, ease: 'linear' } }}
              className="absolute inset-0 h-full w-full object-cover" />
            
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-sand-900/45" />
          <p className="absolute bottom-6 left-6 font-display text-4xl font-light text-white sm:text-5xl">
            {active.time}
          </p>
          <p className="glass-dark absolute bottom-6 right-6 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-widest text-white">
            <AudioLinesIcon className="h-3.5 w-3.5" />
            {active.sound}
          </p>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease }}
              className="flex min-h-[11rem] flex-col gap-4">
              
              <h3 className="max-w-sm font-display text-[2rem] font-light leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
                {active.title}
              </h3>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted">{active.body}</p>
            </motion.div>
          </AnimatePresence>

          <ol className="mt-8 flex flex-col border-t border-line">
            {journeyMoments.map((moment, momentIndex) => {
              const selected = momentIndex === index;
              return (
                <li key={moment.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-current={selected}
                    onClick={() => setIndex(momentIndex)}
                    className="group flex w-full items-center gap-5 py-3.5 text-left">
                    
                    <span
                      className={cn(
                        'font-display text-lg font-light transition-colors duration-200 ease-calm',
                        selected ? 'text-terracotta-600 dark:text-terracotta-300' : 'text-muted'
                      )}>
                      
                      {moment.time}
                    </span>
                    <span
                      className={cn(
                        'flex-1 truncate text-sm transition-colors duration-200 ease-calm',
                        selected ? 'text-ink' : 'text-muted group-hover:text-ink'
                      )}>
                      
                      {moment.title}
                    </span>
                    <span className="relative h-px w-10 overflow-hidden bg-line">
                      {selected ?
                      paused || reduceMotion ?
                      <span className="absolute inset-0 block bg-sage-500" /> :

                      <motion.span
                        key={`${moment.id}-${index}`}
                        className="absolute inset-0 block origin-left bg-sage-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: HOLD_MS / 1000, ease: 'linear' }} /> :


                      null}
                    </span>
                  </button>
                </li>);

            })}
          </ol>
        </div>
      </div>
    </Section>);

}