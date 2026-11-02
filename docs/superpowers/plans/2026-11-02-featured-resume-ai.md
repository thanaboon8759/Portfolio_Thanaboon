# Featured Resume AI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Resume AI, the strongest Data & AI project, a readable "Featured project" block at the top of Projects, then close the small leftovers from the last two rounds.

**Architecture:** The featured content is data in `src/data.ts` (`featured`), rendered by a new `src/components/FeaturedProject.tsx` above the filters in `src/sections/Portfolio.tsx`. Resume AI leaves the card grid so it is not shown twice. Task 2 updates the copy now that the user has graduated (2026); Task 3 is repo housekeeping with no UI beyond one icon.

**Tech Stack:** Vite 8, React 19, Tailwind v4, lucide-react, `Badge` from `src/components/ui/badge.tsx`, Node 25 built-in test runner (`npm test`).

**Spec:** Recommendation accepted in this session (item 1 "make Resume AI stand out", item 2 "small cleanups"), plus the user's note that they graduated in 2026. Facts come only from the RESUME-AI README (https://github.com/thanaboon8759/RESUME-AI): parses PDF/DOCX resumes; ranks candidates against a job description, tracking matching criteria and missing information; decision workspace to shortlist, reject or mark undecided with reasoning; Supabase auth, PostgreSQL and storage; FastAPI REST API; stack FastAPI, Supabase, LLM API, PyMuPDF, python-docx, PaddleOCR, pgvector; tests with pytest.

## Global Constraints

- No fact about Resume AI beyond the README list above (no user counts, accuracy numbers, dates or screenshots).
- The user graduated in 2026: no copy may call them a current student.
- Display name stays "Resume AI" (the repo README still says "DUMB DOG AI"; do not use that name).
- Projects order and filters from the previous plan stay: Data & AI → Web & App → Security; filters `all`, `data`, `web`, `security`.
- No new npm dependencies; no em dashes in copy; plain wording (no "cutting-edge", "seamless", "powerful").
- Push to `main` only after the user has seen the local preview and said yes. Deleting the remote `v2-react` branch is approved by approving this plan.

## Review Focus

1. Resume AI must still be reachable from the "Data & AI" filter view, since its card leaves the grid: the featured block stays visible for `all` and `data`, hidden for `web` and `security`. Test: Task 1 `featuredVisibleFor` returns true only for `all` and `data`.
2. The featured GitHub link must be the real repo URL, not a typo. Test: `featured.repo === 'https://github.com/thanaboon8759/RESUME-AI'`.
3. On a 375px phone the stack badges must wrap, not scroll sideways. Task 4 browser check: horizontal overflow 0 at 375.
4. The block needs a real heading so screen readers list it. Task 4 check: an `h3` with text "Resume AI" inside `#portfolio`.
5. "Every filter except all matches at least one project" must still hold after Resume AI leaves `projects` (Data & AI keeps 2). Existing test covers it; it must stay green.

---

### Task 1: Featured Resume AI block

**Files:**
- Modify: `src/data.ts` (remove Resume AI from `projects`; add `featured`, `featuredVisibleFor`)
- Modify: `src/data.test.ts` (update titles test; add 3 tests)
- Create: `src/components/FeaturedProject.tsx`
- Modify: `src/sections/Portfolio.tsx` (render it between the filters and the grid)

**Interfaces:**
- Produces: `featured: { title: string; tagline: string; summary: string; points: string[]; stack: string[]; repo: string }` and `featuredVisibleFor(filter: 'all' | Category): boolean` from `src/data.ts`; `FeaturedProject({ project }: { project: typeof featured })` from `src/components/FeaturedProject.tsx`.

- [ ] **Step 1: Write the failing tests** in `src/data.test.ts`:
  - Change `project titles are exactly the curated 8 in order` to `project titles are the 7 grid cards in order`, expecting the old list without `'Resume AI'`.
  - `featured project is Resume AI with its real repo` → `featured.title === 'Resume AI'` and `featured.repo === 'https://github.com/thanaboon8759/RESUME-AI'`.
  - `featured stack matches the README` → `deepEqual(featured.stack, ['FastAPI', 'Supabase', 'PostgreSQL', 'LLM API', 'PyMuPDF', 'python-docx', 'PaddleOCR', 'pgvector', 'pytest'])`.
  - `featured block shows for all and Data & AI only` → `filters.map(f => featuredVisibleFor(f.id))` equals `[true, true, false, false]`.

- [ ] **Step 2: Run to verify they fail**
  Run: `npm test` → Expected: FAIL (titles test; `featured`/`featuredVisibleFor` not exported).

- [ ] **Step 3: Add the data** in `src/data.ts`, exact copy:
  - `title`: `Resume AI`
  - `tagline`: `AI resume screening for HR teams`
  - `summary`: `A backend that reads uploaded resumes and ranks candidates against a job description, so HR can see who matches and what is missing before deciding.`
  - `points`:
    1. `Extracts text from PDF and DOCX resumes with PyMuPDF, python-docx and PaddleOCR`
    2. `Ranks candidates against the job description and lists missing information`
    3. `Lets HR shortlist, reject or mark candidates undecided, with a reason`
    4. `Supabase handles sign-in, the PostgreSQL database and resume storage`
  - `stack`: as in the test; `repo`: `repo('RESUME-AI')`.
  - `featuredVisibleFor`: true for `'all'` and `'data'`.
  - Delete the Resume AI entry from `projects`.

