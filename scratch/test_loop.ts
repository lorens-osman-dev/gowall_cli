import prompts from 'prompts';

async function test() {
  const flags = [
    {
      name: 'scale',
      type: 'select',
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
      choices: [
        { title: 'realesr-animevideov3', value: 'realesr-animevideov3' },
        { title: 'realesrgan-x4plus', value: 'realesrgan-x4plus' }
      ],
      default: 'realesr-animevideov3'
    }
  ];

  for (const flag of flags) {
    console.log(`Prompting for ${flag.name}...`);
    const res = await prompts({
      type: flag.type as any,
      name: 'value',
      message: flag.name,
      initial: flag.default as any,
      choices: flag.choices,
    });
    console.log(`Result for ${flag.name}:`, res);
  }
}
test();
