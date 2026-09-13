import { format, parseISO } from 'date-fns';

export function formatDateRange(startIso: string, endIso: string): string {
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${format(start, 'd')}–${format(end, 'd MMM yyyy')}`;
  }
  return `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`;
}

export function formatMonthLabel(iso: string): string {
  return format(parseISO(iso), 'MMMM yyyy');
}

export function formatDayBadge(iso: string): {day: string;month: string;} {
  const date = parseISO(iso);
  return { day: format(date, 'dd'), month: format(date, 'MMM') };
}

export function formatPrice(usd: number): string {
  return `$${usd.toLocaleString('en-US')}`;
}

export function formatPostDate(iso: string): string {
  return format(parseISO(iso), 'd MMMM yyyy');
}