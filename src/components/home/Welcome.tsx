import React from 'react';
import { motion } from 'framer-motion';
import { SoftImage } from '../motion/SoftImage';
import { EditableSection } from '../../admin/customize/EditableSection';
import { useSection } from '../../admin/customize/store';

const ease = [0.23, 1, 0.32, 1] as const;

export function Welcome() {
  const copy = useSection('home.welcome');
  return (
    <EditableSection id="home.welcome">
    <section className="bg-warm">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pr-10">
          <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">{copy.eyebrow}</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.3, ease }}
            className="font-display text-[2.25rem] font-light leading-[1.1] tracking-tight text-ink sm:text-5xl">
            
            {copy.title} <span className="italic">{copy.titleEmphasis}</span>
          </motion.h2>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
            {copy.body}
          </p>
          <dl className="mt-2 flex gap-10">
            {copy.stats.map((item) =>
            <div key={item.label} className="flex flex-col gap-1">
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-display text-4xl font-light text-ink">{item.value}</dd>
                <p className="text-xs uppercase tracking-widest text-muted">{item.label}</p>
              </div>
            )}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-6">
          {copy.images.map((image, index) =>
            <SoftImage
              key={image.src || index}
              src={image.src}
              alt={image.alt}
              className={index === 1 ? 'mt-10 h-56 sm:h-80' : 'h-56 sm:h-80'}
              drift={index === 1 ? 5 : 8} />
          )}
        </div>
      </div>
    </section>
    </EditableSection>);

}