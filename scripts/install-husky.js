#!/usr/bin/env node

/**
 * Script para instalar Husky apenas em ambiente de desenvolvimento
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Só executa se não estivermos no CI
if (process.env.CI === 'true') {
  console.log('🚫 Skipping Husky installation in CI environment');
  process.exit(0);
}

// Verifica se está no projeto correto
if (!fs.existsSync('.husky')) {
  console.log('📁 .husky directory not found, skipping Husky installation');
  process.exit(0);
}

try {
  console.log('🐶 Installing Husky...');
  execSync('husky', { stdio: 'inherit' });
  console.log('✅ Husky installed successfully');
} catch (error) {
  console.warn('⚠️ Husky installation failed:', error instanceof Error ? error.message : String(error));
  // Não falha o processo se Husky não conseguir ser instalado
  process.exit(0);
}
