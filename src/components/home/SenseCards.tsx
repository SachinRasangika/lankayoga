import React from 'react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { Reveal } from '../motion/Reveal';
import { senses } from '../../data/dayJourney';

export function SenseCards() {
  return (
    <Section tone="base">
      <SectionIntro eyebrow="Four senses" title="What stays with you" />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {senses.map((sense, index) =>
        <li key={sense.id}>
            <Reveal delay={index * 0.05}>
              <article className="group relative isolate flex h-72 flex-col justify-end overflow-hidden rounded-[1.75rem] border border-line bg-raised p-6 lg:h-80">
                <img
                src={sense.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-[400ms] ease-calm group-hover:scale-[1.04] group-hover:opacity-100 group-focus-within:opacity-100" />
              
                <div className="absolute inset-0 bg-sand-900/0 transition-colors duration-300 ease-calm group-hover:bg-sand-900/55 group-focus-within:bg-sand-900/55" />
                <div className="relative flex flex-col gap-3">
                  <h3 className="font-display text-3xl font-light tracking-tight text-ink transition-colors duration-300 ease-calm group-hover:text-white group-focus-within:text-white">
                    {sense.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted transition-colors duration-300 ease-calm group-hover:text-sand-100 group-focus-within:text-sand-100">
                    {sense.note}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        )}
      </ul>
    </Section>);

}