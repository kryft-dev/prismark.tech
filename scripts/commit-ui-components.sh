#!/usr/bin/env bash
# Commit every shadcn component under apps/web/src/components/ui as its own commit.
# Shared changes (dependencies, lockfile, hooks) go in one commit first so each
# component commit builds on its own. Safe to re-run: files with no changes are skipped.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

trailer="Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01RbAitbPRiujVwFf7oSh52u"

ui=apps/web/src/components/ui

git add apps/web/package.json pnpm-lock.yaml apps/web/src/hooks 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -q -m "chore(web): add dependencies and hooks for shadcn components

$trailer"
  echo "committed: dependencies and hooks"
fi

for file in "$ui"/*.tsx; do
  name=$(basename "$file" .tsx)
  git add "$file"
  if git diff --cached --quiet; then
    continue
  fi
  git commit -q -m "feat(ui): add $name

$trailer"
  echo "committed: $name"
done
