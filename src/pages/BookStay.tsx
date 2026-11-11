import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { programs, getProgram } from '../data/programs';
import { business } from '../data/business';
import { sendInquiry } from '../utils/sendInquiry';
import { media } from '../data/media';
import { cn } from '../utils/cn';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function dayKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function formatStay(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy');
}

function programmesOn(iso: string) {
  return programs.filter((program) => iso >= program.startDate && iso <= program.endDate);
}

const fieldClass =
'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none';

export function BookStay() {
  const [searchParams] = useSearchParams();
  const preset = getProgram(searchParams.get('program') ?? '');
  const [month, setMonth] = useState(() => startOfMonth(preset ? parseISO(preset.startDate) : new Date()));
  const [arrival, setArrival] = useState<string | null>(preset?.startDate ?? null);
  const [departure, setDeparture] = useState<string | null>(preset?.endDate ?? null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('1');
  const [note, setNote] = useState(preset ? `Interested in ${preset.title}.` : '');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  function selectDay(iso: string) {
    setStatus('idle');
    if (!arrival || departure && arrival) {
      setArrival(iso);
      setDeparture(null);
      return;
    }
    if (iso < arrival) {
      setArrival(iso);
      setDeparture(null);
      return;
    }
    if (iso === arrival) {
      setDeparture(iso);
      return;
    }
    setDeparture(iso);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.includes('@')) return;
    const stay = arrival
      ? departure && departure !== arrival
        ? `${formatStay(arrival)} to ${formatStay(departure)}`
        : formatStay(arrival)
      : 'Dates not chosen';
    setStatus('sending');
    setError('');
    try {
      await sendInquiry({
        subject: arrival ? `Stay booking — ${stay}` : 'Stay inquiry',
        replyTo: email.trim(),
        fields: {
          Name: name.trim(),
          Email: email.trim(),
          Stay: stay,
          Guests: guests,
          Note: note.trim()
        }
      });
      setStatus('sent');
    } catch (sendError) {
      setStatus('error');
      setError(sendError instanceof Error ? sendError.message : 'The message could not be sent.');
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Book a stay"
        title="Choose your dates, or write to us"
        lede="The calendar shows when a programme is already running. Pick your own arrival and departure, or send an email without choosing dates."
        image={media.ecoCabin}
        imageAlt="An eco cabin with linen and a view toward the lake"
        meta={[
        { label: 'Email', value: business.email },
        { label: 'Call', value: business.telephoneDisplay }]
        } />
      

      <Section tone="base" size="md">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-raised p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setMonth((current) => subMonths(current, 1))}
                  aria-label="Previous month"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink">
                  
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <h2 className="font-display text-2xl font-light text-ink">{format(month, 'MMMM yyyy')}</h2>
                <button
                  type="button"
                  onClick={() => setMonth((current) => addMonths(current, 1))}
                  aria-label="Next month"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink">
                  
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[0.6875rem] uppercase tracking-widest text-muted">
                {weekdays.map((day) =>
                <div key={day} className="py-2">
                    {day}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const iso = dayKey(day);
                  const inMonth = isSameMonth(day, month);
                  const running = programmesOn(iso);
                  const inRange = Boolean(arrival && (departure ? iso >= arrival && iso <= departure : iso === arrival));
                  const isEdge = iso === arrival || iso === departure;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!inMonth}
                      onClick={() => selectDay(iso)}
                      aria-pressed={inRange}
                      aria-label={format(day, 'd MMMM yyyy')}
                      className={cn(
                        'flex h-12 flex-col items-center justify-center rounded-xl text-sm transition-colors duration-200 sm:h-14',
                        !inMonth && 'invisible',
                        inMonth && !inRange && 'text-ink hover:bg-warm',
                        inRange && !isEdge && 'bg-sage-100 text-sage-900 dark:bg-sage-800/50 dark:text-sage-50',
                        isEdge && 'bg-sage-800 text-sand-50 dark:bg-sage-200 dark:text-sage-900'
                      )}>
                      
                      <span>{format(day, 'd')}</span>
                      {running.length > 0 ?
                      <span
                        className={cn(
                          'mt-1 h-1 w-1 rounded-full',
                          isEdge ? 'bg-sand-50 dark:bg-sage-900' : 'bg-terracotta-500'
                        )} /> :

                      <span className="mt-1 h-1 w-1" />}
                    </button>);

                })}
              </div>

              <p className="mt-5 flex items-center gap-2 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                A programme is already running on that day
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-3xl border border-line bg-raised p-6 sm:p-8">
              <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Your dates</p>
              <p className="mt-3 font-display text-3xl font-light text-ink">
                {arrival ?
              departure && departure !== arrival ?
              `${formatStay(arrival)} → ${formatStay(departure)}` :
              formatStay(arrival) :
              'Choose an arrival'}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Click a day to arrive. Click a later day to leave. You can also skip the calendar and email us.
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('stay-name')?.focus()}
                className="mt-5 text-left text-sm text-ink underline underline-offset-4">
                
                Send an inquiry without choosing dates
              </button>
            </div>

            <form id="stay-form" onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-line bg-raised p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="stay-name" className="text-[0.8125rem] font-medium text-ink">
                  Name
                </label>
                <input
                  id="stay-name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={fieldClass} />
                
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="stay-email" className="text-[0.8125rem] font-medium text-ink">
                  Email
                </label>
                <input
                  id="stay-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={fieldClass} />
                
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="stay-guests" className="text-[0.8125rem] font-medium text-ink">
                  Guests
                </label>
                <input
                  id="stay-guests"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className={fieldClass} />
                
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="stay-note" className="text-[0.8125rem] font-medium text-ink">
                  Note
                </label>
                <textarea
                  id="stay-note"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className={fieldClass} />
                
              </div>
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : arrival ? 'Book these dates' : 'Send inquiry'}
              </Button>
              {status === 'sent' ?
              <p className="text-sm leading-relaxed text-muted">
                  Sent. We will reply to {email.trim()}, or you can call {business.telephoneDisplay}.
                </p> :
              null}
              {status === 'error' ?
              <p className="text-sm text-terracotta-600 dark:text-terracotta-300" role="alert">{error}</p> :
              null}
            </form>
          </div>
        </div>
      </Section>
    </>);

}
