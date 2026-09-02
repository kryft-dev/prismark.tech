# @prismark/web

The web app. TanStack Start on Cloudflare Workers, Tailwind 4, shadcn on Base UI, dark only.

```
pnpm --filter @prismark/web dev       portless dev URL
pnpm --filter @prismark/web dev:app   plain vite dev
pnpm --filter @prismark/web deploy    build and wrangler deploy
```

Routes live in `src/routes`, one file per route, and the route tree is generated. UI primitives are in `src/components/ui` and come from shadcn; re-add with `pnpm dlx shadcn@latest add --all --overwrite`, then `pnpm fmt` from the root and `scripts/commit-ui-components.sh`.

The screens to build are the D01 to D30 desktop frames in `packages/design`.
