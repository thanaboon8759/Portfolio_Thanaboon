# Portfolio Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the project list to the strongest 8 with Data & AI first and security last, and strip the template-looking touches so the site reads like a person made it.

**Architecture:** All content lives in `src/data.ts`; sections in `src/sections/*` render it. Task 1 changes the data and pins it with a `node --test` file (Node 25 runs `.ts` directly, so no new dependency). Tasks 2 and 3 update the sections that read the changed data.

**Tech Stack:** Vite 8, React 19, Tailwind v4, framer-motion, lucide-react, Node 25 built-in test runner.

**Spec:** The user's request in this session: "prefer AI and data more than security wise thing and execute the last suggest you give me and make portfolio not so AI", applied to the suggestion list given just before it (keep / merge / remove / React Weather App lower). "Not so AI" is read as "less like an AI-generated template", following the earlier humanizer pass, not "remove AI projects".

## Global Constraints

- Final project order is Data & AI → Web & App → Security; Security is never first in any list.
- Final projects (exactly 8, in this order): Resume AI; Weather Data Dashboard; Object Detection for Waste Separation; Computer Repair Service System; React Weather App; CS471 Pentest Report; Security Assessment Project; Network Security Design.
- Removed (must not appear anywhere in `src/`): Comparative Study of Language Features, PurrfectPics, BUEmail System, Cafe Order Management System, Object Detection Project (merged).
- Filters, in this order: `all` "All", `data` "Data & AI", `web` "Web & App", `security` "Security". No "Documents" filter.
- No new npm dependencies. Do not delete files from `public/images/` (unused files stay; deleting is a separate decision).
- Copy rules: no em dashes in prose, no stock phrases ("Let's work together", "Get to know me", "Hello, I'm"), no invented facts.
- Push to `main` only after the user has seen the local preview and said yes.

## Review Focus

1. A project with both `repo` and `pdf` (only Object Detection could become one later): the card shows the PDF button and no repo link is lost. Test: `every project has at most one of repo/pdf` pins today's data; Task 2 renders `pdf` before `repo` check.
2. Selecting a filter with no matches cannot happen today, but a stale filter id would show an empty grid. Test: `every filter except all matches at least one project`.
3. The Object Detection PDF path still resolves after the merge (spaces in `images/Object Detection.pdf`). Task 4 fetches it from the preview and expects 200.
4. Removing eyebrows must not drop the section `<h2>` (headings are the page outline for screen readers). Task 3 check: 7 `h2` elements on the page.
5. With the typing animation gone, the hero role line must still be readable text (not `aria-hidden`). Task 3 check: hero `p` text equals the static role.

---

### Task 1: Curate project, filter and certificate data

**Files:**
- Modify: `src/data.ts` (profile, `Category`, `filters`, `projects`, `certificates`, `softSkills`, `journey` points order)
- Create: `src/data.test.ts`
- Modify: `package.json` (add script `"test": "node --test src/"`)

**Interfaces:**
- Produces: `type Category = 'data' | 'web' | 'security'`; `filters: { id: 'all' | Category; label: string }[]`; `projects: Project[]` where `Project` is unchanged (`title, subtitle, category, icon, repo?, pdf?`); new `profile.role: string`. `profile.roles` and `softSkills` stay until Task 3 removes their last users, so every commit builds.

- [ ] **Step 1: Write the failing test** in `src/data.test.ts` using `node:test` and `node:assert/strict`, importing `{ projects, filters, certificates }` from `./data.ts`:
  - `project titles are exactly the curated 8 in order` → `deepEqual(projects.map(p => p.title), [the 8 titles from Global Constraints])`
  - `categories run data, then web, then security` → the category sequence, deduplicated in order, equals `['data', 'web', 'security']`
  - `every project has at most one of repo/pdf` → no project with both
  - `object detection card carries the merged report` → that project's `pdf.src === 'images/Object Detection.pdf'`
  - `filters are all, data, web, security` → ids equal `['all','data','web','security']`, labels `['All','Data & AI','Web & App','Security']`
  - `every filter except all matches at least one project`
  - `AI certificate comes first` → `certificates[0].shortTitle === 'Customer Service with Python'`

- [ ] **Step 2: Run it to verify it fails**
  Run: `npm test`
  Expected: FAIL on the titles, categories, filters and certificate tests.

