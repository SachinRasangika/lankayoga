import { ItineraryBlock, Program, RetreatSpecial } from '../types';

export const shantiYatraId = 'shanti-yatra';

export const shantiYatraHighlights = [
  'Walk through sacred sites and living traditions at your own pace',
  'Release the noise of everyday life, one landscape at a time',
  'Settle into daily morning and evening yoga and meditation',
  'Reconnect with rest, stillness, and breath',
  'Sleep deeper, think clearer, feel grounded again',
  'Return home with a renewed sense of calm and aliveness'
];

export const shantiYatraSpecials: RetreatSpecial[] = [
  {
    title: "It's two journeys in one.",
    text: "Most trips ask you to choose between adventure and rest. This one doesn't. You get seven days of real cultural immersion — ancient cities, wild safaris, misty mountains — followed by four days where the only agenda is stillness. Nothing is compressed, nothing is rushed to fit both in."
  },
  {
    title: 'The pace is genuinely unhurried.',
    text: 'With a private driver and guide rather than a fixed group bus schedule, you move through Sri Lanka at your own rhythm. Want to linger at a hidden viewpoint, try a roadside curry, or skip ahead to the next stop? The day bends around you, not the other way around.'
  },
  {
    title: "Rest is earned, not just offered.",
    text: "The yoga and meditation at Lanka Yoga and ayurveda resort land differently because of what comes before them. After climbing Sigiriya at sunrise, sitting beneath a sacred bodhi tree, and tracking leopards through Yala, the stillness at the end isn't an abstract wellness add-on — it's a place for everything you've experienced to actually settle."
  },
  {
    title: "It's rooted in living tradition, not staged performance.",
    text: "Temple rituals, cooking classes in local villages, sunrise offerings at sacred sites — these are moments of genuine cultural contact, not tourist reenactments. You're a quiet participant in something ongoing, not a spectator at a show (well, except for the evening cultural dance — that one's just for you)."
  },
  {
    title: 'The setting does half the work.',
    text: 'Jungle-covered rock fortresses. Mist over tea hills at dawn. Wild elephants and leopards in open savannah. Turtles gliding past a quiet beach at dusk. Sri Lanka\'s landscapes are dramatic enough that the "wellness" part of this retreat feels less like an intervention and more like a natural conclusion.'
  },
  {
    title: 'No performance, no pressure.',
    text: "There's no expectation to master a pose, hit a step count, or \"do\" the retreat correctly. The structure exists so you can show up as you are — tired, curious, overstimulated, whatever you bring — and leave a little lighter."
  }
];

export const shantiYatraItinerary: ItineraryBlock[] = [
  {
    period: 'Days 1–2',
    title: 'Anuradhapura',
    items: [
      'Early departure from Negombo Airport, transfer to Anuradhapura',
      'Visit the Anuradhapura Ancient Sacred City & Mihintale Monastery, including Sri Maha Bodhiya',
      'Sunrise (Day 2) at Ruwanwelisaya — join local devotees offering flowers and lighting oil lamps',
      'Free time to walk the ancient ruins at your own pace',
      'Evening ritual attendance at a local temple',
      'Overnight at selected 3–4★ hotel'
    ]
  },
  {
    period: 'Days 3–4',
    title: 'Sigiriya',
    items: [
      'Sunrise climb to Sigiriya Lion Rock (or Pidurangala as an alternative)',
      'Explore the ancient royal water gardens and ruins',
      'Traditional cooking class in a local village — prepare and enjoy a home-style Sri Lankan meal',
      'Overnight in Sigiriya'
    ]
  },
  {
    period: 'Day 5',
    title: 'Kandy',
    items: [
      'Transfer to Kandy via Dambulla Cave Temple',
      'Visit the Temple of the Tooth',
      'Lunch and walk through the Royal Botanical Gardens (Peradeniya)',
      'Evening cultural show: traditional Kandyan dance and drumming',
      'Overnight in Kandy'
    ]
  },
  {
    period: 'Day 6',
    title: 'Haputale',
    items: [
      'Scenic train ride into the highlands toward Haputale',
      'Visit tea plantations and waterfalls along the way',
      'Local lunch amid the tea hills',
      'Free time to relax at the hotel',
      "Sunrise hike to Lipton's Seat — travel part-way by traditional tuk tuk, guided by locals, then continue on foot",
      'Overnight in Haputale'
    ]
  },
  {
    period: 'Day 7',
    title: 'Yala',
    items: [
      'Transfer to Yala National Park',
      'Check in, free time / rest',
      'Afternoon jeep safari through Yala National Park — elephants, crocodiles, birdlife, and (with luck) the elusive leopard',
      'Dinner and overnight near Yala'
    ]
  },
  {
    period: 'Days 7–11',
    title: 'Hikkaduwa — Yoga & Meditation Retreat',
    items: [
      'Settle at Lanka Yoga & Ayurveda Resort on the coast of Hikkaduwa',
      'The rhythm repeats for all four days, allowing the first week to settle and integrate',
      'Mornings begin with gentle yoga and meditation; evenings close the same way',
      'In between: rest, walk the beach, watch turtles at Turtle Beach, or choose an optional treatment or excursion',
      'Nothing is required. Everything is offered.'
    ]
  }
];

