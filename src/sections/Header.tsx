import { Award, Briefcase, Cpu, Mail, Route, User } from 'lucide-react'

import { TubelightNavbar, type NavItem } from '@/components/ui/tubelight-navbar'
import { useActiveSection } from '@/hooks/useActiveSection'

const navItems: NavItem[] = [
  { id: 'about', label: 'About', icon: User },
  { id: 'journey', label: 'Journey', icon: Route },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
]
const ids = navItems.map(i => i.id)

export function Header() {
  const active = useActiveSection(ids)
  return <TubelightNavbar items={navItems} active={active} />
}
