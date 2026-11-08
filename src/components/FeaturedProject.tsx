import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { featured, featuredPreview } from '@/data'
import { cardClass } from '@/lib/card-classes'
import { cn } from '@/lib/utils'

type Props = { project: typeof featured; preview: typeof featuredPreview }

// What Resume AI produces, drawn in code: candidates ranked against one job, with what each one lacks
function RankedPreview({ preview }: { preview: typeof featuredPreview }) {
  return (
    <figure className="m-0">
      <div className="rounded-md border bg-card p-4">
        <div className="flex items-baseline justify-between gap-3 border-b pb-3">
          <span className="text-sm font-medium">{preview.job}</span>
          <span className="font-mono text-[12px] text-muted-foreground tabular-nums">{preview.resumes} resumes ranked</span>
        </div>
        <ol className="m-0 list-none divide-y p-0">
          {preview.candidates.map((c, i) => (
            <li key={c.name} className={cn('py-3 last:pb-0', i === 3 && 'hidden sm:block')}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{c.name}</span>
                <span className="font-mono text-[13px] tabular-nums">{c.score}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-muted">
                <div className={cn('h-full rounded-full', i === 0 ? 'bg-primary' : 'bg-foreground/25')} style={{ width: `${c.score}%` }} />
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3 text-[12px]">
                <span className="text-muted-foreground">{c.missing}</span>
                <span className={cn('shrink-0 font-mono', i === 0 ? 'text-primary' : 'text-muted-foreground')}>{c.decision}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-2 text-[12px] text-muted-foreground">Sample output with example candidates</figcaption>
    </figure>
  )
}

export function FeaturedProject({ project, preview }: Props) {
  return (
    <article className={cn(cardClass, 'mb-5 md:grid md:grid-cols-[1.25fr_1fr]')}>
      <div className="flex flex-col p-6 sm:p-8">
        <h3 className="text-xl font-medium">{project.title}</h3>
        <p className="mt-1 text-secondary-foreground">{project.tagline}</p>
        <p className="mt-4 text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-4 text-[15px] text-muted-foreground">
          {project.points.map(p => <li key={p}>{p}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map(s => <Badge key={s} variant="secondary" className="font-mono font-normal">{s}</Badge>)}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener"
          className="group mt-6 self-start text-[15px] font-medium text-primary no-underline"
        >
          View on GitHub <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
      <div className="border-t bg-muted/60 p-6 sm:p-8 md:border-t-0 md:border-l">
        <RankedPreview preview={preview} />
      </div>
    </article>
  )
}
