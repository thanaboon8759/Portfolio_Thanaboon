import type { LucideIcon } from 'lucide-react'
import {
  Bot, Brain, Cat, ChartLine, CloudSun, Coffee, FileText, GraduationCap, MailOpen, Network, School, ShieldCheck, Wrench,
} from 'lucide-react'

export const profile = {
  name: 'Thanaboon Thongprada',
  email: 'thanaboon8759@gmail.com',
  github: 'https://github.com/thanaboon8759',
  githubHandle: 'thanaboon8759',
  linkedin: 'https://www.linkedin.com/in/thanaboon-thongprada-845856384/',
  linkedinHandle: 'thanaboon-thongprada',
  roles: ['Computer Science Student', 'Data & AI Student', 'Cybersecurity Student', 'Problem Solver'],
}

export type Category = 'web' | 'data' | 'documents'

export const filters: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web & App' },
  { id: 'data', label: 'Data & AI' },
  { id: 'documents', label: 'Documents' },
]

export type Project = {
  title: string
  subtitle: string
  category: Category
  icon: LucideIcon
  repo?: string
  // PDF projects open in the document dialog instead of linking out
  pdf?: { src: string; description: string }
}

const repo = (name: string) => `https://github.com/thanaboon8759/${name}`

export const projects: Project[] = [
  { title: 'Resume AI', subtitle: 'AI Resume Screening · FastAPI, LLM, OCR, pgvector', category: 'data', icon: Brain, repo: repo('RESUME-AI') },
  { title: 'Computer Repair Service System', subtitle: 'Full Stack · React, Express, MongoDB', category: 'web', icon: Wrench, repo: repo('Service-System') },
  { title: 'PurrfectPics', subtitle: 'Web App · Flask, The Cat API', category: 'web', icon: Cat, repo: repo('Cat_API') },
  { title: 'React Weather App', subtitle: 'Web App · React', category: 'web', icon: CloudSun, repo: repo('React-Weather-App') },
  { title: 'Weather Data Dashboard', subtitle: 'Data Dashboard · Python, Streamlit', category: 'data', icon: ChartLine, repo: repo('Weather-Data-Dashboard') },
  { title: 'Object Detection for Waste Separation', subtitle: 'Machine Learning Project', category: 'data', icon: Bot },
  { title: 'Network Security Design', subtitle: 'Cybersecurity Project', category: 'data', icon: Network },
  { title: 'BUEmail System', subtitle: 'Web Development Project', category: 'web', icon: MailOpen },
  { title: 'Cafe Order Management System', subtitle: 'Database Project', category: 'web', icon: Coffee },
  {
    title: 'Object Detection Project', subtitle: 'Machine Learning & Computer Vision', category: 'documents', icon: FileText,
    pdf: { src: 'images/Object Detection.pdf', description: 'Machine Learning project on waste separation using computer vision. Covers the object detection algorithms used to classify waste automatically.' },
  },
  {
    title: 'Comparative Study of Language Features', subtitle: 'Programming Languages Research', category: 'documents', icon: FileText,
    pdf: { src: 'images/Comparative Study of Language Features.pdf', description: 'A study comparing programming languages: their paradigms, performance and typical use cases.' },
  },
  {
    title: 'Security Assessment Project', subtitle: 'Cybersecurity & Information Systems', category: 'documents', icon: FileText,
    pdf: { src: 'images/Security Assessment Project for Information Systems Simulation.pdf', description: 'Security assessment of a simulated information system: evaluation methods, vulnerability analysis and simulation-based testing.' },
  },
  {
    title: 'CS471 Pentest Report', subtitle: 'Penetration Testing Documentation', category: 'documents', icon: FileText,
    pdf: { src: 'images/CS471 Pentest Report V Final.pdf', description: 'Penetration testing report for CS471: vulnerabilities found, how they were exploited, and recommended fixes.' },
  },
]

export type Certificate = { image: string; title: string; shortTitle: string; description: string; width: number; height: number }

export const certificates: Certificate[] = [
  { image: 'images/certificate1.png', title: 'BU-ITI CTF Competition 2025', shortTitle: 'BU-ITI CTF Competition 2025', description: 'National-level cybersecurity challenge', width: 5516, height: 3763 },
  { image: 'images/certificate2.png', title: 'Customer Service with Python: Build a Chatbot using ChatGPT', shortTitle: 'Customer Service with Python', description: 'Coursera Project Network, Feb 2025', width: 2200, height: 1700 },
  { image: 'images/certificate3.png', title: 'Basic Security Certificate', shortTitle: 'Basic Security Certificate', description: 'Cybersecurity fundamentals', width: 2339, height: 1654 },
]

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Data & AI', items: ['LLM APIs', 'PaddleOCR', 'pgvector', 'Streamlit', 'Power BI'] },
  { label: 'Programming', items: ['Python', 'Java', 'JavaScript'] },
  { label: 'Web & Backend', items: ['React', 'FastAPI', 'Flask', 'Node.js / Express', 'HTML', 'CSS'] },
  { label: 'Databases', items: ['PostgreSQL (Supabase)', 'MongoDB', 'MySQL'] },
  { label: 'Tools & Platforms', items: ['Git', 'Kali Linux'] },
]

export const softSkills = ['Positive attitude', 'Teamwork', 'Adaptability', 'Time management', 'Problem-solving']

export type TimelineEntry = {
  date: string
  title: string
  place: string
  icon: LucideIcon
  description?: string
  points?: string[]
  tags?: string[]
}

export const journey: TimelineEntry[] = [
  {
    date: '2022 – Present', title: 'Computer Science projects', place: 'Bangkok University', icon: ShieldCheck,
    points: [
      'Competed in the BU-ITI CTF Competition 2025, a national-level cybersecurity challenge',
      'Wrote a penetration testing report for CS471',
      'Built an object-detection model for waste separation',
      'Ran a security assessment of a simulated information system',
    ],
    tags: ['Python', 'Computer Vision', 'Kali Linux', 'Pentesting'],
  },
  {
    date: '2022 – Present', title: 'Bachelor of Computer Science', place: 'Bangkok University', icon: GraduationCap,
    description: 'School of Information Technology and Innovation. Data Science and Cybersecurity track.',
    tags: ['Data Science', 'Cybersecurity'],
  },
  {
    date: '2019 – 2021', title: 'Science and Mathematics Program', place: 'Vajiravudh College', icon: School,
    tags: ['Science', 'Mathematics'],
  },
]
