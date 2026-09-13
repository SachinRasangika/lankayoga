import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  meta?: {label: string;value: string;}[];
}

const ease = [0.23, 1, 0.32, 1] as const;

export function PageHero({ eyebrow, title, lede, image, imageAlt, meta }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-sand-900">
      <motion.div
        className="absolute left-0 w-full"
        style={{ top: '-20%', height: '140%', ...(reduceMotion ? {} : { y: imageY }) }}>
        
        <motion.img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          animate={reduceMotion ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }} />
        
      </motion.div>
      <div className="absolute inset-0 bg-sand-900/55" />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-[1400px] flex-col gap-6 px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:pb-28 lg:pt-52">
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="eyebrow text-sand-200">
          
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease }}
          className="max-w-4xl font-display text-[2.5rem] font-light leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
          
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16, ease }}
          className="max-w-prose text-base leading-relaxed text-sand-100/90">
          
          {lede}
        </motion.p>
        {meta?.length ?
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24, ease }}
          className="mt-4 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/20 pt-8">
          
            {meta.map((item) =>
          <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-[0.625rem] uppercase tracking-widest text-sand-300">{item.label}</dt>
                <dd className="font-display text-2xl font-light text-white">{item.value}</dd>
              </div>
          )}
          </motion.dl> :
        null}
      </motion.div>
    </section>);

}