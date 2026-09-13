import { Teacher } from '../types';
import { media } from './media';

export const teachers: Teacher[] = [
{
  id: 'maya',
  name: 'Maya Lindqvist',
  role: 'Asana & anatomy',
  origin: 'Stockholm',
  image: media.teacherMaya,
  bio: 'Fifteen years teaching. Builds the technical spine of the training — alignment, anatomy, and how to keep a room safe.',
  credentials: ['E-RYT 500 · Physiotherapist, BSc']
},
{
  id: 'ranil',
  name: 'Dr. Ranil Wickrama',
  role: 'Resident physician',
  origin: 'Kandy',
  image: media.teacherRanil,
  bio: 'Third-generation Ayurvedic physician. Reads every pulse and writes every protocol on campus himself.',
  credentials: ['BAMS Colombo · 24 years practice']
},
{
  id: 'anjali',
  name: 'Anjali Perera',
  role: 'Breath & philosophy',
  origin: 'Galle',
  image: media.teacherAnjali,
  bio: 'Teaches the interior half — breath, subtle anatomy, the texts — with an emphasis on what you can sustain at home.',
  credentials: ['MA Indian Philosophy · Faculty since 2019']
}];


export function getTeachers(ids: string[]): Teacher[] {
  return ids.
  map((id) => teachers.find((teacher) => teacher.id === id)).
  filter((teacher): teacher is Teacher => Boolean(teacher));
}