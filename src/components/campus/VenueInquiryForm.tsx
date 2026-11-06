import React, { useState } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { venueSpaces } from '../../data/venues';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { sendInquiry } from '../../utils/sendInquiry';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  organisation: string;
  spaceId: string;
  startDate: string;
  nights: string;
  guests: string;
  notes: string;
}

const emptyForm: FormState = {
  name: '',
  email: '',
  organisation: '',
  spaceId: venueSpaces[0].id,
  startDate: '',
  nights: '7',
  guests: '18',
  notes: ''
};

const fieldClass =
'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none';

export function VenueInquiryForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.startDate) {
      setError('Please add your name, a valid email and a preferred start date.');
      setStatus('error');
      return;
    }
    const space = venueSpaces.find((item) => item.id === form.spaceId);
    setStatus('submitting');
    setError('');
    try {
      await sendInquiry({
        subject: `Campus hire — ${space?.name ?? 'Venue'}`,
        replyTo: form.email.trim(),
        fields: {
          Name: form.name.trim(),
          Email: form.email.trim(),
          Organisation: form.organisation.trim(),
          Space: space?.name ?? form.spaceId,
          'Start date': form.startDate,
          Nights: form.nights,
          Participants: form.guests,
          Notes: form.notes.trim()
        }
      });
      setStatus('success');
    } catch (sendError) {
      setStatus('error');
      setError(sendError instanceof Error ? sendError.message : 'The enquiry could not be sent.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-sage-200 bg-sage-50 p-8 dark:border-sage-700 dark:bg-sage-900/40">
        <CheckCircle2Icon className="h-7 w-7 text-sage-600 dark:text-sage-300" />
        <div>
          <h3 className="font-display text-2xl font-light text-ink">Enquiry received</h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
            Nadeesha, our retreat manager, will reply within one working day with availability, a provisional hold and
            an indicative quote. Enquiries for the same week are answered in order received.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setForm(emptyForm);
            setStatus('idle');
          }}>
          
          Send another enquiry
        </Button>
      </div>);

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-line bg-raised p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-name" className="text-[0.8125rem] font-medium text-ink">
            Your name
          </label>
          <input
            id="inq-name"
            value={form.name}
            onChange={(event) => set('name', event.target.value)}
            placeholder="Maya Lindqvist"
            className={fieldClass} />
          
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-email" className="text-[0.8125rem] font-medium text-ink">
            Email
          </label>
          <input
            id="inq-email"
            type="email"
            value={form.email}
            onChange={(event) => set('email', event.target.value)}
            placeholder="you@studio.com"
            className={fieldClass} />
          
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inq-org" className="text-[0.8125rem] font-medium text-ink">
          Studio or organisation <span className="text-muted">(optional)</span>
        </label>
        <input
          id="inq-org"
          value={form.organisation}
          onChange={(event) => set('organisation', event.target.value)}
          placeholder="Northside Yoga, Copenhagen"
          className={fieldClass} />
        
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-space" className="text-[0.8125rem] font-medium text-ink">
            Space required
          </label>
          <select
            id="inq-space"
            value={form.spaceId}
            onChange={(event) => set('spaceId', event.target.value)}
            className={fieldClass}>
            
            {venueSpaces.map((space) =>
            <option key={space.id} value={space.id}>
                {space.name} — ${space.dayRateUsd}/day
              </option>
            )}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-date" className="text-[0.8125rem] font-medium text-ink">
            Preferred start date
          </label>
          <input
            id="inq-date"
            type="date"
            value={form.startDate}
            onChange={(event) => set('startDate', event.target.value)}
            className={fieldClass} />
          
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-nights" className="text-[0.8125rem] font-medium text-ink">
            Nights
          </label>
          <input
            id="inq-nights"
            type="number"
            min="2"
            max="60"
            value={form.nights}
            onChange={(event) => set('nights', event.target.value)}
            className={fieldClass} />
          
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inq-guests" className="text-[0.8125rem] font-medium text-ink">
            Participants
          </label>
          <input
            id="inq-guests"
            type="number"
            min="4"
            max="28"
            value={form.guests}
            onChange={(event) => set('guests', event.target.value)}
            className={fieldClass} />
          
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inq-notes" className="text-[0.8125rem] font-medium text-ink">
          What are you planning?
        </label>
        <textarea
          id="inq-notes"
          rows={4}
          value={form.notes}
          onChange={(event) => set('notes', event.target.value)}
          placeholder="Daily schedule, catering needs, whether you would like therapists or a physician involved."
          className={cn(fieldClass, 'resize-none')} />
        
      </div>

      {status === 'error' ?
      <p className="flex items-center gap-2 text-sm text-terracotta-600 dark:text-terracotta-300" role="alert">
          <AlertCircleIcon className="h-4 w-4 shrink-0" />
          {error || 'Please add your name, a valid email and a preferred start date.'}
        </p> :
      null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          No payment now. We hold provisional dates for 14 days while you confirm with your group.
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ?
          <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Sending
            </> :

          'Send enquiry'
          }
        </Button>
      </div>
    </form>);

}