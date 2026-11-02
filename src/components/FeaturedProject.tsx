import { ArrowRight, Brain } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { featured } from '@/data'
import { cardClass, coverClass } from '@/lib/card-classes'
import { cn } from '@/lib/utils'

export function FeaturedProject({ project }: { project: typeof featured }) {
  return (
    <article className={cn(cardClass, 'mb-5 hover:translate-y-0 hover:border-border md:grid md:grid-cols-[1.6fr_1fr]')}>
      <div className="flex flex-col p-5.5 sm:p-7">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 font-medium text-primary">{project.tagline}</p>
        <p className="mt-3 text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-4.5 text-[0.95rem] text-muted-foreground">
          {project.points.map(p => <li key={p}>{p}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener"
          className="group mt-5 self-start text-[0.9rem] font-semibold text-primary no-underline"
        >
          View on GitHub <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
      <div className={cn(coverClass, 'hidden md:grid md:aspect-auto md:border-b-0 md:border-l')}>
        <Brain className="size-16" aria-hidden="true" />
      </div>
    </article>
  )
}
