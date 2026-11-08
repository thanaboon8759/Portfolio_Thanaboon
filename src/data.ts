import type { LucideIcon } from 'lucide-react'
import {
  Bot, Brain, ChartLine, CloudSun, FileText, GraduationCap, Network, School, Wrench,
} from 'lucide-react'

export const profile = {
  name: 'Thanaboon Thongprada',
  email: 'thanaboon8759@gmail.com',
  github: 'https://github.com/thanaboon8759',
  githubHandle: 'thanaboon8759',
  linkedin: 'https://www.linkedin.com/in/thanaboon-thongprada-845856384/',
  linkedinHandle: 'thanaboon-thongprada',
  role: 'Computer Science graduate, Data & AI',
}

export type Category = 'data' | 'web' | 'security'

export const filters: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'data', label: 'Data & AI' },
  { id: 'web', label: 'Web & App' },
  { id: 'security', label: 'Security' },
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
  // Data & AI (Resume AI is shown separately as `featured`)
  { title: 'Weather Data Dashboard', subtitle: 'Data Dashboard · Python, Streamlit', category: 'data', icon: ChartLine, repo: repo('Weather-Data-Dashboard') },
  {
    title: 'Object Detection for Waste Separation', subtitle: 'Computer Vision · Machine Learning', category: 'data', icon: Bot,
    pdf: { src: 'images/Object Detection.pdf', description: 'Machine Learning project on waste separation using computer vision. Covers the object detection algorithms used to classify waste automatically.' },
  },
  // Web & App
  { title: 'Computer Repair Service System', subtitle: 'Full Stack · React, Express, MongoDB', category: 'web', icon: Wrench, repo: repo('Service-System') },
  { title: 'React Weather App', subtitle: 'Web App · React', category: 'web', icon: CloudSun, repo: repo('React-Weather-App') },
  // Security
  {
    title: 'CS471 Pentest Report', subtitle: 'Penetration Testing Documentation', category: 'security', icon: FileText,
    pdf: { src: 'images/CS471 Pentest Report V Final.pdf', description: 'Penetration testing report for CS471: vulnerabilities found, how they were exploited, and recommended fixes.' },
  },
  {
    title: 'Security Assessment Project', subtitle: 'Cybersecurity & Information Systems', category: 'security', icon: FileText,
    pdf: { src: 'images/Security Assessment Project for Information Systems Simulation.pdf', description: 'Security assessment of a simulated information system: evaluation methods, vulnerability analysis and simulation-based testing.' },
  },
  { title: 'Network Security Design', subtitle: 'Cybersecurity Project', category: 'security', icon: Network },
]

// Shown as its own block above the project grid; facts from the RESUME-AI README
export const featured = {
  title: 'Resume AI',
  tagline: 'AI resume screening for HR teams',
  summary: 'A backend that reads uploaded resumes and ranks candidates against a job description, so HR can see who matches and what is missing before deciding',
  points: [
    'Extracts text from PDF and DOCX resumes with PyMuPDF, python-docx and PaddleOCR',
    'Ranks candidates against the job description and lists missing information',
    'Lets HR shortlist, reject or mark candidates undecided, with a reason',
    'Supabase handles sign-in, the PostgreSQL database and resume storage',
  ],
  stack: ['FastAPI', 'Supabase', 'PostgreSQL', 'LLM API', 'PyMuPDF', 'python-docx', 'PaddleOCR', 'pgvector', 'pytest'],
  repo: repo('RESUME-AI'),
}

// Sample output for the featured preview; the page labels it as example data
export const featuredPreview = {
  job: 'Junior Data Analyst',
  resumes: 24,
  candidates: [
    { name: 'Pimchanok S.', score: 92, missing: 'Nothing missing', decision: 'Shortlisted' },
    { name: 'Daniel K.', score: 84, missing: 'Missing: Power BI', decision: 'Undecided' },
    { name: 'Napat W.', score: 71, missing: 'Missing: SQL, Power BI', decision: 'Undecided' },
    { name: 'Sofia R.', score: 58, missing: 'Missing: 1 year of experience', decision: 'Rejected' },
  ],
}

export const featuredVisibleFor = (filter: 'all' | Category) => filter === 'all' || filter === 'data'

export type Certificate = { image: string; title: string; shortTitle: string; description: string; width: number; height: number }

export const certificates: Certificate[] = [
  { image: 'images/certificate2.png', title: 'Customer Service with Python: Build a Chatbot using ChatGPT', shortTitle: 'Customer Service with Python', description: 'Coursera Project Network, Feb 2025', width: 2200, height: 1700 },
  { image: 'images/certificate1.png', title: 'BU-ITI CTF Competition 2025', shortTitle: 'BU-ITI CTF Competition 2025', description: 'National-level cybersecurity challenge', width: 5516, height: 3763 },
  { image: 'images/certificate3.png', title: 'Basic Security Certificate', shortTitle: 'Basic Security Certificate', description: 'Cybersecurity fundamentals', width: 2339, height: 1654 },
]

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Data & AI', items: ['LLM APIs', 'PaddleOCR', 'pgvector', 'Streamlit', 'Power BI'] },
  { label: 'Programming', items: ['Python', 'Java', 'JavaScript'] },
  { label: 'Web & Backend', items: ['React', 'FastAPI', 'Flask', 'Node.js / Express', 'HTML', 'CSS'] },
  { label: 'Databases', items: ['PostgreSQL (Supabase)', 'MongoDB', 'MySQL'] },
  { label: 'Tools & Platforms', items: ['Git', 'Kali Linux'] },
]

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
    date: '2022 – 2026', title: 'Computer Science projects', place: 'Bangkok University', icon: Brain,
    points: [
      'Built an object-detection model for waste separation',
      'Wrote a penetration testing report for CS471',
      'Ran a security assessment of a simulated information system',
      'Competed in the BU-ITI CTF Competition 2025, a national-level cybersecurity challenge',
    ],
    tags: ['Python', 'Computer Vision', 'Kali Linux', 'Pentesting'],
  },
  {
    date: '2022 – 2026', title: 'Bachelor of Computer Science', place: 'Bangkok University', icon: GraduationCap,
    description: 'School of Information Technology and Innovation. Data Science and Cybersecurity track.',
    tags: ['Data Science', 'Cybersecurity'],
  },
  {
    date: '2019 – 2021', title: 'Science and Mathematics Program', place: 'Vajiravudh College', icon: School,
    tags: ['Science', 'Mathematics'],
  },
]
