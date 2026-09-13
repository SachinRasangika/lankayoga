import { CurriculumModule } from '../types';

export const curriculum: CurriculumModule[] = [
{
  id: 'technique',
  title: 'Technique & Practice',
  hours: 75,
  description: 'Led practice every morning, then the asana families taken apart slowly.',
  topics: ['Standing, seated, inversions, backbends', 'Pranayama', 'Bandha and drishti', 'Meditation and yoga nidra']
},
{
  id: 'anatomy',
  title: 'Anatomy & Physiology',
  hours: 30,
  description: 'Taught against the bodies in the room, not textbook diagrams.',
  topics: ['Skeletal variation', 'Joint safety and load', 'Breath and the nervous system', 'Nadis and prana vayus']
},
{
  id: 'methodology',
  title: 'Teaching Methodology',
  hours: 35,
  description: 'The craft of holding a room of mixed ability.',
  topics: ['Sequencing', 'Cueing and voice', 'Consent-based assists', 'Teaching to injury and age']
},
{
  id: 'philosophy',
  title: 'Philosophy & Ethics',
  hours: 35,
  description: 'Primary texts read slowly, alongside the questions teaching raises.',
  topics: ['Yoga Sutras', 'Bhagavad Gita, selected chapters', 'Yama and niyama', 'Scope of practice']
},
{
  id: 'ayurveda',
  title: 'Ayurveda for Teachers',
  hours: 15,
  description: 'How constitution changes what you should ask of a student.',
  topics: ['Dosha basics', 'Daily and seasonal rhythm', 'Adapting practice', 'When to refer']
},
{
  id: 'practicum',
  title: 'Practicum',
  hours: 10,
  description: 'Assessed hours, peer feedback, one public class.',
  topics: ['Observed teaching', 'Feedback cycles', 'Written exam', 'Final public class']
}];


export const totalHours = curriculum.reduce((sum, module) => sum + module.hours, 0);

export const admissionSteps = [
{ title: 'Apply, then talk', detail: 'A short form, then a call with a lead trainer.' },
{ title: 'Hold your place', detail: 'A $600 deposit. Reading and a practice log begin six weeks out.' },
{ title: 'Arrive', detail: 'Transfer from Colombo, then a consultation that shapes your meals.' },
{ title: 'Certify', detail: 'Yoga Alliance registration, and two years of mentoring after.' }];