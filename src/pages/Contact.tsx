import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { contact } from '../data/contact';
import { media } from '../data/media';
import { sendInquiry } from '../utils/sendInquiry';

const fieldClass =
'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-sage-400 focus:outline-none';

export function Contact() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') ?? '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(topic ? `I would like to ask about ${topic}.\n\n` : '');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) return;
    setStatus('sending');
    setError('');
    try {
      await sendInquiry({
        subject: topic ? `Inquiry — ${topic}` : `Message from ${name.trim()}`,
        replyTo: email.trim(),
        fields: {
          Name: name.trim(),
          Email: email.trim(),
          Topic: topic,
          Message: message.trim()
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
        eyebrow="Contact"
        title="Call, or write"
        lede="The number below is the one to use for stays, treatments and campus hire."
        image={media.verandahRest}
        imageAlt="A quiet verandah overlooking the lake"
        meta={[
        { label: 'Phone', value: contact.phoneDisplay },
        { label: 'Email', value: contact.email }]
        } />
      

      <Section tone="base" size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">Phone</p>
            <a
              href={`tel:${contact.phoneTel}`}
              className="font-display text-4xl font-light tracking-tight text-ink underline-offset-8 hover:underline sm:text-5xl">
              
              {contact.phoneDisplay}
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A lakeside eco-campus near Kurunegala, Sri Lanka. For a written reply, email{' '}
              <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4">
                {contact.email}
              </a>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-line bg-raised p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-[0.8125rem] font-medium text-ink">
                Name
              </label>
              <input
                id="contact-name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass} />
              
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-[0.8125rem] font-medium text-ink">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass} />
              
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-[0.8125rem] font-medium text-ink">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={fieldClass} />
              
            </div>
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Send message'}
            </Button>
            {status === 'sent' ?
            <p className="text-sm leading-relaxed text-muted">
                Sent. We will reply to {email.trim()}. You can also call {contact.phoneDisplay}.
              </p> :
            null}
            {status === 'error' ?
            <p className="text-sm text-terracotta-600 dark:text-terracotta-300" role="alert">{error}</p> :
            null}
          </form>
        </div>
      </Section>
    </>);

}
