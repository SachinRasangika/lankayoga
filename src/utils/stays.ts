import { ClassOffering, Program, Therapy } from '../types';

export function comparePrograms(a: Program, b: Program): number {
  if (Boolean(a.openDates) !== Boolean(b.openDates)) return a.openDates ? -1 : 1;
  return a.startDate.localeCompare(b.startDate);
}

export function isYogaStay(program: Program): boolean {
  return program.focus === 'yoga' || program.focus === 'integrated';
}

export function isAyurvedaStay(program: Program): boolean {
  return program.focus === 'ayurveda' || program.focus === 'integrated' || program.kind === 'panchakarma';
}

export function stayListPath(program: Program): string {
  return isAyurvedaStay(program) && !isYogaStay(program) ? '/ayurveda' : '/yoga';
}

export function stayPath(program: Program): string {
  return `${stayListPath(program)}/${program.slug || program.id}`;
}

export function classPath(item: Pick<ClassOffering, 'id' | 'slug'>): string {
  return `/classes/${item.slug || item.id}`;
}

export function treatmentPath(item: Pick<Therapy, 'id' | 'slug'>): string {
  return `/treatments/${item.slug || item.id}`;
}
