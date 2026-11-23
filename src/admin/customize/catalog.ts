import { arrivalRitual, journeyMoments, senses } from '../../data/dayJourney';
import { media } from '../../data/media';
import { seasons } from '../../data/seasons';
import { heroServices } from '../../data/services';
import { ecologyCommitments } from '../../data/venues';
import { business, businessAddressLine, businessMapsUrl } from '../../data/business';

export interface SectionInfo {
  id: string;
  page: string;
  label: string;
}

export const sectionInfo: SectionInfo[] = [
  { id: 'home.hero', page: '/', label: 'Opening slides' },
  { id: 'home.welcome', page: '/', label: 'Welcome' },
  { id: 'home.dawn', page: '/', label: 'Dawn line' },
  { id: 'home.breath', page: '/', label: 'Breath' },
  { id: 'home.paths', page: '/', label: 'Two paths' },
  { id: 'home.day', page: '/', label: 'One day' },
  { id: 'home.seasons', page: '/', label: 'Seasons' },
  { id: 'home.pinned', page: '/', label: 'Three days in' },
  { id: 'home.arrival', page: '/', label: 'First day' },
  { id: 'home.sound', page: '/', label: 'What you hear' },
  { id: 'home.gallery', page: '/', label: 'Campus photos' },
  { id: 'home.senses', page: '/', label: 'Four senses' },
  { id: 'home.tour', page: '/', label: 'Look around' },
  { id: 'home.dates', page: '/', label: 'Next dates' },
  { id: 'home.dusk', page: '/', label: 'Dusk line' },
  { id: 'home.ecology', page: '/', label: 'Ecology' },
  { id: 'home.find', page: '/', label: 'Find us' },
  { id: 'home.close', page: '/', label: 'Closing line' },
  { id: 'page.yoga', page: '/yoga', label: 'Yoga page' },
  { id: 'page.ayurveda', page: '/ayurveda', label: 'Ayurveda page' },
  { id: 'page.classes', page: '/classes', label: 'Classes hero' },
  { id: 'page.classesHours', page: '/classes', label: 'Class hours' },
  { id: 'page.classesClose', page: '/classes', label: 'Classes close' },
  { id: 'page.treatments', page: '/treatments', label: 'Treatments hero' },
  { id: 'page.treatmentsWing', page: '/treatments', label: 'Treatment wing' },
  { id: 'page.treatmentsClose', page: '/treatments', label: 'Treatments close' },
  { id: 'page.journal', page: '/journal', label: 'Journal hero' },
  { id: 'page.contact', page: '/contact', label: 'Contact hero' },
  { id: 'page.contactDesk', page: '/contact', label: 'Contact desk' }
];

const contactDetails = [
  { label: 'Name', value: business.name, href: '' },
  { label: 'Address', value: businessAddressLine, href: businessMapsUrl },
  { label: 'Phone', value: business.telephoneDisplay, href: `tel:${business.telephone}` },
  { label: 'Write', value: business.email, href: `mailto:${business.email}` },
  { label: 'Reply', value: 'Within one working day', href: '' }
];

