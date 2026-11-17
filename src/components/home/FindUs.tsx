import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { Reveal } from '../motion/Reveal';
import { useLiveBusiness, useSiteCopy } from '../../lib/siteCopy';

export function FindUs() {
  const { copy } = useSiteCopy();
  const { business, addressLine, mapsUrl, mapsEmbedUrl } = useLiveBusiness();
  const details: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: 'Name', value: business.name },
    { label: 'Address', value: addressLine, href: mapsUrl, external: true },
    { label: 'Phone', value: business.telephoneDisplay, href: `tel:${business.telephone}` },
    { label: 'Email', value: business.email, href: `mailto:${business.email}` }
  ];
  return (
    <Section tone="base" id="find-us">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionIntro
            align="left"
            eyebrow={copy.findEyebrow}
            title={copy.findTitle}
            note={copy.findNote}
          />

          <Reveal>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
              {copy.findBody}
            </p>
          </Reveal>

          <dl className="flex flex-col gap-6 border-t border-line pt-6">
            {details.map((item) =>
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-[0.625rem] uppercase tracking-widest text-muted">{item.label}</dt>
                <dd className="text-sm text-ink">
                  {item.href ?
                    <a
                      href={item.href}
                      className="underline underline-offset-4 hover:text-sage-700"
                      {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {item.value}
                    </a> :
                    item.value}
                </dd>
              </div>
            )}
          </dl>

          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <a href={`tel:${business.telephone}`} className="inline-flex items-center gap-2 hover:text-ink">
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>
            <a href={business.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <PhoneIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 hover:text-ink">
              <MailIcon className="h-4 w-4" />
              Email
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <MapPinIcon className="h-4 w-4" />
              Open map
            </a>
          </div>
        </div>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="overflow-hidden rounded-3xl border border-line bg-raised shadow-lift">
            <iframe
              title="Map of Lanka Yoga & Ayurveda Resort, a yoga retreat in Hikkaduwa"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 sm:h-[28rem]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
