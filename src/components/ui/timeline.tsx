import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import type { TimelineEntry } from '@/data'

// Recreated from the 21st.dev "Experience Timeline" preview (@shadcnui-blocks):
// vertical rail with an icon per entry, role/place/date, description and tech badges.
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative">
      {entries.map(({ date, title, place, icon: Icon, description, points, tags }, i) => (
        <motion.li
          key={title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative grid grid-cols-[44px_1fr] gap-x-4 pb-9 last:pb-0 sm:gap-x-6"
        >
          {/* Rail segment down to the next entry */}
          {i < entries.length - 1 && <span aria-hidden="true" className="absolute top-12 bottom-1 left-[21px] w-0.5 bg-border" />}
          <span className="relative z-10 grid size-11 place-items-center rounded-full border bg-card text-primary shadow-xs">
            <Icon className="size-5" aria-hidden="true" />
          </span>

          <div className="pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[1.05rem] font-semibold">{title}</h3>
              <span className="text-[0.82rem] font-semibold text-primary">{date}</span>
            </div>
            <p className="font-medium text-muted-foreground">{place}</p>
            {description && <p className="mt-2 text-[0.95rem] text-muted-foreground">{description}</p>}
            {points && (
              <ul className="mt-2 list-disc space-y-1 pl-4.5 text-[0.95rem] text-muted-foreground">
                {points.map(p => <li key={p}>{p}</li>)}
              </ul>
            )}
            {tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
