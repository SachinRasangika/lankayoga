import React, { useState } from 'react';
import { PageHero } from '../components/layout/PageHero';
import { Section } from '../components/layout/Section';
import { SectionIntro } from '../components/layout/SectionIntro';
import { CurriculumAccordion } from '../components/ytt/CurriculumAccordion';
import { TeacherCard } from '../components/teachers/TeacherCard';
import { ProgramCard } from '../components/programs/ProgramCard';
import { ProgramDetailPanel } from '../components/programs/ProgramDetailPanel';
import { SensoryScene } from '../components/home/SensoryScene';
import { SoftImage } from '../components/motion/SoftImage';
import { Reveal } from '../components/motion/Reveal';
import { useSiteCopy } from '../lib/siteCopy';
import { programs } from '../data/programs';
import { teachers } from '../data/teachers';
import { media } from '../data/media';
import { Program } from '../types';

export function TeacherTraining() {
  const [selected, setSelected] = useState<Program | null>(null);
  const page = useSiteCopy().pages.training;
  const trainings = programs.filter((program) => program.kind === 'training');

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        image={media.yttPractice}
        imageAlt="Students in seated practice in the open-air shala during teacher training"
        meta={page.facts} />
      

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionIntro align="left" eyebrow={page.curriculumEyebrow} title={page.curriculumTitle} />
            <SoftImage
              src={media.handsMudra}
              alt="Relaxed hands resting on crossed knees in a simple mudra"
              className="mt-10 hidden h-64 lg:block"
              drift={5} />
            
          </div>
          <div className="lg:col-span-8">
            <CurriculumAccordion />
          </div>
        </div>
      </Section>

      <SensoryScene
        image={media.dawnCanoe}
        alt="A wooden canoe on a still misty lake at first light"
        line={page.dawnLine}
        emphasis={page.dawnEmphasis}
        foreground={media.reedsEdge} />
      

      <Section tone="warm">
        <SectionIntro eyebrow={page.facultyEyebrow} title={page.facultyTitle} />
        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {teachers.map((teacher, index) =>
          <li key={teacher.id} className="flex">
              <Reveal delay={index * 0.06} className="flex w-full">
                <TeacherCard teacher={teacher} />
              </Reveal>
            </li>
          )}
        </ul>
      </Section>

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionIntro align="left" eyebrow={page.admissionEyebrow} title={page.admissionTitle} />
            <SoftImage
              src={media.shalaEmpty}
              alt="The empty shala with mats rolled and bolsters stacked between practices"
              className="mt-10 h-56 lg:h-72"
              drift={6} />
            
          </div>
          <ol className="flex flex-col lg:col-span-8">
            {page.steps.map((step, index) =>
            <li key={step.title} className="flex gap-6 border-b border-line py-6 first:pt-0 last:border-b-0">
                <span className="mt-1 font-display text-base font-light text-terracotta-600 dark:text-terracotta-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-2xl font-light tracking-tight text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </li>
            )}
          </ol>
        </div>
      </Section>

      <SensoryScene
        image={media.singingBowl}
        alt="An aged brass singing bowl resting on dark stone"
        line={page.duskLine}
        emphasis={page.duskEmphasis} />
      

      <Section tone="raised">
        <div className="mx-auto max-w-3xl">
          <SectionIntro eyebrow={page.intakesEyebrow} title={page.intakesTitle} />
          <div className="mt-14 border-t border-line">
            {trainings.map((program) =>
            <ProgramCard key={program.id} program={program} onSelect={setSelected} />
            )}
          </div>
        </div>
      </Section>

      <ProgramDetailPanel program={selected} onClose={() => setSelected(null)} />
    </>);

}