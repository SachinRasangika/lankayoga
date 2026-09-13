import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { HeroSlides } from '../components/home/HeroSlides';
import { Welcome } from '../components/home/Welcome';
import { BreathGuide } from '../components/home/BreathGuide';
import { TwoPaths } from '../components/home/TwoPaths';
import { Seasons } from '../components/home/Seasons';
import { DayJourney } from '../components/home/DayJourney';
import { SensoryScene } from '../components/home/SensoryScene';
import { PinnedLines } from '../components/motion/PinnedLines';
import { ArrivalRitual } from '../components/home/ArrivalRitual';
import { SoundOfPlace } from '../components/home/SoundOfPlace';
import { StayGallery } from '../components/home/StayGallery';
import { SenseCards } from '../components/home/SenseCards';
import { QuietDates } from '../components/home/QuietDates';
import { VirtualTour } from '../components/media/VirtualTour';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';
import { media } from '../data/media';
import { ecologyCommitments } from '../data/venues';

export function Home() {
  return (
    <>
      <HeroSlides />
      <Welcome />

      <SensoryScene
        image={media.mistHills}
        alt="Layered misty hills at dawn"
        line="The day starts before you do."
        emphasis="Let it."
        foreground={media.reedsEdge} />
      

      <BreathGuide />
      <TwoPaths />
      <DayJourney />
      <Seasons />

      <PinnedLines
        image={media.lakeWideDawn}
        alt="A wide calm lake at dawn with distant layered hills"
        eyebrow="Three days in"
        lines={['You sleep by nine.', 'You stop reaching for your phone.', 'You notice the water changing colour.']} />
      

      <ArrivalRitual />
      <SoundOfPlace />
      <StayGallery />
      <SenseCards />

      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <SectionIntro
              align="left"
              eyebrow="Before you fly"
              title="Stand in the shala from where you are"
              note="Drag to look around. Four spaces." />
            
            <ButtonLink to="/campus" variant="secondary" size="sm" className="mt-8">
              Campus
            </ButtonLink>
          </div>
          <div className="lg:col-span-8">
            <VirtualTour />
          </div>
        </div>
      </Section>

      <QuietDates />

      <SensoryScene
        image={media.nightLamps}
        alt="Clay oil lamps glowing along a wooden jetty at night"
        line="Lamps at dusk."
        emphasis="Quiet before nine." />
      

      <Section tone="deep" backdrop={media.gardenHerbs} backdropOpacity={0.14}>
        <SectionIntro
          align="left"
          tone="dark"
          eyebrow="Ecology"
          title="The campus gives the land back more than it takes" />
        
        <dl className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ecologyCommitments.map((item, index) =>
          <Reveal key={item.label} delay={index * 0.05} className="flex flex-col gap-2 border-t border-sage-700 pt-5">
              <dt className="font-display text-[3rem] font-light leading-none text-sand-50">{item.stat}</dt>
              <dd className="text-sm text-sage-300">{item.label}</dd>
            </Reveal>
          )}
        </dl>
      </Section>

      <Section tone="raised" size="md">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
            Teaching your own group? Take the whole campus.
          </h2>
          <ButtonLink to="/campus">
            Enquire
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>);

}