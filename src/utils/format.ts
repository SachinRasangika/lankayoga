import { addDays, format, parseISO } from 'date-fns';

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
  if (!usd) return 'On request';
  return `$${usd.toLocaleString('en-US')}`;
}

export function formatStayDates(program: { openDates?: boolean; startDate: string; endDate: string }): string {
  if (program.openDates) return 'Open for any dates';
  return formatDateRange(program.startDate, program.endDate);
}

export function todayIso(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function addDaysIso(iso: string, amount: number): string {
  if (!iso) return todayIso();
  return format(addDays(parseISO(iso), amount), 'yyyy-MM-dd');
}

export function formatPostDate(iso: string): string {
  return format(parseISO(iso), 'd MMMM yyyy');
}

export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const delta = Date.now() - then;
  const minutes = Math.round(delta / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export function durationDaysFromRange(startIso: string, endIso: string): number {
  if (!startIso || !endIso) return 1;
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  return Math.max(1, days);
}

export function readingMinutesFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function slugFromTitle(title: string): string {
  return title.
    toLowerCase().
    replace(/[^a-z0-9]+/g, '-').
    replace(/^-|-$/g, '') || `post-${Date.now().toString(36)}`;
}