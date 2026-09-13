import React, { useRef } from 'react';
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface PinnedLinesProps {
  image: string;
  alt: string;
  eyebrow: string;
  lines: string[];
}

interface PinnedLineProps {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

function PinnedLine({ line, index, total, progress, reduceMotion }: PinnedLineProps) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const opacity = useTransform(
    progress,
    [start, start + span * 0.22, end - span * 0.22, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], ['26px', '-26px']);

  return (
    <motion.p
      style={reduceMotion ? { opacity: index === 0 ? 1 : 0 } : { opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-[2rem] font-light leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
      
      {line}
    </motion.p>);

}

/**
 * The image pins to the viewport while short lines pass through it — one thought
 * at a time, so there is never more than a sentence on screen.
 */
export function PinnedLines({ image, alt, eyebrow, lines }: PinnedLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative" style={{ height: `${lines.length * 85 + 30}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-sand-900">
        <motion.img
          src={image}
          alt={alt}
          className="absolute left-0 w-full object-cover"
          style={{ top: '-14%', height: '128%', ...(reduceMotion ? {} : { y: imageY }) }} />
        
        <div className="absolute inset-0 bg-sand-900/50" />

        <p className="absolute left-1/2 top-24 -translate-x-1/2 whitespace-nowrap text-[0.6875rem] uppercase tracking-widest text-sand-200">
          {eyebrow}
        </p>

        <div className="absolute inset-0">
          {lines.map((line, index) =>
          <PinnedLine
            key={line}
            line={line}
            index={index}
            total={lines.length}
            progress={scrollYProgress}
            reduceMotion={reduceMotion} />

          )}
        </div>

        <div className="absolute bottom-14 left-1/2 h-14 w-px -translate-x-1/2 overflow-hidden bg-white/25">
          <motion.span className="block h-full w-px origin-top bg-white" style={{ scaleY: scrollYProgress }} />
        </div>
      </div>
    </section>);

}