- [ ] **Step 3: Update `src/data.ts`**
  - `profile`: add `role: 'Computer Science student, Data & AI'`.
  - Projects in the Global Constraints order. Object Detection for Waste Separation keeps icon `Bot` and gains the PDF and description from the removed "Object Detection Project" entry; subtitle `Computer Vision · Machine Learning`. React Weather App subtitle stays. CS471 and Security Assessment become `category: 'security'` (icon `FileText`, PDFs unchanged). Network Security Design becomes `category: 'security'`.
  - Remove the 5 entries listed in Global Constraints and the now-unused icon imports (`Cat`, `Coffee`, `MailOpen`).
  - Certificates order: Customer Service with Python, BU-ITI CTF Competition 2025, Basic Security Certificate.
  - `journey[0].points` order: object-detection model first, then pentest report, security assessment, CTF.

- [ ] **Step 4: Run tests to verify they pass**
  Run: `npm test` → Expected: 7 passing, 0 failing.
  Run: `npm run build` → Expected: `✓ built`.

- [ ] **Step 5: Commit**
  `git add src/data.ts src/data.test.ts package.json && git commit -m "Curate projects to 8, Data & AI first, security last"`

### Task 2: Portfolio section follows the new categories

**Files:**
- Modify: `src/sections/Portfolio.tsx`

**Interfaces:**
- Consumes: `filters`, `projects`, `Project` from Task 1.

- [ ] **Step 1: Card action order** in `ProjectCard`: `pdf` → "Read report" button; else `repo` → "View on GitHub"; else "University project". (Object Detection now shows "Read report".)
- [ ] **Step 2: Section title** `"Projects"` (eyebrow removed in Task 3, so pass only the title).
- [ ] **Step 3: Verify**
  Run: `npm test && npm run build` → 7 passing, `✓ built`.
- [ ] **Step 4: Commit**
  `git commit -am "Portfolio: Data & AI, Web & App and Security filters; PDF action first"`

### Task 3: Remove the template-looking touches

**Files:**
- Modify: `src/components/Section.tsx` (drop `eyebrow` prop and its `<p>`)
- Modify: `src/sections/Hero.tsx` (delete `useTypingText`; static role line from `profile.role`; delete the "Hello, I'm" eyebrow; hero text leads with data and AI)
- Modify: `src/sections/Skills.tsx` (delete the Soft skills tile and the `Handshake` import; Tools & Platforms tile keeps `lg:col-span-2`)
- Modify: section titles in `About.tsx` "About", `Journey.tsx` "Education & experience", `Skills.tsx` "Skills", `Certificates.tsx` "Certificates", `Contact.tsx` "Contact"
- Modify: `src/data.ts` (delete `profile.roles` and `softSkills`, now unused)
- Modify: `src/index.css` (delete the now-unused `.typing-caret` rule and `blink` keyframes; keep `.eyebrow` only if still referenced, otherwise delete)

**Interfaces:**
- Produces: `Section({ id, title, children })`.

- [ ] **Step 1: Hero copy** (exact):
  - Role line: `{profile.role}` as plain text, no `aria-hidden`, no sr-only duplicate.
  - Paragraph: "I study Computer Science at Bangkok University and spend most of my time on data and AI: a resume screening tool built on an LLM, a weather data dashboard, and a computer vision model that sorts waste. I also do some security work, mostly reports and CTFs."
- [ ] **Step 2: Remove eyebrows** from `Section` and every caller, and set the titles listed above.
- [ ] **Step 3: Delete the Soft skills tile** and the CSS listed above.
- [ ] **Step 4: Verify**
  Run: `npm test && npm run build` → tests pass, build prints `✓ built`.
  Run: `grep -rnE "eyebrow|useTypingText|softSkills|Let's work together|Get to know me|Hello, I'm|—" src` → no output.
- [ ] **Step 5: Commit**
  `git commit -am "Drop typing effect, eyebrows and stock titles; lead hero with data and AI"`

### Task 4: Check in the browser, then ship

**Files:** none.

- [ ] **Step 1: Preview** with `npm run preview` (preview config `portfolio-v2`, http://localhost:4173/Portfolio_Thanaboon/).
- [ ] **Step 2: Check at 1280 light and 375 dark:**
  8 project cards; clicking "Data & AI" shows 3, "Web & App" 2, "Security" 3; the Object Detection "Read report" opens the dialog and `fetch` of its PDF returns 200; 7 `h2` elements on the page; no horizontal scroll; no console errors.
- [ ] **Step 3: Show the user the preview** and list what changed. Wait for a yes.
- [ ] **Step 4: Ship**
  `git push origin main`, wait for the "Deploy to GitHub Pages" run on that commit to finish with `success`, then confirm the live bundle no longer contains `PurrfectPics`.
