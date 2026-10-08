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
  
  args.push(inputFile);
  
  args.push('--output');
  args.push(outputFile);
  
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
  
  // Always answer yes to prompts
  args.push('--yes');
  
  // Disable gowall's auto-preview so we can handle opening logic in the CLI
  args.push('--preview');
  args.push('false');
  
  return args;
}
