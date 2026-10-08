import { spawn } from 'bun';

export async function checkGowallAvailability(): Promise<boolean> {
  try {
    const proc = spawn(['gowall', '--version'], {
      stdout: 'ignore',
      stderr: 'ignore'
    });
    const exitCode = await proc.exited;
    return exitCode === 0;
  } catch (err) {
    return false;
  }
}

export type GowallExecutionResult = {
  success: boolean;
  exitCode: number | null;
  stdout: string;
  stderr: string;
};

export async function executeGowall(args: string[]): Promise<GowallExecutionResult> {
  try {
    const proc = spawn(['gowall', ...args], {
      stdout: 'pipe',
      stderr: 'pipe'
    });
    
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;
    
    return {
      success: exitCode === 0,
      exitCode,
      stdout,
      stderr
    };
  } catch (error: any) {
    return {
      success: false,
      exitCode: null,
      stdout: '',
      stderr: error.message || 'Unknown execution error'
    };
  }
}
