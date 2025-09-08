#!/usr/bin/env node

/**
 * Validador de Configuração do Projeto
 * Verifica se todas as ferramentas estão instaladas e configuradas corretamente
 */

// const { execSync } = require('child_process'); // For future use
const { existsSync } = require('fs');
const path = require('path');

class ValidationTester {
  constructor() {
    this.rootDir = process.cwd();
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  validate() {
    console.log('🔍 Validando configuração de padronização...\n');

    this.checkRequiredFiles();
    this.checkPackageJsonScripts();
    this.checkHuskyHooks();
    this.checkDependencies();

    this.printResults();
  }

  checkRequiredFiles() {
    console.log('📁 Verificando arquivos de configuração...');

    const requiredFiles = [
      'commitlint.config.js',
      '.prettierrc',
      'eslint.config.mjs',
      '.husky/pre-commit',
      '.husky/commit-msg',
      '.changeset/config.json',
    ];

    requiredFiles.forEach((file) => {
      const filePath = path.join(this.rootDir, file);
      if (existsSync(filePath)) {
        this.success.push(`✅ ${file} encontrado`);
      } else {
        this.errors.push(`❌ ${file} não encontrado`);
      }
    });
  }

  checkPackageJsonScripts() {
    console.log('\n📝 Verificando scripts do package.json...');

    try {
      const packageJson = require(path.join(this.rootDir, 'package.json'));

      const requiredScripts = ['prepare', 'commit', 'lint', 'format'];

      requiredScripts.forEach((script) => {
        if (packageJson.scripts && packageJson.scripts[script]) {
          this.success.push(`✅ Script "${script}" configurado`);
        } else {
          this.errors.push(`❌ Script "${script}" não encontrado`);
        }
      });

      // Verificar lint-staged
      if (packageJson['lint-staged']) {
        this.success.push('✅ lint-staged configurado');
      } else {
        this.errors.push('❌ lint-staged não configurado');
      }

      // Verificar config do commitizen
      if (packageJson.config && packageJson.config.commitizen) {
        this.success.push('✅ Commitizen configurado');
      } else {
        this.errors.push('❌ Commitizen não configurado');
      }
    } catch (error) {
      this.errors.push('❌ Erro ao ler package.json');
    }
  }

  checkHuskyHooks() {
    console.log('\n🐕 Verificando hooks do Husky...');

    const hooks = [
      { name: 'pre-commit', expectedContent: 'lint-staged' },
      { name: 'commit-msg', expectedContent: 'commitlint' },
    ];

    hooks.forEach((hook) => {
      const hookPath = path.join(this.rootDir, '.husky', hook.name);
      if (existsSync(hookPath)) {
        try {
          const content = require('fs').readFileSync(hookPath, 'utf8');
          if (content.includes(hook.expectedContent)) {
            this.success.push(`✅ Hook ${hook.name} configurado corretamente`);
          } else {
            this.warnings.push(`⚠️ Hook ${hook.name} pode não estar configurado corretamente`);
          }
        } catch (error) {
          this.errors.push(`❌ Erro ao ler hook ${hook.name}`);
        }
      }
    });
  }

  checkDependencies() {
    console.log('\n📦 Verificando dependências...');

    try {
      const packageJson = require(path.join(this.rootDir, 'package.json'));
      const devDeps = packageJson.devDependencies || {};

      const requiredDeps = [
        'husky',
        'lint-staged',
        'commitlint',
        'commitizen',
        '@changesets/cli',
        'prettier',
        'eslint',
      ];

      requiredDeps.forEach((dep) => {
        const found = Object.keys(devDeps).some((key) => key.includes(dep));
        if (found) {
          this.success.push(`✅ Dependência "${dep}" instalada`);
        } else {
          this.errors.push(`❌ Dependência "${dep}" não encontrada`);
        }
      });
    } catch (error) {
      this.errors.push('❌ Erro ao verificar dependências');
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESULTADO DA VALIDAÇÃO');
    console.log('='.repeat(50));

    if (this.success.length > 0) {
      console.log('\n✅ SUCESSOS:');
      this.success.forEach((msg) => console.log(`   ${msg}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️ AVISOS:');
      this.warnings.forEach((msg) => console.log(`   ${msg}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERROS:');
      this.errors.forEach((msg) => console.log(`   ${msg}`));
    }

    console.log('\n' + '='.repeat(50));

    const total = this.success.length + this.warnings.length + this.errors.length;
    const successRate = Math.round((this.success.length / total) * 100);

    console.log(`📈 Taxa de Sucesso: ${successRate}%`);
    console.log(`✅ Sucessos: ${this.success.length}`);
    console.log(`⚠️ Avisos: ${this.warnings.length}`);
    console.log(`❌ Erros: ${this.errors.length}`);

    if (this.errors.length === 0) {
      console.log('\n🎉 Configuração validada com sucesso!');
      console.log('\n📋 Próximos passos:');
      console.log('   1. Execute: git add .');
      console.log('   2. Execute: npm run commit (ou pnpm commit)');
      console.log('   3. Execute: npm run changeset (ou pnpm exec changeset)');
    } else {
      console.log('\n🔧 Execute o script de setup para corrigir os problemas encontrados.');
    }
  }
}

// Executar validação
if (require.main === module) {
  const validator = new ValidationTester();
  validator.validate();
}

module.exports = { ValidationTester };
