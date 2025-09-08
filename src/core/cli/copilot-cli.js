#!/usr/bin/env node

/**
 * CLI Principal do Copilot Project
 * Interface unificada para todos os scripts de configuração
 */

const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

class CopilotProjectCLI {
  constructor() {
    this.scriptsDir = __dirname;
    this.args = process.argv.slice(2);
    this.command = this.args[0];
  }

  run() {
    console.log('🚀 Copilot Project CLI');
    console.log('======================\n');

    if (!this.command || this.command === '--help' || this.command === '-h') {
      this.showHelp();
      return;
    }

    switch (this.command) {
      case 'setup':
        this.runSetup();
        break;
      case 'config':
        this.runConfig();
        break;
      case 'validate':
        this.runValidate();
        break;
      case 'demo':
        this.runDemo();
        break;
      case 'sync':
        this.runSync();
        break;
      default:
        console.log(`❌ Comando desconhecido: ${this.command}`);
        console.log('Use --help para ver comandos disponíveis.\n');
        this.showHelp();
        process.exit(1);
    }
  }

  showHelp() {
    console.log(`
📋 Comandos disponíveis:

🔧 CONFIGURAÇÃO:
  setup         Configurar padronização completa do projeto
                (Husky, CommitLint, Prettier, ESLint, Changesets)
  
  config        Configurar apenas GitHub Copilot
                (Instruções, Prompts, Chatmodes)

🔍 VALIDAÇÃO:
  validate      Validar configuração existente
  demo          Executar demonstração interativa

📚 DOCUMENTAÇÃO:
  sync <framework>  Sincronizar documentação de framework
                    Exemplos: sync tailwindcss, sync jest

🆘 AJUDA:
  --help, -h    Mostrar esta mensagem

📖 Exemplos de uso:
  npx copilot-project setup      # Configuração completa
  npx copilot-project config     # Só Copilot
  npx copilot-project validate   # Verificar setup
  npx copilot-project demo       # Demonstração
  npx copilot-project sync jest  # Sync docs do Jest

🔗 Mais informações:
  https://github.com/ArthurProjectCorrea/copilot-project
`);
  }

  runSetup() {
    console.log('🔧 Executando configuração completa do projeto...\n');

    const setupScript = path.join(this.scriptsDir, 'setup-project-standards.js');

    if (!existsSync(setupScript)) {
      console.error('❌ Script de setup não encontrado:', setupScript);
      process.exit(1);
    }

    try {
      execSync(`node "${setupScript}" ${this.args.slice(1).join(' ')}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error(
        '❌ Erro ao executar setup:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  runConfig() {
    console.log('🤖 Configurando GitHub Copilot...\n');

    const configScript = path.join(this.scriptsDir, 'copilot-config.js');

    if (!existsSync(configScript)) {
      console.error('❌ Script de config não encontrado:', configScript);
      process.exit(1);
    }

    try {
      execSync(`node "${configScript}" ${this.args.slice(1).join(' ')}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error(
        '❌ Erro ao executar config:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  runValidate() {
    console.log('🔍 Validando configuração do projeto...\n');

    const validateScript = path.join(this.scriptsDir, 'validate-project-standards.js');

    if (!existsSync(validateScript)) {
      console.error('❌ Script de validação não encontrado:', validateScript);
      process.exit(1);
    }

    try {
      execSync(`node "${validateScript}" ${this.args.slice(1).join(' ')}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error(
        '❌ Erro ao executar validação:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  runDemo() {
    console.log('🎯 Executando demonstração interativa...\n');

    const demoScript = path.join(this.scriptsDir, 'demo-project-standards.js');

    if (!existsSync(demoScript)) {
      console.error('❌ Script de demo não encontrado:', demoScript);
      process.exit(1);
    }

    try {
      execSync(`node "${demoScript}" ${this.args.slice(1).join(' ')}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error(
        '❌ Erro ao executar demo:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  runSync() {
    const framework = this.args[1];

    if (!framework) {
      console.log('❌ Framework não especificado.');
      console.log('Uso: npx copilot-project sync <framework>');
      console.log('Exemplos: sync jest, sync tailwindcss, sync nestjs\n');
      process.exit(1);
    }

    console.log(`📚 Sincronizando documentação do ${framework}...\n`);

    const syncScript = path.join(this.scriptsDir, 'sync-docs.js');

    if (!existsSync(syncScript)) {
      console.error('❌ Script de sync não encontrado:', syncScript);
      process.exit(1);
    }

    try {
      execSync(`node "${syncScript}" ${framework}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error(
        '❌ Erro ao executar sync:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }
}

// Executar CLI
const cli = new CopilotProjectCLI();
cli.run();
