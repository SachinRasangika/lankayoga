import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { timeSortKey, weekDays } from '../data/weekSchedule';
import { WeekDay } from '../types';
import { statusOf, useContent } from './content';
import { StatusBadge } from './SaveBar';
import { adminFieldClass, Segmented } from './ui';
import { PublishStatus } from '../types';

export function TimetableList() {
  const { ready, timetable, saveTimetable, deleteTimetable } = useContent();
  const [query, setQuery] = useState('');
  const [day, setDay] = useState<'all' | WeekDay>('all');
  const [status, setStatus] = useState<'all' | PublishStatus>('all');

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return timetable.filter((item) => {
      if (day !== 'all' && item.weekday !== day) return false;
      if (status !== 'all' && statusOf(item) !== status) return false;
      if (!needle) return true;
      return `${item.name} ${item.instructor} ${item.time} ${item.weekday}`.toLowerCase().includes(needle);
    }).sort((a, b) => weekDays.indexOf(a.weekday) - weekDays.indexOf(b.weekday) || timeSortKey(a.time) - timeSortKey(b.time));
  }, [day, query, status, timetable]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-muted">Timetable</p>
          <h1 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">This month’s hours</h1>
        </div>
        <ButtonLink to="/admin/timetable/new" size="sm" className="shrink-0">
          <PlusIcon className="h-4 w-4" />
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">New class</span>
        </ButtonLink>
      </div>
      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the week"
          className={`${adminFieldClass} pl-10`} />
      </label>
      <Segmented
        value={day}
        onChange={setDay}
        options={[{ value: 'all', label: 'All days' }, ...weekDays.map((name) => ({ value: name, label: name.slice(0, 3) }))]} />
      <Segmented
        value={status}
        onChange={setStatus}
        options={[
          { value: 'all', label: 'Any status' },
          { value: 'published', label: 'Live' },
          { value: 'draft', label: 'Draft' }
        ]} />
      <p className="text-xs text-muted">These hours repeat every week of the current month. Guests book from the classes page.</p>
      {!ready ? <p className="text-sm text-muted">Loading the week…</p> : null}
      <ul className="flex flex-col gap-3">
        {rows.map((item) =>
          <li key={item.id} className="overflow-hidden rounded-2xl border border-line bg-raised">
            <Link to={`/admin/timetable/${item.id}`} className="block p-3 sm:p-4">
              <span className="block font-medium leading-snug text-ink">{item.name}</span>
              <span className="mt-1 block text-sm text-muted">{item.weekday} · {item.time} · {item.instructor || 'No teacher yet'}</span>
              <span className="mt-1 block text-sm text-muted">{item.duration} · {item.price}</span>
            </Link>
            <div className="flex items-center gap-1 border-t border-line px-2 py-2">
              <StatusBadge
                status={statusOf(item)}
                onClick={() => void saveTimetable({ ...item, status: statusOf(item) === 'published' ? 'draft' : 'published' }).catch((caught: unknown) => {
                  window.alert(caught instanceof Error ? caught.message : 'Could not update.');
                })} />
              <span className="flex-1" />
              <button
                type="button"
                aria-label="Delete"
                onClick={() => {
                  if (window.confirm(`Delete “${item.name}”?`)) {
                    void deleteTimetable(item.id).catch((caught: unknown) => {
                      window.alert(caught instanceof Error ? caught.message : 'Could not delete.');
                    });
                  }
                }}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-warm hover:text-terracotta-700">
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          </li>
        )}
      </ul>
      {rows.length === 0 && ready ? <p className="py-10 text-center text-sm text-muted">No classes match that.</p> : null}
    </div>
  );
}
