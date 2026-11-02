import { Section } from '@/components/Section'
import { Badge } from '@/components/ui/badge'
import { education, experience, type TimelineEntry } from '@/data'

// shortcut: v1-style timeline, replaced by the 21st Experience Timeline once its prompt is pasted
function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="border-l-2 pl-6">
      {entries.map(e => (
        <li key={e.title} className="relative not-first:mt-7 before:absolute before:top-1.5 before:-left-[31px] before:size-3 before:rounded-full before:border-2 before:border-primary before:bg-background">
          <span className="text-[0.82rem] font-semibold text-primary">{e.date}</span>
          <h4 className="text-[1.05rem] font-semibold">{e.title}</h4>
          <p className="font-medium">{e.place}</p>
          {e.description && <p className="mt-1 text-[0.95rem] text-muted-foreground">{e.description}</p>}
          {e.points && (
            <ul className="mt-1 list-disc pl-4.5 text-[0.95rem] text-muted-foreground">
              {e.points.map(p => <li key={p}>{p}</li>)}
            </ul>
          )}
          {e.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

export function Journey() {
  return (
    <Section id="journey" eyebrow="Journey" title="Education & experience">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h3 className="mb-5 text-lg font-semibold">Education</h3>
          <Timeline entries={education} />
        </div>
        <div>
          <h3 className="mb-5 text-lg font-semibold">Coursework &amp; projects</h3>
          <Timeline entries={experience} />
        </div>
      </div>
    </Section>
  )
}
