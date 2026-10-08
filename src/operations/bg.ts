import type { Operation } from '../types/operations';

export const bg: Operation = {
  name: 'Remove background',
  command: 'bg',
  description: 'Remove the background of an image',
  flags: [
    {
      name: 'method',
      type: 'select',
      description: 'Background removal method',
      choices: [
        { title: 'u2net (default)', value: 'u2net' },
        { title: 'bria-rmbg (slow, high memory)', value: 'bria-rmbg' }
      ],
      default: 'u2net'
    },
    {
      name: 'bg-color',
      type: 'string',
      description: "Background color to place behind the cutout. Use 'transparent' to keep alpha",
      default: 'transparent'
    },
    {
      name: 'iterations',
      type: 'number',
      description: 'Maximum iterations for background removal',
      default: 100
    },
    {
      name: 'routines',
      type: 'number',
      description: 'Number of goroutines to use',
      default: 4
    }
  ]
};
