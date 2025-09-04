#!/usr/bin/env node

const { updateNextjsDocs } = require('./update-nextjs-docs');

async function main() {
  console.log('🔧 Execução manual: Atualizando documentação do Next.js...\n');

  try {
    const hasChanges = await updateNextjsDocs();

    if (hasChanges) {
      console.log('\n🎉 Documentação do Next.js atualizada com sucesso!');
      console.log('📋 Para confirmar as mudanças, execute:');
      console.log('   git status');
      console.log('   git diff --cached');
      console.log('   git commit -m "docs: update Next.js documentation"');
    } else {
      console.log('\n✅ Documentação do Next.js já está atualizada');
    }
  } catch (error) {
    console.error(
      '\n❌ Erro durante a atualização manual:',
      error instanceof Error ? error.message : String(error)
    );
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verifique sua conexão com a internet');
    console.log('2. Certifique-se de que o git está instalado');
    console.log('3. Verifique as permissões de escrita no diretório docs/');
    console.log(
      '4. Para conversão MDX, instale: pnpm add unified remark-parse remark-stringify remark-mdx'
    );

    process.exit(1);
  }
}

main();
