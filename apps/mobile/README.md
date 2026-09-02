# @prismark/mobile

The phone app. Expo with expo-router, iOS and Android only. There is no web target here; the web app is `apps/web`.

```
pnpm --filter @prismark/mobile dev        start Metro, then pick a simulator or scan the QR code
pnpm --filter @prismark/mobile ios        start straight into the iOS simulator
pnpm --filter @prismark/mobile android    start straight into an Android emulator
pnpm typecheck                            runs here too, through turbo
```

Screens live in `src/app`, one file per route. Everything else goes under `src`. The screens to build are the M01 to M20 phone frames in `packages/design`.
