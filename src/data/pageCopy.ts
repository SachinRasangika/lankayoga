export interface FactCopy {
  label: string;
  value: string;
}

export interface StepCopy {
  title: string;
  detail: string;
}

export interface PageCopy {
  training: {
    eyebrow: string;
    title: string;
    lede: string;
    facts: FactCopy[];
    curriculumEyebrow: string;
    curriculumTitle: string;
    dawnLine: string;
    dawnEmphasis: string;
    facultyEyebrow: string;
    facultyTitle: string;
    admissionEyebrow: string;
    admissionTitle: string;
    steps: StepCopy[];
    duskLine: string;
    duskEmphasis: string;
    intakesEyebrow: string;
    intakesTitle: string;
  };
  retreats: { eyebrow: string; title: string; emptyTitle: string };
  yoga: { eyebrow: string; title: string };
  ayurveda: { eyebrow: string; title: string };
  classes: {
    eyebrow: string;
    title: string;
    lede: string;
    facts: FactCopy[];
    hoursTitle: string;
    hoursNote: string;
    closingEyebrow: string;
    closingTitle: string;
    closingNote: string;
  };
  treatments: {
    eyebrow: string;
    title: string;
    lede: string;
    facts: FactCopy[];
    wingEyebrow: string;
    wingTitle: string;
    wingNote: string;
    closingEyebrow: string;
    closingTitle: string;
    closingNote: string;
  };
  campus: {
    eyebrow: string;
    title: string;
    lede: string;
    facts: FactCopy[];
    tourEyebrow: string;
    tourTitle: string;
    pathLine: string;
    pathEmphasis: string;
    galleryEyebrow: string;
    galleryTitle: string;
    spacesEyebrow: string;
    spacesTitle: string;
    hammockLine: string;
    hammockEmphasis: string;
    includedEyebrow: string;
    includedTitle: string;
    enquiryEyebrow: string;
    enquiryTitle: string;
    enquiryNote: string;
    enquiryFacts: FactCopy[];
  };
  book: { eyebrow: string; title: string; lede: string };
  contactPage: {
    eyebrow: string;
    title: string;
    lede: string;
    facts: FactCopy[];
    deskEyebrow: string;
    deskTitle: string;
    deskNote: string;
  };
  journal: { eyebrow: string; title: string };
}

