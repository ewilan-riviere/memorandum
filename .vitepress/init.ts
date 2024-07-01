import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Parse nested files in a directory.
 */
export async function parseFiles(directory: string, extensions: string[] = ['.md']) {
  const root = path.resolve(__dirname)
  const directoryPath = path.join(__dirname, directory)
  const items = await fs.readdir(directoryPath, { recursive: true })

  const files: string[] = []

  for (const item of items) {
    const filePath = path.join(directoryPath, item)
    const stats = await fs.stat(filePath)

    if (stats.isFile() && extensions.includes(path.extname(filePath))) {
      const name = filePath.replace(root, '')
      files.push(name)
    }
  }

  return files
}
