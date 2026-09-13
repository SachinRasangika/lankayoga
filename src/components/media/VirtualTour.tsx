import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontalIcon, ScanIcon } from 'lucide-react';
import { tourScenes } from '../../data/media';
import { cn } from '../../utils/cn';

export function VirtualTour() {
  const [activeId, setActiveId] = useState(tourScenes[0].id);
  const [hasPanned, setHasPanned] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const active = tourScenes.find((scene) => scene.id === activeId) ?? tourScenes[0];

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frameRef}
        className="relative isolate overflow-hidden rounded-[1.75rem] bg-sand-900 shadow-lift"
        aria-label={`360 degree view of the ${active.name}`}
        role="group">
        
        <motion.img
          key={active.id}
          src={active.image}
          alt={active.caption}
          drag="x"
          dragConstraints={{ left: -260, right: 0 }}
          dragElastic={0.06}
          onDragStart={() => setHasPanned(true)}
          initial={{ opacity: 0, scale: 1.02, x: -130 }}
          animate={{ opacity: 1, scale: 1, x: -130 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="h-[22rem] w-[calc(100%+260px)] max-w-none cursor-grab object-cover active:cursor-grabbing sm:h-[30rem] lg:h-[34rem]" />
        

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-sand-900/55" />

        <div className="glass-dark absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6875rem] uppercase tracking-widest text-white">
          <ScanIcon className="h-3.5 w-3.5" />
          360° tour
        </div>

        {!hasPanned ?
        <div className="glass-dark pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs text-white">
            <MoveHorizontalIcon className="h-4 w-4" />
            Drag to look around
          </div> :
        null}

        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6">
          <p className="max-w-md text-sm text-sand-100">{active.caption}</p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {tourScenes.map((scene) =>
            <button
              key={scene.id}
              type="button"
              aria-pressed={scene.id === active.id}
              onClick={() => {
                setActiveId(scene.id);
                setHasPanned(false);
              }}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 ease-calm',
                scene.id === active.id ? 'bg-white text-sand-900' : 'glass-dark text-white hover:bg-white/20'
              )}>
              
                {scene.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

}