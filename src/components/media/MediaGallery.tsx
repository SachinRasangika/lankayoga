import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { galleryImages } from '../../data/media';
import { cn } from '../../utils/cn';

const spanClasses = {
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  normal: ''
} as const;

export function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveIndex(null);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const active = activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <>
      <ul className="grid auto-rows-[11rem] grid-cols-1 gap-3 sm:grid-cols-3 sm:auto-rows-[13rem]">
        {galleryImages.map((image, index) =>
        <li key={image.src + index} className={cn('overflow-hidden rounded-[1.75rem]', spanClasses[image.span])}>
            <button
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group h-full w-full overflow-hidden"
            aria-label={`Open larger view: ${image.alt}`}>
            
              <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[450ms] ease-calm group-hover:scale-[1.04]" />
            
            </button>
          </li>
        )}
      </ul>

      <AnimatePresence>
        {active ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-sand-900/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActiveIndex(null)}>
          
            <button
            type="button"
            aria-label="Close image"
            onClick={() => setActiveIndex(null)}
            className="glass-dark absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white">
            
              <XIcon className="h-4 w-4" />
            </button>
            <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}>
            
              <img src={active.src} alt={active.alt} className="max-h-[78vh] w-full rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-sand-200">{active.alt}</figcaption>
            </motion.figure>
          </motion.div> :
        null}
      </AnimatePresence>
    </>);

}