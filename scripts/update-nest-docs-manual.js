#!/usr/bin/env node

/**
 * Script para atualizar manualmente a documentação do NestJS
 * Uso: npm run update:nest-docs
 */

const { updateNestDocs } = require('./update-nest-docs.js');

console.log('🎯 Executando atualização manual da documentação do NestJS...');

updateNestDocs()
  .then((hasChanges) => {
    if (hasChanges) {
      console.log('\n📝 Para fazer commit das mudanças, execute:');
      console.log('git add docs/nest.js');
      console.log(
        'git commit -m "docs(nest): update NestJS documentation from upstream repository"'
      );
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
