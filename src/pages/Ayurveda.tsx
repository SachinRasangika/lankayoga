import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { EditableSection } from '../admin/customize/EditableSection';
import { useSection } from '../admin/customize/store';
import { isAyurvedaStay } from '../utils/stays';

export function Ayurveda() {
  const { publishedPackages } = useContent();
  const copy = useSection('page.ayurveda');
  const stays = publishedPackages.filter(isAyurvedaStay);

  return (
    <EditableSection id="page.ayurveda">
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
