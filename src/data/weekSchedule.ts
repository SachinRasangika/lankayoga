import { WeekDay } from '../types';

export const weekDays: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function dateWeekday(date: Date): WeekDay {
  const index = date.getDay();
  return weekDays[index === 0 ? 6 : index - 1];
}

export function timeSortKey(time: string): number {
  const match = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function isMorningTime(time: string): boolean {
  return time.toUpperCase().includes('AM');
}
