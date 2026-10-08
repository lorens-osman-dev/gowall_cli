# Gowall Interactive CLI

An interactive CLI wrapper for [Gowall](https://github.com/Achno/gowall), built with Bun and TypeScript. It provides a polished and user-friendly interface for processing images using Gowall's capabilities.

## Features

- **Interactive UI**: Seamlessly select images, operations, and configurations using interactive prompts.
- **Context-Aware**: Operates directly on the directory where the command is launched (`process.cwd()`).
- **Safe Execution**: Never overwrites existing files. Automatically generates safe filenames (e.g., `image_upscale_1.png`).
- **Batch Processing**: Select and process multiple images at once. A failure on one image doesn't stop the rest.
- **Configurable**: Configures operations (background removal, upscaling, resizing, etc.) through intuitive options.

## Prerequisites

1. **Bun**: You must have [Bun](https://bun.sh/) installed.
2. **Gowall**: The `gowall` binary must be installed and available in your system's `PATH`.

### Installing Gowall

Check out the [Gowall GitHub Repository](https://github.com/Achno/gowall) for the latest installation instructions. Generally, you can install it via Go:

```bash
go install github.com/Achno/gowall@latest
```

> **Note on Upscaling**: The `upscale` operation uses Enhanced Super-Resolution GAN and requires a GPU with **Vulkan support**. If your system does not support Vulkan, the upscaling process will fail.

## Setup

Clone this repository and install dependencies using Bun:

```bash
git clone <repository_url> gowall-cli
cd gowall-cli
bun install
```

## Usage

You can run the interactive CLI from any directory containing your images. The CLI will automatically scan the current working directory for supported image formats (PNG, JPG, JPEG, WEBP).

1. Navigate to the directory containing your images:
   ```bash
   cd ~/Pictures
   ```

2. Run the CLI:
   ```bash
   bun run /path/to/gowall-cli/src/index.ts
   ```
   
   Or if you are inside the `gowall-cli` project directory, simply run:
   ```bash
   bun run start
   ```

### Example Workflow

```text
╭─────────────────────────────────────╮
│       Gowall Interactive CLI        │
╰─────────────────────────────────────╯

Current directory:
/home/user/Pictures

? Select image(s):
  ◉ sunset.png
  ◯ wallpaper.jpg

? What do you want to do?
  ❯ Upscale
    Remove background
    Compress
    Convert
    Effects
    Resize

? Configure upscale:
  ❯ Scale: 2x

? Destination directory:
  processed

──────────────────────────────────────

Processing 1 images...

[1/1] sunset.png
      ✓ Created processed/sunset_upscale.png

──────────────────────────────────────

Completed: 1
Failed:    0

✓ Finished processing 1 images.

Output:
/home/user/Pictures/processed
```

## Architecture

The project is structured logically to ensure maintainability:

- `src/cli/`: UI interactions, prompts, progress display, and error reporting.
- `src/operations/`: Data-driven definitions of Gowall commands and their respective flags.
- `src/gowall/`: Execution layer for `gowall`, bridging the user configuration to safe command line executions.
- `src/filesystem/`: Utilities to handle image discovery and safe filename generation.
- `src/types/`: Centralized TypeScript definitions.
- `src/index.ts`: The main entry point orchestrating the workflow.
