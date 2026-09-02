# @prismark/theme

One source for design tokens. `src/tokens.ts` holds the DESIGN.md palette, the semantic names shadcn components expect, and the radii. `pnpm build` emits `dist/theme.css`, a Tailwind 4 `@theme` block with static values only.

Both apps import that file:

- web, in `src/styles.css`, next to the shadcn base
- mobile, in `global.css`, through Uniwind

So `bg-background`, `text-foreground-2`, `border-line`, `rounded-lg` mean the same thing on both. Fonts are the one thing not shared: native needs a single font file name, web needs a fallback stack, so each app sets `--font-sans` itself.

Change a colour in `src/tokens.ts`, run `pnpm build`, both apps pick it up. Turbo builds this package before either app.