export const pageCopy: PageCopy = {
  training: {
    eyebrow: 'Teacher Training',
    title: '200 hours. One residency.',
    lede: 'Twenty-five days on campus, sixteen people, and a physician watching what your body is asked to do.',
    facts: [
      { label: 'Hours', value: '200' },
      { label: 'Days', value: '25' },
      { label: 'Cohort', value: '16' },
      { label: 'Registered', value: 'RYS 200' }
    ],
    curriculumEyebrow: 'Curriculum',
    curriculumTitle: 'Six modules, published in full',
    dawnLine: 'The first practice begins',
    dawnEmphasis: 'before the light does.',
    facultyEyebrow: 'Faculty',
    facultyTitle: 'Three teachers, all of them here',
    admissionEyebrow: 'Admission',
    admissionTitle: 'We speak to everyone first',
    steps: [
      { title: 'Apply, then talk', detail: 'A short form, then a call with a lead trainer.' },
      { title: 'Hold your place', detail: 'A $600 deposit. Reading and a practice log begin six weeks out.' },
      { title: 'Arrive', detail: 'Transfer from Colombo, then a consultation that shapes your meals.' },
      { title: 'Certify', detail: 'Yoga Alliance registration, and two years of mentoring after.' }
    ],
    duskLine: 'One bowl,',
    duskEmphasis: 'struck once, at dusk.',
    intakesEyebrow: 'Intakes',
    intakesTitle: 'Two cohorts a year'
  },
  retreats: {
    eyebrow: 'Calendar',
    title: 'Every date, in one quiet list',
    emptyTitle: 'Nothing on those dates'
  },
  yoga: {
    eyebrow: 'Yoga',
    title: 'Dates for practice by the lake'
  },
  ayurveda: {
    eyebrow: 'Ayurveda',
    title: 'Dates for healing by the lake'
  },
  classes: {
    eyebrow: 'Classes',
    title: 'Practice, with the sides open',
    lede: 'Small groups in the lakefront shala. These hours are part of a stay — write to us if you want a private class.',
    facts: [
      { label: 'Shala', value: 'Lakefront' },
      { label: 'Week', value: 'Seven days' },
      { label: 'First class', value: '6:45' }
    ],
    hoursTitle: 'The hours the shala is used',
    hoursNote: 'Choose a day. Book a class to pick a date and a time.',
    closingEyebrow: 'Join a stay',
    closingTitle: 'Classes are held for guests on a Yoga date',
    closingNote: 'See the calendar, or ask about a private hour. Treatments sit next door, in the therapy wing.'
  },
  treatments: {
    eyebrow: 'Treatments',
    title: 'Warm oil, poured slowly',
    lede: 'Six rooms, an apothecary of our own, and a physician who decides which therapies your pulse asks for.',
    facts: [
      { label: 'Rooms', value: '6' },
      { label: 'Physician', value: 'Daily' },
      { label: 'Oils', value: 'Our own' }
    ],
    wingEyebrow: 'The wing',
    wingTitle: 'Blended in our own apothecary',
    wingNote: 'Most stays include treatments. A private hour can be arranged if you are not on a healing programme.',
    closingEyebrow: 'A full protocol',
    closingTitle: 'Panchakarma is a stay, not a single treatment',
    closingNote: 'If you need a sequence written to your pulse, look at the Ayurveda dates. For one treatment while you practise, write to the desk.'
  },
  campus: {
    eyebrow: 'Campus & Hire',
    title: 'Nine acres, yours between our own intakes',
    lede: 'A shala on the water, six therapy rooms, 28 beds — and a team that hosts retreats every week.',
    facts: [
      { label: 'Beds', value: '28' },
      { label: 'Shala', value: '120 m²' },
      { label: 'Therapy rooms', value: '6' },
      { label: 'Grounds', value: '9 acres' }
    ],
    tourEyebrow: '360° tour',
    tourTitle: 'Look around first',
    pathLine: 'Nine acres,',
    pathEmphasis: 'no straight lines in it.',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'Where you will sleep and practise',
    spacesEyebrow: 'Spaces',
    spacesTitle: 'One room, or all of it',
    hammockLine: 'Your group will thank you',
    hammockEmphasis: 'for the empty afternoons.',
    includedEyebrow: 'Included',
    includedTitle: 'You teach. We run everything else.',
    enquiryEyebrow: 'Enquiry',
    enquiryTitle: 'Tell us what you are planning',
    enquiryNote: 'A reply within a working day. Most teachers book nine to fourteen months ahead.',
    enquiryFacts: [
      { label: 'Group size', value: '14 – 24' },
      { label: 'Minimum stay', value: '5 nights' },
      { label: 'Best availability', value: 'May – September' },
      { label: 'From Colombo', value: '2h 10m' }
    ]
  },
  book: {
    eyebrow: 'Book a stay',
    title: 'Choose your dates, or write to us',
    lede: 'The calendar shows when a programme is already running. Pick your own arrival and departure, or send an email without choosing dates.'
  },
  contactPage: {
    eyebrow: 'Contact',
    title: 'Write before you pack',
    lede: 'Ask about a stay, a healing programme, or a yoga retreat in Hikkaduwa. A person reads every note.',
    facts: [
      { label: 'Write', value: 'Email' },
      { label: 'Place', value: 'Hikkaduwa' },
      { label: 'Reply', value: '1 day' }
    ],
    deskEyebrow: 'Reach us',
    deskTitle: 'A small desk, not a call centre',
    deskNote: 'Tell us roughly when you would like to come. We will write back with dates that still have space.'
  },
  journal: {
    eyebrow: 'Journal',
    title: 'Slow notes from the campus'
  }
};

function mergeFacts(defaults: FactCopy[], saved: unknown): FactCopy[] {
  const rows = Array.isArray(saved) ? saved : [];
  return defaults.map((item, index) => ({ ...item, ...(rows[index] ?? {}) }));
}

function mergeSteps(defaults: StepCopy[], saved: unknown): StepCopy[] {
  const rows = Array.isArray(saved) ? saved : [];
  return defaults.map((item, index) => ({ ...item, ...(rows[index] ?? {}) }));
}

export function mergePageCopy(saved: unknown): PageCopy {
  const source = saved && typeof saved === 'object' ? saved as Partial<PageCopy> : {};
  return {
    training: {
      ...pageCopy.training,
      ...(source.training ?? {}),
      facts: mergeFacts(pageCopy.training.facts, source.training?.facts),
      steps: mergeSteps(pageCopy.training.steps, source.training?.steps)
    },
    retreats: { ...pageCopy.retreats, ...(source.retreats ?? {}) },
    yoga: { ...pageCopy.yoga, ...(source.yoga ?? {}) },
    ayurveda: { ...pageCopy.ayurveda, ...(source.ayurveda ?? {}) },
    classes: {
      ...pageCopy.classes,
      ...(source.classes ?? {}),
      facts: mergeFacts(pageCopy.classes.facts, source.classes?.facts)
    },
    treatments: {
      ...pageCopy.treatments,
      ...(source.treatments ?? {}),
      facts: mergeFacts(pageCopy.treatments.facts, source.treatments?.facts)
    },
    campus: {
      ...pageCopy.campus,
      ...(source.campus ?? {}),
      facts: mergeFacts(pageCopy.campus.facts, source.campus?.facts),
      enquiryFacts: mergeFacts(pageCopy.campus.enquiryFacts, source.campus?.enquiryFacts)
    },
    book: { ...pageCopy.book, ...(source.book ?? {}) },
    contactPage: {
      ...pageCopy.contactPage,
      ...(source.contactPage ?? {}),
      facts: mergeFacts(pageCopy.contactPage.facts, source.contactPage?.facts)
    },
    journal: { ...pageCopy.journal, ...(source.journal ?? {}) }
  };
}
