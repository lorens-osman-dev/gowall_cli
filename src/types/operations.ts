export type FlagDefinition = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect';
  description: string;
  example?: string;
  default?: string | number | boolean;
  choices?: { title: string; value: string | number }[];
  required?: boolean;
};

export type OperationConfig = {
  [flagName: string]: string | number | boolean | string[] | undefined;
};

export type SubOperation = {
  name: string;
  command: string;
  description: string;
  flags: FlagDefinition[];
};

export type Operation = {
  name: string;
  command: string;
  description: string;
  flags: FlagDefinition[];
  subOperations?: SubOperation[];
};

export type TaskResult = {
  file: string;
  success: boolean;
  outputFile?: string;
  error?: string;
  exitCode?: number;
};
