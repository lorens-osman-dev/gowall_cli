import type { Operation } from '../types/operations';

export const compress: Operation = {
  name: 'Compress',
  command: 'compress',
  description: 'Compress an image',
  flags: [
    {
      name: 'quality',
      type: 'number',
      description: 'Quality to use for compression (1-100)',
      default: 80
    },
    {
      name: 'speed',
      type: 'number',
      description: 'Speed to use for compression (0-10)',
      default: 4
    }
  ]
};
