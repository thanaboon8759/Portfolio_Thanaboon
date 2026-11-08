import { Badge } from '@/components/ui/badge'
import type { TimelineEntry } from '@/data'

// Recreated from the 21st.dev "Experience Timeline" preview (@shadcnui-blocks):
// vertical rail with an icon per entry, role/place/date, description and tech badges.
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative">
      {entries.map(({ date, title, place, icon: Icon, description, points, tags }, i) => (
        <li key={title} className="relative grid grid-cols-[40px_1fr] gap-x-4 pb-8 last:pb-0 sm:gap-x-6">
          {/* Rail segment down to the next entry */}
          {i < entries.length - 1 && <span aria-hidden="true" className="absolute top-12 bottom-1 left-[19px] w-px bg-border" />}
          <span className="relative z-10 grid size-10 place-items-center rounded-full border bg-card text-muted-foreground">
            <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </span>

          <div className="pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-medium">{title}</h3>
              <span className="font-mono text-[13px] text-muted-foreground tabular-nums">{date}</span>
            </div>
            <p className="font-medium text-muted-foreground">{place}</p>
            {description && <p className="mt-2 text-[0.95rem] text-muted-foreground">{description}</p>}
            {points && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[0.95rem] text-muted-foreground">
                {points.map(p => <li key={p}>{p}</li>)}
              </ul>
            )}
            {tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map(t => <Badge key={t} variant="secondary" className="font-mono font-normal">{t}</Badge>)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
