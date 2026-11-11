import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { JournalPost } from '../../types';
import { formatPostDate } from '../../utils/format';
import { cn } from '../../utils/cn';

interface JournalCardProps {
  post: JournalPost;
  featured?: boolean;
}

export function JournalCard({ post, featured = false }: JournalCardProps) {
  return (
    <article className={cn('flex h-full flex-col', featured && 'sm:gap-0')}>
      <Link
        to={`/journal/${post.slug || post.id}`}
        className={cn(
          'group flex h-full flex-col gap-4 border-t border-line pt-5',
          featured && 'sm:gap-6'
        )}>
        {post.image ?
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className={cn(
                'w-full object-cover transition-transform duration-[450ms] ease-calm group-hover:scale-[1.03]',
                featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
              )} />
          </div> :
          null}

        <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-widest text-muted">
          <span className="text-terracotta-600 dark:text-terracotta-300">{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3
          className={cn(
            'font-display font-light leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-terracotta-700 dark:group-hover:text-terracotta-200',
            featured ? 'text-3xl sm:text-[2.25rem]' : 'text-xl sm:text-2xl'
          )}>
          {post.title}
        </h3>

        <p className="max-w-prose text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2 text-xs text-muted">
          <span>
            {post.author} · {formatPostDate(post.date)}
          </span>
          <ArrowUpRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200 ease-calm group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </article>
  );
}
