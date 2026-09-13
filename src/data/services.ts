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
  id: 'training',
  tab: 'Teacher Training',
  eyebrow: 'Yoga education',
  title: 'Become a teacher in 25 days',
  line: '200 Yoga Alliance hours, one residency, sixteen people.',
  detail: 'Two intakes a year · from $3,450',
  to: '/teacher-training',
  cta: 'See the curriculum',
  image: media.heroYtt,
  alt: 'A teacher training class practising in the open-air lakefront shala at golden hour'
},
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
  id: 'retreats',
  tab: 'Retreats',
  eyebrow: 'A week away',
  title: 'Seven days to put yourself down',
  line: 'Practice, breathwork, therapies — and long empty afternoons.',
  detail: 'Weekly departures · from $1,650',
  to: '/retreats',
  cta: 'Browse the calendar',
  image: media.heroRetreat,
  alt: 'A small group meditating along a wooden jetty over a still lake at sunrise'
},
{
  id: 'campus',
  tab: 'Venue Hire',
  eyebrow: 'For visiting teachers',
  title: 'Bring your group. Take the campus.',
  line: 'Shala, therapy wing and 28 beds, with our team running it.',
  detail: 'Nine acres · from $340 a day',
  to: '/campus',
  cta: 'Enquire about hire',
  image: media.heroVenue,
  alt: 'The lakefront shala laid out with mats and lanterns for a visiting group at dusk'
}];