export const sectionDefaults = {
  'home.hero': {
    kicker: 'Lanka Yoga & Ayurveda Resort · Hikkaduwa',
    scrollHint: 'Scroll — breathe first',
    slides: heroServices.map((slide) => ({ ...slide }))
  },
  'home.welcome': {
    eyebrow: 'Yoga retreat Hikkaduwa',
    title: 'A short walk from the beach,',
    titleEmphasis: 'and very little noise',
    body: 'Lanka Yoga & Ayurveda Resort sits in a quiet pocket of Hikkaduwa, a few minutes from the beach. Yoga, Ayurveda, and seven garden rooms — all within a short walk.',
    stats: [
      { label: 'Guest rooms', value: '7' },
      { label: 'Minutes from the beach', value: '5' }
    ],
    images: [
      { src: media.openWindow, alt: 'A sheer linen curtain lifting in the breeze at an open shuttered window' },
      { src: media.floatingFlowers, alt: 'Frangipani flowers floating in a dark stone water bowl' }
    ]
  },
  'home.dawn': {
    image: media.mistHills,
    alt: 'Layered misty hills at dawn',
    line: 'The day starts before you do.',
    emphasis: 'Let it.',
    foreground: media.reedsEdge
  },
  'home.breath': {
    eyebrow: 'Before anything else',
    title: 'Take one breath',
    titleEmphasis: 'with us',
    body: 'Four in. Four held. Six out. The same ratio we teach at 06:15.',
    button: 'Breathe with us',
    hint: '4 · 4 · 6'
  },
  'home.paths': {
    eyebrow: 'Two reasons people come',
    title: 'Rest, or be looked after',
    items: [
      {
        to: '/yoga',
        label: 'Come to rest',
        line: 'A week of practice, meals, and long empty afternoons.',
        image: media.yttPractice,
        alt: 'Guests practising together in the open-air shala'
      },
      {
        to: '/ayurveda',
        label: 'Come to heal',
        line: 'Doctor-led Panchakarma, written to your pulse.',
        image: media.therapyRoom,
        alt: 'A traditional Ayurvedic treatment room in warm light'
      }
    ]
  },
  'home.day': {
    eyebrow: 'One day, dark to dark',
    title: 'The rhythm you are stepping into',
    moments: journeyMoments.map((moment) => ({ ...moment }))
  },
  'home.seasons': {
    eyebrow: 'When to come',
    title: 'The year has four moods',
    items: seasons.map((season) => ({ ...season }))
  },
  'home.pinned': {
    image: media.lakeWideDawn,
    alt: 'A wide calm lake at dawn with distant layered hills',
    eyebrow: 'Three days in',
    lines: ['You sleep by nine.', 'You stop reaching for your phone.', 'You notice the water changing colour.']
  },
  'home.arrival': {
    eyebrow: 'The first day',
    title: 'Nothing is asked of you',
    titleEmphasis: 'until you have rested',
    steps: arrivalRitual.map((step) => ({ ...step }))
  },
  'home.sound': {
    image: media.waterRipple,
    eyebrow: 'What you will hear',
    title: 'There is no music',
    titleEmphasis: 'anywhere on the campus',
    body: 'Only this, on a loop, for as long as you stay.',
    items: [
      { id: 'water', label: 'Water against the jetty', time: 'All day', bars: [6, 14, 9, 18, 11] },
      { id: 'birds', label: 'Kingfishers over the lake', time: 'Before six', bars: [10, 5, 16, 8, 13] },
      { id: 'rain', label: 'Rain on banana leaves', time: 'Most afternoons', bars: [16, 12, 20, 14, 18] },
      { id: 'bowl', label: 'One bowl, struck once', time: 'Dusk', bars: [20, 7, 4, 3, 2] }
    ]
  },
  'home.gallery': {
    eyebrow: 'Drift through',
    title: 'Ten quiet corners of the campus',
    frames: [
      { src: media.hammockLake, alt: 'An empty woven hammock between two palms above a calm lake at golden hour', caption: 'The hour nobody schedules' },
      { src: media.linenBed, alt: 'Rumpled white linen bedding with morning light across it', caption: 'You will sleep by nine' },
      { src: media.shalaEmpty, alt: 'The empty shala at midday with mats rolled and bolsters stacked', caption: 'Between practices' },
      { src: media.gardenHerbs, alt: 'Tropical herb garden with dew on holy basil and lemongrass', caption: 'Where the kitchen shops' },
      { src: media.steamBath, alt: 'Steam curling in a dark wooden Ayurvedic steam chamber', caption: 'Herbal steam, after the oil' },
      { src: media.readingNook, alt: 'A rattan chair with an open book in dappled shade beside the lake', caption: 'Nobody will look for you here' },
      { src: media.duskChant, alt: 'Silhouettes seated in a circle at dusk with clay lamps between them', caption: 'The evening circle' },
      { src: media.orchidMacro, alt: 'A single white orchid bloom against a dark background', caption: 'One flower, changed daily' },
      { src: media.stoneCarving, alt: 'A weathered stone lotus medallion with moss in its crevices', caption: 'Older than the campus' },
      { src: media.handsMudra, alt: 'Relaxed hands resting on crossed knees in a simple mudra', caption: 'Ten minutes of nothing' }
    ]
  },
  'home.senses': {
    eyebrow: 'Four senses',
    title: 'What stays with you',
    items: senses.map((sense) => ({ ...sense }))
  },
  'home.tour': {
    eyebrow: 'Before you fly',
    title: 'Stand in the shala from where you are',
    note: 'Drag to look around. Four spaces.',
    button: 'Contact us'
  },
  'home.dates': {
    eyebrow: 'Next dates',
    title: 'Small groups. They close early.',
    image: media.palmCanopySky,
    button: 'See yoga dates'
  },
  'home.dusk': {
    image: media.nightLamps,
    alt: 'Clay oil lamps glowing along a wooden jetty at night',
    line: 'Lamps at dusk.',
    emphasis: 'Quiet before nine.',
    foreground: ''
  },
  'home.ecology': {
    eyebrow: 'Ecology',
    title: 'The campus gives the land back more than it takes',
    image: media.gardenHerbs,
    items: ecologyCommitments.map((item) => ({ stat: item.stat, label: item.label }))
  },
  'home.find': {
    eyebrow: 'Find us',
    title: 'A yoga retreat in Hikkaduwa',
    note: 'Lanka Yoga & Ayurveda Resort is a short walk from Hikkaduwa beach — daily yoga, Ayurveda treatments, and seven quiet rooms on the south coast.',
    body: 'Search for a yoga retreat Hikkaduwa, or for Ayurveda in Hikkaduwa, and this is the place: rooftop practice, garden rooms, and the sea a few minutes away.',
    details: [
      { label: 'Name', value: business.name, href: '' },
      { label: 'Address', value: businessAddressLine, href: businessMapsUrl },
      { label: 'Phone', value: business.telephoneDisplay, href: `tel:${business.telephone}` },
      { label: 'Email', value: business.email, href: `mailto:${business.email}` }
    ]
  },
  'home.close': {
    title: 'Ready to come? Write to us.',
    button: 'Contact us'
  },
  'page.yoga': {
    eyebrow: 'Yoga',
    title: 'Dates for practice by the lake',
    image: media.mistHills,
    imageAlt: 'Layered misty hills at dawn beyond the lake'
  },
  'page.ayurveda': {
    eyebrow: 'Ayurveda',
    title: 'Dates for healing by the lake',
    image: media.therapyRoom,
    imageAlt: 'Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels'
  },
  'page.classes': {
    eyebrow: 'Classes',
    title: 'Practice, with the sides open',
    lede: 'Small groups in the lakefront shala. These hours are part of a stay — write to us if you want a private class.',
    image: media.heroShala,
    imageAlt: 'Open-air teak shala at the edge of the lake at sunrise',
    meta: [
      { label: 'Shala', value: 'Lakefront' },
      { label: 'Week', value: 'Seven days' },
      { label: 'First class', value: '6:45' }
    ]
  },
  'page.classesHours': {
    eyebrow: '',
    title: 'The hours the shala is used',
    note: 'Choose a day. Book a class to pick a date and a time.'
  },
  'page.classesClose': {
    eyebrow: 'Join a stay',
    title: 'Classes are held for guests on a Yoga date',
    body: 'See the calendar, or ask about a private hour. Treatments sit next door, in the therapy wing.'
  },
  'page.treatments': {
    eyebrow: 'Treatments',
    title: 'Warm oil, poured slowly',
    lede: 'Six rooms, an apothecary of our own, and a physician who decides which therapies your pulse asks for.',
    image: media.therapyRoom,
    imageAlt: 'Traditional Ayurvedic treatment room with wooden therapy table and brass oil vessels',
    meta: [
      { label: 'Rooms', value: '6' },
      { label: 'Physician', value: 'Daily' },
      { label: 'Oils', value: 'Our own' }
    ]
  },
  'page.treatmentsWing': {
    eyebrow: 'The wing',
    title: 'Blended in our own apothecary',
    note: 'Most stays include treatments. A private hour can be arranged if you are not on a healing programme.',
    image: media.steamBath,
    imageAlt: 'Steam curling in a dark wooden Ayurvedic steam chamber'
  },
  'page.treatmentsClose': {
    eyebrow: 'A full protocol',
    title: 'Panchakarma is a stay, not a single treatment',
    body: 'If you need a sequence written to your pulse, look at the Ayurveda dates. For one treatment while you practise, write to the desk.'
  },
  'page.journal': {
    eyebrow: 'Journal',
    title: 'Slow notes from the campus',
    image: media.stoneCarving,
    imageAlt: 'A weathered stone lotus medallion with moss in its crevices'
  },
  'page.contact': {
    eyebrow: 'Contact',
    title: 'Write before you pack',
    lede: 'Ask about a stay, a healing programme, or a yoga retreat in Hikkaduwa. A person reads every note.',
    image: media.jettySunset,
    imageAlt: 'A wooden jetty over a still lake at sunset',
    meta: [
      { label: 'Write', value: 'Email' },
      { label: 'Place', value: 'Hikkaduwa' },
      { label: 'Reply', value: '1 day' }
    ]
  },
  'page.contactDesk': {
    eyebrow: 'Reach us',
    title: 'A small desk, not a call centre',
    body: 'Tell us roughly when you would like to come. We will write back with dates that still have space.',
    details: contactDetails
  }
} as const;

export type SectionId = keyof typeof sectionDefaults;

export function infoFor(id: string): SectionInfo {
  return sectionInfo.find((item) => item.id === id) ?? { id, page: '/', label: id };
}

export const customizePages = [
  { to: '/', label: 'Home' },
  { to: '/yoga', label: 'Yoga' },
  { to: '/ayurveda', label: 'Ayurveda' },
  { to: '/classes', label: 'Classes' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' }
];
