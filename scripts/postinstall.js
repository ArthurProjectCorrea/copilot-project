#!/usr/bin/env node

/**
 * Script de postinstall condicional que só executa em ambiente de desenvolvimento
 */

// Verifica se está no CI
if (process.env.CI === 'true') {
  console.log('🚫 Skipping all postinstall scripts in CI environment');
  process.exit(0);
}

const { execSync } = require('child_process');

try {
  console.log('🚀 Running postinstall scripts...');
  
  // Executa o script principal de postinstall
  execSync('node src/core/setup/postinstall.js', { stdio: 'inherit' });
  
  // Executa o script de instalação do Husky
  execSync('node scripts/install-husky.js', { stdio: 'inherit' });
  
  console.log('✅ All postinstall scripts completed successfully');
} catch (error) {
  console.warn('⚠️ Postinstall script failed:', error instanceof Error ? error.message : String(error));
  // Não falha o processo para não quebrar a instalação
  process.exit(0);
}
