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
      type: 'select',
      description: 'Theme name or path to JSON file containing theme',
      choices: [
        { title: 'All', value: '__ALL__' },
        { title: 'Skip / No theme', value: '' },
        { title: 'catppuccin', value: 'catppuccin' },
        { title: 'nord', value: 'nord' },
        { title: 'everforest', value: 'everforest' },
        { title: 'solarized', value: 'solarized' },
        { title: 'gruvbox', value: 'gruvbox' },
        { title: 'dracula', value: 'dracula' },
        { title: 'tokyo-moon', value: 'tokyo-moon' },
        { title: 'tokyo-storm', value: 'tokyo-storm' },
        { title: 'tokyo-dark', value: 'tokyo-dark' },
        { title: 'onedark', value: 'onedark' },
        { title: 'srcery', value: 'srcery' },
        { title: 'monokai', value: 'monokai' },
        { title: 'material', value: 'material' },
        { title: 'synthwave-84', value: 'synthwave-84' },
        { title: 'atomdark', value: 'atomdark' },
        { title: 'oceanic-next', value: 'oceanic-next' },
        { title: 'shades-of-purple', value: 'shades-of-purple' },
        { title: 'arcdark', value: 'arcdark' },
        { title: 'sunset-aurant', value: 'sunset-aurant' },
        { title: 'sunset-saffron', value: 'sunset-saffron' },
        { title: 'sunset-tangerine', value: 'sunset-tangerine' },
        { title: 'cyberpunk', value: 'cyberpunk' },
        { title: 'night-owl', value: 'night-owl' },
        { title: 'github-light', value: 'github-light' },
        { title: 'rose-pine', value: 'rose-pine' },
        { title: 'kanagawa', value: 'kanagawa' },
        { title: 'cat-frappe', value: 'cat-frappe' },
        { title: 'cat-latte', value: 'cat-latte' },
        { title: 'melange-dark', value: 'melange-dark' },
        { title: 'melange-light', value: 'melange-light' },
        { title: 'palenight', value: 'palenight' },
        { title: 'ayu', value: 'ayu' },
        { title: 'ayu-dark', value: 'ayu-dark' },
        { title: 'ayu-light', value: 'ayu-light' },
        { title: 'ayu-mirage', value: 'ayu-mirage' },
        { title: 'Custom Theme Path...', value: '__CUSTOM__' }
      ],
      default: ''
    }
  ]
};
