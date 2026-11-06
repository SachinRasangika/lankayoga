import React, { useState } from 'react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { DoshaGuide } from '../components/ayurveda/DoshaGuide';
import { ProgramCard } from '../components/programs/ProgramCard';
import { ProgramDetailPanel } from '../components/programs/ProgramDetailPanel';
import { SensoryScene } from '../components/home/SensoryScene';
import { PinnedLines } from '../components/motion/PinnedLines';
import { SoftImage } from '../components/motion/SoftImage';
import { Reveal } from '../components/motion/Reveal';
import { TreatmentTable } from '../components/ayurveda/TreatmentTable';
import { panchakarmaPhases } from '../data/ayurveda';
import { programs } from '../data/programs';
import { teachers } from '../data/teachers';
import { media } from '../data/media';
import { Program } from '../types';

export function Ayurveda() {
  const [selected, setSelected] = useState<Program | null>(null);
  const physician = teachers.find((teacher) => teacher.id === 'ranil');
  const clinical = programs.filter((program) => program.focus === 'ayurveda');

  return (
    <>
      <PageHero
        eyebrow="Ayurvedic Healing"
        title="Nothing is prescribed before your pulse is read"
        lede="Six therapy rooms, an apothecary of our own, and a physician who sees you every morning."
        image={media.therapyRoom}
        imageAlt="Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels"
        meta={[
        { label: 'Therapy rooms', value: '6' },
        { label: 'Physician', value: 'Daily' },
        { label: 'Programmes', value: '14 & 21 day' },
        { label: 'Patients', value: '8 at a time' }]
        } />
      

      {physician ?
      <Section tone="base">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <SoftImage
            src={physician.image}
            alt={`Portrait of ${physician.name}`}
            className="h-[26rem] lg:col-span-4 lg:h-[32rem]"
            drift={4} />
          
            <div className="flex flex-col gap-6 lg:col-span-8">
              <p className="font-display text-[2rem] font-light leading-[1.15] tracking-tight text-ink sm:text-[2.75rem]">
                “A package cannot know your pulse. <span className="italic">I write the protocol after I read it.</span>”
              </p>
              <div>
                <p className="text-sm font-medium text-ink">{physician.name}</p>
                <p className="text-sm text-muted">{physician.credentials[0]}</p>
              </div>
            </div>
          </div>
        </Section> :
      null}

      <Section tone="warm">
        <SectionIntro eyebrow="Panchakarma" title="Three phases, twenty-one days" />
        <ol className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {panchakarmaPhases.map((phase, index) =>
          <li key={phase.phase}>
              <Reveal delay={index * 0.06} className="flex flex-col gap-3 border-t border-sage-600 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.6875rem] uppercase tracking-widest text-terracotta-600 dark:text-terracotta-300">
                    {phase.phase}
                  </span>
                  <span className="text-xs text-muted">{phase.window}</span>
                </div>
                <h3 className="font-display text-2xl font-light tracking-tight text-ink">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{phase.detail}</p>
              </Reveal>
            </li>
          )}
        </ol>
      </Section>

      <PinnedLines
        image={media.oilHands}
        alt="Warm herbal oil poured from a brass vessel into cupped hands"
        eyebrow="How a day is decided"
        lines={['Your pulse, every morning.', 'Only the therapies it asks for.', 'Then food, rebuilt slowly.']} />
      

      <Section tone="base">
        <SectionIntro eyebrow="Constitution" title="Which one sounds like you?" />
        <div className="mt-16">
          <DoshaGuide />
        </div>
      </Section>

      <Section id="treatments" tone="warm">
        <SectionIntro
          eyebrow="Treatments"
          title="Name, time, and when to book"
          note="Choose a treatment, then email us inside its booking window." />
        
        <TreatmentTable />
      </Section>

      <SensoryScene
        image={media.gardenHerbs}
        alt="Tropical herb garden with dew on holy basil and lemongrass"
        line="Eleven of the herbs we use"
        emphasis="grow ninety steps away." />
      

      <Section tone="raised">
        <div className="mx-auto max-w-3xl">
          <SectionIntro eyebrow="Dates" title="Healing programmes" note="Panchakarma begins with a consultation, not a booking." />
          <div className="mt-14 border-t border-line">
            {clinical.map((program) =>
            <ProgramCard key={program.id} program={program} onSelect={setSelected} />
            )}
          </div>
        </div>
      </Section>

      <ProgramDetailPanel program={selected} onClose={() => setSelected(null)} />
    </>);

}