import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EditableSection } from '../../admin/customize/EditableSection';
import { useSection } from '../../admin/customize/store';

export function SoundOfPlace() {
  const copy = useSection('home.sound');
  const reduceMotion = useReducedMotion();

  return (
    <EditableSection id="home.sound">
    <section className="relative isolate overflow-hidden bg-sand-900 text-sand-50">
      <img
        src={copy.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="lazy" />
      
      <div className="absolute inset-0 bg-sand-900/70" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <p className="eyebrow text-sand-300">{copy.eyebrow}</p>
          <h2 className="font-display text-[2.25rem] font-light leading-[1.1] tracking-tight sm:text-5xl">
            {copy.title} <span className="italic text-sand-200">{copy.titleEmphasis}</span>
          </h2>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-sand-100/80">
            {copy.body}
          </p>
        </div>

        <ul className="flex flex-col lg:col-span-7">
          {copy.items.map((item, itemIndex) =>
          <li
            key={item.id}
            className="flex items-center gap-6 border-t border-white/15 py-6 last:border-b last:border-white/15">
            
              <div className="flex h-8 items-end gap-1" aria-hidden>
                {item.bars.map((height, barIndex) =>
              <motion.span
                key={barIndex}
                className="w-[3px] rounded-full bg-sand-200/80"
                style={{ height }}
                animate={reduceMotion ? undefined : { scaleY: [1, 0.45, 1.25, 0.7, 1] }}
                transition={{
                  duration: 4.5 + itemIndex * 0.7 + barIndex * 0.3,
                  repeat: Infinity,
                  ease: 'linear'
                }} />

              )}
              </div>
              <p className="flex-1 text-[0.9375rem] text-sand-100">{item.label}</p>
              <p className="text-[0.6875rem] uppercase tracking-widest text-sand-300">{item.time}</p>
            </li>
          )}
        </ul>
      </div>
    </section>
    </EditableSection>);

}