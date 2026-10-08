import type { Operation } from '../types/operations';
import { bg } from './bg';
import { compress } from './compress';
import { convert } from './convert';
import { effects } from './effects';
import { resize } from './resize';
import { upscale } from './upscale';

export const operations: Operation[] = [
  bg,
  compress,
  convert,
  effects,
  resize,
  upscale
];
