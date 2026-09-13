import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { doshaProfiles } from '../../data/ayurveda';
import { Dosha } from '../../types';
import { cn } from '../../utils/cn';

export function DoshaGuide() {
  const [activeId, setActiveId] = useState<Dosha>('vata');
  const active = doshaProfiles.find((profile) => profile.id === activeId) ?? doshaProfiles[0];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div
        role="tablist"
        aria-label="Dosha constitutions"
        className="flex gap-2 overflow-x-auto lg:w-52 lg:shrink-0 lg:flex-col lg:overflow-visible">
        
        {doshaProfiles.map((profile) => {
          const selected = profile.id === activeId;
          return (
            <button
              key={profile.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActiveId(profile.id)}
              className={cn(
                'relative flex shrink-0 flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left transition-[border-color,background-color] duration-200 ease-calm lg:w-full',
                selected ?
                'border-transparent bg-sage-800 text-sand-50 dark:bg-sage-200 dark:text-sage-900' :
                'border-line text-ink hover:border-sage-300'
              )}>
              
              <span className="font-display text-xl font-light leading-none">{profile.name}</span>
              <span className={cn('text-xs', selected ? 'text-sand-200 dark:text-sage-700' : 'text-muted')}>
                {profile.elements}
              </span>
            </button>);

        })}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        role="tabpanel"
        aria-label={active.name}
        className="flex-1">
        
        <p className="max-w-prose font-display text-2xl font-light leading-snug text-ink sm:text-[1.75rem]">
          {active.signature}
        </p>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
          <span className="text-terracotta-600 dark:text-terracotta-300">When out of balance: </span>
          {active.imbalance}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="eyebrow text-muted">Favour</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {active.eat.map((item) =>
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                  {item}
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-muted">Reduce</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {active.avoid.map((item) =>
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                  <MinusIcon className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          <span className="mr-1 text-sm text-muted">Usually prescribed:</span>
          {active.therapies.map((therapy) =>
          <span
            key={therapy}
            className="rounded-full border border-line px-3 py-1 text-[0.8125rem] font-medium text-ink">
            
              {therapy}
            </span>
          )}
        </div>
      </motion.div>
    </div>);

}