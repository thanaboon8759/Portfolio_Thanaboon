import { Section } from '@/components/Section'
import { Timeline } from '@/components/ui/timeline'
import { journey } from '@/data'

export function Journey() {
  return (
    <Section id="journey" title="Education & experience">
      <div className="max-w-3xl">
        <Timeline entries={journey} />
      </div>
    </Section>
  )
}
