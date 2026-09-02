# Logo

The Prismark mark is the letter P, and the wordmark is the word Prismark, both set in
Caveat Brush (`fonts/`, SIL Open Font License). The font is vendored so the logo
never drifts when a package updates, and every output is path data, so nothing that
ships the logo needs the font.

The mascot is the prism in `mascot.jpeg`, an image-model render on a flat ground.
The build keys the ground out (`lib/key.mjs`), keeps the largest connected shape,
and writes a 1024px PNG with transparency for each app.

```
pnpm logo
```

`build.mjs` writes everything from that one source:

| Output                                         | What it is                                                   |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `apps/web/public/mark.svg`                     | the bare P in `#EDEDED`, for our own dark canvas             |
| `apps/web/public/favicon.svg`, `favicon.ico`   | the P on a rounded `#0A0A0A` tile, for browser tabs          |
| `apps/web/public/apple-touch-icon.png`         | 180px tile, square corners, iOS rounds it                    |
| `apps/web/public/icon-192.png`, `icon-512.png` | PWA icons, listed in `manifest.webmanifest`                  |
| `apps/web/public/icon-512-maskable.png`        | same, with the P inside the launcher safe zone               |
| `apps/web/public/wordmark.svg`                 | the word, tight viewBox                                      |
| `apps/web/public/og.png`                       | 1200×630 social image, wordmark centred                      |
| `apps/mobile/assets/images/icon.png`           | 1024px app icon, the tile with square corners                |
| `apps/mobile/assets/images/android-icon-*.png` | adaptive icon foreground and monochrome layers               |
| `apps/mobile/assets/images/splash-icon.png`    | the bare P, shown at 76dp over `#0A0A0A`                     |
| `apps/mobile/assets/expo.icon/`                | iOS 26 Icon Composer bundle: solid fill plus the P layer     |
| `apps/web/src/components/mark.tsx`             | `<Mark />`, inline SVG, takes `className`, uses currentColor |
| `apps/mobile/src/components/mark.tsx`          | `<Mark size color />` on react-native-svg                    |

Three fill ratios in `build.mjs` decide how big the P is: bare (on our canvas), tile
(on a tile we paint), masked (inside a launcher mask). Change them there, run the
script, commit the outputs.

The Icon Composer bundle has not been opened in Xcode yet. If Xcode rejects
`icon.json`, fix the JSON in `build.mjs`, not in the bundle.
