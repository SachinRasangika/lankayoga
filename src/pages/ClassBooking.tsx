import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useContent } from '../admin/content';
import { business } from '../data/business';
import { dateWeekday, timeSortKey } from '../data/weekSchedule';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const steps = ['Date & time', 'Your details', 'Confirmation'] as const;

const fieldClass =
  'w-full min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none';

function isoFromDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function dateFromIso(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function ClassBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ready, publishedTimetable } = useContent();
  const selected = publishedTimetable.find((item) => item.id === id) ?? publishedTimetable[0];
  const [step, setStep] = useState(0);
  const [cursor, setCursor] = useState(() => {
    const today = startOfToday();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const slots = useMemo(() => {
    if (!selected) return [];
    const values = Array.from(new Set([selected.time, ...selected.slots].filter(Boolean)));
    return values.sort((a, b) => timeSortKey(a) - timeSortKey(b));
  }, [selected]);

  useEffect(() => {
    if (!slots.length) return;
    setTime((current) => slots.includes(current) ? current : slots[0]);
  }, [slots]);

  useEffect(() => {
    if (!selected || !date) return;
    if (dateWeekday(dateFromIso(date)) !== selected.weekday) setDate('');
  }, [date, selected]);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: days }, (_, index) => new Date(year, month, index + 1))
    ];
  }, [cursor]);

  if (!ready) return <p className="min-h-screen bg-surface px-5 py-32 text-center text-sm text-muted">Loading…</p>;
  if (!selected) {
    return (
      <div className="mx-auto min-h-screen max-w-xl bg-surface px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-light">No classes are open to book</h1>
        <Link to="/classes" className="mt-6 inline-block text-sm text-muted underline">Back to classes</Link>
      </div>
    );
  }

  const today = startOfToday();
  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const atCurrentMonth = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth();
  const dateLabel = date ? dateFromIso(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '';
  const canContinue = step === 0 ? Boolean(date && time) : step === 1 ? Boolean(name.trim() && email.trim()) : true;

  const message = [
    `Hello, I would like to book ${selected.name}.`,
    `Day: ${selected.weekday}.`,
    dateLabel ? `Date: ${dateLabel}.` : '',
    time ? `Time: ${time}.` : '',
    selected.instructor ? `Teacher: ${selected.instructor}.` : '',
    name.trim() ? `Name: ${name.trim()}` : '',
    email.trim() ? `Email: ${email.trim()}` : '',
    note.trim() ? `Note: ${note.trim()}` : ''
  ].filter(Boolean).join('\n');

  function send() {
    const href = `https://wa.me/${business.telephone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(href, '_blank', 'noreferrer');
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-surface">
    <div className="mx-auto w-full max-w-[1400px] px-5 pb-36 pt-10 sm:px-8 sm:pt-14">
      <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Book a class</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">Choose when you will come</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Pick the class, then a date it is held, then a time. You can change the class before you continue.
      </p>

      <ol className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
        {steps.map((label, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
                active || done ? 'bg-sage-800 text-sand-50 dark:bg-sage-200 dark:text-sage-900' : 'border border-line text-muted'
              )}>
                {index + 1}
              </span>
              <span className={cn('text-xs sm:text-sm', active ? 'text-ink' : 'text-muted')}>{label}</span>
            </li>
          );
        })}
      </ol>

      {step === 0 ?
        <div className="mt-10 grid gap-6 xl:grid-cols-[18rem_1fr_16rem]">
          <section className="rounded-3xl border border-line bg-raised p-5">
            <label className="flex flex-col gap-2">
              <span className="text-[0.6875rem] uppercase tracking-widest text-muted">Class</span>
              <select
                value={selected.id}
                onChange={(event) => navigate(`/classes/book/${event.target.value}`)}
                className={fieldClass}>
                {publishedTimetable.map((item) =>
                  <option key={item.id} value={item.id}>{item.weekday} · {item.time} · {item.name}</option>
                )}
              </select>
            </label>
            <h2 className="mt-6 font-display text-3xl font-light tracking-tight text-ink">{selected.name}</h2>
            {selected.emphasis ? <p className="mt-2 text-sm font-medium text-ink">{selected.emphasis}</p> : null}
            <p className="mt-3 text-sm leading-relaxed text-muted">{selected.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <dt className="text-[0.625rem] uppercase tracking-widest text-muted">Length</dt>
                <dd className="mt-1 text-sm text-ink">{selected.duration || '60 min'}</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-widest text-muted">Price</dt>
                <dd className="mt-1 text-sm text-ink">{selected.price || 'Included'}</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-widest text-muted">Teacher</dt>
                <dd className="mt-1 text-sm text-ink">{selected.instructor || 'The shala'}</dd>
              </div>
              <div>
                <dt className="text-[0.625rem] uppercase tracking-widest text-muted">Held</dt>
                <dd className="mt-1 text-sm text-ink">{selected.weekday}s</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-line bg-raised p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-light text-ink">{monthLabel}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  disabled={atCurrentMonth}
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink disabled:opacity-40">
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink">
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[0.625rem] uppercase tracking-widest text-muted">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => <span key={label}>{label}</span>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {cells.map((day, index) => {
                if (!day) return <span key={`empty-${index}`} />;
                const value = isoFromDate(day);
                const past = day < today;
                const held = dateWeekday(day) === selected.weekday;
                const disabled = past || !held;
                const active = value === date;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => setDate(value)}
                    className={cn(
                      'flex h-11 items-center justify-center rounded-xl text-sm',
                      active ? 'bg-sage-800 text-sand-50 dark:bg-sage-200 dark:text-sage-900' : 'text-ink',
                      disabled && 'cursor-not-allowed text-muted/40',
                      !disabled && !active && 'hover:bg-warm'
                    )}>
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted">{`Only upcoming ${selected.weekday}s can be chosen.`}</p>
          </section>

          <section className="flex max-h-[28rem] flex-col rounded-3xl border border-line bg-raised p-5">
            <h2 className="font-display text-2xl font-light text-ink">Time</h2>
            <div className="mt-4 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
              {slots.map((slot) => {
                const active = slot === time;
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTime(slot)}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left text-sm',
                      active ? 'border-sage-700 bg-sage-800 text-sand-50 dark:border-sage-200 dark:bg-sage-200 dark:text-sage-900' : 'border-line text-ink hover:border-sage-400'
                    )}>
                    {slot}
                  </button>
                );
              })}
            </div>
          </section>
        </div> :
        null}

      {step === 1 ?
        <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] uppercase tracking-widest text-muted">Your name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} required className={fieldClass} autoComplete="name" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] uppercase tracking-widest text-muted">Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className={fieldClass} autoComplete="email" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] uppercase tracking-widest text-muted">Note</span>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} className={fieldClass} placeholder="Anything we should know before class" />
          </label>
        </form> :
        null}

      {step === 2 ?
        <section className="mx-auto mt-10 max-w-xl rounded-3xl border border-line bg-raised p-6">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink">{selected.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{dateLabel} · {time}</p>
          <p className="mt-1 text-sm text-muted">{selected.instructor} · {selected.duration} · {selected.price}</p>
          <p className="mt-4 text-sm text-ink">{name}</p>
          <p className="text-sm text-muted">{email}</p>
          {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
          {sent ?
            <p className="mt-6 flex items-center gap-2 text-sm text-sage-700 dark:text-sage-200">
              <CheckCircle2Icon className="h-4 w-4" />
              WhatsApp is open with your booking. Send the message to confirm.
            </p> :
            <p className="mt-6 text-sm text-muted">Send this to the desk on WhatsApp to hold the place.</p>}
        </section> :
        null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-raised/95 px-5 py-3 backdrop-blur" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (step === 0) navigate('/classes');
              else setStep((current) => current - 1);
            }}>
            Back
          </Button>
          <Button
            type="button"
            disabled={!canContinue}
            onClick={() => {
              if (step < 2) setStep((current) => current + 1);
              else send();
            }}>
            {step === 2 ? 'Send on WhatsApp' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
