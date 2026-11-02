import assert from 'node:assert/strict'
import { test } from 'node:test'

import { certificates, filters, projects } from './data.ts'

test('project titles are exactly the curated 8 in order', () => {
  assert.deepEqual(projects.map(p => p.title), [
    'Resume AI',
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
