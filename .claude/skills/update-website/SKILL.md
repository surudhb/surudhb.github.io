---
name: update-website
description: Make a change to Surudh's personal website (surudhb.github.io): edit copy, projects, experience, sections, styling, or components, then preview, build, and deploy. Use for any task in this repo.
---

# Update website

Stack and commands are in the root `CLAUDE.md`. This skill is the workflow.

## 1. Content that represents Surudh: use surudh-brand
For ANY bio, about text, tagline, headline, project or experience description, invoke the `surudh-brand` skill (`~/.claude/skills/surudh-brand/`) and read its reference files. Do not invent content or duplicate it into this repo's docs.
- `reference/narrative-angles.md`: website/portfolio guidance (read first)
- `reference/project-stories.md`, `reference/resume-data.md`: facts, metrics, stacks
- `reference/candidate-profile.md`: identity
- `reference/tone-and-verbiage.md`: voice

Hard voice rules: no em dashes anywhere (use commas, periods, colons); past tense in summaries and narrative; no Web3/crypto jargon (reframe to fintech/finance); never "career break", "sabbatical" or "gap year" (use "Freelance Technical Consultant"). Existing copy in `src/data/` may violate these (e.g. `id: 'career-break'`, "side-quested", "web3", "NFT", em dashes in titles); fix when touched and flag the rest.

## 2. Locate the change
Read `reference/site-map.md` for which file owns what. Copy lives in `src/data/*.ts` (typed by `src/types/index.ts`); layout in `src/components/sections/`; colors in `src/styles/tokens.css`. Read `reference/conventions.md` before styling or adding components.

## 3. Preview and verify
`preview_start` with name `portfolio-dev` (never run dev servers via Bash). Check console for errors, then verify the changed section in dark and light mode and at mobile width (resize_window). Screenshot visual changes.

## 4. Build
`npm run build` must pass (strict TS, no unused locals/params). Fix errors before committing.

## 5. Deploy
Commit on a branch, merge to `source`; pushing `source` auto-deploys via GitHub Actions to `master`. Only push or merge when the user asks. Never touch `dist/` or `master`.
