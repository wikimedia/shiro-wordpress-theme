# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Toolchain

The pinned toolchain lives in `devbox.json`: PHP 8.4, Composer, and Node 22. Prefix commands with `devbox run --` when a tool isn't on your PATH (`devbox run -- composer install`).

## Commands

- `npm run build` — build editor and front-end assets into `assets/dist` (git-ignored; built in CI).
- `npm start` — webpack watch with hot reload. WordPress needs `SCRIPT_DEBUG` enabled to load from the dev server (see README).
- `npm run lint` — runs `lint:js` (`wp-scripts lint-js`) and `lint:php` in parallel.
- `composer phpcs` — phpcs over the whole tree. `composer phpcs:changed` lints only PHP files changed against `main` (what CI and `npm run lint:php` run). `phpcbf` / `phpcbf:changed` auto-fix.
- `npm run make-shiro-pot` — regenerate translation templates after changing translatable strings.

There is no PHP or JS unit test suite; `npm test` is a stub.

## Architecture

Classic WordPress theme built with `@wordpress/scripts` (webpack) plus a custom `webpack.config.js`. The build reads from `assets/src/editor` and writes to `assets/dist`.

**`functions.php` is a manual require manifest.** Every file under `inc/` is loaded by an explicit `require` line in `functions.php` — there is no autoloader or directory glob. When you add a file under `inc/`, add its `require` line, or it never loads.

**Editor blocks are split across two trees:**
- `inc/editor/blocks/*.php` — server-side registration (one `require` per block in `functions.php`).
- `assets/src/editor/blocks/*` — the block's JS/edit source, compiled by webpack.

A new block needs both halves plus the `require` line.

**Global naming.** `phpcs.xml` enforces `WordPress.NamingConventions.PrefixAllGlobals`: every global function, class, hook, and constant must be prefixed `wmf` or `shiro`. Text domains are `shiro` and `shiro-admin`.

## Branches and deploy

| Branch | Purpose | Built code |
| --- | --- | --- |
| `main` | Base and target for feature PRs | No |
| `release` | Production build, rebuilt automatically when `main` changes | Yes |
| `develop` | Test branch | No |
| `release-develop` | Test build, rebuilt automatically when `develop` changes | Yes |

`main` and `develop` are built and pushed to `release` / `release-develop` by the `humanmade/hm-github-actions` `build-and-release-node.yml` reusable workflow. Never commit to or PR against the `release*` branches.

To promote a feature PR to the test environment, add the **Push to Development** label. The `push-to-environment.yml` workflow opens a sync PR into `develop` via `humanmade/sync-branches`; merging it rebuilds `release-develop` and marks the original PR **On Development**.

## Gotchas

- **`.devbox/` pollutes `composer phpcs`.** The bare `phpcs .` scan descends into the git-ignored `.devbox/` Nix profile and reports thousands of false violations. Use `composer phpcs:changed`, or export a clean tree (`git archive`) when you need a full scan.
- **The pre-push hook runs Composer**, which isn't on the plain PATH outside devbox, so `git push` can fail locally. When your changes touch no PHP, `git push --no-verify` is safe.
