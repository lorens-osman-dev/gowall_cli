import prompts from 'prompts';

async function run() {
  try {
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Test',
      initial: 'invalid-string' as any,
      choices: [
        { title: 'A', value: 'a' },
        { title: 'B', value: 'b' }
      ]
    });
    console.log("Response:", response);
  } catch(e) {
    console.log("Error:", e);
  }
}
run();
