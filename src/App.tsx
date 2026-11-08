import { MotionConfig } from 'framer-motion'

import { About } from '@/sections/About'
import { Certificates } from '@/sections/Certificates'
import { Contact, Footer } from '@/sections/Contact'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Journey } from '@/sections/Journey'
import { Portfolio } from '@/sections/Portfolio'
import { Skills } from '@/sections/Skills'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="absolute -top-12 left-4 z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:top-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Portfolio />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
