import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, LeafIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { BrandMark } from './BrandMark';
import { contact } from '../../data/contact';
import { sendInquiry } from '../../utils/sendInquiry';

const links = [
{ to: '/teacher-training', label: 'Teacher Training' },
{ to: '/ayurveda', label: 'Ayurveda' },
{ to: '/retreats', label: 'Retreats' },
{ to: '/campus', label: 'Campus & Hire' },
{ to: '/book', label: 'Book a stay' },
{ to: '/contact', label: 'Contact' },
{ to: '/journal', label: 'Journal' }];


export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes('@')) return;
    setSubscribeError('');
    try {
      await sendInquiry({
        subject: 'Newsletter signup',
        replyTo: email.trim(),
        fields: { Email: email.trim() }
      });
      setSubscribed(true);
    } catch (error) {
      setSubscribeError(error instanceof Error ? error.message : 'Could not save that address.');
    }
  }

  return (
    <footer className="border-t border-line bg-raised">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <BrandMark className="h-20 self-start" />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A lakeside eco-campus near Kurunegala, Sri Lanka.
            </p>
            <a href={`mailto:${contact.email}`} className="text-sm text-ink underline underline-offset-4">
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneTel}`} className="text-sm text-ink underline underline-offset-4">
              {contact.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <p className="eyebrow text-muted">A letter, five times a year</p>
            {subscribed ?
            <p className="flex items-center gap-2 text-sm text-sage-700 dark:text-sage-200">
                <CheckIcon className="h-4 w-4 shrink-0" />
                Thank you. We'll be in touch.
              </p> :

            <form onSubmit={handleSubscribe} className="flex max-w-md flex-col gap-2.5 sm:flex-row">
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-sage-400 focus:outline-none" />
              
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
            }
            {subscribeError ?
            <p className="text-sm text-terracotta-600 dark:text-terracotta-300" role="alert">{subscribeError}</p> :
            null}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {links.map((link) =>
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-muted transition-colors duration-200 hover:text-ink">
            
              {link.label}
            </Link>
          )}
        </nav>

        <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lanka Yoga &amp; Ayurveda Resort</p>
          <p className="flex items-center gap-2">
            <LeafIcon className="h-3.5 w-3.5 text-sage-500" />
            Solar powered
          </p>
        </div>
      </div>
    </footer>);

}