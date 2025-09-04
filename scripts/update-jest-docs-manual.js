#!/usr/bin/env node

/**
 * Script para atualizar manualmente a documentação do Jest
 * Uso: npm run update:jest-docs
 */

const { updateJestDocs } = require('./update-jest-docs.js');

console.log('🎯 Executando atualização manual da documentação do Jest...');

updateJestDocs()
  .then((hasChanges) => {
    if (hasChanges) {
      console.log('\n📝 Para fazer commit das mudanças, execute:');
      console.log('git add docs/jest.js');
      console.log('git commit -m "docs(jest): update Jest documentation from upstream repository"');
      console.log('git push');
    }
  })
  .catch((error) => {
    console.error(
      '\n❌ Erro na atualização manual:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  });
