import type { Operation } from '../types/operations';

export const convert: Operation = {
  name: 'Convert',
  command: 'convert',
  description: "Convert an image's color scheme or format",
  flags: [
    {
      name: 'format',
      type: 'select',
      description: 'Format to convert to',
      choices: [
        { title: 'Skip / No format change', value: '' },
        { title: 'png', value: 'png' },
        { title: 'webp', value: 'webp' },
        { title: 'jpg', value: 'jpg' },
        { title: 'jpeg', value: 'jpeg' }
      ],
      default: ''
    },
    {
      name: 'theme',
      type: 'string',
      description: 'Theme name or path to JSON file containing theme (e.g. catppuccin-mocha)',
      example: 'catppuccin-mocha',
      default: ''
    }
  ]
};
