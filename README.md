# Prismark

Monorepo for Prismark, the app that runs the company: projects, tasks,
chat, clients, money, and a client portal.

```
apps/web          the app, TanStack Start on Cloudflare Workers
packages/design   the UX prototype and its rendered screens
packages/db       the database schema, markdown until Drizzle and D1 arrive
DESIGN.md         design rules every screen follows
```

## Commands

```sh
pnpm install
pnpm dev          # runs the app on the portless dev URL
pnpm build        # builds every package
pnpm typecheck
pnpm render       # renders the prototype screens to PNG
```

Deploys go through Cloudflare Workers Builds. The build root is `apps/web`
and the build command is `pnpm build`.
