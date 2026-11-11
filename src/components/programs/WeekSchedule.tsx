import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../admin/content';
import { isMorningTime, weekDays } from '../../data/weekSchedule';
import { TimetableClass, WeekDay } from '../../types';
import { cn } from '../../utils/cn';

function todayName(): WeekDay {
  const index = new Date().getDay();
  return weekDays[index === 0 ? 6 : index - 1];
}

function SessionRow({ session }: {session: TimetableClass;}) {
  return (
    <li className="grid grid-cols-1 gap-3 border-b border-line py-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-6">
      <p className="font-display text-2xl font-light tracking-tight text-ink">{session.time}</p>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl font-light tracking-tight text-ink">{session.name}</h3>
          {session.emphasis ? <span className="text-sm font-medium text-ink">{session.emphasis}</span> : null}
        </div>
        <p className="mt-1 text-sm text-muted">
          {session.instructor}
          {session.duration ? ` · ${session.duration}` : ''}
          {session.price ? ` · ${session.price}` : ''}
        </p>
        {session.bookAhead ?
          <p className="mt-2 text-[0.6875rem] uppercase tracking-widest text-terracotta-700 dark:text-terracotta-300">Book ahead</p> :
          null}
      </div>
      <Link
        to={`/classes/book/${session.id}`}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-sage-800 px-5 text-sm font-medium text-sand-50 hover:bg-sage-700 dark:bg-sage-200 dark:text-sage-900 dark:hover:bg-sage-100">
        Book
      </Link>
    </li>
  );
}

function DayList({ label, sessions }: {label: string;sessions: TimetableClass[];}) {
  if (!sessions.length) return null;
  return (
    <section>
      <h3 className="eyebrow text-muted">{label}</h3>
      <ol className="mt-2 border-t border-line">
        {sessions.map((session) => <SessionRow key={session.id} session={session} />)}
      </ol>
    </section>
  );
}

export function WeekSchedule() {
  const { ready, publishedTimetable } = useContent();
  const today = useMemo(todayName, []);
  const [day, setDay] = useState<WeekDay>(today);
  const sessions = publishedTimetable.filter((item) => item.weekday === day);
  const morning = sessions.filter((session) => isMorningTime(session.time));
  const later = sessions.filter((session) => !isMorningTime(session.time));

  if (!ready) return <p className="mt-14 text-center text-sm text-muted">Loading this week…</p>;

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      <div role="tablist" aria-label="Days of the week" className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekDays.map((name) => {
          const selected = name === day;
          const count = publishedTimetable.filter((item) => item.weekday === name).length;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setDay(name)}
              className={cn(
                'flex min-h-14 flex-col items-center justify-center rounded-2xl border px-1 py-2 transition-colors duration-200 ease-calm',
                selected ? 'border-sage-800 bg-sage-800 text-sand-50 dark:border-sage-200 dark:bg-sage-200 dark:text-sage-900' : 'border-line text-muted hover:text-ink'
              )}>
              <span className="text-[0.6875rem] uppercase tracking-widest">{name.slice(0, 3)}</span>
              <span className={cn('mt-1 text-[0.5625rem] uppercase tracking-widest', selected ? 'text-sand-200 dark:text-sage-700' : 'text-muted')}>
                {name === today ? 'Today' : count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl font-light tracking-tight text-ink">{day}</h3>
        <p className="text-sm text-muted">{sessions.length} {sessions.length === 1 ? 'class' : 'classes'}</p>
      </div>

      {sessions.length === 0 ?
        <p className="mt-8 text-sm text-muted">Nothing is listed for {day} yet.</p> :
        <div className="mt-8 flex flex-col gap-12">
          <DayList label="Morning" sessions={morning} />
          <DayList label="Afternoon & evening" sessions={later} />
        </div>}

      <p className="mt-10 text-sm leading-relaxed text-muted">
        These hours repeat through the month. Classes marked “Book ahead” need a reservation.
      </p>
    </div>
  );
}
