import pc from 'picocolors';

export function printHeader() {
  console.log(pc.cyan('╭─────────────────────────────────────╮'));
  console.log(pc.cyan('│       Gowall Interactive CLI        │'));
  console.log(pc.cyan('╰─────────────────────────────────────╯\n'));
}

export function printCurrentDirectory(cwd: string) {
  console.log('Current directory:');
  console.log(`${pc.dim(cwd)}\n`);
}

export function printDivider() {
  console.log(`\n${pc.dim('──────────────────────────────────────')}\n`);
}

export function printError(msg: string) {
  console.log(`${pc.red('✗')} ${msg}`);
}

export function printSuccess(msg: string) {
  console.log(`${pc.green('✓')} ${msg}`);
}
