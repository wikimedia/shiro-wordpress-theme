#!/usr/bin/env bash
#
# Lint only the JavaScript changed against the base branch, mirroring
# composer phpcs:changed.
#
# The tree still carries pre-existing lint debt, so an unscoped scan fails on
# code this change never touched. Passing an explicit changed-file list keeps
# each PR responsible only for what it edits.
#
# Any extra arguments are forwarded to wp-scripts lint-js (CI passes
# --output-file / --format json to produce the report it annotates).
set -euo pipefail

# Resolve the base to diff against. CI passes the PR base commit as BASE_SHA;
# locally, fall back to origin/main, then a local main branch.
if [ -n "${BASE_SHA:-}" ]; then
	base_ref="$BASE_SHA"
else
	base_ref="origin/main"
	git rev-parse --verify --quiet "$base_ref" >/dev/null || base_ref="main"
fi

merge_base=$(git merge-base HEAD "$base_ref" 2>/dev/null || echo "$base_ref")
changed=$(git diff --name-only --diff-filter=ACMRTUXB "$merge_base" | grep -E '\.jsx?$' || true)

if [ -z "$changed" ]; then
	echo "lint:js: no changed JS"
	exit 0
fi

exec wp-scripts lint-js "$@" $changed
