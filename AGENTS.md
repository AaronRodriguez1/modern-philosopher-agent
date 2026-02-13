# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages and layouts (`app/page.tsx`, `app/app/chat/page.tsx`, `app/login/page.tsx`).
- `components/`: reusable UI components (`components/Chat/*`, `components/auth/*`).
- `lib/`: shared client and domain helpers (`lib/convex/client.ts`, `lib/auth/workos.ts`, `lib/prompts/adlerian.ts`).
- `convex/`: backend schema and server functions (`convex/schema.ts`, `convex/functions/*.ts`).
- `scripts/`: local utility scripts (for exports and ops helpers).
- `tests/`: test placeholders (`tests/unit`, `tests/integration`).
- `.github/workflows/ci.yml`: CI pipeline (lint, typecheck, build).

## Build, Test, and Development Commands
- `npm ci`: install exact dependencies from `package-lock.json`.
- `npm run dev`: start Next.js local dev server.
- `npx convex dev`: run Convex dev backend and regenerate `convex/_generated/*`.
- `npm run lint`: run ESLint with `next/core-web-vitals`.
- `npm run typecheck`: run TypeScript checks without emitting files.
- `npm run build`: produce production build and catch integration issues early.

Run `npx convex dev` and `npm run dev` in separate terminals during local development.

## Coding Style & Naming Conventions
- Language: TypeScript for frontend and Convex functions.
- Indentation: 2 spaces; keep files ASCII unless a file already requires Unicode.
- Components: PascalCase (`ChatInput.tsx`); utilities/modules: lower camel or descriptive lowercase filenames (`client.ts`, `workos.ts`).
- Convex functions: keep function names verb-first (`sendMessage`, `getMessages`, `submitFeedback`).
- Linting: follow `.eslintrc.json` (`next/core-web-vitals`).

## Testing Guidelines
- Current status: no formal test framework is wired yet.
- Add unit tests under `tests/unit` and integration tests under `tests/integration`.
- Name tests by behavior, for example `chat-send-message.test.ts`.
- Minimum pre-PR checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## Commit & Pull Request Guidelines
- Commit style in current history is short, action-focused (`Adding ...`, `Updated ...`, `initial ...`).
- Prefer imperative, scoped messages going forward, e.g. `feat(chat): add Convex sendMessage mutation`.
- Keep commits logically grouped; avoid mixing unrelated refactors and features.
- PRs should include: purpose, key changes, verification steps, and screenshots for UI updates.

## Security & Configuration Tips
- Never commit secrets; keep local values in `.env.local`.
- Keep `.env.example` as the source of required variable names only.
- `aws/` is currently ignored in `.gitignore`; update ignore rules intentionally before committing AWS assets.
