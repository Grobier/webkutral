import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const PUBLIC = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const TARGETS = [
  { dir: 'coaches', maxWidth: 960, quality: 82 },
  { dir: 'services', maxWidth: 1200, quality: 82, match: /-photo\.(png|jpe?g)$/i },
]

async function optimizeFile(filePath, { maxWidth, quality }) {
  const ext = extname(filePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null

  const outPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')
  if (outPath === filePath) return null

  const before = (await stat(filePath)).size
  await sharp(filePath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outPath)

  const after = (await stat(outPath)).size
  console.log(`${basename(filePath)} → ${basename(outPath)} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`)
  return { filePath, outPath, before, after }
}

for (const target of TARGETS) {
  const dirPath = join(PUBLIC, target.dir)
  const files = await readdir(dirPath)

  for (const file of files) {
    if (target.match && !target.match.test(file)) continue
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

    const result = await optimizeFile(join(dirPath, file), target)
    if (result && result.after < result.before * 0.9) {
      await unlink(result.filePath)
    }
  }
}

console.log('Done.')
