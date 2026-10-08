import prompts from 'prompts';
import { getSupportedImages } from '../filesystem/images';
import { operations } from '../operations/index';
import type { Operation, SubOperation, OperationConfig, FlagDefinition } from '../types/operations';

export async function selectImages(cwd: string): Promise<string[]> {
  const images = await getSupportedImages(cwd);
  
  if (images.length === 0) {
    return [];
  }

  const { selectedImages } = await prompts({
    type: 'multiselect',
    name: 'selectedImages',
    message: 'Select image(s):',
    choices: images.map(img => ({ title: img, value: img })),
    min: 1,
    instructions: false
  });

  return selectedImages || [];
}

export async function selectOperation(): Promise<{ operation: Operation; subOperation?: SubOperation }> {
  const { operationName } = await prompts({
    type: 'select',
    name: 'operationName',
    message: 'What do you want to do?',
    choices: operations.map(op => ({ title: op.name, value: op.name, description: op.description }))
  });

  if (!operationName) process.exit(0);

  const operation = operations.find(o => o.name === operationName)!;
  
  let subOperation: SubOperation | undefined;
  if (operation.subOperations && operation.subOperations.length > 0) {
    const { subOpName } = await prompts({
      type: 'select',
      name: 'subOpName',
      message: `Which ${operation.name.toLowerCase()} do you want to apply?`,
      choices: operation.subOperations.map(op => ({ title: op.name, value: op.name, description: op.description }))
    });
    
    if (!subOpName) process.exit(0);
    subOperation = operation.subOperations.find(s => s.name === subOpName);
  }

  return { operation, subOperation };
}

export async function configureOperation(flags: FlagDefinition[], opName: string): Promise<OperationConfig> {
  if (flags.length === 0) return {};
  
  const config: OperationConfig = {};
  
  console.log(`\n? Configure ${opName.toLowerCase()}:\n`);
  
  for (const flag of flags) {
    const message = flag.description + (flag.example ? `\n    Example: ${flag.example}` : '');
    
    let type: prompts.PromptType = 'text';
    if (flag.type === 'number') type = 'number';
    if (flag.type === 'boolean') type = 'toggle';
    if (flag.type === 'select') type = 'select';
    
    const response = await prompts({
      type,
      name: 'value',
      message: flag.name.charAt(0).toUpperCase() + flag.name.slice(1),
      initial: flag.default as any,
      choices: flag.choices,
    });
    
    if (response.value === undefined) {
      process.exit(0);
    }
    
    config[flag.name] = response.value;
  }
  
  return config;
}

export async function selectDestination(): Promise<string> {
  const { dest } = await prompts({
    type: 'text',
    name: 'dest',
    message: 'Destination directory:',
    initial: 'processed'
  });
  
  if (dest === undefined) process.exit(0);
  
  return dest.trim() || 'processed';
}
