# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`).
- `src/components`: UI building blocks (`ui/`, `views/`, `layouts/`, `providers/`, etc.).
- `src/hooks`, `src/utils`, `src/constants`, `src/types`, `src/data`, `src/styles`.
- Tests: unit/integration in `src/tests`, E2E in `tests/e2e/` (Playwright).
- Public assets in `public/`. Scripts and configs in repo root.
- TS path alias: import with `@/…` (see `tsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Production build.
- `npm run start`: Serve the built app.
- `npm run lint`: ESLint for TS/JS + Stylelint for CSS.
- `npm run format`: Apply Prettier to the repo.
- `npm run test`: Run Vitest (unit/component, JSDOM).
- `npm run test:a11y`: Run accessibility tests (vitest-axe).
- `npm run test:e2e`: Run Playwright E2E tests.
- `npm run ci`: Lint + unit + E2E (used locally before PRs).
- `npm run analyze`: Build with bundle analyzer.

## Coding Style & Naming Conventions
- Formatting: Prettier (2 spaces, semicolons, double quotes, trailing commas).
- Linting: ESLint (`next/core-web-vitals`, TS) and Stylelint (no `!important`).
- TypeScript: `strict` enabled; prefer explicit types over `any`.
- Components: PascalCase files in `src/components` (e.g., `MessageCard.tsx`).
- Hooks: `useX` in `src/hooks` (e.g., `useFoo.ts`).
- Tests: `*.test.tsx` near code or in `src/tests/`.
- Imports: use `@/…` alias (e.g., `import { Foo } from "@/components/ui/Foo"`).
- CSS: Global in `src/app/globals.css`; see `CSS_GUIDE.md` and `CSS_ARCHITECTURE.md`.

## Testing Guidelines
- Unit/Component: Vitest + Testing Library; JSDOM via `vitest.setup.ts`.
- Accessibility: Use `vitest-axe` matchers; keep `violations` empty.
- E2E: Playwright specs in `tests/e2e/`; relies on local server.
- Name tests descriptively; assert behavior and a11y. Example: `src/tests/messageCard.test.tsx`.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise, and scoped (e.g., `ui: add MessageCard hover state`).
- Branches: `feat/…`, `fix/…`, `chore/…` preferred.
- PRs: Clear description, linked issues, before/after screenshots for UI, and checklist that `npm run ci` passes.
- Include tests for new behavior and update docs when relevant.
