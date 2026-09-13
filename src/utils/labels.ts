import { ProgramKind, WellnessFocus } from '../types';

export const focusLabels: Record<WellnessFocus, string> = {
  yoga: 'Yoga',
  ayurveda: 'Ayurveda',
  integrated: 'Yoga & Ayurveda'
};

export const kindLabels: Record<ProgramKind, string> = {
  retreat: 'Retreat',
  training: 'Teacher Training',
  panchakarma: 'Panchakarma'
};

export const focusAccent: Record<WellnessFocus, string> = {
  yoga: 'bg-sage-100 text-sage-800 dark:bg-sage-800/60 dark:text-sage-100',
  ayurveda: 'bg-terracotta-100 text-terracotta-800 dark:bg-terracotta-900/60 dark:text-terracotta-100',
  integrated: 'bg-sand-200 text-sand-800 dark:bg-sand-800/70 dark:text-sand-100'
};

export function durationLabel(days: number): string {
  if (days % 7 === 0) {
    const weeks = days / 7;
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  return `${days} days`;
}