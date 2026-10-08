import type { Operation } from '../types/operations';

export const resize: Operation = {
  name: 'Resize',
  command: 'resize',
  description: 'Resize an image while preserving its aspect ratio',
  flags: [
    {
      name: 'dimensions',
      type: 'string',
      description: 'Dimensions in format WIDTHxHEIGHT',
      example: '1920x1080',
      required: true
    },
    {
      name: 'method',
      type: 'select',
      description: 'Resampling method',
      choices: [
        { title: 'lanczos', value: 'lanczos' },
        { title: 'catmullrom', value: 'catmullrom' }
      ],
      default: 'lanczos'
    }
  ]
};
