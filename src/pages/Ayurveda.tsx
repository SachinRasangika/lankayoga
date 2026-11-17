import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { isAyurvedaStay } from '../utils/stays';
import { useSiteCopy } from '../lib/siteCopy';

export function Ayurveda() {
  const { publishedPackages } = useContent();
  const stays = publishedPackages.filter(isAyurvedaStay);
  const page = useSiteCopy().pages.ayurveda;

  return (
    <StayCalendar
      eyebrow={page.eyebrow}
      title={page.title}
      image={media.therapyRoom}
      imageAlt="Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels"
      programs={stays}
      hideKind />
  );
}
