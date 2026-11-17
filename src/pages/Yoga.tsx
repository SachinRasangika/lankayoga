import { StayCalendar } from '../components/programs/StayCalendar';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { isYogaStay } from '../utils/stays';
import { useSiteCopy } from '../lib/siteCopy';

export function Yoga() {
  const { publishedPackages } = useContent();
  const stays = publishedPackages.filter(isYogaStay);
  const page = useSiteCopy().pages.yoga;

  return (
    <StayCalendar
      eyebrow={page.eyebrow}
      title={page.title}
      image={media.mistHills}
      imageAlt="Layered misty hills at dawn beyond the lake"
      programs={stays}
      hideKind />
  );
}
