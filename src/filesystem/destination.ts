import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function ensureDestination(cwd: string, dest: string): Promise<string> {
  const fullPath = resolve(cwd, dest);
  await mkdir(fullPath, { recursive: true });
  return fullPath;
}
