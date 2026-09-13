export type WellnessFocus = 'yoga' | 'ayurveda' | 'integrated';

export type ProgramKind = 'retreat' | 'training' | 'panchakarma';

export type Dosha = 'vata' | 'pitta' | 'kapha';

export interface Program {
  id: string;
  title: string;
  kind: ProgramKind;
  focus: WellnessFocus;
  startDate: string;
  endDate: string;
  durationDays: number;
  priceUsd: number;
  capacity: number;
  spotsLeft: number;
  level: string;
  image: string;
  summary: string;
  rhythm: {time: string;activity: string;}[];
  includes: string[];
  teacherIds: string[];
  certification?: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  origin: string;
  image: string;
  bio: string;
  credentials: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  hours: number;
  description: string;
  topics: string[];
}

export interface Therapy {
  id: string;
  name: string;
  duration: string;
  doshas: Dosha[];
  description: string;
}

export interface DoshaProfile {
  id: Dosha;
  name: string;
  elements: string;
  signature: string;
  imbalance: string;
  eat: string[];
  avoid: string[];
  therapies: string[];
}

export interface VenueSpace {
  id: string;
  name: string;
  capacity: string;
  area: string;
  features: string[];
  dayRateUsd: number;
}

export interface JournalPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readingMinutes: number;
  date: string;
  author: string;
  image?: string;
}