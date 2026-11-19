# Conventions

- Styling: global CSS vars in `src/styles/tokens.css` (`--bg-*`, `--text-*`, `--accent-cyan`, `--accent-amber`, `--border-*`, `--font-*`) plus `global.css`. Light mode overrides via `data-theme="light"` on `<html>`. Use tokens, not hardcoded hex (recent refactor tokenized HeroSection inline styles).
- Components are functional React with named exports (`export const X: React.FC`). Sections animate in via `ui/MotionReveal.tsx` (framer-motion).
- Performance: decorative canvases/HUDs are `lazy()` + `Suspense` in `App.tsx`; scroll listeners are consolidated in `useScrollY`/`useActiveSection` (do not add new window scroll listeners); fonts self-hosted with `font-display: swap`.
- Typography/tone of UI: uppercase, terminal/HUD style labels (e.g. `SOFTWARE ENGINEER // TECHNICAL PROGRAM MANAGER`). Keep that style for section labels and tags (copy sentences still follow surudh-brand voice).
- TypeScript is strict with `noUnusedLocals/Parameters`; remove dead imports.
- Assets: put in `public/` and reference with absolute paths (`/images/...`); Vite `base` is `/`.
- Adding a project/experience/article: append an object to the array in `src/data/*.ts` matching `src/types/index.ts`; no component change needed unless a new field is added.
- Verify both themes and mobile width after UI changes.
