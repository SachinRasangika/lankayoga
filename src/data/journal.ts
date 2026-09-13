import { JournalPost } from '../types';
import { media } from './media';

export const journalPosts: JournalPost[] = [
{
  id: 'rice-and-curry',
  title: 'What rice and curry teaches about the six tastes',
  category: 'Ayurvedic Kitchen',
  excerpt: 'A Sri Lankan plate is already a complete Ayurvedic meal. Our kitchen walks through one lunch.',
  readingMinutes: 7,
  date: '2026-09-02',
  author: 'Nayomi Fernando',
  image: media.clayKitchen
},
{
  id: 'monsoon-practice',
  title: 'Practising through the monsoon',
  category: 'Practice',
  excerpt: 'Why your practice should get lighter, warmer and earlier in the wet season.',
  readingMinutes: 5,
  date: '2026-08-19',
  author: 'Anjali Perera',
  image: media.rainWindow
},
{
  id: 'oil-sourcing',
  title: 'Where our therapy oils come from',
  category: 'Ecology',
  excerpt: 'Sesame from Hambantota, coconut pressed nine kilometres away, eleven herbs from the garden.',
  readingMinutes: 9,
  date: '2026-08-04',
  author: 'Dr. Ranil Wickrama',
  image: media.herbalApothecary
},
{
  id: 'first-teaching-year',
  title: 'Your first year of teaching, honestly',
  category: 'Teacher Training',
  excerpt: 'Six graduates on what they earned, taught, and were never warned about.',
  readingMinutes: 11,
  date: '2026-07-21',
  author: 'Maya Lindqvist',
  image: media.handsMudra
},
{
  id: 'wetland-return',
  title: 'The birds came back before we finished building',
  category: 'Ecology',
  excerpt: 'Eight years of restoring nine acres, and the 74 species now on the lake.',
  readingMinutes: 6,
  date: '2026-07-03',
  author: 'Sunil Rathnayake',
  image: media.campusAerial
},
{
  id: 'silence-practice',
  title: 'On keeping silence for three days',
  category: 'Practice',
  excerpt: 'Why every retreat holds a silent stretch, and what happens on the second afternoon.',
  readingMinutes: 4,
  date: '2026-06-15',
  author: 'Anjali Perera',
  image: media.orchidMacro
}];


export const journalCategories = ['All', 'Practice', 'Ayurvedic Kitchen', 'Ecology', 'Teacher Training'];