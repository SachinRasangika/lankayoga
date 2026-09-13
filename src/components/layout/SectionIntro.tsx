import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionIntroProps {
  eyebrow: string;
  title: React.ReactNode;
  note?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  className?: string;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function SectionIntro({
  eyebrow,
  title,
  note,
  align = 'center',
  tone = 'light',
  className
}: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.28, ease }}
      className={cn(
        'flex max-w-xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}>
      
      <p className={cn('eyebrow', tone === 'dark' ? 'text-sage-300' : 'text-terracotta-600 dark:text-terracotta-300')}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-display text-3xl font-light leading-[1.1] tracking-tight sm:text-[2.75rem]',
          tone === 'dark' ? 'text-sand-50' : 'text-ink'
        )}>
        
        {title}
      </h2>
      {note ?
      <p className={cn('text-[0.9375rem] leading-relaxed', tone === 'dark' ? 'text-sage-300' : 'text-muted')}>
          {note}
        </p> :
      null}
    </motion.div>);

}