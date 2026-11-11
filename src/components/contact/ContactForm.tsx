import { useState, type FormEvent } from 'react';
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { business } from '../../data/business';
import { sendInquiry } from '../../utils/sendInquiry';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const topics = [
  { value: 'stay', label: 'A stay' },
  { value: 'healing', label: 'Ayurveda' },
  { value: 'other', label: 'Something else' }
] as const;

const emptyForm = {
  name: '',
  email: '',
  topic: 'stay',
  dates: '',
  message: ''
};

const fieldClass =
  'w-full min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none sm:min-h-0 sm:text-sm';

const MAIL = business.email;

export function ContactForm({ inquiryTopic = '' }: { inquiryTopic?: string }) {
  const [form, setForm] = useState({
    ...emptyForm,
    message: inquiryTopic ? `I would like to ask about ${inquiryTopic}.\n\n` : ''
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  function set<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.message.trim()) {
      setError('Please add your name, a valid email and a short note.');
      setStatus('error');
      return;
    }

    const topic = topics.find((item) => item.value === form.topic)?.label ?? 'A stay';
    const subject = inquiryTopic.trim()
      ? `Inquiry — ${inquiryTopic.trim()}`
      : `Message from ${form.name.trim()}`;
    setStatus('submitting');
    setError('');
    try {
      await sendInquiry({
        subject,
        replyTo: form.email.trim(),
        fields: {
          Name: form.name.trim(),
          Email: form.email.trim(),
          About: topic,
          Dates: form.dates.trim(),
          Message: form.message.trim()
        }
      });
      setStatus('success');
    } catch (sendError) {
      setStatus('error');
      setError(sendError instanceof Error ? sendError.message : 'The message could not be sent.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-sage-200 bg-sage-50 p-8 dark:border-sage-700 dark:bg-sage-900/40">
        <CheckCircle2Icon className="h-7 w-7 text-sage-600 dark:text-sage-300" />
        <div>
          <h3 className="font-display text-2xl font-light text-ink">Sent</h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
            Your note is with us. We will reply within one working day, or you can write to{' '}
            <a href={`mailto:${MAIL}`} className="text-ink underline underline-offset-4">{MAIL}</a>.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setForm(emptyForm);
            setStatus('idle');
          }}>
          Write another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-line bg-raised p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-[0.8125rem] font-medium text-ink">Your name</label>
          <input
            id="contact-name"
            value={form.name}
            onChange={(event) => set('name', event.target.value)}
            placeholder="Maya Lindqvist"
            autoComplete="name"
            required
            className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-[0.8125rem] font-medium text-ink">Email</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(event) => set('email', event.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
            required
            className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-topic" className="text-[0.8125rem] font-medium text-ink">What is this about?</label>
          <select
            id="contact-topic"
            value={form.topic}
            onChange={(event) => set('topic', event.target.value)}
            className={fieldClass}>
            {topics.map((topic) =>
              <option key={topic.value} value={topic.value}>{topic.label}</option>
            )}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-dates" className="text-[0.8125rem] font-medium text-ink">
            Dates <span className="text-muted">(optional)</span>
          </label>
          <input
            id="contact-dates"
            value={form.dates}
            onChange={(event) => set('dates', event.target.value)}
            placeholder="November 2026, or 15–22 Nov"
            className={fieldClass} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-[0.8125rem] font-medium text-ink">Your note</label>
        <textarea
          id="contact-message"
          rows={6}
          value={form.message}
          onChange={(event) => set('message', event.target.value)}
          placeholder="Tell us who is coming, and what you are hoping for."
          required
          className={cn(fieldClass, 'min-h-[10rem] resize-none leading-relaxed')} />
      </div>

      {status === 'error' ?
        <p className="flex items-center gap-2 text-sm text-terracotta-600 dark:text-terracotta-300" role="alert">
          <AlertCircleIcon className="h-4 w-4 shrink-0" />
          {error || 'Please add your name, a valid email and a short note.'}
        </p> :
        null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          Goes to {MAIL}. We reply within one working day.
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ?
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Sending
            </> :
            'Send message'}
        </Button>
      </div>
    </form>
  );
}
