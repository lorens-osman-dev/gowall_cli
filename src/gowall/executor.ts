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
    
    let stdoutStr = '';
    let stderrStr = '';
    
    const readStream = async (stream: ReadableStream<Uint8Array>, out: NodeJS.WriteStream, isErr: boolean) => {
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        if (isErr) stderrStr += text; else stdoutStr += text;
        out.write(text);
      }
    };

    await Promise.all([
      readStream(proc.stdout, process.stdout, false),
      readStream(proc.stderr, process.stderr, true),
      proc.exited
    ]);
    
    const exitCode = proc.exitCode;
    
    return {
      success: exitCode === 0,
      exitCode,
      stdout: stdoutStr,
      stderr: stderrStr
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
