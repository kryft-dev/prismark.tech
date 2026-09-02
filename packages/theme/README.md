# @prismark/theme

One source for design tokens. `src/tokens.ts` holds the DESIGN.md palette, the semantic names shadcn components expect, and the radii. `pnpm build` emits `dist/theme.css`, a Tailwind 4 `@theme` block with static values only.

Both apps import that file:

- web, in `src/styles.css`, next to the shadcn base
- mobile, in `global.css`, through Uniwind

So `bg-background`, `text-foreground-2`, `border-line`, `rounded-lg` mean the same thing on both. Fonts are the one thing not shared: only the web app sets `--font-sans` and `--font-mono`, in `src/styles.css`. The phone app uses the system font (ADR 0009).

Change a colour in `src/tokens.ts`, run `pnpm build`, both apps pick it up. Turbo builds this package before either app, and the web build script also runs it itself so a bare `pnpm run build` in `apps/web` (what Cloudflare Workers Builds executes) works without turbo.
