import prompts from 'prompts';

async function run() {
  try {
    const res = await prompts({
      type: 'select',
      name: 'value',
      message: 'Model',
      initial: 'realesr-animevideov3' as any,
      choices: [
        { title: 'realesr-animevideov3 (Fast, default)', value: 'realesr-animevideov3' },
        { title: 'realesrgan-x4plus (Slower, Better quality)', value: 'realesrgan-x4plus' },
        { title: 'realesrgan-x4plus-anime (optimized for anime)', value: 'realesrgan-x4plus-anime' }
      ]
    });
    console.log("Response:", res);
  } catch(e) {
    console.log("Error:", e);
  }
}
run();
