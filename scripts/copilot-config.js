#!/usr/bin/env node

/**
 * Wrapper script para facilitar a execução do init-github-config
 * Este script pode ser executado diretamente após a instalação do pacote
 */

const { initGithubConfig } = require('./init-github-config.js');

// Verifica argumentos da linha de comando
const args = process.argv.slice(2);
const forceRun = args.includes('--force') || args.includes('-f');
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`
🚀 GitHub Copilot Configuration Script

Usage:
  node scripts/copilot-config.js [options]
  npx copilot-project-config [options]

Options:
  --force, -f    Force execution even in source project
  --help, -h     Show this help message

Examples:
  node scripts/copilot-config.js
  node scripts/copilot-config.js --force
  npx copilot-project-config
  
This script will:
  ✅ Create .github/chatmodes, .github/instructions, and .github/prompts
  ✅ Copy all necessary GitHub Copilot configuration files
  ✅ Check for updates and only modify changed files
  ✅ Maintain version control for configuration files
`);
  process.exit(0);
}

// Execute a configuração
try {
  initGithubConfig(forceRun);
} catch (error) {
  console.error(
    '❌ Error running GitHub Copilot configuration:',
    error instanceof Error ? error.message : String(error)
  );
  process.exit(1);
}
