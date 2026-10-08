import type { Operation, OperationConfig } from '../types/operations';

export function buildCommandArgs(
  operation: Operation,
  config: OperationConfig,
  inputFile: string,
  outputFile: string,
  subCommandStr?: string
): string[] {
  const args: string[] = [];
  
  args.push(operation.command);
  
  if (subCommandStr) {
    args.push(subCommandStr);
  }
  
  // Always answer yes to prompts and disable preview
  args.push('--yes');
  args.push('--preview');
  args.push('false');
  
  // Use either sub-operation flags or main operation flags
  const flagsDefinition = subCommandStr && operation.subOperations 
    ? operation.subOperations.find(s => s.command === subCommandStr)?.flags || []
    : operation.flags;
  
  for (const flagDef of flagsDefinition) {
    const value = config[flagDef.name];
    if (value !== undefined && value !== '') {
      args.push(`--${flagDef.name}`);
      args.push(String(value));
    }
  }
  
  args.push(inputFile);
  
  args.push('--output');
  args.push(outputFile);
  
  return args;
}
