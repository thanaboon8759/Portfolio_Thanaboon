import { useState } from 'react'

import { Modal } from '@/components/Modal'
import { Section } from '@/components/Section'
import { certificates, type Certificate } from '@/data'
import { cardClass } from '@/lib/card-classes'
import { asset } from '@/lib/utils'

export function Certificates() {
  const [open, setOpen] = useState<Certificate | null>(null)

  return (
    <Section id="certificates" title="Certificates">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {certificates.map(c => (
          <article key={c.image} className={cardClass}>
            <button type="button" onClick={() => setOpen(c)} aria-label={`View certificate: ${c.shortTitle}`} className="aspect-[16/10] w-full cursor-zoom-in border-b bg-background">
              <img src={asset(c.image)} alt="" width={c.width} height={c.height} loading="lazy" className="size-full object-cover" />
            </button>
            <div className="px-5 pt-4 pb-5">
              <h3 className="leading-snug font-medium">{c.shortTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </div>
          </article>
        ))}
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)} labelledBy="cert-title">
        {open && (
          <>
            <img src={asset(open.image)} alt={open.title} className="max-h-[70vh] w-full bg-background object-contain" />
            <div className="py-4 pr-14 pl-6">
              <h3 id="cert-title" className="text-lg font-medium">{open.title}</h3>
              <p className="text-sm text-muted-foreground">{open.description}</p>
            </div>
          </>
        )}
      </Modal>
    </Section>
  )
}
