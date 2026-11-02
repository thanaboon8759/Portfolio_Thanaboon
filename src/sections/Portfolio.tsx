import { useState } from 'react'
import { ArrowRight, Download, ExternalLink } from 'lucide-react'

import { Modal } from '@/components/Modal'
import { Section } from '@/components/Section'
import { filters, projects, type Project } from '@/data'
import { asset, cn } from '@/lib/utils'

export const cardClass = 'flex flex-col overflow-hidden rounded-lg border bg-card shadow-xs transition hover:-translate-y-0.5 hover:border-primary/40'
export const coverClass =
  'grid aspect-[16/10] w-full place-items-center border-b bg-accent text-primary bg-[radial-gradient(color-mix(in_srgb,var(--primary)_18%,transparent)_1px,transparent_1px)] bg-size-[16px_16px]'
const linkClass = 'group mt-auto self-start pt-3.5 text-[0.9rem] font-semibold text-primary no-underline'

function ProjectCard({ project, onOpenPdf }: { project: Project; onOpenPdf: (p: Project) => void }) {
  const Icon = project.icon
  return (
    <article className={cardClass}>
      <div className={coverClass}><Icon className="size-11" aria-hidden="true" /></div>
      <div className="flex flex-1 flex-col px-5 pt-4.5 pb-5">
        <h3 className="leading-snug font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
        {project.repo ? (
          <a className={linkClass} href={project.repo} target="_blank" rel="noopener">
            View on GitHub <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        ) : project.pdf ? (
          <button type="button" className={cn(linkClass, 'cursor-pointer')} onClick={() => onOpenPdf(project)}>
            Read report <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        ) : (
          <span className="mt-auto pt-3.5 text-sm font-medium text-muted-foreground">University project</span>
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
    <Section id="portfolio" eyebrow="Portfolio" title="Recent work">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="cursor-pointer rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {shown.map(p => <ProjectCard key={p.title} project={p} onOpenPdf={setDoc} />)}
      </div>

      <Modal open={doc !== null} onClose={() => setDoc(null)} labelledBy="doc-title" className="h-[calc(100vh-32px)] open:flex open:flex-col">
        {doc?.pdf && (
          <>
            <div className="py-4.5 pr-14 pl-6">
              <h3 id="doc-title" className="text-lg font-semibold">{doc.title}</h3>
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
