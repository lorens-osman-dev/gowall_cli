import type { Operation } from '../types/operations';

export const effects: Operation = {
  name: 'Effects',
  command: 'effects',
  description: 'Apply various effects to an image (brightness, contrast, etc)',
  flags: [],
  subOperations: [
    {
      name: 'Brightness',
      command: 'br',
      description: 'Increases/Decreases the brightness',
      flags: [
        {
          name: 'factor',
          type: 'number',
          description: 'Brightness factor. 1.2 increases by 20%, 0.8 decreases by 20%.',
          default: 1.1
        }
      ]
    },
    {
      name: 'Contrast',
      command: 'contrast',
      description: 'Adjust image contrast',
      flags: [
        {
          name: 'mode',
          type: 'select',
          description: 'Contrast mode',
          choices: [
            { title: 'normal', value: 'normal' },
            { title: 'sigmoid', value: 'sigmoid' }
          ],
          default: 'normal'
        },
        {
          name: 'factor',
          type: 'number',
          description: 'Normal contrast percentage (-100.0 to 100.0)',
          default: 0
        }
      ]
    },
    {
      name: 'Gamma',
      command: 'gamma',
      description: 'Apply gamma correction',
      flags: [
        {
          name: 'gamma',
          type: 'number',
          description: 'Gamma correction factor (> 0.0)',
          default: 1.0
        }
      ]
    },
    {
      name: 'Saturation',
      command: 'saturation',
      description: 'Adjust image saturation',
      flags: [
        {
          name: 'percentage',
          type: 'number',
          description: 'Saturation percentage (-100.0 to 100.0)',
          default: 0
        }
      ]
    },
    {
      name: 'Tilt',
      command: 'tilt',
      description: 'Apply 3D tilt effect with rounded corners and gradient background',
      flags: [
        {
          name: 'preset',
          type: 'select',
          description: 'Use a preset configuration',
          choices: [
            { title: 'None', value: '' },
            { title: 'p1', value: 'p1' },
            { title: 'p2', value: 'p2' },
            { title: 'p3', value: 'p3' },
            { title: 'p4', value: 'p4' }
          ],
          default: ''
        }
      ]
    }
  ]
};
