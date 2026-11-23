import { ProgramCard } from '../programs/ProgramCard';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { ButtonLink } from '../ui/Button';
import { useContent } from '../../admin/content';
import { EditableSection } from '../../admin/customize/EditableSection';
import { useSection } from '../../admin/customize/store';

export function QuietDates() {
  const { publishedPackages } = useContent();
  const copy = useSection('home.dates');
  const upcoming = publishedPackages.slice(0, 3);

  return (
    <EditableSection id="home.dates">
    <Section tone="base" backdrop={copy.image} backdropOpacity={0.12}>
      <div className="mx-auto max-w-3xl">
        <SectionIntro eyebrow={copy.eyebrow} title={copy.title} />
        <div className="mt-14 border-t border-line">
          {upcoming.map((program) =>
          <ProgramCard key={program.id} program={program} />
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/yoga" variant="secondary">
            {copy.button}
          </ButtonLink>
        </div>
      </div>
    </Section>
    </EditableSection>);

}