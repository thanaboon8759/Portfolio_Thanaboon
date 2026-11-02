import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]
const ids = navItems.map(i => i.id)

// shortcut: v1-style nav, replaced by the 21st Tubelight Navbar once its prompt is pasted
export function Header() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className="relative mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-lg font-bold text-foreground no-underline">
          Thanaboon<span className="text-primary">.</span>
        </a>
        <button
          type="button"
          className="-mr-2.5 grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <ul
          id="nav-links"
          className={cn(
            'absolute inset-x-0 top-16 flex-col gap-1 border-b bg-background px-4 pt-2 pb-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0',
            open ? 'flex' : 'hidden',
          )}
        >
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'block rounded-lg px-3 py-3 text-base font-medium text-muted-foreground no-underline hover:text-foreground md:py-1.5 md:text-[0.92rem]',
                  active === item.id && 'bg-accent text-accent-foreground hover:text-accent-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
