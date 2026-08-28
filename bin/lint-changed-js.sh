#!/usr/bin/env bash
#
# Lint only the JavaScript changed against main, mirroring composer phpcs:changed.
#
# Whole-tree linting is disabled: @wordpress/scripts v34 ships ESLint 9, which
# reads flat config only and ignores the legacy .eslintrc/.eslintignore, so an
# unscoped scan lints the minified assets/dist bundles and crashes the stylish
# formatter. Passing an explicit file list avoids that until the flat-config
# migration lands.
#
# Any extra arguments are forwarded to wp-scripts lint-js (CI passes
# --output-file / --format json to produce the report it annotates).
set -euo pipefail

changed=$(git diff --name-only --diff-filter=ACMRTUXB "$(git merge-base HEAD main)" | grep -E '\.jsx?$' || true)

if [ -z "$changed" ]; then
	echo "lint:js: no changed JS"
	exit 0
fi

exec wp-scripts lint-js "$@" $changed
