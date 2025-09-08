#!/usr/bin/env node

/**
 * Script unificado para configuração de padronização de projetos
 * Responsável por: Husky, Commitlint, Prettier, ESLint, Changesets, Commitizen
 */

const { execSync } = require('child_process');
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const readline = require('readline');

class ProjectStandardsInstaller {
  constructor() {
    this.rootDir = process.cwd();
    this.packageManager = this.detectPackageManager();
    this.framework = this.detectFramework();
    this.isTypeScript = this.hasTypeScript();

    console.log('🚀 Configurador de Padronização de Projetos');
    console.log('==========================================\n');
    console.log(`📁 Diretório: ${this.rootDir}`);
    console.log(`📦 Package Manager: ${this.packageManager}`);
    console.log(`🔧 Framework: ${this.framework}`);
    console.log(`📘 TypeScript: ${this.isTypeScript ? 'Sim' : 'Não'}\n`);
  }

  detectPackageManager() {
    if (existsSync('pnpm-lock.yaml')) return 'pnpm';
    if (existsSync('yarn.lock')) return 'yarn';
    if (existsSync('package-lock.json')) return 'npm';
    return 'npm';
  }

  detectFramework() {
    if (existsSync('nest-cli.json')) return 'nestjs';
    if (
      existsSync('next.config.js') ||
      existsSync('next.config.mjs') ||
      existsSync('next.config.ts')
    )
      return 'nextjs';
    if (existsSync('nuxt.config.js') || existsSync('nuxt.config.ts')) return 'nuxtjs';
    if (existsSync('vite.config.js') || existsSync('vite.config.ts')) return 'vite';
    if (existsSync('webpack.config.js')) return 'webpack';
    return 'node';
  }

  hasTypeScript() {
    return existsSync('tsconfig.json');
  }

  async install() {
    try {
      await this.promptUser();
      await this.installDependencies();
      await this.setupHusky();
      await this.createConfigFiles();
      await this.updatePackageJson();
      await this.setupChangesets();
      await this.installCopilotProject();
      await this.showCompletionMessage();
    } catch (error) {
      console.error('❌ Erro durante a configuração:', error);
      process.exit(1);
    }
  }

