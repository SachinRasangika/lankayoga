import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Section } from '../layout/Section';
import { SectionIntro } from '../layout/SectionIntro';
import { media } from '../../data/media';

const paths = [
{
  to: '/teacher-training',
  label: 'Learn to teach',
  line: '200 hours. One residency. Sixteen people.',
  image: media.yttPractice,
  alt: 'Students practising together in the open-air shala'
},
{
  to: '/ayurveda',
  label: 'Come to heal',
  line: 'Doctor-led Panchakarma, written to your pulse.',
  image: media.therapyRoom,
  alt: 'A traditional Ayurvedic treatment room in warm light'
}];


export function TwoPaths() {
  return (
    <Section tone="base">
      <SectionIntro eyebrow="Two reasons people come" title="Learn, or be looked after" />
      <div className="mt-14 grid gap-4 sm:gap-6 lg:grid-cols-2">
        {paths.map((path) =>
        <Link
          key={path.to}
          to={path.to}
          className="group relative isolate flex h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-sand-900 p-7 sm:h-[32rem] sm:p-9">
          
            <img
            src={path.image}
            alt={path.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-calm group-hover:scale-[1.04]" />
          
            <div className="absolute inset-0 bg-sand-900/40 transition-colors duration-300 ease-calm group-hover:bg-sand-900/50" />
            <div className="relative flex flex-col gap-3">
              <h3 className="font-display text-4xl font-light leading-none tracking-tight text-white sm:text-5xl">
                {path.label}
              </h3>
              <p className="max-w-xs text-sm text-sand-100/90">{path.line}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest text-white">
                Explore
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-calm group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </Section>);

}