#!/usr/bin/env node

/**
 * Script para atualizar manualmente a documentação do Prisma
 * Uso: npm run update:prisma-docs
 */

const { updatePrismaDocs } = require('./update-prisma-docs.js');

console.log('🎯 Executando atualização manual da documentação do Prisma...');

updatePrismaDocs()
  .then((hasChanges) => {
    if (hasChanges) {
      console.log('\n📝 Para fazer commit das mudanças, execute:');
      console.log('git add docs/prisma');
      console.log(
        'git commit -m "docs(prisma): update Prisma documentation from upstream repository"'
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
