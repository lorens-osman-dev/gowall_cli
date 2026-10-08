import { readdir } from 'node:fs/promises';
import { extname } from 'node:path';

export async function getSupportedImages(dir: string): Promise<string[]> {
  const files = await readdir(dir, { withFileTypes: true });
  
  const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
  
  return files
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
    .filter(name => {
      const ext = extname(name).toLowerCase();
      return supportedExtensions.has(ext);
    });
}
