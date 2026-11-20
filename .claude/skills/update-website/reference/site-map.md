# Site map

Two routes, switched in `src/App.tsx` via `hooks/useRoute.ts`: `/` renders `HeroSection` only (scroll locked with `html.no-scroll`), `/about-me` renders `components/pages/AboutPage.tsx`. Projects, Blog, Extras, and the footer were removed in Nov 2026; GitHub link covers projects, blog will later point to Medium/Substack. `App.tsx` also owns theme-conditional cursors (TronDiscCursor dark, BoneCursor light) and lazy canvases/HUDs.

| Want to change | File |
|---|---|
| Name, role, tagline, bio, location, education, links | `src/data/profile.ts` |
| Jobs, roles, bullets, company links/logos | `src/data/experience.ts` (entries: freelance-consultant, hypotenuse-tpm/swe/freelance, co-ops). Hidden by `FEATURES.experienceSection` in `src/config/features.ts`; when on, it renders at the bottom of the about page |
| Data shapes | `src/types/index.ts` |
| Hero | `components/sections/HeroSection.tsx` |
| About page (intro, credentials, trajectory) | `components/pages/AboutPage.tsx`; trajectory stops in `src/data/trajectory.ts` |
| Experience list + detail modal | `ExperienceSection.tsx`, `ui/ExperienceDetailModal.tsx` |
| Nav bar, mobile drawer, laser bolt | `components/navigation/` |
| Starfield / dino runner canvases | `components/canvas/` |
| Coordinates / dino score HUD | `components/telemetry/` |
| Reveal animation, themed text, cursors | `components/ui/` |
| Theme state (localStorage, `data-theme` on `<html>`) | `context/ThemeContext.tsx` |
| Theme config values | `config/themeConfig.ts` |
| Hooks (active section, scroll Y, telemetry) | `hooks/` |
| SEO / meta / OG tags / page title | `index.html` (repo root) |
| Resume PDF | `public/surudh_bhutani_resume.pdf` (keep in sync with resume-data in surudh-brand) |
| Images/logos/sprites/sounds | `public/images`, `public/sprites`, `public/sounds` (referenced by absolute `/...` path) |
| Fonts | `public/fonts/` + `fonts.css` (self-hosted; light-mode font injected lazily) |

`src/content/` (markdown + images for old blog/projects/work) is legacy and not imported; edit `src/data/` instead.
