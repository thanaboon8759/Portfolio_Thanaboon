# Review Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the three "Nice to have" findings from the ponytail review of commits `781e1b9..4a0395c`.

**Architecture:** Two class edits in `src/components/FeaturedProject.tsx` and one test rename in `src/data.test.ts`. No data, layout or copy changes.

**Tech Stack:** React 19, Tailwind v4 (`cn` = clsx + tailwind-merge in `src/lib/utils.ts`), Node 25 test runner (`npm test`).

**Spec:** The ponytail review given in this session, findings 1 to 3:
1. The featured card lifts and tints on hover (from `cardClass`) but only its link is clickable; stop the hover effect on this card only.
2. `md:flex-none` on the featured article and `h-full` on its icon panel do nothing; delete them.
3. Test "featured stack matches the README" really checks the agreed list (README puts PostgreSQL under Supabase); rename it to "featured stack matches the agreed list".

## Global Constraints

- Grid project cards and certificate cards keep their hover lift; only the featured card changes. `src/lib/card-classes.ts` is not edited.
- No new dependencies; test count stays 13.
- Push to `main` only after the user says yes.

## Review Focus

1. tailwind-merge must let the override win over `cardClass`'s `hover:-translate-y-0.5` and `hover:border-primary/40`. Task 2 browser check: computed `transform` of the featured article while hovered is `none`.
2. Removing `h-full` must not shrink the icon panel at md+ widths. Task 2 check: at 1280 the panel's height equals the article's height (±1px).
3. Grid cards still lift on hover. Task 2 check: a hovered grid card's computed `transform` is not `none`.

---

### Task 1: Apply the three findings

**Files:**
- Modify: `src/components/FeaturedProject.tsx` (article and icon-panel class strings)
- Modify: `src/data.test.ts` (one test name)

- [ ] **Step 1: Featured article class** → `cn(cardClass, 'mb-5 hover:translate-y-0 hover:border-border md:grid md:grid-cols-[1.6fr_1fr]')` (adds the two hover overrides, drops `md:flex-none`).
- [ ] **Step 2: Icon panel class** → `cn(coverClass, 'hidden md:grid md:aspect-auto md:border-b-0 md:border-l')` (drops `h-full`).
- [ ] **Step 3: Rename the test** `'featured stack matches the README'` → `'featured stack matches the agreed list'`; assertion unchanged.
- [ ] **Step 4: Verify**
  Run: `npm test && npm run build` → Expected: 13 passing, `✓ built`.
  Run: `grep -n "flex-none\|h-full\|matches the README" src/components/FeaturedProject.tsx src/data.test.ts` → Expected: no output.
- [ ] **Step 5: Commit** `git commit -am "Featured card: no hover lift, drop no-op classes; rename stack test"`

Note: these are class and name edits with no new logic, so there is no failing test to write first; the Review Focus checks in Task 2 are the proof.

### Task 2: Check in the browser, then ship

- [ ] **Step 1: Preview** `npm run build`, then the `portfolio-v2` preview server (http://localhost:4173/Portfolio_Thanaboon/).
- [ ] **Step 2: At 1280 light:** hover the featured article → computed `transform` is `none` and border colour equals `--border`; hover a grid card → `transform` is not `none`; icon panel height equals article height (±1px). At 375 dark: no horizontal overflow; no console errors.
- [ ] **Step 3: Show the user** and wait for a yes.
- [ ] **Step 4: Ship** `git push origin main`; wait for the "Deploy to GitHub Pages" run on that commit to succeed.
