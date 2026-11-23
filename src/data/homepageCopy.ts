export interface SlideCopy {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  line: string;
  detail: string;
  cta: string;
}

export interface StatCopy {
  label: string;
  value: string;
}

export interface PathCopy {
  label: string;
  line: string;
}

export interface ContactCopy {
  name: string;
  email: string;
  telephoneDisplay: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
}

export interface HomepageCopy {
  heroLabel: string;
  slides: SlideCopy[];
  welcomeEyebrow: string;
  welcomeTitle: string;
  welcomeTitleItalic: string;
  welcomeBody: string;
  stats: StatCopy[];
  breathEyebrow: string;
  breathTitle: string;
  breathTitleItalic: string;
  breathNote: string;
  pathsEyebrow: string;
  pathsTitle: string;
  paths: PathCopy[];
  dayEyebrow: string;
  dayTitle: string;
  seasonsEyebrow: string;
  seasonsTitle: string;
  arrivalEyebrow: string;
  arrivalTitle: string;
  arrivalTitleItalic: string;
  soundEyebrow: string;
  soundTitle: string;
  soundTitleItalic: string;
  soundNote: string;
  galleryEyebrow: string;
  galleryTitle: string;
  sensesEyebrow: string;
  sensesTitle: string;
  tourEyebrow: string;
  tourTitle: string;
  tourNote: string;
  datesEyebrow: string;
  datesTitle: string;
  dawnLine: string;
  dawnEmphasis: string;
  duskLine: string;
  duskEmphasis: string;
  ecologyEyebrow: string;
  ecologyTitle: string;
  findEyebrow: string;
  findTitle: string;
  findNote: string;
  findBody: string;
  closingTitle: string;
  contact: ContactCopy;
}

export const homepageCopy: HomepageCopy = {
  heroLabel: 'Lanka Yoga & Ayurveda Resort · Hikkaduwa',
  slides: [
    {
      id: 'ayurveda',
      tab: 'Ayurveda',
      eyebrow: 'Doctor-led healing',
      title: 'Panchakarma, written to your pulse',
      line: 'A resident physician, six therapy rooms, eight patients at a time.',
      detail: '14 & 21 day programmes · from $3,600',
      cta: 'Explore healing'
    },
    {
      id: 'yoga',
      tab: 'Yoga',
      eyebrow: 'A week away',
      title: 'Seven days to put yourself down',
      line: 'Practice, breathwork, therapies — and long empty afternoons.',
      detail: 'Weekly departures · from $1,650',
      cta: 'Browse yoga dates'
    },
    {
      id: 'contact',
      tab: 'Contact',
      eyebrow: 'Write to us',
      title: 'Ask about a quiet week',
      line: 'A person reads every note and writes back within a day.',
      detail: 'lankayogaayurvedaresort@gmail.com',
      cta: 'Contact us'
    }
  ],
  welcomeEyebrow: 'Yoga retreat Hikkaduwa',
  welcomeTitle: 'A short walk from the beach,',
  welcomeTitleItalic: 'and very little noise',
  welcomeBody: 'Lanka Yoga & Ayurveda Resort sits in a quiet pocket of Hikkaduwa, a few minutes from the beach. Yoga, Ayurveda, and seven garden rooms — all within a short walk. Twenty-eight guests share a lake and nine acres.',
  stats: [
    { label: 'Guest rooms', value: '7' },
    { label: 'Minutes from the beach', value: '5' },
    { label: 'Guests at a time', value: '28' },
    { label: 'The grounds', value: '9 acres' }
  ],
  breathEyebrow: 'Before anything else',
  breathTitle: 'Take one breath',
  breathTitleItalic: 'with us',
  breathNote: 'Four in. Four held. Six out. The same ratio we teach at 06:15.',
  pathsEyebrow: 'Two reasons people come',
  pathsTitle: 'Rest, or be looked after',
  paths: [
    { label: 'Come to rest', line: 'A week of practice, meals, and long empty afternoons.' },
    { label: 'Come to heal', line: 'Doctor-led Panchakarma, written to your pulse.' }
  ],
  dayEyebrow: 'One day, dark to dark',
  dayTitle: 'The rhythm you are stepping into',
  seasonsEyebrow: 'When to come',
  seasonsTitle: 'The year has four moods',
  arrivalEyebrow: 'The first day',
  arrivalTitle: 'Nothing is asked of you',
  arrivalTitleItalic: 'until you have rested',
  soundEyebrow: 'What you will hear',
  soundTitle: 'There is no music',
  soundTitleItalic: 'anywhere on the campus',
  soundNote: 'Only this, on a loop, for as long as you stay.',
  galleryEyebrow: 'Drift through',
  galleryTitle: 'Ten quiet corners of the campus',
  sensesEyebrow: 'Four senses',
  sensesTitle: 'What stays with you',
  tourEyebrow: 'Before you fly',
  tourTitle: 'Stand in the shala from where you are',
  tourNote: 'Drag to look around. Four spaces.',
  datesEyebrow: 'Next dates',
  datesTitle: 'Small groups. They close early.',
  dawnLine: 'The day starts before you do.',
  dawnEmphasis: 'Let it.',
  duskLine: 'Lamps at dusk.',
  duskEmphasis: 'Quiet before nine.',
  ecologyEyebrow: 'Ecology',
  ecologyTitle: 'The campus gives the land back more than it takes',
  findEyebrow: 'Find us',
  findTitle: 'A yoga retreat in Hikkaduwa',
  findNote: 'Lanka Yoga & Ayurveda Resort is a short walk from Hikkaduwa beach — daily yoga, Ayurveda treatments, and seven quiet rooms on the south coast.',
  findBody: 'Search for a yoga retreat Hikkaduwa, or for Ayurveda in Hikkaduwa, and this is the place: rooftop practice, garden rooms, and the sea a few minutes away.',
  closingTitle: 'Ready to come? Write to us.',
  contact: {
    name: 'Lanka Yoga & Ayurveda Resort',
    email: 'lankayogaayurvedaresort@gmail.com',
    telephoneDisplay: '077 610 8200',
    streetAddress: '25/1 Lionel Gunasinghe Road, Sarath Goonawardana Mawatha',
    addressLocality: 'Hikkaduwa',
    postalCode: '80240'
  }
};

export function mergeHomepageCopy(saved: unknown): HomepageCopy {
  const source = saved && typeof saved === 'object' ? saved as Partial<HomepageCopy> : {};
  const slides = homepageCopy.slides.map((slide) => ({
    ...slide,
    ...(Array.isArray(source.slides) ? source.slides.find((item) => item?.id === slide.id) : undefined)
  }));
  const stats = homepageCopy.stats.map((stat, index) => ({
    ...stat,
    ...(Array.isArray(source.stats) ? source.stats[index] : undefined)
  }));
  const paths = homepageCopy.paths.map((path, index) => ({
    ...path,
    ...(Array.isArray(source.paths) ? source.paths[index] : undefined)
  }));
  const rest = { ...source };
  delete rest.slides;
  delete rest.stats;
  delete rest.paths;
  delete rest.contact;
  return {
    ...homepageCopy,
    ...rest,
    slides,
    stats,
    paths,
    contact: { ...homepageCopy.contact, ...(source.contact ?? {}) }
  };
}
