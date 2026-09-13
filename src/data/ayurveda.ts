import { DoshaProfile, Therapy } from '../types';

export const doshaProfiles: DoshaProfile[] = [
{
  id: 'vata',
  name: 'Vata',
  elements: 'Air & ether',
  signature: 'Quick, light, creative. Warms slowly.',
  imbalance: 'Restless sleep. Dry skin. An anxious mind.',
  eat: ['Warm, oily, grounding food', 'Cooked grains and roots', 'Ghee and sesame oil'],
  avoid: ['Raw salads and cold drinks', 'Skipped meals', 'Late caffeine'],
  therapies: ['Abhyanga', 'Shirodhara', 'Basti']
},
{
  id: 'pitta',
  name: 'Pitta',
  elements: 'Fire & water',
  signature: 'Sharp, driven, warm. Strong digestion.',
  imbalance: 'Heat, inflammation, irritability.',
  eat: ['Cooling, mildly spiced food', 'Coconut, cucumber, sweet fruit', 'Coriander and fennel'],
  avoid: ['Chilli and vinegar', 'Alcohol', 'The midday sun'],
  therapies: ['Takradhara', 'Pizhichil', 'Virechana']
},
{
  id: 'kapha',
  name: 'Kapha',
  elements: 'Earth & water',
  signature: 'Steady, patient, solid. Slow to start.',
  imbalance: 'Heaviness, congestion, low motivation.',
  eat: ['Light, warm, well-spiced food', 'Bitter greens and legumes', 'Ginger and black pepper'],
  avoid: ['Dairy and heavy sweets', 'Daytime sleeping', 'Large evening meals'],
  therapies: ['Udvartana', 'Nasya', 'Vamana']
}];


export const therapies: Therapy[] = [
{
  id: 'abhyanga',
  name: 'Abhyanga',
  duration: '60 min',
  doshas: ['vata', 'kapha'],
  description: 'Warm oil, four hands, one rhythm. The foundation of most protocols.'
},
{
  id: 'shirodhara',
  name: 'Shirodhara',
  duration: '45 min',
  doshas: ['vata', 'pitta'],
  description: 'A thread of oil poured across the forehead. For a mind that will not stop.'
},
{
  id: 'pizhichil',
  name: 'Pizhichil',
  duration: '75 min',
  doshas: ['vata', 'pitta'],
  description: 'Warm oil squeezed from cloth, head to foot. For joints and nerves.'
},
{
  id: 'udvartana',
  name: 'Udvartana',
  duration: '60 min',
  doshas: ['kapha'],
  description: 'Herbal powder instead of oil, worked upward. Wakes a heavy body.'
},
{
  id: 'nasya',
  name: 'Nasya',
  duration: '30 min',
  doshas: ['kapha', 'vata'],
  description: 'Medicated oil through the nose after steam. Clears the head.'
},
{
  id: 'takradhara',
  name: 'Takradhara',
  duration: '45 min',
  doshas: ['pitta'],
  description: 'Cool medicated buttermilk, poured slowly. Draws heat down.'
}];


export const panchakarmaPhases = [
{
  phase: 'Purvakarma',
  window: 'Days 1–6',
  title: 'Preparation',
  detail: 'Pulse read. Oil and steam loosen what has settled.'
},
{
  phase: 'Pradhanakarma',
  window: 'Days 7–14',
  title: 'The five actions',
  detail: 'Only the actions your pulse asks for — usually two of five.'
},
{
  phase: 'Paschatkarma',
  window: 'Days 15–21',
  title: 'Rebuilding',
  detail: 'Graduated food, tonics, gentle practice before you travel.'
}];