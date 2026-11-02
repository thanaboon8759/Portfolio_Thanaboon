import { Section } from '@/components/Section'
import { skillGroups, softSkills } from '@/data'

// shortcut: v1-style skills lists, replaced by the 21st Tech Stack Bento Grid once its prompt is pasted
export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-5.5 sm:p-7">
          <h3 className="mb-4.5 text-lg font-semibold">Technical</h3>
          <dl className="grid gap-3.5">
            {skillGroups.map(g => (
              <div key={g.label} className="border-b pb-3.5 last:border-0 last:pb-0">
                <dt className="text-xs tracking-wider text-muted-foreground uppercase">{g.label}</dt>
                <dd className="font-medium">{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg border bg-card p-5.5 sm:p-7">
          <h3 className="mb-4.5 text-lg font-semibold">Soft skills</h3>
          <ul className="flex flex-wrap gap-2">
            {softSkills.map(s => (
              <li key={s} className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-foreground">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
