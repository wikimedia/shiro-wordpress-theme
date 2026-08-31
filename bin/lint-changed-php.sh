#!/usr/bin/env bash
#
# Run phpcs only on the PHP changed against the base branch, mirroring
# lint-changed-js.sh.
#
# phpcs with no file arguments scans the whole tree, which is slow and
# exhausts memory on this ruleset, so skip cleanly when nothing PHP changed.
# This runs locally (composer phpcs:changed, via the pre-push hook); CI has its
# own guarded changed-file logic in .github/workflows/php.yml.
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
changed=$(git diff --name-only --diff-filter=ACMRTUXB "$merge_base" | grep -E '\.php$' || true)

if [ -z "$changed" ]; then
	echo "phpcs:changed: no changed PHP"
	exit 0
fi

exec phpcs $changed
