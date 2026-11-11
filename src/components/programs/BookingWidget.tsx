import { useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Program } from '../../types';
import { addDaysIso, formatDateRange, formatStayDates, todayIso } from '../../utils/format';
import { durationLabel } from '../../utils/labels';
import { Button, ButtonHref } from '../ui/Button';
import { cn } from '../../utils/cn';
import { business } from '../../data/business';

const fieldClass =
  'w-full min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none sm:min-h-0 sm:text-sm';

function digits(value: string): string {
  return value.replace(/\D/g, '');
}

export function BookingWidget({ program }: { program: Program }) {
  const openDates = Boolean(program.openDates);
  const whatsapp = program.bookingWhatsapp || business.telephone;
  const email = program.bookingEmail || business.email;
  const bookingUrl = program.bookingUrl;
  const minDate = todayIso();
  const [startDate, setStartDate] = useState(openDates ? minDate : program.startDate);
  const [name, setName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const endDate = useMemo(
    () => (openDates ? addDaysIso(startDate, Math.max(1, program.durationDays) - 1) : program.endDate),
    [openDates, program.durationDays, program.endDate, startDate]
  );

  const rangeLabel = openDates ? formatDateRange(startDate, endDate) : formatStayDates(program);

  const message = [
    `Hello, I would like to book ${program.title}.`,
    `Preferred dates: ${rangeLabel} (${durationLabel(program.durationDays)}).`,
    `Guests: ${guests}.`,
    name.trim() ? `Name: ${name.trim()}` : '',
    guestEmail.trim() ? `Email: ${guestEmail.trim()}` : '',
    note.trim() ? `Note: ${note.trim()}` : ''
  ].filter(Boolean).join('\n');

  const whatsappHref = `https://wa.me/${digits(whatsapp)}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(`Booking enquiry: ${program.title}`)}&body=${encodeURIComponent(message)}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappHref, '_blank', 'noreferrer');
    setStatus('sent');
  }

  return (
    <aside className="rounded-3xl border border-line bg-raised p-6 shadow-lift sm:p-7">
      <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Book this retreat</p>
      <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-ink">
        {openDates ? 'Choose your start date' : 'Reserve your place'}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {openDates ?
          'Open for any dates. Pick the morning you want to begin — the 11 days follow from there.' :
          `${formatStayDates(program)} · ${durationLabel(program.durationDays)}`}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {openDates ?
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">Start date</span>
            <input
              type="date"
              required
              min={minDate}
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className={fieldClass} />
            <span className="text-xs text-muted">Ends {endDate ? formatDateRange(startDate, endDate) : ''} · {durationLabel(program.durationDays)}</span>
          </label> :
          <p className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink">{rangeLabel}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">Your name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} required className={fieldClass} autoComplete="name" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">Email</span>
            <input type="email" value={guestEmail} onChange={(event) => setGuestEmail(event.target.value)} required className={fieldClass} autoComplete="email" />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">Guests</span>
          <input
            type="number"
            min={1}
            max={12}
            value={guests}
            onChange={(event) => setGuests(Math.max(1, Number(event.target.value) || 1))}
            className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted">Note (optional)</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className={fieldClass} placeholder="Flights, rooms, Ayurveda add-ons…" />
        </label>

        {status === 'sent' ?
          <p className={cn('flex items-center gap-2 text-sm text-sage-700 dark:text-sage-200')}>
            <CheckCircle2Icon className="h-4 w-4 shrink-0" />
            WhatsApp is open with your dates. Send the message to confirm.
          </p> :
          null}

        <Button type="submit">Book on WhatsApp</Button>
        <ButtonHref href={mailHref} variant="secondary">Email this enquiry</ButtonHref>
        {bookingUrl ?
          <ButtonHref href={bookingUrl} variant="ghost" external>
            Open booking on rlholidays.com
          </ButtonHref> :
          null}
      </form>
    </aside>
  );
}
