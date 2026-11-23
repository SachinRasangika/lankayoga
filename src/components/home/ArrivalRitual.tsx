import React from 'react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { SoftImage } from '../motion/SoftImage';
import { Reveal } from '../motion/Reveal';
import { EditableSection } from '../../admin/customize/EditableSection';
import { useSection } from '../../admin/customize/store';

export function ArrivalRitual() {
  const copy = useSection('home.arrival');
  return (
    <EditableSection id="home.arrival">
    <Section tone="warm">
      <SectionIntro
        eyebrow={copy.eyebrow}
        title={
        <>
            {copy.title} <span className="italic">{copy.titleEmphasis}</span>
          </>
        } />
      

      <ol className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {copy.steps.map((moment, index) =>
        <li key={moment.id}>
            <Reveal delay={index * 0.06} className="flex flex-col gap-5">
              <SoftImage src={moment.image} alt={moment.alt} className="h-80 sm:h-96" drift={5} />
              <div className="flex flex-col gap-2">
                <span className="text-[0.6875rem] uppercase tracking-widest text-muted">{moment.step}</span>
                <h3 className="font-display text-2xl font-light tracking-tight text-ink">{moment.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{moment.note}</p>
              </div>
            </Reveal>
          </li>
        )}
      </ol>
    </Section>
    </EditableSection>);

}