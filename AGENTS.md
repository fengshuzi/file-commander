# AGENTS.md

## Repository Shape
- This is a single-package Obsidian plugin, not a monorepo; `main.ts` is the only TypeScript source included by `tsconfig.json`.
- Runtime entrypoint is `BatchFileManagerPlugin` in `main.ts`; it registers the `file-commander-view` view, the settings tab, and command id `open` (`打开批量文件管理器`).
- UI, modals, settings, and most feature logic are all in `main.ts`; CSS lives in `styles.css`, and release assets include `assets/wechat-donate.jpg`.
- Generated/bundled output goes to `dist/`; do not edit `dist/main.js` or other build artifacts by hand.

## Commands
- Install with `npm install`; `.npmrc` sets `legacy-peer-deps=true`, so do not remove it when dependency resolution looks odd.
- Dev/watch build: `npm run dev` (`node esbuild.config.mjs`, watches and writes `dist/main.js` with inline sourcemaps).
- Main verification: `npm run build` runs `npm run lint` first, then production bundles to `dist/` and copies `manifest.json`, optional `styles.css`, and `assets/wechat-donate.jpg`.
- Lint only: `npm run lint`; ESLint ignores JS/MJS/config files and enforces strict typed TypeScript rules on TS/TSX only.
- There is no `npm test` script. Focused sandbox checks are standalone: `node test_month_split.js`, `node test_journals_sandbox.js`, and `node test_mermaid_export.js`.

## Workflow Gotchas
- `npm run deploy` builds, copies `dist` files into the author's local Obsidian vault paths under iCloud, then deletes `dist`; avoid running it unless explicitly asked and those local paths are intended.
- `npm run release` builds, creates or replaces git tags/releases via `gh`, pushes tags, and uploads release assets; do not run it during routine verification.
- `test_journals_sandbox.js` creates and removes `test_journals_temp` in the repo; it is safe as a focused check for journal archive/restore parsing logic.
- `test_mermaid_export.js` expects a repo-local `mermaid.md`; if that file is absent, the script will fail for setup reasons rather than plugin build reasons.

## Versioning
- Keep `package.json`, `manifest.json`, and `versions.json` versions in sync when changing the plugin version.
- `manifest.json` currently declares `minAppVersion` `1.13.0` (declarative settings API requires 1.13.0); add a matching entry in `versions.json` for any new release version.

## Marketplace / Scorecard
Marketplace, manifest, and release conventions (author fields, description punctuation, `minAppVersion`, `versions.json`, Scorecard workflow) live in the parent `obsidian-plugins-parent/AGENTS.md`. Read it before touching `manifest.json`, release flow, or marketplace-facing code.
