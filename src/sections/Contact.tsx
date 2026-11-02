import { Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Section } from '@/components/Section'
import { profile } from '@/data'

const contacts = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: profile.githubHandle, href: profile.github, Icon: GithubIcon, external: true },
]

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        {contacts.map(({ label, value, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            className="flex items-center gap-4 rounded-lg border bg-card p-5 text-foreground no-underline transition-colors hover:border-primary"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" aria-hidden="true" /></span>
            <span className="min-w-0 text-sm break-all text-muted-foreground">
              <strong className="block font-semibold text-foreground">{label}</strong>
              {value}
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    // Extra bottom padding on phones so the bottom-pinned nav never covers the footer
    <footer className="border-t pt-7 pb-24 text-sm text-muted-foreground md:pb-7">
      <p className="mx-auto w-full max-w-[1080px] px-4 sm:px-6">© 2026 {profile.name}</p>
    </footer>
  )
}
