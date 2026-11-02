import { Section } from '@/components/Section'
import { profile } from '@/data'

const details = [
  { label: 'Location', value: 'Bangkok, Thailand' },
  { label: 'University', value: 'Bangkok University' },
  { label: 'Focus', value: 'Data, AI & Cybersecurity' },
]

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Get to know me">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div className="space-y-4 text-muted-foreground">
          <p>
            I'm a Computer Science student at Bangkok University's School of Information Technology
            and Innovation, working across data, AI and cybersecurity. I like using technology to solve
            real problems, from an AI tool that screens resumes to a model that sorts waste to testing a
            system for security holes.
          </p>
          <p>
            Outside class I build AI tools, data dashboards and web apps, and enter security
            competitions such as CTFs, to keep learning new tools.
          </p>
        </div>
        <dl className="grid gap-3.5">
          {details.map(d => (
            <div key={d.label} className="border-b pb-3.5">
              <dt className="text-xs tracking-wider text-muted-foreground uppercase">{d.label}</dt>
              <dd className="font-medium">{d.value}</dd>
            </div>
          ))}
          <div className="border-b pb-3.5">
            <dt className="text-xs tracking-wider text-muted-foreground uppercase">Email</dt>
            <dd className="font-medium break-all"><a className="text-primary" href={`mailto:${profile.email}`}>{profile.email}</a></dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}
