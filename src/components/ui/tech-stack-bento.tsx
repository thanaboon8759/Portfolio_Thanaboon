import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type BentoTile = {
  title: string
  icon: LucideIcon
  items: string[]
  description?: string
  // Optional rows of related work, shown above the chips (used by the large tile)
  highlights?: { label: string; detail: string; href?: string }[]
  className?: string
}

// Layout recreated from the 21st.dev "Interactive Tech Stack Bento Grid" preview (@themeocean);
// its pointer-following glow was removed in the unslop pass, so tiles are plain surfaces.
export function TechStackBento({ tiles }: { tiles: BentoTile[] }) {
  return (
    <div className="grid auto-rows-[minmax(152px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map(({ title, icon: Icon, items, description, highlights, className }) => (
        <div key={title} className={cn('flex flex-col rounded-lg border bg-card p-6', className)}>
          <span className="grid size-10 place-items-center rounded-md bg-muted text-muted-foreground">
            <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-medium">{title}</h3>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          {highlights && (
            <ul className="mt-5 divide-y rounded-md border">
              {highlights.map(h => {
                const row = (
                  <>
                    <span className="font-medium">{h.label}</span>
                    <span className="text-right text-[13px] text-muted-foreground">{h.detail}</span>
                  </>
                )
                return (
                  <li key={h.label}>
                    {h.href ? (
                      <a href={h.href} target="_blank" rel="noopener" className="flex items-baseline justify-between gap-3 px-4 py-3 text-foreground no-underline transition-colors hover:bg-muted">
                        {row}
                      </a>
                    ) : (
                      <div className="flex items-baseline justify-between gap-3 px-4 py-3">{row}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {items.map(item => (
              <li key={item} className="rounded-[6px] border px-2 py-0.5 font-mono text-[12px] text-secondary-foreground">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
