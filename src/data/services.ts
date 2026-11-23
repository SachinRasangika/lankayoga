import { media } from './media';

export interface HeroService {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  line: string;
  detail: string;
  to: string;
  cta: string;
  image: string;
  alt: string;
}

export const heroServices: HeroService[] = [
{
  id: 'ayurveda',
  tab: 'Ayurveda',
  eyebrow: 'Doctor-led healing',
  title: 'Panchakarma, written to your pulse',
  line: 'A resident physician, six therapy rooms, eight patients at a time.',
  detail: '14 & 21 day programmes · from $3,600',
  to: '/ayurveda',
  cta: 'Explore healing',
  image: media.heroShirodhara,
  alt: 'Warm oil flowing onto a guest’s forehead during a shirodhara treatment'
},
{
  id: 'yoga',
  tab: 'Yoga',
  eyebrow: 'A week away',
  title: 'Seven days to put yourself down',
  line: 'Practice, breathwork, therapies — and long empty afternoons.',
  detail: 'Weekly departures · from $1,650',
  to: '/yoga',
  cta: 'Browse yoga dates',
  image: media.heroRetreat,
  alt: 'A small group meditating along a wooden jetty over a still lake at sunrise'
},
{
  id: 'contact',
  tab: 'Contact',
  eyebrow: 'Write to us',
  title: 'Ask about a quiet week',
  line: 'A person reads every note and writes back within a day.',
  detail: 'lankayogaayurvedaresort@gmail.com',
  to: '/contact',
  cta: 'Contact us',
  image: media.heroVenue,
  alt: 'The lakefront shala laid out with mats and lanterns at dusk'
}];