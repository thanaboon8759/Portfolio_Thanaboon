import { useRef, type PointerEvent } from 'react'
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

// Recreated from the 21st.dev "Interactive Tech Stack Bento Grid" preview (@themeocean):
// a glow and border highlight follow the pointer across every tile; icons float on hover.
// On touch screens there is no hover, so tiles simply render static.
export function TechStackBento({ tiles }: { tiles: BentoTile[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    gridRef.current?.querySelectorAll<HTMLElement>('[data-tile]').forEach(tile => {
      const rect = tile.getBoundingClientRect()
      tile.style.setProperty('--x', `${e.clientX - rect.left}px`)
      tile.style.setProperty('--y', `${e.clientY - rect.top}px`)
    })
  }

  return (
    <div
      ref={gridRef}
      onPointerMove={onPointerMove}
      className="group/bento grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {tiles.map(({ title, icon: Icon, items, description, highlights, className }) => (
        <div
          key={title}
          data-tile
          className={cn('group relative overflow-hidden rounded-lg border bg-card p-5.5', className)}
        >
          {/* Border highlight: a radial gradient masked to the 1px border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
            style={{
              padding: 1,
              background: 'radial-gradient(260px circle at var(--x, -100px) var(--y, -100px), var(--primary), transparent 70%)',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          />
          {/* Soft inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
            style={{ background: 'radial-gradient(380px circle at var(--x, -100px) var(--y, -100px), color-mix(in srgb, var(--primary) 10%, transparent), transparent 60%)' }}
          />

          <div className="relative flex h-full flex-col">
            <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary transition-transform duration-300 group-hover:-translate-y-1">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
            {highlights && (
              <ul className="mt-5 divide-y rounded-lg border bg-background/60">
                {highlights.map(h => (
                  <li key={h.label}>
                    {h.href ? (
                      <a href={h.href} target="_blank" rel="noopener" className="flex items-baseline justify-between gap-3 px-4 py-3 text-foreground no-underline hover:text-primary">
                        <span className="font-medium">{h.label}</span>
                        <span className="text-right text-[0.8rem] text-muted-foreground">{h.detail}</span>
                      </a>
                    ) : (
                      <div className="flex items-baseline justify-between gap-3 px-4 py-3">
                        <span className="font-medium">{h.label}</span>
                        <span className="text-right text-[0.8rem] text-muted-foreground">{h.detail}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {items.map(item => (
                <li key={item} className="rounded-full border bg-background px-3 py-1 text-[0.82rem] font-medium">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
