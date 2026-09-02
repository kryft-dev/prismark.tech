// Renders every screen in prismark-dark.html to a PNG.
// Desktop frames go to desktop/, phones to mobile/, both at 2x.
// Run with: pnpm render   (or: pnpm --filter @prismark/design render)

import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { chromium } from 'playwright'

const here = dirname(fileURLToPath(import.meta.url))
const source = join(here, 'prismark-dark.html')
const out = { desk: join(here, 'desktop'), phone: join(here, 'mobile') }

const slug = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
})
await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

// Collect frames with the code and title the page already carries.
const frames = await page.evaluate(() => {
  const list = []
  document.querySelectorAll('section.screen').forEach((sec) => {
    const h = sec.querySelector('h2')
    const code = h.querySelector('.k').textContent.trim()
    const title = h.textContent.replace(code, '').trim()
    sec.querySelectorAll('.desk').forEach((el) => {
      el.dataset.shot = `desk:${code}:${title}`
      list.push({ kind: 'desk', code, title })
    })
    sec.querySelectorAll('.phone').forEach((el) => {
      const c = 'M' + el.id.replace(/\D/g, '').padStart(2, '0')
      el.dataset.shot = `phone:${c}:${el.dataset.title}`
      list.push({ kind: 'phone', code: c, title: el.dataset.title })
    })
  })
  return list
})

for (const dir of Object.values(out)) {
  await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })
}

const index = []
for (const f of frames) {
  const file = `${f.code}-${slug(f.title)}.png`
  const el = page.locator(`[data-shot="${f.kind}:${f.code}:${f.title}"]`)
  await el.scrollIntoViewIfNeeded()
  await el.screenshot({ path: join(out[f.kind], file), type: 'png' })
  index.push({ kind: f.kind === 'desk' ? 'desktop' : 'mobile', code: f.code, title: f.title, file })
  console.log(`${f.kind === 'desk' ? 'desktop' : 'mobile '} ${file}`)
}

await writeFile(join(here, 'screens.json'), JSON.stringify(index, null, 2) + '\n')
await browser.close()
console.log(`${index.length} screens rendered`)
