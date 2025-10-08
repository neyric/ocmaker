# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds the React Router app: `routes/` for route modules, `features/` for domain flows, `components/` for shared UI, `store/` for Zustand state, and `drizzle/` for schema plus migrations.
- `workers/app.ts` is the Cloudflare Worker entry configured by `wrangler.jsonc`.
- `public/` exposes static assets, while `types/`, `lib/`, and `data/` provide shared types, utilities, and seed content.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies; always use pnpm to stay aligned with `pnpm-lock.yaml`.
- `pnpm dev` runs the React Router + Vite dev server.
- `pnpm build` creates the production bundle consumed by Cloudflare Workers.
- `pnpm preview` serves the latest build locally for smoke checks.
- `pnpm typecheck` performs incremental TypeScript project builds.
- `pnpm check` runs Biome formatting and linting.
- `pnpm db:generate` regenerates D1 migrations from the Drizzle schema; commit generated files.
- `pnpm db:migrate` applies migrations against the local D1 instance (`db:migrate:prod` targets remote).

## Coding Style & Naming Conventions
- Biome enforces 2-space indentation, LF endings, and double quotes; run `pnpm check` before committing.
- Use TypeScript modules with named exports; keep React components in PascalCase and hooks/utilities in camelCase.
- Route modules live under `app/routes/**`; co-locate supporting assets (styles, loaders, actions) with the route file.
- Prefer functional components and hooks, and avoid default exports except when required by React Router conventions.

## Testing Guidelines
- Vitest-style globals (`vi`, `describe`, `expect`) are preconfigured via Biome; place specs beside source as `*.test.ts(x)`.
- Cover critical flows in `app/features/**` and API handlers in `app/api/**`, mocking external services (`openai`, `replicate`, etc.).
- Surface new test commands through `package.json` (e.g., add `pnpm test`) and ensure they run in CI when introduced.

## Commit & Pull Request Guidelines
- Follow the existing history: imperative, descriptive subjects (e.g., `Refactor landing page components`) with optional detail in the body.
- Commit only cohesive changes and verify `pnpm typecheck` + `pnpm check` before pushing.
- PRs should explain intent, list manual/automated test evidence, link issues, and include UI screenshots or schema notes when relevant.

## Cloudflare & Data Notes
- Secrets for D1, KV, and R2 come from Wrangler bindings; use `.dev.vars` locally and never commit credentials.
- Update the credentials consumed by `app/drizzle/config.ts` before running migrations, and keep `wrangler.jsonc` in sync with deployed resources.
