import React from 'react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { VirtualTour } from '../components/media/VirtualTour';
import { MediaGallery } from '../components/media/MediaGallery';
import { VenueInquiryForm } from '../components/campus/VenueInquiryForm';
import { SensoryScene } from '../components/home/SensoryScene';
import { Reveal } from '../components/motion/Reveal';
import { hostingIncludes, venueSpaces } from '../data/venues';
import { media } from '../data/media';
import { formatPrice } from '../utils/format';

export function Campus() {
  return (
    <>
      <PageHero
        eyebrow="Campus & Hire"
        title="Nine acres, yours between our own intakes"
        lede="A shala on the water, six therapy rooms, 28 beds — and a team that hosts retreats every week."
        image={media.campusAerial}
        imageAlt="Aerial view of the eco campus beside the lake, surrounded by palm canopy"
        meta={[
        { label: 'Beds', value: '28' },
        { label: 'Shala', value: '120 m²' },
        { label: 'Therapy rooms', value: '6' },
        { label: 'Grounds', value: '9 acres' }]
        } />
      

      <Section tone="base">
        <SectionIntro eyebrow="360° tour" title="Look around first" />
        <div className="mt-14">
          <VirtualTour />
        </div>
      </Section>

      <SensoryScene
        image={media.palmPath}
        alt="A stone path curving through tall coconut palms"
        line="Nine acres,"
        emphasis="no straight lines in it." />
      

      <Section tone="warm">
        <SectionIntro eyebrow="Gallery" title="Where you will sleep and practise" />
        <div className="mt-14">
          <MediaGallery />
        </div>
      </Section>

      <Section tone="base">
        <SectionIntro eyebrow="Spaces" title="One room, or all of it" />
        <ul className="mx-auto mt-14 flex max-w-4xl flex-col">
          {venueSpaces.map((space) =>
          <li key={space.id} className="grid gap-3 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline">
              <div>
                <h3 className="font-display text-2xl font-light tracking-tight text-ink">{space.name}</h3>
                <p className="mt-1.5 text-sm text-muted">
                  {space.capacity} · {space.features.join(' · ')}
                </p>
              </div>
              <p className="font-display text-xl font-light text-ink sm:text-right">
                {formatPrice(space.dayRateUsd)}
                <span className="ml-1 text-sm text-muted">/ day</span>
              </p>
            </li>
          )}
        </ul>
      </Section>

      <SensoryScene
        image={media.hammockLake}
        alt="An empty woven hammock between two palms above a calm lake at golden hour"
        line="Your group will thank you"
        emphasis="for the empty afternoons."
        foreground={media.reedsEdge} />
      

      <Section tone="deep">
        <SectionIntro align="left" tone="dark" eyebrow="Included" title="You teach. We run everything else." />
        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {hostingIncludes.map((item, index) =>
          <li key={item.title}>
              <Reveal delay={index * 0.05} className="flex flex-col gap-2 border-t border-sage-700 pt-5">
                <h3 className="font-display text-xl font-light text-sand-50">{item.title}</h3>
                <p className="text-sm leading-relaxed text-sage-300">{item.detail}</p>
              </Reveal>
            </li>
          )}
        </ul>
      </Section>

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionIntro
              align="left"
              eyebrow="Enquiry"
              title="Tell us what you are planning"
              note="A reply within a working day. Most teachers book nine to fourteen months ahead." />
            
            <dl className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
              {[
              { label: 'Group size', value: '14 – 24' },
              { label: 'Minimum stay', value: '5 nights' },
              { label: 'Best availability', value: 'May – September' },
              { label: 'From Colombo', value: '2h 10m' }].
              map((item) =>
              <div key={item.label} className="flex items-baseline justify-between gap-6">
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="text-sm font-medium text-ink">{item.value}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="lg:col-span-7">
            <VenueInquiryForm />
          </div>
        </div>
      </Section>
    </>);

}