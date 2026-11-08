import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export type NavItem = { id: string; label: string; icon: LucideIcon }

type Props = { items: NavItem[]; active: string; className?: string }

// Recreated from the 21st.dev "Tubelight Navbar" preview (@ayushmxxn): floating pill,
// a solid lamp bar slides to the active item (its blur glow was removed in the unslop pass). Text on desktop, icons on phones (pinned to the bottom).
export function TubelightNavbar({ items, active, className }: Props) {
  return (
    <nav
      aria-label="Main"
      className={cn(
        'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:top-5 md:bottom-auto',
        className,
      )}
    >
      <ul className="flex items-center gap-1 rounded-full border bg-background/70 p-1 shadow-lg backdrop-blur-lg md:gap-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative flex items-center rounded-full px-3.5 py-2.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground md:px-5 md:py-2',
                  isActive && 'text-foreground',
                )}
              >
                <span className="hidden md:inline">{label}</span>
                <Icon className="size-[18px] md:hidden" strokeWidth={1.5} aria-hidden="true" />
                {isActive && (
                  <motion.span
                    layoutId="tubelight"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/8"
                    initial={false}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-[4px] bg-primary" />
                  </motion.span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
