# colourfully.digital

Astro + Sanity starter skeleton for the colourfully.digital project.

Scripts:

```
npm run dev
npm run build
npm run typecheck
```
# Colourfully Digital — Website & Blog

Brief: The Colourfully Digital Foundation website and blog. This repository contains the source and specs for an Astro + TypeScript front-end with Sanity.io as the content CMS. The site focuses on accessible, performant, and internationalized content publishing.

## Project overview
- Front-end: Astro (recommended v5+) with TypeScript
- CMS: Sanity.io (Studio + structured content schemas)
- Testing: Vitest (unit), Playwright (E2E), contract and integration tests described in `specs/001-astro-sanity-setup/`
- Deployment targets: Static sites (Netlify, Vercel) or static export + serverless endpoints

This repository currently contains design docs and specs under `specs/001-astro-sanity-setup/` and project scaffolding tasks. Follow the Quickstart to scaffold the working project if artifacts are not yet present.

## Supported environment (recommended)
- macOS 15.6+
- Node.js `v22.15.1` (use `nvm`, `fnm`, or `Volta` to pin per-developer)
- VS Code `1.104.0` (recommended editor)

Recommended package manager: `pnpm` (fast, deterministic). You can use `npm` or `yarn` if preferred, but the team should agree and commit the chosen lockfile.

## Files of interest
- `specs/001-astro-sanity-setup/` — design documents and task list for the Astro + Sanity feature
- `.gitignore` — repo ignore rules (includes macOS, Node, Astro, Sanity exclusions)
- `sanity/` — (expected) Sanity Studio folder and `sanity.config.*` (not committed yet if studio is remote)
- `src/` — (expected) Astro app source (pages, components, styles)
- `tests/` — (expected) contract, integration, and unit tests

## Quickstart — scaffold locally
If the project files (Astro project, `package.json`, `src/`) are not present yet, run the commands below from the repo root to create a minimal Astro + TypeScript scaffold and install core dependencies.

1) Ensure Node is set to the recommended version:

```bash
# using nvm
nvm install 22.15.1
nvm use 22.15.1
```

2) Create an Astro project (interactive) and choose TypeScript:

```bash
cd /Users/davidelisma/Repos/Colourfully.Digital/colourfully.digital
npm create astro@latest
# follow prompts -> select "Framework: None" (or preferred UI library) and "TypeScript"
```

3) Install core dev tooling (example with pnpm):

```bash
pnpm install --save-dev typescript vitest @types/node prettier eslint
pnpm install astro
```

4) Add useful scripts to `package.json` (example):

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "test": "vitest",
  "lint": "eslint . --ext .ts,.js,.astro"
}
```

5) Optional: scaffold a Sanity Studio inside `studio/` (recommended to keep the CMS project separate from the public site):

```bash
# install Sanity CLI globally or via npx
npx sanity init --project <project-id> --dataset production --output-path studio
cd studio
pnpm install
```

Note: Keep `sanity.config.*` and schema files in source control; ignore Studio local data (.sanity/) and exports (these are already in `.gitignore`).

## Developer settings and recommended VS Code extensions
- Recommended extensions (install or add to `.vscode/extensions.json`):
  - `esbenp.prettier-vscode` (Prettier)
  - `dbaeumer.vscode-eslint` (ESLint)
  - `csstools.postcss` or appropriate CSS support
  - `jackocnr.refactorix` or other AST helpers (optional)
  - `astro-build.astro-vscode` (Astro language support)

- Recommended `.vscode/settings.json` (examples):
  - `editor.formatOnSave`: true
  - `files.exclude`: hide `.sanity`, `.output`, `node_modules`

If you want the repository to include editor settings, add curated files to `.vscode/` (for example, `settings.json` and `extensions.json`). The repository `.gitignore` currently ignores whole `.vscode/`; if you want to track specific files, update `.gitignore` to un-ignore them (example is in the repo guidance).

## Testing
- Follow the project's TDD rule: contract and integration tests in `specs/001-astro-sanity-setup/` must be authored and failing before implementation begins.
- Unit tests: `vitest`
- E2E: `Playwright` or `@playwright/test` for critical journeys

Commands (after dependencies installed):
```bash
pnpm dev    # run local dev server
pnpm build  # build production static pages
pnpm test   # run unit tests (vitest)
```

## Sanity notes
- Store Sanity schema files in `sanity/schemas/` and export a `sanity/schemas/index.ts` that registers them.
- Keep CMS configs like `sanity.json` or `sanity.config.ts` checked in; ignore `.sanity/` and exports (this is configured in `.gitignore`).
- Prefer to run Sanity Studio locally for content work: `cd studio && pnpm dev` (or `sanity start`).

## Branching, commits, and lockfile policy
- Branching: feature branches named like `feature/NNN-short-description` (this repo uses `feature/001-astro-sanity-setup`).
- Commits: small, focused; reference task IDs (e.g., `T001: create astro project skeleton`).
- Lockfile policy: pick one lockfile to commit (recommended: `pnpm-lock.yaml` if you use `pnpm`). If you adopt `pnpm`, remove `pnpm-lock.yaml` from `.gitignore` and commit it.

## Contributing
- Open issues and PRs for large changes.
- Follow the spec in `specs/001-astro-sanity-setup/tasks.md` for task numbering and TDD rules.

## Where to go next
- If you don’t yet have the Astro project scaffolded, run the Quickstart steps above to create `package.json` and `src/`.
- Implement T001 from `specs/001-astro-sanity-setup/tasks.md` (create Astro project and install core deps). The spec and tasks list will be used to drive subsequent implementation.

---
If you want, I can scaffold a minimal Astro + TypeScript project in this repo now and add a small `studio/` Sanity scaffold — tell me if you want me to proceed and which package manager to use (`pnpm`, `npm`, or `yarn`).
