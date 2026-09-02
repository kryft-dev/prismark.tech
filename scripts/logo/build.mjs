// Builds every logo asset for the web app and the mobile app from one source:
// the letter P and the word Prismark set in Caveat Brush (fonts/, SIL OFL).
// Run from the repo root: pnpm logo
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

import { ico } from './lib/ico.mjs'
import { keyOut } from './lib/key.mjs'
import { fitInSquare, loadFont, round, setText } from './lib/type.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const web = path.join(root, 'apps/web/public')
const mobile = path.join(root, 'apps/mobile/assets')

// DESIGN.md: bg is the app canvas, t1 is primary text.
const BG = '#0A0A0A'
const INK = '#EDEDED'

// How much of a square the P takes up. Bare: the mark on our own dark canvas.
// Tile: the mark on a dark tile, for surfaces we do not paint (browser tabs,
// home screens). Masked: inside a launcher mask, so it stays clear of the edge.
const FILL = { bare: 0.75, tile: 0.52, masked: 0.36 }
// Corner radius of the tile as a fraction of its side. 10px on the 40px tile.
const TILE_RADIUS = 0.25

const font = await loadFont(path.join(here, 'fonts/CaveatBrush-Regular.ttf'))
const P = setText(font, 'P', 100)
const word = setText(font, 'Prismark', 100)

const svg = (size, body, attrs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"${attrs}>${body}</svg>\n`
const bare = (size, fill = FILL.bare) => `<g fill="${INK}">${fitInSquare(P, size, fill)}</g>`
const tile = (size, radius = TILE_RADIUS) =>
  `<rect width="${size}" height="${size}" rx="${round(size * radius)}" fill="${BG}"/>${bare(size, FILL.tile)}`
const png = (markup) => sharp(Buffer.from(markup)).png().toBuffer()

const write = async (file, data) => {
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, data)
  console.log(path.relative(root, file))
}

// Web: favicon, touch icon, PWA icons, social image, the wordmark, a manifest.
await write(path.join(web, 'mark.svg'), svg(64, bare(64)))
await write(path.join(web, 'favicon.svg'), svg(64, tile(64)))
await write(
  path.join(web, 'favicon.ico'),
  ico(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({ size, png: await png(svg(size, tile(size))) })),
    ),
  ),
)
await write(path.join(web, 'apple-touch-icon.png'), await png(svg(180, tile(180, 0))))
await write(path.join(web, 'icon-192.png'), await png(svg(192, tile(192, 0))))
await write(path.join(web, 'icon-512.png'), await png(svg(512, tile(512, 0))))
await write(
  path.join(web, 'icon-512-maskable.png'),
  await png(svg(512, `<rect width="512" height="512" fill="${BG}"/>${bare(512, FILL.masked)}`)),
)

const pad = 4
const wordBox = {
  x: round(word.box.x - pad),
  y: round(word.box.y - pad),
  width: round(word.box.width + pad * 2),
  height: round(word.box.height + pad * 2),
}
await write(
  path.join(web, 'wordmark.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordBox.x} ${wordBox.y} ${wordBox.width} ${wordBox.height}" fill="${INK}"><path d="${word.d}"/></svg>\n`,
)

const og = { width: 1200, height: 630 }
const ogScale = 640 / word.box.width
await write(
  path.join(web, 'og.png'),
  await png(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${og.width} ${og.height}" width="${og.width}" height="${og.height}">` +
      `<rect width="${og.width}" height="${og.height}" fill="${BG}"/>` +
      `<path fill="${INK}" transform="translate(${round(og.width / 2 - (word.box.x + word.box.width / 2) * ogScale)} ${round(og.height / 2 - (word.box.y + word.box.height / 2) * ogScale)}) scale(${round(ogScale)})" d="${word.d}"/>` +
      `</svg>`,
  ),
)

await write(
  path.join(web, 'manifest.webmanifest'),
  JSON.stringify(
    {
      name: 'Prismark',
      short_name: 'Prismark',
      start_url: '/',
      display: 'standalone',
      background_color: BG,
      theme_color: BG,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
)

// Mobile: app icon, Android adaptive layers, splash, iOS 26 Icon Composer bundle.
const images = path.join(mobile, 'images')
await write(path.join(images, 'icon.png'), await png(svg(1024, tile(1024, 0))))
await write(
  path.join(images, 'android-icon-foreground.png'),
  await png(svg(512, bare(512, FILL.masked))),
)
await write(
  path.join(images, 'android-icon-monochrome.png'),
  await png(svg(512, bare(512, FILL.masked))),
)

const composer = path.join(mobile, 'expo.icon')
await rm(composer, { recursive: true, force: true })
await write(path.join(composer, 'Assets/mark.svg'), svg(1024, bare(1024, FILL.tile)))
const srgb = (hex) =>
  'extended-srgb:' +
  [1, 3, 5]
    .map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(5))
    .concat('1.00000')
    .join(',')
await write(
  path.join(composer, 'icon.json'),
  JSON.stringify(
    {
      fill: { solid: srgb(BG) },
      groups: [
        {
          layers: [{ 'image-name': 'mark.svg', name: 'mark' }],
          shadow: { kind: 'neutral', opacity: 0 },
          translucency: { enabled: false, value: 0 },
        },
      ],
      'supported-platforms': { circles: ['watchOS'], squares: 'shared' },
    },
    null,
    2,
  ) + '\n',
)

// Mascot: the prism, keyed out of its flat render so it sits on any surface.
const mascot = await keyOut(path.join(here, 'mascot.jpeg'), { size: 1024 })
await write(path.join(web, 'mascot.png'), mascot)
await write(path.join(images, 'mascot.png'), mascot)
// The splash shows the mascot. Android 12+ masks the splash image into a
// circle, so this copy keeps the character inside the middle two thirds.
await write(
  path.join(images, 'splash-icon.png'),
  await keyOut(path.join(here, 'mascot.jpeg'), { size: 1024, pad: 0.25 }),
)

// Components: the bare mark as inline SVG for each app, so it can take a size
// and a colour like any icon.
const markPath = fitInSquare(P, 64, FILL.bare).match(/transform="([^"]+)" d="([^"]+)"/)
const [, markTransform, markD] = markPath
const generated = '// Generated by scripts/logo/build.mjs. Edit the script, not this file.'
await write(
  path.join(root, 'apps/web/src/components/mark.tsx'),
  `${generated}
import type { SVGProps } from 'react'

export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path
        transform="${markTransform}"
        d="${markD}"
      />
    </svg>
  )
}
`,
)
await write(
  path.join(root, 'apps/mobile/src/components/mark.tsx'),
  `${generated}
import { palette } from '@prismark/theme'
import Svg, { Path } from 'react-native-svg'

export function Mark({ size = 40, color = palette.text }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path
        fill={color}
        transform="${markTransform}"
        d="${markD}"
      />
    </Svg>
  )
}
`,
)
