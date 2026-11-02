import assert from 'node:assert/strict'
import { test } from 'node:test'

import { certificates, featured, featuredVisibleFor, filters, journey, profile, projects } from './data.ts'

test('project titles are the 7 grid cards in order', () => {
  assert.deepEqual(projects.map(p => p.title), [
    'Weather Data Dashboard',
    'Object Detection for Waste Separation',
    'Computer Repair Service System',
    'React Weather App',
    'CS471 Pentest Report',
    'Security Assessment Project',
    'Network Security Design',
  ])
})

test('categories run data, then web, then security', () => {
  const order = projects.map(p => p.category).filter((c, i, all) => c !== all[i - 1])
  assert.deepEqual(order, ['data', 'web', 'security'])
})

test('every project has at most one of repo/pdf', () => {
  assert.deepEqual(projects.filter(p => p.repo && p.pdf).map(p => p.title), [])
})

test('object detection card carries the merged report', () => {
  const card = projects.find(p => p.title === 'Object Detection for Waste Separation')
  assert.equal(card?.pdf?.src, 'images/Object Detection.pdf')
})

test('filters are all, data, web, security', () => {
  assert.deepEqual(filters.map(f => f.id), ['all', 'data', 'web', 'security'])
  assert.deepEqual(filters.map(f => f.label), ['All', 'Data & AI', 'Web & App', 'Security'])
})

test('every filter except all matches at least one project', () => {
  const empty = filters.filter(f => f.id !== 'all' && !projects.some(p => p.category === f.id))
  assert.deepEqual(empty.map(f => f.id), [])
})

test('AI certificate comes first', () => {
  assert.equal(certificates[0].shortTitle, 'Customer Service with Python')
})

test('featured project is Resume AI with its real repo', () => {
  assert.equal(featured.title, 'Resume AI')
  assert.equal(featured.repo, 'https://github.com/thanaboon8759/RESUME-AI')
})

test('featured stack matches the README', () => {
  assert.deepEqual(featured.stack, ['FastAPI', 'Supabase', 'PostgreSQL', 'LLM API', 'PyMuPDF', 'python-docx', 'PaddleOCR', 'pgvector', 'pytest'])
})

test('featured block shows for all and Data & AI only', () => {
  assert.deepEqual(filters.map(f => featuredVisibleFor(f.id)), [true, true, false, false])
})

test('role says graduate', () => {
  assert.equal(profile.role, 'Computer Science graduate, Data & AI')
})

test('no journey entry is still Present', () => {
  assert.deepEqual(journey.filter(e => e.date.includes('Present')).map(e => e.title), [])
})

test('degree ends in 2026', () => {
  assert.equal(journey.find(e => e.title === 'Bachelor of Computer Science')?.date, '2022 – 2026')
})