export const shantiYatraRhythm: Program['rhythm'] = [
  { time: '07:00', activity: 'Guided silent meditation inspired by Buddhist teachings' },
  { time: '07:30', activity: 'Mindful Yoga (75 minutes)' },
  { time: '09:15', activity: 'Fresh, nourishing tropical breakfast' },
  { time: '10:30', activity: 'Beach time, rest, or planned group excursion' },
  { time: '12:00', activity: 'Optional lunch' },
  { time: '17:00', activity: '1-hour Deep Relaxation Session (Yin Yoga, Yoga Nidra, sound bath, or guided inner journey)' },
  { time: '18:30', activity: 'Healthy dinner' }
];

export const shantiYatraIncludes = [
  '10 nights’ accommodation at 3* & 4* Hotels & Lanka Yoga & Ayurveda Resort with Daily Breakfast & Dinners.',
  'Private Driver & Guide throughout the 7-day cultural journey',
  'Daily morning meditation & Daily 75-minute mindful Hatha yoga practice',
  'Evening deep relaxation sessions',
  'Airport Transfer after the Retreat.'
];

export const shantiYatraAddons = [
  'Ayurvedic treatments on Request',
  '1:1 Sound bath',
  'Surf lessons',
  'Snorkeling',
  'Safari tours',
  'Cooking classes',
  'Individual island Excursions (Rain Forest/Cultural & History Tours/Boat Rides and Cinnamon Experience.'
];

export const shantiYatraExtraActivities = [
  '1:1 session: yoga-therapy & sound bath',
  'Relaxing at Hikkaduwa beach',
  'Temple visit with sacred Buddhist Rituals and guided Meditation',
  'Snorkeling at the coral reef',
  'Day Excursions to the Galle Dutch Fort.'
];

export const shantiYatraBody = [
  "Sri Lanka Cultural Journey & Lanka Yoga & Ayurveda Experience is built around one idea: after days of moving through ancient temples, misty hills, and wild landscapes, you arrive at the coast ready to simply stop — and let it all settle.",
  "This isn't a typical vacation, and it isn't a typical yoga retreat either. It's both — an 11-day journey that moves from outward discovery to inward stillness.",
  "The first seven days take you across Sri Lanka's most striking landscapes: ancient sacred cities at sunrise, the jungle-fringed rock fortress of Sigiriya, the devotional rhythm of Kandy, misty tea plantations in the highlands, and a wild safari through Yala National Park. You travel with a private driver and local guide, at a pace that leaves room to pause, wander, and simply take things in — not a rushed checklist of sights, but a slow unfolding of culture, history, and nature.",
  "Then the journey turns inward. The final four days are spent at Lanka Yoga & Ayurveda Resort on the coast of Hikkaduwa, where the rhythm shifts entirely. Mornings begin with gentle yoga and meditation. Evenings close the same way. In between, there's little to do but rest — walk the beach, watch turtles at Turtle Beach, or choose an optional Ayurvedic treatment, a surf lesson, or a snorkeling trip. Nothing is required. Everything is offered.",
  "What makes this retreat different is that stillness isn't the whole story — it's earned. By the time you reach the yoga mat, you've already walked through centuries of history, climbed above the jungle canopy, and stood quietly beneath a sacred bodhi tree. The practice at the end isn't separate from the journey — it's where everything you've seen and felt has room to settle.",
  "You leave not just having seen Sri Lanka, but having slowed down enough to actually experience it — and yourself, along the way."
].join('\n\n');

export const shantiYatraImages = [
  '/c0e4d6b6-32b7-4360-aa46-dd5066f4517a.jpg',
  '/2e8301d4-6de1-4fd8-b6f7-35d500417dc5.jpg',
  '/97011ffc-978f-4a2b-a330-330599bfdb2e.jpg',
  '/69fd9b03-063b-42d6-a7c4-849ef95515f8.jpg',
  '/a9f90d32-73dd-429c-8f92-903ffab17ed0.jpg',
  '/cf068b9c-e64b-4ba4-88df-2a7d9f461f2f.jpg'
];
