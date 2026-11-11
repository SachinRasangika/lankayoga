import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { isYogaStay } from '../utils/stays';

export function Yoga() {
  const { publishedPackages } = useContent();
  const stays = publishedPackages.filter(isYogaStay);

  return (
    <StayCalendar
      eyebrow="Yoga"
      title="Dates for practice by the lake"
      image={media.mistHills}
      imageAlt="Layered misty hills at dawn beyond the lake"
      programs={stays}
      hideKind />
  );
}
