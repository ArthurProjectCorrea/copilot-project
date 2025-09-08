#!/usr/bin/env node

/**
 * Wrapper script para facilitar a execução do init-github-config
 * Este script pode ser executado diretamente após a instalação do pacote
 */

const { initGithubConfig } = require('./init-github-config.js');
const fs = require('fs');
const path = require('path');

// Verifica argumentos da linha de comando
const args = process.argv.slice(2);
const forceRun = args.includes('--force') || args.includes('-f');
const help = args.includes('--help') || args.includes('-h');
const showRules = args.includes('--show-rules') || args.includes('-r');
const editRules = args.includes('--edit-rules') || args.includes('-e');

/**
 * Mostra as regras de cópia atuais
 */
function showCopyRules() {
  const rulesPath = path.join(__dirname, 'copy-rules.json');

  if (!fs.existsSync(rulesPath)) {
    console.log('❌ Copy rules file not found:', rulesPath);
    return;
  }

  try {
    const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
    console.log('📋 Current Copy Rules:');
    console.log(JSON.stringify(rules, null, 2));
  } catch (error) {
    console.error(
      '❌ Error reading copy rules:',
      error instanceof Error ? error.message : String(error)
    );
  }
}

/**
 * Abre o arquivo de regras para edição
 */
function editCopyRules() {
  const rulesPath = path.join(__dirname, 'copy-rules.json');

  if (!fs.existsSync(rulesPath)) {
    console.log('❌ Copy rules file not found:', rulesPath);
    return;
  }

  console.log('📝 Copy rules file location:', rulesPath);
  console.log('💡 Edit this file to customize which files are copied during installation.');
  console.log('💡 After editing, run the config script again to apply changes.');
}

if (help) {
  console.log(`
🚀 GitHub Copilot Configuration Script

Usage:
  node scripts/copilot-config.js [options]
  npx copilot-project-config [options]

Options:
  --force, -f       Force execution even in source project
  --help, -h        Show this help message
  --show-rules, -r  Display current copy rules
  --edit-rules, -e  Show path to edit copy rules

Examples:
  node scripts/copilot-config.js
  node scripts/copilot-config.js --force
  node scripts/copilot-config.js --show-rules
  npx copilot-project-config
  
This script will:
  ✅ Create .github/chatmodes, .github/instructions, and .github/prompts
  ✅ Copy files based on copy-rules.json configuration
  ✅ Check for updates and only modify changed files
  ✅ Maintain version control for configuration files
  ✅ Skip files based on configurable rules

Copy Rules Configuration:
  📋 Configure which files to copy in scripts/copy-rules.json
  📋 Support for wildcards (*, ?) in file patterns
  📋 Global and per-directory exclusion rules
  📋 Enable/disable copying for specific directories
`);
  process.exit(0);
}

if (showRules) {
  showCopyRules();
  process.exit(0);
}

if (editRules) {
  editCopyRules();
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
