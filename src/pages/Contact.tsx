import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { ContactForm } from '../components/contact/ContactForm';
import { businessMapsEmbedUrl } from '../data/business';
import { EditableSection } from '../admin/customize/EditableSection';
import { useSection } from '../admin/customize/store';

export function Contact() {
  const hero = useSection('page.contact');
  const desk = useSection('page.contactDesk');

  return (
    <>
      <EditableSection id="page.contact">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        image={hero.image}
        imageAlt={hero.imageAlt}
        meta={[...hero.meta]} />
      </EditableSection>

      <EditableSection id="page.contactDesk">
      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <div>
              <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">{desk.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl">
                {desk.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {desk.body}
              </p>
            </div>
            <dl className="flex flex-col gap-6 border-t border-line pt-6">
              {desk.details.map((item) =>
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="text-[0.625rem] uppercase tracking-widest text-muted">{item.label}</dt>
                  <dd className="text-sm text-ink">
                    {item.href ?
                      <a
                        href={item.href}
                        className="underline underline-offset-4 hover:text-sage-700"
                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                        {item.value}
                      </a> :
                      item.value}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>
      </EditableSection>

      <Section tone="warm" size="md">
        <div className="overflow-hidden rounded-3xl border border-line bg-raised">
          <iframe
            title="Map of Lanka Yoga & Ayurveda Resort in Hikkaduwa"
            src={businessMapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full border-0 sm:h-[28rem]"
          />
        </div>
      </Section>
    </>
  );
}
