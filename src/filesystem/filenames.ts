import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';

export function generateSafeFilename(destDir: string, originalFilename: string, suffix: string, newExtension?: string): string {
  const parsed = parse(originalFilename);
  const ext = newExtension ? `.${newExtension.replace(/^\./, '')}` : parsed.ext;
  const baseName = parsed.name;
  
  let targetName = `${baseName}_${suffix}${ext}`;
  let targetPath = join(destDir, targetName);
  
  let counter = 1;
  while (existsSync(targetPath)) {
    targetName = `${baseName}_${suffix}_${counter}${ext}`;
    targetPath = join(destDir, targetName);
    counter++;
  }
  
  return targetPath;
}
