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
import { useSiteCopy } from '../lib/siteCopy';

export function Campus() {
  const page = useSiteCopy().pages.campus;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        image={media.campusAerial}
        imageAlt="Aerial view of the eco campus beside the lake, surrounded by palm canopy"
        meta={page.facts} />
      

      <Section tone="base">
        <SectionIntro eyebrow={page.tourEyebrow} title={page.tourTitle} />
        <div className="mt-14">
          <VirtualTour />
        </div>
      </Section>

      <SensoryScene
        image={media.palmPath}
        alt="A stone path curving through tall coconut palms"
        line={page.pathLine}
        emphasis={page.pathEmphasis} />
      

      <Section tone="warm">
        <SectionIntro eyebrow={page.galleryEyebrow} title={page.galleryTitle} />
        <div className="mt-14">
          <MediaGallery />
        </div>
      </Section>

      <Section tone="base">
        <SectionIntro eyebrow={page.spacesEyebrow} title={page.spacesTitle} />
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
        line={page.hammockLine}
        emphasis={page.hammockEmphasis}
        foreground={media.reedsEdge} />
      

      <Section tone="deep">
        <SectionIntro align="left" tone="dark" eyebrow={page.includedEyebrow} title={page.includedTitle} />
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
              eyebrow={page.enquiryEyebrow}
              title={page.enquiryTitle}
              note={page.enquiryNote} />
            
            <dl className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
              {page.enquiryFacts.map((item) =>
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