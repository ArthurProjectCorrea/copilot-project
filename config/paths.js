// Configuration paths for the new architecture
module.exports = {
  // Configuration files
  eslint: './config/eslint.config.mjs',
  prettier: './config/prettier.config.js',
  commitlint: './config/commitlint.config.js',
  typescript: './config/tsconfig.json',

  // Source directories
  src: './src',
  core: './src/core',
  cli: './src/core/cli',
  sync: './src/core/sync',
  setup: './src/core/setup',
  utils: './src/utils',

  // Output directories
  lib: './lib',
  tests: './tests',
  docs: './docs',

  // Legacy paths (for backward compatibility)
  scripts: './scripts',
};
