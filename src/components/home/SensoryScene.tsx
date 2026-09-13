import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface SensorySceneProps {
  image: string;
  alt: string;
  line: string;
  emphasis: string;
  caption?: string;
  /** Optional near layer (e.g. reeds) that moves faster than the scene behind it. */
  foreground?: string;
}

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * A layered parallax scene. The far image is oversized and drifts slowly, an optional
 * near layer moves faster and is masked into the base, and the words travel against both.
 */
export function SensoryScene({ image, alt, line, emphasis, caption, foreground }: SensorySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const farY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  const nearY = useTransform(scrollYProgress, [0, 1], ['14%', '-14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-sand-900">
      {/* Far layer — 130% tall, offset by -15%, so a ±9% drift stays inside the frame. */}
      <motion.img
        src={image}
        alt={alt}
        className="absolute left-0 w-full object-cover"
        style={{ top: '-15%', height: '130%', ...(reduceMotion ? {} : { y: farY }) }} />
      

      <div className="absolute inset-0 bg-sand-900/52" />

      {foreground ?
      <motion.img
        aria-hidden
        alt=""
        src={foreground}
        className="pointer-events-none absolute left-0 w-full object-cover object-bottom"
        style={{
          bottom: '-14%',
          height: '58%',
          maskImage: 'linear-gradient(to top, #000 45%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 45%, transparent 100%)',
          ...(reduceMotion ? {} : { y: nearY })
        }} /> :

      null}

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
        className="relative mx-auto w-full max-w-4xl px-6 py-28 text-center sm:px-8">
        
        <p className="font-display text-[2.125rem] font-light leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {line} <span className="italic text-sand-200">{emphasis}</span>
        </p>
        {caption ?
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.3, delay: 0.08, ease }}
          className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-sand-100/85">
          
            {caption}
          </motion.p> :
        null}
      </motion.div>
    </section>);

}