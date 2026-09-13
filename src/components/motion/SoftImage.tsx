import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SoftImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** How far the image drifts, as a percentage of its own height. */
  drift?: number;
  rounded?: boolean;
}

/**
 * An image that drifts slowly with the scroll and settles in with a soft fade.
 * The image is oversized by twice the drift so the movement never exposes an edge.
 */
export function SoftImage({ src, alt, className, imageClassName, drift = 6, rounded = true }: SoftImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', rounded && 'rounded-[1.75rem]', className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          top: `-${drift}%`,
          height: `${100 + drift * 2}%`,
          ...(reduceMotion ? {} : { y })
        }}
        className={cn('object-cover', imageClassName)} />
      
    </div>);

}