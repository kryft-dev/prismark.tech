// Sets text from a font file as SVG path data, so nothing that ships the logo
// depends on the font being installed.
import { readFile } from 'node:fs/promises'

import * as fontkit from 'fontkit'

/** @param {string} file */
export async function loadFont(file) {
  return fontkit.create(await readFile(file))
}

/**
 * Lay out text with its cap height scaled to `capHeight`, baseline at y=0.
 * Returns the path data and the tight bounding box of the ink.
 * @param {import('fontkit').Font} font
 * @param {string} text
 * @param {number} capHeight
 */
export function setText(font, text, capHeight) {
  const run = font.layout(text)
  const scale = capHeight / font.capHeight
  let cursor = 0
  const parts = []
  run.glyphs.forEach((glyph, index) => {
    const position = run.positions[index]
    parts.push(
      glyph.path
        .translate(position.xOffset, position.yOffset)
        .scale(scale, -scale)
        .translate(cursor, 0)
        .toSVG(),
    )
    cursor += position.xAdvance * scale
  })
  const box = run.bbox
  return {
    d: parts.join(''),
    advance: cursor,
    // y grows downwards here, so the font's maxY is our top.
    box: {
      x: box.minX * scale,
      y: -box.maxY * scale,
      width: box.width * scale,
      height: box.height * scale,
    },
  }
}

/**
 * A path plus the translate/scale that fits its box into a square, centred.
 * @param {{ d: string, box: { x: number, y: number, width: number, height: number } }} shape
 * @param {number} size  side of the square the shape sits in
 * @param {number} fill  fraction of `size` the longer side of the shape takes
 */
export function fitInSquare(shape, size, fill) {
  const scale = (size * fill) / Math.max(shape.box.width, shape.box.height)
  const x = size / 2 - (shape.box.x + shape.box.width / 2) * scale
  const y = size / 2 - (shape.box.y + shape.box.height / 2) * scale
  return `<path transform="translate(${round(x)} ${round(y)}) scale(${round(scale)})" d="${shape.d}"/>`
}

export const round = (n) => Math.round(n * 1000) / 1000
