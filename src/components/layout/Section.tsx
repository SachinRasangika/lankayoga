import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

type Tone = 'base' | 'warm' | 'raised' | 'deep';
type Size = 'md' | 'lg';

interface SectionProps {
  tone?: Tone;
  size?: Size;
  id?: string;
  className?: string;
  innerClassName?: string;
  /** A quiet photographic backdrop that drifts behind the content as you scroll. */
  backdrop?: string;
  backdropOpacity?: number;
  children: React.ReactNode;
}

const tones: Record<Tone, string> = {
  base: 'bg-surface text-ink',
  warm: 'bg-warm text-ink border-y border-line',
  raised: 'bg-raised text-ink border-y border-line',
  deep: 'bg-sage-900 text-sand-50'
};

const sizes: Record<Size, string> = {
  md: 'py-20 sm:py-24',
  lg: 'py-24 sm:py-32 lg:py-36'
};

export function Section({
  tone = 'base',
  size = 'lg',
  id,
  className,
  innerClassName,
  backdrop,
  backdropOpacity = 0.14,
  children
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section ref={ref} id={id} className={cn('relative isolate overflow-hidden', tones[tone], className)}>
      {backdrop ?
      <motion.img
        aria-hidden
        alt=""
        src={backdrop}
        loading="lazy"
        className="absolute left-0 w-full object-cover"
        style={{
          top: '-12%',
          height: '124%',
          opacity: backdropOpacity,
          ...(reduceMotion ? {} : { y })
        }} /> :

      null}

      <div className={cn('relative mx-auto max-w-[1400px] px-5 sm:px-8', sizes[size], innerClassName)}>{children}</div>
    </section>);

}