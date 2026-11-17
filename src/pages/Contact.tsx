import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { ContactForm } from '../components/contact/ContactForm';
import { media } from '../data/media';
import { useLiveBusiness, useSiteCopy } from '../lib/siteCopy';

export function Contact() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') ?? '';
  const { business, addressLine, mapsUrl, mapsEmbedUrl } = useLiveBusiness();
  const page = useSiteCopy().pages.contactPage;
  const details: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: 'Name', value: business.name },
    { label: 'Address', value: addressLine, href: mapsUrl, external: true },
    { label: 'Phone', value: business.telephoneDisplay, href: `tel:${business.telephone}` },
    { label: 'Write', value: business.email, href: `mailto:${business.email}` },
    { label: 'Reply', value: 'Within one working day' }
  ];

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        image={media.jettySunset}
        imageAlt="A wooden jetty over a still lake at sunset"
        meta={page.facts} />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <div>
              <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">{page.deskEyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl">
                {page.deskTitle}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {page.deskNote}
              </p>
            </div>
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
          </div>
          <div className="lg:col-span-8">
            <ContactForm inquiryTopic={topic} />
          </div>
        </div>
      </Section>

      <Section tone="warm" size="md">
        <div className="overflow-hidden rounded-3xl border border-line bg-raised">
          <iframe
            title="Map of Lanka Yoga & Ayurveda Resort in Hikkaduwa"
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full border-0 sm:h-[28rem]"
          />
        </div>
      </Section>
    </>
  );
}
