import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PauseIcon, PlayIcon } from 'lucide-react';

type Phase = 'inhale' | 'hold' | 'exhale';

const sequence: {phase: Phase;label: string;seconds: number;scale: number;}[] = [
{ phase: 'inhale', label: 'Breathe in', seconds: 4, scale: 1 },
{ phase: 'hold', label: 'Hold', seconds: 4, scale: 1 },
{ phase: 'exhale', label: 'Breathe out', seconds: 6, scale: 0.62 }];


export function BreathGuide() {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [rounds, setRounds] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();
  const step = sequence[index];

  useEffect(() => {
    if (!running) return undefined;
    timer.current = window.setTimeout(() => {
      setIndex((current) => {
        const next = (current + 1) % sequence.length;
        if (next === 0) setRounds((value) => value + 1);
        return next;
      });
    }, step.seconds * 1000);
    return () => window.clearTimeout(timer.current);
  }, [running, index, step.seconds]);

  const scale = running ? step.scale : 0.78;

  return (
    <section className="relative isolate overflow-hidden bg-sage-900 text-sand-50">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div className="flex flex-col gap-6">
          <p className="eyebrow text-sage-300">Before anything else</p>
          <h2 className="max-w-xl font-display text-[2.25rem] font-light leading-[1.08] tracking-tight sm:text-5xl">
            Take one breath <span className="italic text-sand-200">with us</span>
          </h2>
          <p className="max-w-xs text-[0.9375rem] leading-relaxed text-sage-200">
            Four in. Four held. Six out. The same ratio we teach at 06:15.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRunning((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full bg-sand-50 px-6 py-3 text-sm font-medium text-sage-900 transition-[background-color,transform] duration-200 ease-calm hover:bg-white active:scale-[0.98]">
              
              {running ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
              {running ? 'Pause' : 'Breathe with us'}
            </button>
            <p className="text-xs uppercase tracking-widest text-sage-400" aria-live="polite">
              {rounds > 0 ? `${rounds} round${rounds === 1 ? '' : 's'} complete` : '4 · 4 · 6'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
            <span className="absolute inset-0 rounded-full border border-sage-700" />
            <span className="absolute inset-8 rounded-full border border-sage-800" />
            <motion.span
              animate={{ scale: reduceMotion ? 0.8 : scale }}
              transition={{ duration: running && !reduceMotion ? step.seconds : 0.3, ease: 'linear' }}
              className="absolute inset-6 rounded-full bg-sage-700/50" />
            
            <motion.span
              animate={{ scale: reduceMotion ? 0.78 : scale * 0.86 }}
              transition={{ duration: running && !reduceMotion ? step.seconds : 0.3, ease: 'linear' }}
              className="absolute inset-12 rounded-full bg-sand-100/10" />
            
            <div className="relative flex flex-col items-center gap-1 text-center">
              <span className="font-display text-3xl font-light text-sand-50">
                {running ? step.label : 'Ready'}
              </span>
              <span className="text-[0.6875rem] uppercase tracking-widest text-sage-300">
                {running ? `${step.seconds} counts` : 'Press to begin'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}