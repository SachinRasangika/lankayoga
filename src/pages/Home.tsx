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
import { FindUs } from '../components/home/FindUs';
import { VirtualTour } from '../components/media/VirtualTour';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/motion/Reveal';
import { EditableSection } from '../admin/customize/EditableSection';
import { useSection } from '../admin/customize/store';

export function Home() {
  const dawn = useSection('home.dawn');
  const pinned = useSection('home.pinned');
  const tour = useSection('home.tour');
  const dusk = useSection('home.dusk');
  const ecology = useSection('home.ecology');
  const close = useSection('home.close');

  return (
    <>
      <HeroSlides />
      <Welcome />

      <EditableSection id="home.dawn">
        <SensoryScene
          image={dawn.image}
          alt={dawn.alt}
          line={dawn.line}
          emphasis={dawn.emphasis}
          foreground={dawn.foreground || undefined} />
      </EditableSection>

      <BreathGuide />
      <TwoPaths />
      <DayJourney />
      <Seasons />

      <EditableSection id="home.pinned">
        <PinnedLines
          image={pinned.image}
          alt={pinned.alt}
          eyebrow={pinned.eyebrow}
          lines={[...pinned.lines]} />
      </EditableSection>

      <ArrivalRitual />
      <SoundOfPlace />
      <StayGallery />
      <SenseCards />

      <EditableSection id="home.tour">
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <SectionIntro
              align="left"
              eyebrow={tour.eyebrow}
              title={tour.title}
              note={tour.note} />
            
            <ButtonLink to="/contact" variant="secondary" size="sm" className="mt-8">
              {tour.button}
            </ButtonLink>
          </div>
          <div className="lg:col-span-8">
            <VirtualTour />
          </div>
        </div>
      </Section>
      </EditableSection>

      <QuietDates />

      <EditableSection id="home.dusk">
        <SensoryScene
          image={dusk.image}
          alt={dusk.alt}
          line={dusk.line}
          emphasis={dusk.emphasis}
          foreground={dusk.foreground || undefined} />
      </EditableSection>

      <EditableSection id="home.ecology">
      <Section tone="deep" backdrop={ecology.image} backdropOpacity={0.14}>
        <SectionIntro
          align="left"
          tone="dark"
          eyebrow={ecology.eyebrow}
          title={ecology.title} />
        
        <dl className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ecology.items.map((item, index) =>
          <Reveal key={item.label} delay={index * 0.05} className="flex flex-col gap-2 border-t border-sage-700 pt-5">
              <dt className="font-display text-[3rem] font-light leading-none text-sand-50">{item.stat}</dt>
              <dd className="text-sm text-sage-300">{item.label}</dd>
            </Reveal>
          )}
        </dl>
      </Section>
      </EditableSection>

      <FindUs />

      <EditableSection id="home.close">
      <Section tone="raised" size="md">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
            {close.title}
          </h2>
          <ButtonLink to="/contact">
            {close.button}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
      </EditableSection>
    </>);

}