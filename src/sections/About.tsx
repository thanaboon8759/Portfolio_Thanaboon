import { Section } from '@/components/Section'
import { profile } from '@/data'

const details = [
  { label: 'Location', value: 'Bangkok, Thailand' },
  { label: 'University', value: 'Bangkok University' },
  { label: 'Focus', value: 'Data, AI & Cybersecurity' },
]

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div className="space-y-4 text-muted-foreground">
          <p>
            I graduated from Bangkok University's School of Information Technology and Innovation in
            2026, on the Data Science and Cybersecurity track. My projects include an AI tool that screens
            resumes and a model that sorts waste, plus a security assessment of a simulated information
            system.
          </p>
          <p>
            I also enter security competitions such as CTFs, including the BU-ITI CTF Competition in
            2025. They're a good way to pick up new tools.
          </p>
        </div>
        <dl className="grid gap-4">
          {details.map(d => (
            <div key={d.label} className="border-b pb-4">
              <dt className="text-[13px] text-muted-foreground">{d.label}</dt>
              <dd className="font-medium">{d.value}</dd>
            </div>
          ))}
          <div className="border-b pb-4">
            <dt className="text-[13px] text-muted-foreground">Email</dt>
            <dd className="font-medium break-all"><a className="text-primary" href={`mailto:${profile.email}`}>{profile.email}</a></dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}
