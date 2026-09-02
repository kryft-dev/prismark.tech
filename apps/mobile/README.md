# @prismark/mobile

The phone app. Expo with expo-router, iOS and Android only. There is no web target here; the web app is `apps/web`.

```
pnpm --filter @prismark/mobile dev        start Metro, then pick a simulator or scan the QR code
pnpm --filter @prismark/mobile ios        start straight into the iOS simulator
pnpm --filter @prismark/mobile android    start straight into an Android emulator
pnpm typecheck                            runs here too, through turbo
pnpm --filter @prismark/mobile routes     regenerate the typed routes without starting Metro
```

`typecheck` runs `routes` first. It is `expo customize tsconfig.json`, which
writes `.expo/types/router.d.ts` and `expo-env.d.ts` the same way the dev
server does, so a fresh clone and CI typecheck without ever starting Metro.

There are no custom fonts. Screens render in the system font, and no `Text`
carries a `font-sans` or `font-mono` class (ADR 0009).

Screens live in `src/app`, one file per route. Everything else goes under `src`. The screens to build are the M01 to M20 phone frames in `packages/design`.
