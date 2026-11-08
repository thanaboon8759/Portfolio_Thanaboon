import { Brain, Code, Database, Server, Wrench } from 'lucide-react'

import { Section } from '@/components/Section'
import { TechStackBento, type BentoTile } from '@/components/ui/tech-stack-bento'
import { skillGroups } from '@/data'

const group = (label: string) => skillGroups.find(g => g.label === label)?.items ?? []

const tiles: BentoTile[] = [
  {
    title: 'Data & AI',
    icon: Brain,
    description: 'LLM tools, OCR pipelines, vector search and data dashboards',
    items: group('Data & AI'),
    highlights: [
      { label: 'Resume AI', detail: 'LLM resume screening', href: 'https://github.com/thanaboon8759/RESUME-AI' },
      { label: 'Weather Data Dashboard', detail: 'Streamlit analytics', href: 'https://github.com/thanaboon8759/Weather-Data-Dashboard' },
      { label: 'Waste object detection', detail: 'Computer vision' },
    ],
    className: 'sm:col-span-2 lg:row-span-2',
  },
  { title: 'Web & Backend', icon: Server, items: group('Web & Backend'), className: 'sm:col-span-2' },
  { title: 'Programming', icon: Code, items: group('Programming') },
  { title: 'Databases', icon: Database, items: group('Databases') },
  { title: 'Tools & Platforms', icon: Wrench, items: group('Tools & Platforms'), className: 'sm:col-span-2 lg:col-span-4' },
]

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <TechStackBento tiles={tiles} />
    </Section>
  )
}
