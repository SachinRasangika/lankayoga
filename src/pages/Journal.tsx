import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JournalCard } from '../components/journal/JournalCard';
import { useContent } from '../admin/content';
import { media } from '../data/media';
import { cn } from '../utils/cn';

export function Journal() {
  const { publishedPosts } = useContent();
  const [category, setCategory] = useState('All');
  const journalCategories = ['All', ...Array.from(new Set(publishedPosts.map((post) => post.category)))];
  const filtered = category === 'All' ? publishedPosts : publishedPosts.filter((post) => post.category === category);
  const [featured, ...rest] = filtered;

  return (
    <>
      <section className="relative isolate flex h-[42svh] min-h-[17rem] items-end overflow-hidden bg-sand-900">
        <motion.img
          src={media.stoneCarving}
          alt="A weathered stone lotus medallion with moss in its crevices"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 18, ease: 'linear' }}
          className="absolute inset-0 h-full w-full object-cover" />
        
        <div className="absolute inset-0 bg-sand-900/45" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20">
          <p className="eyebrow text-sand-200">Journal</p>
          <h1 className="mt-4 max-w-2xl font-display text-[2.5rem] font-light leading-[1.04] tracking-tight text-white sm:text-6xl">
            Slow notes from the campus
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div
          role="tablist"
          aria-label="Journal categories"
          className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line pb-5">
          
          {journalCategories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setCategory(item)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium transition-[background-color,border-color,color] duration-200 ease-calm',
                  selected ?
                  'border-sage-700 bg-sage-800 text-sand-50 dark:border-sage-200 dark:bg-sage-200 dark:text-sage-900' :
                  'border-line text-muted hover:border-sage-300 hover:text-ink'
                )}>
                
                {item}
              </button>);

          })}
        </div>

        {featured ?
        <>
            <div className="mt-14 lg:w-4/5">
              <JournalCard post={featured} featured />
            </div>

            {rest.length ?
          <ul className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                {rest.map((post) =>
            <li key={post.id} className="flex">
                    <JournalCard post={post} />
                  </li>
            )}
              </ul> :
          null}
          </> :

        <p className="mt-16 text-sm text-muted">Nothing here yet.</p>
        }
      </div>
    </>);

}