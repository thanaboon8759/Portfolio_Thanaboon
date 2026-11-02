import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = { open: boolean; onClose: () => void; labelledBy: string; className?: string; children: ReactNode }

// Native <dialog>: focus trap, Esc and focus return come from the browser
export function Modal({ open, onClose, labelledBy, className, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Clicks on the backdrop land on the dialog element itself
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className={cn(
        'm-auto max-h-[calc(100vh-32px)] w-[min(900px,calc(100vw-32px))] overflow-hidden rounded-lg border bg-card p-0 text-card-foreground',
        className,
      )}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2.5 right-2.5 z-10 grid size-10 place-items-center rounded-full border bg-card"
      >
        <X className="size-5" />
      </button>
      {open && children}
    </dialog>
  )
}
