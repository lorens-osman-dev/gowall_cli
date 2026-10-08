import type { Operation } from '../types/operations';

export const upscale: Operation = {
  name: 'Upscale',
  command: 'upscale',
  description: 'Upscale/deblur an image using Enhanced Super-Resolution GAN. Requires Vulkan GPU support',
  flags: [
    {
      name: 'scale',
      type: 'select',
      description: 'Scale factor for upscaling',
      choices: [
        { title: '2x', value: 2 },
        { title: '3x', value: 3 },
        { title: '4x', value: 4 }
      ],
      default: 2
    },
    {
      name: 'model',
      type: 'select',
      description: 'Model to use for upscaling',
      choices: [
        { title: 'realesr-animevideov3 (Fast, default)', value: 'realesr-animevideov3' },
        { title: 'realesrgan-x4plus (Slower, Better quality)', value: 'realesrgan-x4plus' },
        { title: 'realesrgan-x4plus-anime (optimized for anime)', value: 'realesrgan-x4plus-anime' }
      ],
      default: 'realesr-animevideov3'
    }
  ]
};
