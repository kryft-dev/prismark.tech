// Cuts a character out of a flat-background render. The image model cannot
// write transparency, so we take every pixel connected to the border that is
// close to the canvas colour (or to white, where the render has rounded
// corners) and make it transparent. What is left is split into connected
// pieces and only the largest is kept, which drops the anti-aliased slivers
// where the rounded corners met the frame. Soft edges get a one-pixel feather.
import sharp from 'sharp'

/**
 * @param {string} file
 * @param {{ size: number, pad?: number, dark?: number, light?: number }} options
 *   size: longest side of the output. dark/light: per-channel thresholds that
 *   count as background.
 */
export async function keyOut(file, { size, pad = 0.06, dark = 40, light = 250 }) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const isBackground = (i) => {
    const r = data[i * 3]
    const g = data[i * 3 + 1]
    const b = data[i * 3 + 2]
    return (r <= dark && g <= dark && b <= dark) || (r >= light && g >= light && b >= light)
  }

  // Flood fill: 1 marks a pixel as visited. `seed` starts a fill from one pixel
  // and returns how many pixels it reached; `accept` says which pixels it may
  // enter.
  const visited = new Uint8Array(width * height)
  const fill = (start, accept, onVisit) => {
    if (visited[start] || !accept(start)) return 0
    const stack = [start]
    visited[start] = 1
    let count = 0
    while (stack.length) {
      const i = stack.pop()
      count++
      onVisit?.(i)
      const x = i % width
      const y = (i - x) / width
      for (const j of [
        x > 0 && i - 1,
        x < width - 1 && i + 1,
        y > 0 && i - width,
        y < height - 1 && i + width,
      ]) {
        if (j === false || visited[j] || !accept(j)) continue
        visited[j] = 1
        stack.push(j)
      }
    }
    return count
  }

  // Everything reachable from the border through background-coloured pixels.
  for (let x = 0; x < width; x++) {
    fill(x, isBackground)
    fill((height - 1) * width + x, isBackground)
  }
  for (let y = 0; y < height; y++) {
    fill(y * width, isBackground)
    fill(y * width + width - 1, isBackground)
  }

  // Of what remains, keep the largest connected piece.
  const label = new Int32Array(width * height)
  const sizes = []
  for (let i = 0; i < label.length; i++) {
    if (visited[i]) continue
    const id = sizes.length + 1
    sizes.push(
      fill(
        i,
        () => true,
        (j) => (label[j] = id),
      ),
    )
  }
  const keep = sizes.indexOf(Math.max(...sizes)) + 1

  // Alpha, plus the tight box of the kept piece.
  const alpha = Buffer.alloc(width * height)
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let i = 0; i < label.length; i++) {
    if (label[i] !== keep) continue
    alpha[i] = 255
    const x = i % width
    const y = (i - x) / width
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }

  // sharp may hand the blurred mask back with more than one channel.
  const feathered = await sharp(alpha, { raw: { width, height, channels: 1 } })
    .blur(0.8)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const stride = feathered.info.channels
  const rgba = Buffer.alloc(width * height * 4)
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * 3]
    rgba[i * 4 + 1] = data[i * 3 + 1]
    rgba[i * 4 + 2] = data[i * 3 + 2]
    rgba[i * 4 + 3] = feathered.data[i * stride]
  }

  // Square crop around the character with a little air, then scale. Extend
  // first, in its own pass, because sharp runs extract before extend otherwise.
  const side = Math.round(Math.max(maxX - minX, maxY - minY) * (1 + pad * 2))
  const left = Math.round((minX + maxX) / 2 - side / 2)
  const top = Math.round((minY + maxY) / 2 - side / 2)
  const padLeft = Math.max(0, -left)
  const padTop = Math.max(0, -top)
  const extended = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extend({
      top: padTop,
      left: padLeft,
      bottom: Math.max(0, top + side - height),
      right: Math.max(0, left + side - width),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
  return sharp(extended)
    .extract({ left: left + padLeft, top: top + padTop, width: side, height: side })
    .resize(size, size)
    .png()
    .toBuffer()
}
