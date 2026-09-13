import { Program } from '../types';
import { media } from './media';

export const programs: Program[] = [
{
  id: 'ytt-200-oct',
  title: '200-Hour Teacher Training',
  kind: 'training',
  focus: 'yoga',
  startDate: '2026-10-05',
  endDate: '2026-10-29',
  durationDays: 25,
  priceUsd: 3450,
  capacity: 16,
  spotsLeft: 3,
  level: 'Open to committed practitioners',
  image: media.yttPractice,
  summary: 'The full certification, taught in one residency. Sixteen people.',
  rhythm: [
  { time: '05:45', activity: 'Breath and silence at the shala' },
  { time: '07:00', activity: 'Led practice' },
  { time: '10:30', activity: 'Anatomy and alignment' },
  { time: '14:00', activity: 'Teaching practicum' },
  { time: '17:30', activity: 'Philosophy and closing circle' }],

  includes: ['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
  teacherIds: ['maya', 'anjali'],
  certification: 'Yoga Alliance RYS 200'
},
{
  id: 'panchakarma-21-nov',
  title: '21-Day Classical Panchakarma',
  kind: 'panchakarma',
  focus: 'ayurveda',
  startDate: '2026-11-02',
  endDate: '2026-11-23',
  durationDays: 21,
  priceUsd: 5200,
  capacity: 8,
  spotsLeft: 2,
  level: 'Admission by consultation',
  image: media.therapyRoom,
  summary: 'The complete purification, sequenced to your pulse by Dr. Ranil.',
  rhythm: [
  { time: '06:30', activity: 'Gentle restorative practice' },
  { time: '08:00', activity: 'Physician round' },
  { time: '09:00', activity: 'Oleation and herbal steam' },
  { time: '15:00', activity: 'Therapy of the phase' },
  { time: '19:00', activity: 'Herbal preparation and rest' }],

  includes: ['Intake consultation before arrival', 'All medicines and oils', 'Daily physician supervision', 'Six-week home protocol'],
  teacherIds: ['ranil']
},
{
  id: 'reset-week-nov',
  title: 'Breath & Reset Week',
  kind: 'retreat',
  focus: 'integrated',
  startDate: '2026-11-15',
  endDate: '2026-11-22',
  durationDays: 7,
  priceUsd: 1650,
  capacity: 14,
  spotsLeft: 6,
  level: 'All levels',
  image: media.lakeSteps,
  summary: 'Seven days of practice, breathwork and long empty afternoons.',
  rhythm: [
  { time: '06:15', activity: 'Sunrise practice on the water' },
  { time: '08:30', activity: 'Breakfast, then open morning' },
  { time: '11:00', activity: 'Guided breathwork' },
  { time: '16:00', activity: 'Therapy or lake swim' },
  { time: '18:00', activity: 'Yoga nidra' }],

  includes: ['Eco cabin', 'Two Ayurvedic treatments', 'All meals and herbal teas', 'Airport transfer'],
  teacherIds: ['anjali', 'maya']
},
{
  id: 'dosha-reset-dec',
  title: 'Dosha Balancing Retreat',
  kind: 'retreat',
  focus: 'ayurveda',
  startDate: '2026-12-06',
  endDate: '2026-12-13',
  durationDays: 7,
  priceUsd: 1980,
  capacity: 12,
  spotsLeft: 9,
  level: 'All levels',
  image: media.herbalApothecary,
  summary: 'A short reset built around your constitution, read on day one.',
  rhythm: [
  { time: '06:30', activity: 'Practice for your constitution' },
  { time: '08:15', activity: 'Prescribed breakfast' },
  { time: '10:00', activity: 'Therapy' },
  { time: '12:30', activity: 'Garden kitchen session' },
  { time: '18:30', activity: 'Restorative practice' }],

  includes: ['Pulse diagnosis and written protocol', 'Five therapies', 'Two cooking workshops', 'Herbal kit to take home'],
  teacherIds: ['ranil', 'anjali']
},
{
  id: 'ytt-200-jan',
  title: '200-Hour Teacher Training',
  kind: 'training',
  focus: 'yoga',
  startDate: '2027-01-11',
  endDate: '2027-02-04',
  durationDays: 25,
  priceUsd: 3450,
  capacity: 16,
  spotsLeft: 11,
  level: 'Open to committed practitioners',
  image: media.yttPractice,
  summary: 'The January intake. Same syllabus, cooler season, larger cohort.',
  rhythm: [
  { time: '05:45', activity: 'Breath and silence at the shala' },
  { time: '07:00', activity: 'Led practice' },
  { time: '10:30', activity: 'Anatomy and alignment' },
  { time: '14:00', activity: 'Teaching practicum' },
  { time: '17:30', activity: 'Philosophy and closing circle' }],

  includes: ['Yoga Alliance 200-hour certificate', 'Private eco cabin, 25 nights', 'All meals, dosha-adjusted', 'Physician consultation'],
  teacherIds: ['maya', 'anjali'],
  certification: 'Yoga Alliance RYS 200'
},
{
  id: 'panchakarma-14-feb',
  title: '14-Day Panchakarma',
  kind: 'panchakarma',
  focus: 'ayurveda',
  startDate: '2027-02-08',
  endDate: '2027-02-22',
  durationDays: 14,
  priceUsd: 3600,
  capacity: 8,
  spotsLeft: 5,
  level: 'Admission by consultation',
  image: media.headMassage,
  summary: 'The same clinical care, shaped for a shorter window.',
  rhythm: [
  { time: '06:30', activity: 'Gentle restorative practice' },
  { time: '08:00', activity: 'Physician round' },
  { time: '09:15', activity: 'Oleation and steam' },
  { time: '15:00', activity: 'Therapy of the phase' },
  { time: '18:30', activity: 'Meditation and rest' }],

  includes: ['Pre-arrival consultation', 'All medicines and oils', 'Daily physician supervision', 'Four-week home protocol'],
  teacherIds: ['ranil']
},
{
  id: 'immersion-mar',
  title: 'Yoga & Ayurveda Immersion',
  kind: 'retreat',
  focus: 'integrated',
  startDate: '2027-03-07',
  endDate: '2027-03-21',
  durationDays: 14,
  priceUsd: 2890,
  capacity: 14,
  spotsLeft: 12,
  level: 'Intermediate',
  image: media.cabinInside,
  summary: 'Two weeks where practice and medicine share one timetable.',
  rhythm: [
  { time: '06:00', activity: 'Sunrise practice' },
  { time: '08:30', activity: 'Breakfast and consultations' },
  { time: '10:30', activity: 'Therapy' },
  { time: '15:30', activity: 'Kitchen, herbs or philosophy' },
  { time: '18:00', activity: 'Pranayama and yoga nidra' }],

  includes: ['Physician consultation and protocol', 'Eight therapies', 'Single eco cabin', 'All meals, dosha-adjusted'],
  teacherIds: ['maya', 'ranil', 'anjali']
}];


export const upcomingPrograms = programs.slice(0, 3);

export function getProgram(id: string): Program | undefined {
  return programs.find((program) => program.id === id);
}