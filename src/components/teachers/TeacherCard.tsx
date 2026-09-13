import React from 'react';
import { Teacher } from '../../types';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className="flex h-full flex-col">
      <div className="overflow-hidden rounded-[1.75rem]">
        <img
          src={teacher.image}
          alt={`Portrait of ${teacher.name}`}
          className="aspect-[4/5] w-full object-cover" />
        
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-5">
        <div>
          <h3 className="font-display text-2xl font-light leading-snug tracking-tight text-ink">{teacher.name}</h3>
          <p className="mt-1 text-[0.8125rem] text-terracotta-600 dark:text-terracotta-300">{teacher.role}</p>
          <p className="text-xs text-muted">{teacher.origin}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted">{teacher.bio}</p>
        <ul className="mt-auto flex flex-col gap-1.5 border-t border-line pt-4">
          {teacher.credentials.map((credential) =>
          <li key={credential} className="text-xs text-muted">
              {credential}
            </li>
          )}
        </ul>
      </div>
    </article>);

}