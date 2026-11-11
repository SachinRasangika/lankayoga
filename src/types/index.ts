export type WellnessFocus = 'yoga' | 'ayurveda' | 'integrated';

export type ProgramKind = 'retreat' | 'training' | 'panchakarma';

export type PublishStatus = 'draft' | 'published';

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Dosha = 'vata' | 'pitta' | 'kapha';

export interface SeoFields {
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  imageAlt?: string;
}

export interface ItineraryBlock {
  period: string;
  title: string;
  items: string[];
}

export interface RetreatSpecial {
  title: string;
  text: string;
}

export interface Program extends SeoFields {
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
  images?: string[];
  summary: string;
  rhythm: {time: string;activity: string;}[];
  includes: string[];
  teacherIds?: string[];
  certification?: string;
  status?: PublishStatus;
  updatedAt?: string;
  openDates?: boolean;
  subtitle?: string;
  body?: string;
  highlights?: string[];
  specials?: RetreatSpecial[];
  itinerary?: ItineraryBlock[];
  addons?: string[];
  extraActivities?: string[];
  pdfUrl?: string;
  bookingWhatsapp?: string;
  bookingEmail?: string;
  bookingUrl?: string;
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

export interface Therapy extends SeoFields {
  id: string;
  name: string;
  duration: string;
  doshas: Dosha[];
  description: string;
  image?: string;
  images?: string[];
  alt?: string;
  sortOrder?: number;
  status?: PublishStatus;
  updatedAt?: string;
}

export interface TimetableClass {
  id: string;
  weekday: WeekDay;
  time: string;
  slots: string[];
  name: string;
  instructor: string;
  duration: string;
  price: string;
  description: string;
  emphasis: string;
  bookAhead: boolean;
  sortOrder: number;
  status?: PublishStatus;
  updatedAt?: string;
}

export interface ClassOffering extends SeoFields {
  id: string;
  name: string;
  time: string;
  duration: string;
  level: string;
  image: string;
  alt: string;
  description: string;
  sortOrder: number;
  status?: PublishStatus;
  updatedAt?: string;
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

export interface JournalPost extends SeoFields {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readingMinutes: number;
  date: string;
  author: string;
  image?: string;
  images?: string[];
  slug?: string;
  body?: string;
  status?: PublishStatus;
  updatedAt?: string;
}