import { join, relative } from 'node:path';
import { printHeader, printCurrentDirectory, printDivider, printError, printSuccess } from './cli/display';
import { selectImages, selectOperation, configureOperation, selectDestination } from './cli/prompts';
import { printProcessingStart, printTaskSuccess, printTaskFailure, printSummary } from './cli/progress';
import { checkGowallAvailability, executeGowall } from './gowall/executor';
import { buildCommandArgs } from './gowall/command';
import { ensureDestination } from './filesystem/destination';
import { generateSafeFilename } from './filesystem/filenames';

async function main() {
  const cwd = process.cwd();

  printHeader();
  printCurrentDirectory(cwd);

  // 1. Check gowall availability
  const hasGowall = await checkGowallAvailability();
  if (!hasGowall) {
    printError('Gowall was not found.\n');
    console.log('Please install Gowall and make sure the `gowall`\ncommand is available in your PATH.\n');
    console.log('See:\nhttps://github.com/Achno/gowall');
    process.exit(1);
  }

  // 2. Select Images
  const selectedImages = await selectImages(cwd);
  if (!selectedImages || selectedImages.length === 0) {
    console.log('\nNo supported images selected or found. Exiting.');
    process.exit(0);
  }

  console.log();

  // 3. Select Operation
  const { operation, subOperation } = await selectOperation();
  
  // 4. Configure Flags
  const flagsToConfigure = subOperation ? subOperation.flags : operation.flags;
  const config = await configureOperation(flagsToConfigure, subOperation ? subOperation.name : operation.name);

  console.log();

  // 5. Select Destination
  const destDirRelative = await selectDestination();
  const destDirAbsolute = await ensureDestination(cwd, destDirRelative);

  printDivider();

  // 6 & 8 & 9. Process Images
  printProcessingStart(selectedImages.length);
  
  let successCount = 0;
  let failCount = 0;

  let lastSuccessPath = '';

  for (let i = 0; i < selectedImages.length; i++) {
    const imgName = selectedImages[i]!;
    const inputPath = join(cwd, imgName);
    
    const targetExtension = config['format'] ? String(config['format']) : undefined;
    
    let opSuffix = subOperation ? subOperation.command : operation.command;
    if (operation.command === 'convert' && config['theme']) {
      const themeStr = String(config['theme']);
      const themeName = require('node:path').parse(themeStr).name;
      opSuffix = `${opSuffix}_${themeName}`;
    }
    const destPath = generateSafeFilename(destDirAbsolute, imgName, opSuffix, targetExtension);
    
    const args = buildCommandArgs(operation, config, inputPath, destPath, subOperation?.command);
    
    const result = await executeGowall(args);
    
    if (result.success) {
      successCount++;
      lastSuccessPath = destPath;
      const relativeDest = relative(cwd, destPath);
      printTaskSuccess(i + 1, selectedImages.length, imgName, relativeDest);
    } else {
      failCount++;
      
      let errorMessage = 'Gowall failed to process the image.';
      if (operation.command === 'upscale' && (result.stderr.toLowerCase().includes('vulkan') || result.stderr.toLowerCase().includes('gpu'))) {
        errorMessage = 'Gowall reported that Vulkan/GPU support is unavailable.';
      }
      
      printTaskFailure(i + 1, selectedImages.length, imgName, errorMessage, result.stderr);
    }
  }

  printDivider();
  printSummary(successCount, failCount, destDirAbsolute);

  if (successCount > 0) {
    const open = (await import('open')).default;
    if (selectedImages.length === 1) {
      await open(lastSuccessPath);
    } else {
      await open(destDirAbsolute);
    }
  }
}

main().catch(err => {
  printError(`An unexpected error occurred: ${err.message}`);
  process.exit(1);
});
