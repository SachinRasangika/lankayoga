import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { isAyurvedaStay } from '../utils/stays';

export function Ayurveda() {
  const { publishedPackages } = useContent();
  const stays = publishedPackages.filter(isAyurvedaStay);

  return (
    <StayCalendar
      eyebrow="Ayurveda"
      title="Dates for healing by the lake"
      image={media.therapyRoom}
      imageAlt="Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels"
      programs={stays}
      hideKind />
  );
}