- [ ] **Step 4: Build `FeaturedProject`**: a card using the existing `cardClass` look (border, `bg-card`, rounded) laid out as two columns from `md` (text left; `Brain` icon cover using `coverClass` right, hidden below `md`). Content order (no label above the title; the previous plan removed those): `h3` title, tagline, summary, `ul` of points, `Badge variant="secondary"` per stack item, "View on GitHub" link styled like the card links (`target="_blank" rel="noopener"`). Export `cardClass`/`coverClass` stay in `Portfolio.tsx`; import them from there.

- [ ] **Step 5: Render it** in `Portfolio.tsx` after the filter group: `{featuredVisibleFor(filter) && <FeaturedProject project={featured} />}` with `mb-5` spacing above the grid.

- [ ] **Step 6: Verify**
  Run: `npm test && npm run build` → Expected: 10 passing, `✓ built`.

- [ ] **Step 7: Commit**
  `git add src/data.ts src/data.test.ts src/components/FeaturedProject.tsx src/sections/Portfolio.tsx && git commit -m "Feature Resume AI above the project grid"`

### Task 2: Say graduated, not student

User, in this session: "add that i graduate already", graduation year 2026.

**Files:**
- Modify: `src/data.ts` (`profile.role`; both `journey` dates)
- Modify: `src/data.test.ts` (3 tests)
- Modify: `src/sections/Hero.tsx`, `src/sections/About.tsx`, `index.html` (copy only)

- [ ] **Step 1: Write the failing tests:**
  - `role says graduate` → `profile.role === 'Computer Science graduate, Data & AI'`
  - `no journey entry is still Present` → `journey.filter(e => e.date.includes('Present'))` is empty
  - `degree ends in 2026` → the `Bachelor of Computer Science` entry has `date === '2022 – 2026'`
- [ ] **Step 2: Run** `npm test` → Expected: FAIL on those 3.
- [ ] **Step 3: Update copy**, exact text:
  - `profile.role`: `Computer Science graduate, Data & AI`
  - Both `journey` dates `2022 – Present` → `2022 – 2026`
  - Hero paragraph first clause: `I graduated in Computer Science from Bangkok University in 2026, and my main interest is data and AI:` (rest of the sentence unchanged)
  - About first paragraph: `I graduated from Bangkok University's School of Information Technology and Innovation in 2026, on the Data Science and Cybersecurity track. My projects include an AI tool that screens resumes and a model that sorts waste, plus a security assessment of a simulated information system.`
  - `index.html` meta description: `Portfolio of Thanaboon Thongprada, a Computer Science graduate from Bangkok University focused on data and AI. Projects, reports, skills and certificates.`; `og:description`: `Computer Science graduate from Bangkok University focused on data and AI.`
- [ ] **Step 4: Verify** `npm test && npm run build` → 13 passing, `✓ built`; `grep -rniE "student|present|I study" src index.html --exclude="*.test.ts"` → no output.
- [ ] **Step 5: Commit** `git commit -am "Update copy: graduated in 2026"`

### Task 3: Leftover cleanups

**Files:**
- Modify: `src/data.ts` (journey "Computer Science projects" icon `ShieldCheck` → `Brain`; drop `ShieldCheck` import)
- Create: `README.md`
- Add: `docs/superpowers/plans/*.md` (both plan files)

- [ ] **Step 1: Icon swap** and run `npm test && npm run build` → 13 passing, `✓ built`.
- [ ] **Step 2: Write `README.md`** (under 40 lines): one-line description with the live URL; "Run locally" (`npm install`, `npm run dev`, `npm test`); "Edit content" pointing to `src/data.ts`; "Deploy" (push to `main`, GitHub Actions publishes; Pages source must be "GitHub Actions"). No badges, no emojis.
- [ ] **Step 3: Commit**
  `git add src/data.ts README.md docs && git commit -m "Brain icon for AI-led timeline entry; add README and plan docs"`
- [ ] **Step 4: Delete the merged remote branch**
  Run: `git branch -d v2-react && git push origin --delete v2-react` → Expected: `- [deleted] v2-react`. Run `git ls-remote --heads origin` → only `refs/heads/main`.

### Task 4: Check in the browser, then ship

- [ ] **Step 1: Preview** with `npm run build` then the `portfolio-v2` preview server (http://localhost:4173/Portfolio_Thanaboon/).
- [ ] **Step 2: Check at 1280 light and 375 dark:** hero role reads "Computer Science graduate, Data & AI" and the timeline shows "2022 – 2026"; featured block above the grid with `h3` "Resume AI" and a GitHub link to the repo URL; grid has 7 cards; "Data & AI" shows the block + 2 cards; "Web & App" and "Security" hide the block; horizontal overflow 0; no console errors.
- [ ] **Step 3: Show the user** the preview and wait for a yes.
- [ ] **Step 4: Ship:** `git push origin main`; wait for the "Deploy to GitHub Pages" run on that commit to succeed; confirm the live bundle contains `AI resume screening for HR teams`.
