#!/usr/bin/env node

/**
 * Script demonstrativo para mostrar como usar as ferramentas de padronização
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

class StandardsDemo {
  constructor() {
    this.packageManager = this.detectPackageManager();
  }

  detectPackageManager() {
    const { existsSync } = require('fs');
    if (existsSync('pnpm-lock.yaml')) return 'pnpm';
    if (existsSync('yarn.lock')) return 'yarn';
    return 'npm';
  }

  async run() {
    console.log('🎯 Demonstração das Ferramentas de Padronização\n');
    console.log('Este script demonstra como usar as ferramentas configuradas.\n');

    while (true) {
      console.log('📋 Opções disponíveis:');
      console.log('1. 🔍 Verificar qualidade do código (lint + format)');
      console.log('2. 📝 Fazer commit interativo (Commitizen)');
      console.log('3. 📦 Criar changeset para release');
      console.log('4. 🧪 Testar hooks do Husky');
      console.log('5. 📊 Validar configuração');
      console.log('6. 📚 Mostrar comandos úteis');
      console.log('0. ❌ Sair\n');

      const choice = await ask('Escolha uma opção (0-6): ');

      try {
        switch (choice) {
          case '1':
            await this.checkCodeQuality();
            break;
          case '2':
            await this.makeCommit();
            break;
          case '3':
            await this.createChangeset();
            break;
          case '4':
            await this.testHooks();
            break;
          case '5':
            await this.validateConfig();
            break;
          case '6':
            this.showUsefulCommands();
            break;
          case '0':
            console.log('👋 Até logo!');
            rl.close();
            return;
          default:
            console.log('❌ Opção inválida. Tente novamente.\n');
        }
      } catch (error) {
        console.error(`❌ Erro: ${error.message}\n`);
      }

      console.log('\n' + '='.repeat(50) + '\n');
    }
  }

  async checkCodeQuality() {
    console.log('🔍 Verificando qualidade do código...\n');

    try {
      console.log('📝 Executando ESLint...');
      execSync(`${this.packageManager} run lint`, { stdio: 'inherit' });

      console.log('\n🎨 Executando Prettier...');
      execSync(`${this.packageManager} run format`, { stdio: 'inherit' });

      console.log('\n✅ Verificação de qualidade concluída!');
    } catch (error) {
      console.error('❌ Erro na verificação de qualidade');
    }
  }

  async makeCommit() {
    console.log('📝 Iniciando commit interativo...\n');

    try {
      console.log('ℹ️ Isso abrirá o Commitizen para um commit interativo.');
      console.log('ℹ️ Use Ctrl+C para cancelar se necessário.\n');

      const proceed = await ask('Deseja continuar? (y/N): ');
      if (proceed.toLowerCase() === 'y' || proceed.toLowerCase() === 'yes') {
        execSync(`${this.packageManager} run commit`, { stdio: 'inherit' });
      } else {
        console.log('❌ Commit cancelado.');
      }
    } catch (error) {
      console.error('❌ Erro no commit. Certifique-se de ter mudanças staged.');
    }
  }

  async createChangeset() {
    console.log('📦 Criando changeset para release...\n');

    try {
      console.log('ℹ️ Isso abrirá o Changesets para criar um novo changeset.');
      console.log('ℹ️ Descreva as mudanças que você fez para a próxima release.\n');

      const proceed = await ask('Deseja continuar? (y/N): ');
      if (proceed.toLowerCase() === 'y' || proceed.toLowerCase() === 'yes') {
        execSync(`${this.packageManager} exec changeset`, { stdio: 'inherit' });
      } else {
        console.log('❌ Criação de changeset cancelada.');
      }
    } catch (error) {
      console.error('❌ Erro ao criar changeset');
    }
  }

  async testHooks() {
    console.log('🧪 Testando hooks do Husky...\n');

    try {
      console.log('🔍 Testando lint-staged (pre-commit hook)...');
      execSync(`${this.packageManager} exec lint-staged`, { stdio: 'inherit' });

      console.log('\n📝 Testando commitlint...');
      console.log('Exemplo de mensagem válida: "feat: add new feature"');
      execSync('echo "feat: test commit message" | npx commitlint', { stdio: 'inherit' });

      console.log('\n✅ Hooks funcionando corretamente!');
    } catch (error) {
      console.error('❌ Erro nos hooks');
    }
  }

  async validateConfig() {
    console.log('📊 Validando configuração...\n');

    try {
      execSync('node scripts/validate-project-standards.js', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Erro na validação');
    }
  }

  showUsefulCommands() {
    console.log('📚 Comandos Úteis\n');

    console.log('🔍 **Verificação de Qualidade:**');
    console.log(`   ${this.packageManager} run lint              # ESLint`);
    console.log(`   ${this.packageManager} run format            # Prettier`);
    console.log(`   ${this.packageManager} run quality:check     # Verificação completa\n`);

    console.log('📝 **Commits:**');
    console.log(`   ${this.packageManager} run commit            # Commit interativo`);
    console.log(`   git add . && ${this.packageManager} run commit  # Add + Commit\n`);

    console.log('📦 **Changesets/Releases:**');
    console.log(`   ${this.packageManager} exec changeset        # Criar changeset`);
    console.log(`   ${this.packageManager} exec changeset version # Aplicar versões`);
    console.log(`   ${this.packageManager} exec changeset status  # Ver status\n`);

    console.log('🧪 **Testes e Validação:**');
    console.log(`   ${this.packageManager} exec lint-staged      # Testar lint-staged`);
    console.log('   echo "feat: test" | npx commitlint    # Testar commitlint');
    console.log('   node scripts/validate-project-standards.js # Validar setup\n');

    console.log('🔧 **Husky:**');
    console.log(`   ${this.packageManager} run prepare           # Reinstalar hooks`);
    console.log('   npx husky install                     # Instalar hooks manualmente\n');

    console.log('📖 **Tipos de Commit:**');
    console.log('   feat     - Nova funcionalidade');
    console.log('   fix      - Correção de bug');
    console.log('   docs     - Documentação');
    console.log('   style    - Formatação');
    console.log('   refactor - Refatoração');
    console.log('   test     - Testes');
    console.log('   chore    - Manutenção');
    console.log('   perf     - Performance');
    console.log('   ci       - CI/CD');
    console.log('   build    - Build system');
    console.log('   revert   - Reverter commit\n');
  }
}

// Executar demo
if (require.main === module) {
  const demo = new StandardsDemo();
  demo.run().catch(console.error);
}

module.exports = { StandardsDemo };