  async promptUser() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question('🔧 Deseja continuar com a configuração? (y/n): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
          console.log('❌ Configuração cancelada.');
          process.exit(0);
        }
        resolve(true);
      });
    });
  }

  async installDependencies() {
    console.log('📦 Instalando dependências de desenvolvimento...');

    const devDependencies = [
      // Husky e Lint-staged
      'husky@^9.1.7',
      'lint-staged@^16.1.6',

      // CommitLint
      '@commitlint/cli@^19.8.1',
      '@commitlint/config-conventional@^19.8.1',

      // Commitizen
      'commitizen@^4.3.1',
      'cz-conventional-changelog@^3.3.0',

      // Changesets
      '@changesets/cli@^2.29.6',

      // Prettier
      'prettier@^3.6.2',

      // ESLint
      'eslint@^9.34.0',
      'eslint-config-prettier@^10.1.8',
      'eslint-plugin-prettier@^5.5.4',
      'eslint-plugin-security@^3.0.1',
      '@eslint/js@^9.34.0',
      'globals@^16.3.0',
    ];

    // Adicionar dependências TypeScript se necessário
    if (this.isTypeScript) {
      devDependencies.push('typescript-eslint@^8.42.0', '@types/node@^22.2.0');
    }

    const cmd = `${this.packageManager} add -D ${devDependencies.join(' ')}`;

    try {
      execSync(cmd, { stdio: 'inherit' });
      console.log('✅ Dependências instaladas com sucesso!\n');
    } catch (error) {
      throw new Error(`Falha ao instalar dependências: ${error}`);
    }
  }

  async setupHusky() {
    console.log('🐕 Configurando Husky...');

    try {
      // Inicializar Husky
      execSync(`${this.packageManager} exec husky init`, { stdio: 'inherit' });

      // Criar hook pre-commit
      writeFileSync(
        '.husky/pre-commit',
        `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm exec lint-staged
`
      );

      // Criar hook commit-msg
      writeFileSync(
        '.husky/commit-msg',
        `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm exec commitlint --edit \${1}
`
      );

      console.log('✅ Husky configurado com sucesso!\n');
    } catch (error) {
      throw new Error(`Falha ao configurar Husky: ${error}`);
    }
  }

  async createConfigFiles() {
    console.log('📝 Criando arquivos de configuração...');

    // CommitLint config
    const commitlintConfig = `module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação, missing semi colons, etc
        'refactor', // Refatoração de código
        'test',     // Adição ou correção de testes
        'chore',    // Mudanças no processo de build ou ferramentas
        'perf',     // Melhoria de performance
        'ci',       // Mudanças no CI
        'build',    // Mudanças no sistema de build
        'revert'    // Reversão de commit
      ]
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100]
  }
};`;
    writeFileSync('commitlint.config.js', commitlintConfig);

    // Prettier config
    const prettierConfig = `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf"
}`;
    writeFileSync('.prettierrc', prettierConfig);

    // ESLint config
    const eslintConfig = this.generateESLintConfig();
    writeFileSync('eslint.config.mjs', eslintConfig);

    // Prettier ignore
    const prettierIgnore = `# Dependencies
node_modules/
dist/
build/
coverage/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS generated files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.temp
`;
    writeFileSync('.prettierignore', prettierIgnore);

    console.log('✅ Arquivos de configuração criados!\n');
  }

  generateESLintConfig() {
    const baseConfig = `import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import security from 'eslint-plugin-security';`;

    const tsConfig = this.isTypeScript
      ? `
import tseslint from 'typescript-eslint';`
      : '';

    const configArray = this.isTypeScript
      ? `
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  security.configs.recommended,`
      : `
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  security.configs.recommended,`;

    return `${baseConfig}${tsConfig}

${configArray}
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },
${this.isTypeScript ? ');' : '];'}`;
  }

  async updatePackageJson() {
    console.log('📄 Atualizando package.json...');

    const packageJsonPath = join(this.rootDir, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    // Adicionar scripts
    if (!packageJson.scripts) packageJson.scripts = {};

    packageJson.scripts = {
      ...packageJson.scripts,
      lint: 'eslint . --fix',
      format: 'prettier --write .',
      'format:check': 'prettier --check .',
      commit: 'cz',
      changeset: 'changeset',
      'changeset:version': 'changeset version',
      'changeset:publish': 'changeset publish',
      validate: 'npm run lint && npm run format:check',
      prepare: 'husky',
    };

    // Configurar Commitizen
    packageJson.config = {
      ...packageJson.config,
      commitizen: {
        path: 'cz-conventional-changelog',
      },
    };

    // Configurar lint-staged
    packageJson['lint-staged'] = {
      '*.{js,jsx,ts,tsx,mjs}': ['eslint --fix', 'prettier --write'],
      '*.{json,css,scss,md,yml,yaml}': ['prettier --write'],
    };

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json atualizado!\n');
  }

  async setupChangesets() {
    console.log('📦 Configurando Changesets...');

    try {
      if (!existsSync('.changeset')) {
        mkdirSync('.changeset');
      }

      // Configuração do Changesets
      const changesetConfig = `{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}`;

      writeFileSync('.changeset/config.json', changesetConfig);
      console.log('✅ Changesets configurado!\n');
    } catch (error) {
      throw new Error(`Falha ao configurar Changesets: ${error}`);
    }
  }

  async installCopilotProject() {
    console.log('🤖 Instalando GitHub Copilot Project...');

    try {
      const cmd = `${this.packageManager} add @arthurcorreadev/copilot-chat-integration`;
      execSync(cmd, { stdio: 'inherit' });
      console.log('✅ Instalação concluída com sucesso!');
    } catch (error) {
      console.error(
        '⚠️ Falha ao instalar @arthurcorreadev/copilot-chat-integration:',
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  async showCompletionMessage() {
    console.log('🎉 Configuração concluída com sucesso!\n');
    console.log('📋 Comandos disponíveis:');
    console.log(`   ${this.packageManager} run lint          # Verificar e corrigir código`);
    console.log(`   ${this.packageManager} run format        # Formatar código`);
    console.log(`   ${this.packageManager} run commit        # Fazer commit interativo`);
    console.log(`   ${this.packageManager} run changeset     # Criar changeset para release`);
    console.log(`   ${this.packageManager} run validate      # Validar código completo\n`);

    console.log('📝 Próximos passos:');
    console.log('   1. git add .');
    console.log(`   2. ${this.packageManager} run commit`);
    console.log(`   3. ${this.packageManager} run changeset\n`);

    console.log('🔗 Arquivos criados:');
    console.log('   ✅ .husky/ (hooks do Git)');
    console.log('   ✅ commitlint.config.js');
    console.log('   ✅ .prettierrc');
    console.log('   ✅ eslint.config.mjs');
    console.log('   ✅ .changeset/config.json');
    console.log('   ✅ .github/ (configuração do Copilot)');
  }
}

// Verificar argumentos
const args = process.argv.slice(2);
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`
🚀 Configurador de Padronização de Projetos

Usage:
  node setup-project-standards.js [options]

Options:
  --help, -h     Mostrar esta mensagem

Este script configura:
  🐕 Husky (Git hooks)
  📝 Commitlint (Padronização de commits)
  💅 Prettier (Formatação de código)
  🔍 ESLint (Qualidade de código)
  📦 Changesets (Versionamento semântico)
  🤖 GitHub Copilot (Assistente de código)
  🎯 Commitizen (Commits interativos)

Compatível com:
  📦 npm, pnpm, yarn
  🔧 NestJS, Next.js, Nuxt.js, Vite, Node.js
  📘 JavaScript e TypeScript
`);
  process.exit(0);
}

// Executar instalação
const installer = new ProjectStandardsInstaller();
installer.install();
