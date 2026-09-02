# Prismark

Monorepo for Prismark, the app that runs the company: projects, tasks,
chat, clients, money, and a client portal.

```
apps/web          the web app, TanStack Start on Cloudflare Workers
apps/mobile       the phone app, Expo, iOS and Android only
packages/design   the UX prototype and its rendered screens
packages/db       the database schema, markdown until Drizzle and D1 arrive
packages/config   baseline configs every package extends, oxlint today
DESIGN.md         design rules every screen follows
```

## Commands

```sh
pnpm install
pnpm dev          # runs the web app on the portless dev URL and starts Metro for mobile
pnpm --filter @prismark/mobile ios      # mobile only, straight into the iOS simulator
pnpm --filter @prismark/mobile android  # mobile only, Android emulator
pnpm build        # builds every package
pnpm typecheck
pnpm lint         # oxlint per package, type aware
pnpm lint:fix
pnpm fmt          # oxfmt, whole repo
pnpm fmt:check
pnpm check        # typecheck, lint, and fmt:check together, what CI runs
pnpm render       # renders the prototype screens to PNG
```

The web app deploys through Cloudflare Workers Builds. The build root is `apps/web`
and the build command is `pnpm build`.

The mobile app has no web target. Builds for the stores go through EAS,
which is not set up yet.

CI runs `pnpm check` and `pnpm build` on every push to main and every
pull request. Lint config lives in `packages/config` and each package's
`.oxlintrc.json`. Format config is `.oxfmtrc.jsonc` at the root. The Oxc
VS Code extension picks both up; the root `.vscode` settings turn on fix
and format on save.
