import { Link } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { SoftImage } from '../components/motion/SoftImage';
import { ButtonLink } from '../components/ui/Button';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { coverOf } from '../utils/gallery';
import { treatmentPath } from '../utils/stays';

export function Treatments() {
  const { publishedTreatments } = useContent();

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Warm oil, poured slowly"
        lede="Six rooms, an apothecary of our own, and a physician who decides which therapies your pulse asks for."
        image={media.therapyRoom}
        imageAlt="Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels"
        meta={[
          { label: 'Rooms', value: '6' },
          { label: 'Physician', value: 'Daily' },
          { label: 'Oils', value: 'Our own' }
        ]} />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionIntro
              align="left"
              eyebrow="The wing"
              title="Blended in our own apothecary"
              note="Most stays include treatments. A private hour can be arranged if you are not on a healing programme." />
            <SoftImage
              src={media.steamBath}
              alt="Steam curling in a dark wooden Ayurvedic steam chamber"
              className="mt-10 h-72 lg:h-96"
              drift={7} />
          </div>
          {publishedTreatments.length === 0 ?
            <p className="text-sm text-muted lg:col-span-8">No treatments are listed yet. Write to the desk to ask.</p> :
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
              {publishedTreatments.map((therapy) => {
                const thumb = coverOf(therapy.image, therapy.images);
                return (
                <li key={therapy.id}>
                  <Link to={treatmentPath(therapy)} className="group flex flex-col gap-2 border-t border-line pt-5">
                    {thumb ?
                      <img
                        src={thumb}
                        alt=""
                        className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" /> :
                      null}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-light tracking-tight text-ink group-hover:text-terracotta-700 dark:group-hover:text-terracotta-200">
                        {therapy.name}
                      </h3>
                      <span className="text-xs text-muted">{therapy.duration}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{therapy.description}</p>
                    <p className="text-[0.6875rem] uppercase tracking-widest text-muted">
                      {therapy.doshas.join(' · ')}
                    </p>
                  </Link>
                </li>
                );
              })}
            </ul>}
        </div>
      </Section>

      <Section tone="warm">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-terracotta-600 dark:text-terracotta-300">A full protocol</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.5rem]">
              Panchakarma is a stay, not a single treatment
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              If you need a sequence written to your pulse, look at the Ayurveda dates. For one treatment while you practise, write to the desk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/ayurveda">Ayurveda dates</ButtonLink>
            <ButtonLink to="/contact?topic=a treatment" variant="secondary">Ask for a treatment</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
