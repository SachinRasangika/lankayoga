import { media } from './media';

export interface JourneyMoment {
  id: string;
  time: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  sound: string;
}

export const journeyMoments: JourneyMoment[] = [
{
  id: 'dawn',
  time: '05:40',
  title: 'The lake has not woken yet',
  body: 'Mist at knee height. Nobody speaks.',
  image: media.dawnCanoe,
  alt: 'A wooden canoe on a still misty lake at first light',
  sound: 'Water, and one distant bird'
},
{
  id: 'practice',
  time: '07:00',
  title: 'Practice, with the sides open',
  body: 'No mirrors, no music. The room faces the water.',
  image: media.practiceFeet,
  alt: 'Bare feet and hands on a cotton mat during morning practice',
  sound: 'Ujjayi breath, twelve people'
},
{
  id: 'breakfast',
  time: '08:30',
  title: 'Breakfast, then nothing',
  body: 'Red rice, papaya, herbal tea. The morning stays open.',
  image: media.breakfastVerandah,
  alt: 'An Ayurvedic breakfast of red rice porridge, papaya and herbal tea on a teak verandah table',
  sound: 'Spoons, and the garden'
},
{
  id: 'oil',
  time: '10:30',
  title: 'Warm oil, poured slowly',
  body: 'The part of the day where the body lets go.',
  image: media.headMassage,
  alt: 'A therapist working warm oil into the crown of a reclining guest’s head',
  sound: 'Brass on clay'
},
{
  id: 'rain',
  time: '16:00',
  title: 'And then it rains',
  body: 'Nothing is rescheduled. You lie on the verandah and listen.',
  image: media.rainLeaves,
  alt: 'Monsoon rain falling on broad wet banana and palm leaves',
  sound: 'Rain on broad leaves'
},
{
  id: 'dusk',
  time: '18:30',
  title: 'Lamps, and then silence',
  body: 'Breath, a short chant, yoga nidra. Quiet before nine.',
  image: media.candleMeditation,
  alt: 'A person meditating by candlelight surrounded by small clay oil lamps',
  sound: 'One chant, then nothing'
}];


export const senses = [
{ id: 'taste', label: 'Taste', note: 'Six tastes on one plate.', image: media.villageKitchen },
{ id: 'smell', label: 'Smell', note: 'Sesame oil, warmed with neem.', image: media.herbalApothecary },
{ id: 'touch', label: 'Touch', note: 'Teak worn smooth underfoot.', image: media.ecoCabin },
{ id: 'sight', label: 'Sight', note: 'A lake that changes colour four times a day.', image: media.jettySunset }];


export const arrivalRitual = [
{
  id: 'arrive',
  step: 'First',
  title: 'You walk in',
  note: 'No lobby, no forms. Someone meets you on the path.',
  image: media.palmPath,
  alt: 'A stone path curving through tall coconut palms'
},
{
  id: 'rest',
  step: 'Then',
  title: 'Warm water, petals',
  note: 'Shoes off at the edge of the garden. A foot bath, then your cabin.',
  image: media.footBath,
  alt: 'A copper foot bath with frangipani petals and lime floating in warm water'
},
{
  id: 'begin',
  step: 'Only then',
  title: 'We begin',
  note: 'A cup of something warm, and a conversation about why you came.',
  image: media.herbalTea,
  alt: 'A small clay cup of herbal tea steaming on a stone ledge'
}];