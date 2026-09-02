# Design tokens shared through a static Tailwind theme

Colours and radii live once, in `packages/theme`, as TypeScript that builds one CSS file holding a Tailwind `@theme` block of static values. The web app reads it through Tailwind; the phone app reads the same file through Uniwind, which compiles Tailwind classes to native styles. Static values are the whole trick: neither side needs CSS variables at runtime, so the same class names mean the same colours on both. Alternatives were NativeWind, Tamagui, or two hand-kept token files; Uniwind was chosen because it runs the real Tailwind v4 compiler and needs no runtime.

## Consequences

- Fonts are not in the shared file. Native wants one font file name, web wants a fallback stack, so each app sets `--font-*` itself.
- Anything in the theme file that is not a static value breaks the phone build silently. Keep it to hex and pixels.
