import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = { id: string; eyebrow: string; title: string; children: ReactNode }

export function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1080px] border-t px-4 py-14 sm:px-6 md:py-18">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="mb-9">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  )
}
