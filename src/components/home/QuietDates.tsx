import { ProgramCard } from '../programs/ProgramCard';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { ButtonLink } from '../ui/Button';
import { media } from '../../data/media';
import { useContent } from '../../admin/content';

export function QuietDates() {
  const { publishedPackages } = useContent();
  const upcoming = publishedPackages.slice(0, 3);

  return (
    <Section tone="base" backdrop={media.palmCanopySky} backdropOpacity={0.12}>
      <div className="mx-auto max-w-3xl">
        <SectionIntro eyebrow="Next dates" title="Small groups. They close early." />
        <div className="mt-14 border-t border-line">
          {upcoming.map((program) =>
          <ProgramCard key={program.id} program={program} />
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/yoga" variant="secondary">
            See yoga dates
          </ButtonLink>
        </div>
      </div>
    </Section>);

}