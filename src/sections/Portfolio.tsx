import { useState } from 'react'
import { ArrowRight, Download, ExternalLink } from 'lucide-react'

import { Modal } from '@/components/Modal'
import { Section } from '@/components/Section'
import { FeaturedProject } from '@/components/FeaturedProject'
import { featured, featuredPreview, featuredVisibleFor, filters, projects, type Project } from '@/data'
import { cardClass, coverClass } from '@/lib/card-classes'
import { asset, cn } from '@/lib/utils'

const linkClass = 'group mt-auto self-start pt-4 text-[15px] font-medium text-primary no-underline'

function ProjectCard({ project, onOpenPdf }: { project: Project; onOpenPdf: (p: Project) => void }) {
  const Icon = project.icon
  return (
    <article className={cardClass}>
      <div className={coverClass}><Icon className="size-8" strokeWidth={1.5} aria-hidden="true" /></div>
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h3 className="leading-snug font-medium">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
        {project.pdf ? (
          <button type="button" className={cn(linkClass, 'cursor-pointer')} onClick={() => onOpenPdf(project)}>
            Read report <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        ) : project.repo ? (
          <a className={linkClass} href={project.repo} target="_blank" rel="noopener">
            View on GitHub <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        ) : (
          <span className="mt-auto pt-4 text-sm text-muted-foreground">University project</span>
        )}
      </div>
    </article>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [doc, setDoc] = useState<Project | null>(null)
  const shown = projects.filter(p => filter === 'all' || p.category === filter)

  return (
    <Section id="portfolio" title="Projects">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="cursor-pointer rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {f.label}
          </button>
        ))}
      </div>
      {featuredVisibleFor(filter) && <FeaturedProject project={featured} preview={featuredPreview} />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {shown.map(p => <ProjectCard key={p.title} project={p} onOpenPdf={setDoc} />)}
      </div>

      <Modal open={doc !== null} onClose={() => setDoc(null)} labelledBy="doc-title" className="h-[calc(100vh-32px)] open:flex open:flex-col">
        {doc?.pdf && (
          <>
            <div className="py-4 pr-14 pl-6">
              <h3 id="doc-title" className="text-lg font-medium">{doc.title}</h3>
              <p className="text-sm text-muted-foreground">{doc.pdf.description}</p>
            </div>
            <iframe title={doc.title} src={`${asset(doc.pdf.src)}#toolbar=0&navpanes=0&scrollbar=1`} className="w-full flex-1 border-y" />
            <div className="flex flex-wrap gap-3 px-6 py-4">
              <a href={asset(doc.pdf.src)} download className="btn btn-primary"><Download className="size-4" aria-hidden="true" /> Download PDF</a>
              <a href={asset(doc.pdf.src)} target="_blank" rel="noopener" className="btn btn-secondary"><ExternalLink className="size-4" aria-hidden="true" /> Open in new tab</a>
            </div>
          </>
        )}
      </Modal>
    </Section>
  )
}
