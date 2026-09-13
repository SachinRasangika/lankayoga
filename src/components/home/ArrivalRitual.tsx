import React from 'react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { SoftImage } from '../motion/SoftImage';
import { Reveal } from '../motion/Reveal';
import { arrivalRitual } from '../../data/dayJourney';

export function ArrivalRitual() {
  return (
    <Section tone="warm">
      <SectionIntro
        eyebrow="The first day"
        title={
        <>
            Nothing is asked of you <span className="italic">until you have rested</span>
          </>
        } />
      

      <ol className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {arrivalRitual.map((moment, index) =>
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
    </Section>);

}