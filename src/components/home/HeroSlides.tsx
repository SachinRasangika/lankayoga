import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { heroServices } from '../../data/services';
import { cn } from '../../utils/cn';

const ease = [0.23, 1, 0.32, 1] as const;
const SLIDE_MS = 7000;

export function HeroSlides() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const active = heroServices[index];

  const advance = useCallback(() => {
    setIndex((current) => (current + 1) % heroServices.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = window.setTimeout(advance, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion, advance]);

  return (
    <section
      ref={ref}
      aria-label="What we offer"
      className="relative isolate h-[100svh] min-h-[40rem] w-full overflow-hidden bg-sand-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}>
      
      <motion.div
        className="absolute left-0 w-full"
        style={{ top: '-18%', height: '136%', ...(reduceMotion ? {} : { y: imageY }) }}>
        
        <AnimatePresence mode="sync">
          <motion.img
            key={active.id}
            src={active.image}
            alt={active.alt}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: reduceMotion ? 1.07 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.3, ease }, scale: { duration: SLIDE_MS / 1000 + 1, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-sand-900/45" />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-14">
        
        <p className="eyebrow text-sand-200">Lanka Yoga &amp; Ayurveda · Kurunegala, Sri Lanka</p>

        <div className="mt-6 min-h-[19rem] sm:min-h-[17rem] lg:min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-col gap-5">
              
              <p className="text-[0.6875rem] uppercase tracking-widest text-sand-300">{active.eyebrow}</p>
              <h1 className="max-w-3xl font-display text-[2.75rem] font-light leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {active.title}
              </h1>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-sand-100/90 sm:text-base">{active.line}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <ButtonLink to={active.to}>
                  {active.cta}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <p className="text-[0.8125rem] text-sand-200">{active.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
            {heroServices.map((service, serviceIndex) => {
              const selected = serviceIndex === index;
              return (
                <li key={service.id} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setIndex(serviceIndex)}
                    aria-current={selected}
                    className={cn(
                      'text-left text-[0.8125rem] font-medium transition-colors duration-200 ease-calm',
                      selected ? 'text-white' : 'text-white/60 hover:text-white'
                    )}>
                    
                    {service.tab}
                  </button>
                  <span className="relative block h-px w-20 overflow-hidden bg-white/25 sm:w-24">
                    {selected ?
                    paused || reduceMotion ?
                    <span className="absolute inset-y-0 left-0 block w-full bg-white" /> :

                    <motion.span
                      key={`${service.id}-${index}`}
                      className="absolute inset-y-0 left-0 block w-full origin-left bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }} /> :


                    null}
                  </span>
                </li>);

            })}
          </ul>

          <div className="flex items-center gap-3 text-sand-200">
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
              
              <ArrowDownIcon className="h-4 w-4" />
            </motion.span>
            <span className="text-[0.6875rem] uppercase tracking-widest">Scroll — breathe first</span>
          </div>
        </div>
      </motion.div>
    </section>);

}