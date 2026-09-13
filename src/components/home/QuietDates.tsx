import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramCard } from '../programs/ProgramCard';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { ButtonLink } from '../ui/Button';
import { media } from '../../data/media';
import { programs } from '../../data/programs';

export function QuietDates() {
  const navigate = useNavigate();

  return (
    <Section tone="base" backdrop={media.palmCanopySky} backdropOpacity={0.12}>
      <div className="mx-auto max-w-3xl">
        <SectionIntro eyebrow="Next dates" title="Small groups. They close early." />
        <div className="mt-14 border-t border-line">
          {programs.slice(0, 3).map((program) =>
          <ProgramCard key={program.id} program={program} onSelect={() => navigate('/retreats')} />
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/retreats" variant="secondary">
            See every date
          </ButtonLink>
        </div>
      </div>
    </Section>);

}