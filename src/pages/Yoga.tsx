import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { EditableSection } from '../admin/customize/EditableSection';
import { useSection } from '../admin/customize/store';
import { isYogaStay } from '../utils/stays';

export function Yoga() {
  const { publishedPackages } = useContent();
  const copy = useSection('page.yoga');
  const stays = publishedPackages.filter(isYogaStay);

  return (
    <EditableSection id="page.yoga">
      <StayCalendar
        eyebrow={copy.eyebrow}
        title={copy.title}
        image={copy.image}
        imageAlt={copy.imageAlt}
        programs={stays}
        hideKind />
    </EditableSection>
  );
}
