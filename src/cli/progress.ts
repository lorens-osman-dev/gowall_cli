import pc from 'picocolors';

export function printProcessingStart(total: number) {
  console.log(`Processing ${total} images...\n`);
}

export function printTaskSuccess(index: number, total: number, originalName: string, destPath: string) {
  console.log(`[${index}/${total}] ${pc.cyan(originalName)}`);
  console.log(`      ${pc.green('✓')} Created ${destPath}\n`);
}

export function printTaskFailure(index: number, total: number, originalName: string, error: string, stderr: string) {
  console.log(`[${index}/${total}] ${pc.cyan(originalName)}`);
  console.log(`      ${pc.red('✗')} Failed\n`);
  console.log(pc.dim(`      Error: ${error}`));
  if (stderr) {
    console.log(pc.dim(`      Details: ${stderr.trim().split('\n').join('\n               ')}\n`));
  } else {
    console.log(); // extra newline
  }
}

export function printSummary(successCount: number, failCount: number, outputDir: string) {
  console.log(`Completed: ${successCount}`);
  console.log(`Failed:    ${failCount}\n`);
  
  if (failCount === 0) {
    console.log(`${pc.green('✓')} Finished processing ${successCount} images.`);
  } else {
    console.log(`${pc.yellow('⚠')} Finished with some errors.`);
  }
  
  console.log(`\nOutput:\n${pc.dim(outputDir)}\n`);
}
