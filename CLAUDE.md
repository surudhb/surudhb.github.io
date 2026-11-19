# surudhb.github.io

Surudh Bhutani's personal portfolio: a two-page React 19 + TypeScript site built with Vite 6 (framer-motion, lucide-react). Dark "deep space" theme with a light "cave painting" mode.

- Commands: `npm run dev` (port 5173, `.claude/launch.json` name `portfolio-dev`), `npm run build` (`tsc -b && vite build` to `dist/`), `npm run preview`. No test or lint scripts; `tsc` strict + noUnused* is the gate.
- Deploy: push to branch `source` triggers `.github/workflows/deploy.yml`, which builds and force-pushes `dist/` to `master` (GitHub Pages, base `/`). Never edit or commit `dist/` or `master`.
- Routes: `/` (hero only, single screen, no scroll) and `/about-me` (intro, credentials, career trajectory). Routing is `hooks/useRoute.ts` (pushState, no dependency); `vite.config.ts` copies `index.html` to `about-me/` and `404.html` for GitHub Pages. Add new routes in both places.
- `src/` map: `App.tsx` (route switch, theme canvases), `components/{pages,sections,navigation,canvas,telemetry,ui}`, `data/` (all site copy: `profile.ts`, `trajectory.ts`, `experience.ts`), `types/index.ts`, `context/ThemeContext.tsx`, `styles/tokens.css` (CSS vars), `config/themeConfig.ts`, `hooks/`.
- `public/`: `fonts/` (self-hosted), `images/`, `icons/`, `sounds/`, `sprites/`, `surudh_bhutani_resume.pdf`. `src/content/*` holds legacy markdown and images and is not imported by code.
- Invariants: use CSS tokens from `tokens.css` rather than hardcoded colors; keep decorative canvases/HUDs lazy-loaded; keep fonts self-hosted; check both themes after UI changes.
- Content rule: all professional copy (bio, tagline, project/experience blurbs) comes from the `surudh-brand` skill. Never invent it. Voice: no em dashes, past tense, no Web3/crypto jargon, never "career break"/"sabbatical"/"gap year" (use "Freelance Technical Consultant").
- For site changes, use the `update-website` skill (`.claude/skills/update-website/`).
