import { VenueSpace } from '../types';

export const venueSpaces: VenueSpace[] = [
{
  id: 'shala',
  name: 'Lakefront Shala',
  capacity: 'Up to 26 mats',
  area: '120 m²',
  features: ['Open on three sides', 'Teak sprung floor', 'Props for 26'],
  dayRateUsd: 340
},
{
  id: 'garden-hall',
  name: 'Garden Hall',
  capacity: 'Up to 40 seated',
  area: '95 m²',
  features: ['Climate controlled', 'Projector and screen', 'Break terrace'],
  dayRateUsd: 260
},
{
  id: 'therapy-wing',
  name: 'Therapy Wing',
  capacity: '6 rooms',
  area: '6 × 18 m²',
  features: ['Droni tables', 'Steam chambers', 'Therapist team'],
  dayRateUsd: 420
},
{
  id: 'campus-buyout',
  name: 'Full Campus',
  capacity: '28 guests',
  area: '9 acres',
  features: ['Every space included', 'Kitchen team', 'Exclusive use'],
  dayRateUsd: 1850
}];


export const hostingIncludes = [
{ title: 'A retreat manager', detail: 'One person, from enquiry to departure.' },
{ title: 'A kitchen that knows retreats', detail: 'Ayurvedic or Western, allergens handled.' },
{ title: 'Transfers and guest comms', detail: 'Airport pickups and a booking page for your group.' },
{ title: 'Therapists on call', detail: 'Add treatments without bringing practitioners.' }];


export const ecologyCommitments = [
{ stat: '92%', label: 'Food grown within 15 km', detail: '' },
{ stat: '100%', label: 'Solar powered', detail: '' },
{ stat: '2,400', label: 'Native trees replanted', detail: '' },
{ stat: '31', label: 'Neighbours employed', detail: '' }];