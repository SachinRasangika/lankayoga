import { media } from './media';

export interface Season {
  id: string;
  months: string;
  name: string;
  line: string;
  goodFor: string;
  image: string;
  alt: string;
}

export const seasons: Season[] = [
{
  id: 'cool',
  months: 'Dec – Feb',
  name: 'Cool mornings',
  line: 'The coolest air of the year, and the clearest light on the lake.',
  goodFor: 'Teacher training',
  image: media.teaMist,
  alt: 'Misty tea-country hills in the early morning'
},
{
  id: 'harvest',
  months: 'Mar – Apr',
  name: 'Harvest',
  line: 'The paddy turns gold and the kitchen is at its best.',
  goodFor: 'Short retreats',
  image: media.paddyGold,
  alt: 'A golden ripe paddy field in late afternoon light'
},
{
  id: 'monsoon',
  months: 'May – Sep',
  name: 'Monsoon',
  line: 'Rain every afternoon. The season Ayurveda was written for.',
  goodFor: 'Panchakarma',
  image: media.rainWindow,
  alt: 'Rain running down an old wooden window with green garden beyond'
},
{
  id: 'green',
  months: 'Oct – Nov',
  name: 'Green again',
  line: 'Everything grows back at once, and the campus is at its quietest.',
  goodFor: 'Long stays',
  image: media.lotusPond,
  alt: 'A single lotus flower on still dark water'
}];