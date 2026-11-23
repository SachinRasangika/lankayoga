import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontalIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { EditableSection } from '../../admin/customize/EditableSection';
import { useSection } from '../../admin/customize/store';

export function StayGallery() {
  const copy = useSection('home.gallery');
  const frames = copy.frames;
  const [dragged, setDragged] = useState(false);

  return (
    <EditableSection id="home.gallery">
    <section className="overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 sm:px-8">
        <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">{copy.eyebrow}</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg font-display text-3xl font-light leading-[1.1] tracking-tight text-ink sm:text-[2.75rem]">
            {copy.title}
          </h2>
          {!dragged ?
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-muted">
              <MoveHorizontalIcon className="h-3.5 w-3.5" />
              Drag sideways
            </p> :
          null}
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -Math.max(frames.length - 1, 1) * 380, right: 0 }}
        dragElastic={0.04}
        dragTransition={{ power: 0.18, timeConstant: 320 }}
        onDragStart={() => setDragged(true)}
        className="mt-14 flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing sm:gap-7 sm:px-8">
        
        {frames.map((frame, index) =>
        <motion.figure
          key={frame.src}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.28, delay: index % 4 * 0.05, ease: [0.23, 1, 0.32, 1] }}
          className={cn('w-[16rem] shrink-0 sm:w-[21rem]', index % 2 === 1 && 'sm:mt-14')}>
          
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
              src={frame.src}
              alt={frame.alt}
              loading="lazy"
              draggable={false}
              className="h-[21rem] w-full object-cover sm:h-[25rem]" />
            
            </div>
            <figcaption className="mt-4 text-sm text-muted">{frame.caption}</figcaption>
          </motion.figure>
        )}
      </motion.div>
    </section>
    </EditableSection>);

}