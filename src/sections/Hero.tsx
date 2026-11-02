import { Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/data'
import { asset } from '@/lib/utils'

const socialClass = 'grid size-[42px] place-items-center rounded-full border bg-card text-muted-foreground hover:border-primary hover:text-primary'

export function Hero() {
  return (
    <section id="home" className="mx-auto grid w-full max-w-[1080px] items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:gap-14 md:pt-28 md:pb-22">
      <div>
        <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-3 text-xl font-medium text-muted-foreground">{profile.role}</p>
        <p className="mt-3 max-w-[52ch] text-muted-foreground">
          I graduated in Computer Science from Bangkok University in 2026, and my main interest is data
          and AI: a resume screening tool built on an LLM, a weather data dashboard, and a computer vision model that sorts
          waste. I also do some security work, mostly reports and CTFs.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#portfolio" className="btn btn-primary flex-1 sm:flex-none">View my work</a>
          <a href="#contact" className="btn btn-secondary flex-1 sm:flex-none">Get in touch</a>
        </div>
        <div className="mt-7 flex gap-2.5">
          <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener" className={socialClass}><LinkedinIcon className="size-4" /></a>
          <a href={profile.github} aria-label="GitHub" target="_blank" rel="noopener" className={socialClass}><GithubIcon className="size-4" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={socialClass}><Mail className="size-4" /></a>
        </div>
      </div>
      <img
        src={asset('images/P9290015.jpeg')}
        alt={profile.name}
        width={480}
        height={640}
        fetchPriority="high"
        className="-order-1 aspect-square w-40 rounded-full object-cover object-[center_30%] md:order-none md:aspect-[4/5] md:w-full md:max-w-[360px] md:justify-self-end md:rounded-3xl md:object-[center_35%] md:shadow-sm"
      />
    </section>
  )
}
