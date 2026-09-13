import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { curriculum, totalHours } from '../../data/curriculum';

export function CurriculumAccordion() {
  const [openId, setOpenId] = useState<string | null>(curriculum[0].id);

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <span className="eyebrow text-muted">Six modules</span>
        <span className="text-sm text-muted">
          <span className="font-display text-xl text-ink">{totalHours}</span> contact hours
        </span>
      </div>

      <ul>
        {curriculum.map((module) => {
          const open = openId === module.id;
          return (
            <li key={module.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : module.id)}
                  className="group flex w-full items-center gap-4 py-5 text-left">
                  
                  <span className="w-12 shrink-0 font-display text-lg font-light text-terracotta-600 dark:text-terracotta-300">
                    {module.hours}h
                  </span>
                  <span className="flex-1 font-display text-xl font-light leading-snug tracking-tight text-ink sm:text-2xl">
                    {module.title}
                  </span>
                  <PlusIcon
                    className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 ease-calm group-hover:text-ink"
                    style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }} />
                  
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open ?
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden">
                  
                    <div className="grid gap-6 pb-6 pl-0 sm:grid-cols-2 sm:pl-16">
                      <p className="text-sm leading-relaxed text-muted">{module.description}</p>
                      <ul className="flex flex-col gap-2">
                        {module.topics.map((topic) =>
                      <li key={topic} className="flex items-start gap-2.5 text-sm text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sage-400" />
                            {topic}
                          </li>
                      )}
                      </ul>
                    </div>
                  </motion.div> :
                null}
              </AnimatePresence>
            </li>);

        })}
      </ul>
    </div>);

}