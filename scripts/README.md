# GitHub Copilot Configuration Script

Este script automatiza a configuração dos arquivos necessários para o GitHub Copilot em projetos que utilizam o pacote `copilot-project`.

## Funcionalidades

- ✅ **Detecção Automática**: Verifica se está sendo executado no projeto fonte ou em um projeto que usa o pacote
- 📁 **Criação de Diretórios**: Cria automaticamente as pastas `.github/chatmodes`, `.github/instructions` e `.github/prompts`
- 🔄 **Verificação de Atualizações**: Compara versões e hashes de arquivos para detectar se precisa atualizar
- 📦 **Controle de Versão**: Utiliza arquivo `version.json` para controle de versões dos arquivos de configuração
- 🎯 **Atualizações Inteligentes**: Só atualiza arquivos que realmente mudaram

## Como Usar

### Execução Automática

O script é executado automaticamente em várias situações:

- **🔧 Instalação**: `npm install copilot-project` (executa no `postinstall`)
- **🔄 Atualização**: `npm update copilot-project` (executa no `postupdate`) 
- **📦 Preparação**: Durante empacotamento do projeto (executa no `prepack`)

```bash
npm install copilot-project
# ou
pnpm add copilot-project
# ou
yarn add copilot-project
```

### Execução Manual

Você pode executar o script manualmente de várias formas:

```bash
# Via script do projeto
npm run init-config

# Via caminho direto
node node_modules/copilot-project/scripts/init-github-config.js

# Via comando global (após instalação)
npx copilot-config

# Via script wrapper
node node_modules/copilot-project/scripts/copilot-config.js
```

### Opções de Linha de Comando

```bash
# Execução normal
npx copilot-config

# Modo force (para testes no projeto fonte)
npx copilot-config --force

# Ajuda
npx copilot-config --help
```

## Estrutura Criada

O script cria a seguinte estrutura no seu projeto:

```
.github/
├── version.json                           # Controle de versão
├── chatmodes/
│   ├── changeset-analyzer.chatmode.md
│   ├── commit-analyzer.chatmode.md
│   └── dev.chatmode.md
├── instructions/
│   ├── changeset-analyzer.instructions.md
│   ├── commit-analyzer.instructions.md
│   ├── dev.instructions.md
│   ├── jest.instructions.md
│   └── nest.instructions.md
└── prompts/
    ├── changeset-analyzer.prompt.md
    ├── commit-analyzer.prompt.md
    ├── dev.prompt.md
    ├── jest.prompt.md
    └── nest.prompt.md
```

## Configuração no package.json

Para usar este script automaticamente, ele já está configurado com os lifecycle scripts necessários:

```json
{
  "scripts": {
    "postinstall": "node scripts/init-github-config.js",
    "postupdate": "node scripts/init-github-config.js", 
    "prepack": "node scripts/init-github-config.js",
    "init-config": "node scripts/init-github-config.js"
  },
  "bin": {
    "copilot-config": "scripts/copilot-config.js"
  }
}
```

## Contextos de Execução

O script detecta automaticamente o contexto e adapta suas mensagens:

- **Installation**: Durante `npm install` - configura tudo pela primeira vez
- **Update**: Durante `npm update` - verifica e atualiza configurações  
- **Package preparation**: Durante `npm pack` - garante configuração atualizada
- **Manual execution**: Quando executado manualmente pelo usuário

## Comportamento de Atualização

O script é inteligente e:

1. **Primeira execução**: Cria todos os arquivos
2. **Execuções subsequentes**: 
   - Verifica se há atualizações disponíveis
   - Compara versões via `version.json`
   - Compara hashes SHA256 dos arquivos
   - Só atualiza arquivos que realmente mudaram

## Logs

O script fornece logs detalhados:

- 📁 **Diretórios criados**: Quando uma nova pasta é criada
- ✅ **Arquivos criados/atualizados**: Quando um arquivo é modificado
- ℹ️ **Arquivos atualizados**: Quando um arquivo já está na versão mais recente
- 📊 **Resumo**: Estatísticas finais da execução

## Exemplo de Saída

```
🚀 Initializing GitHub Copilot configuration...
📍 Working directory: /path/to/your/project
📁 Created directory: /path/to/your/project/.github/chatmodes
✅ Created/Updated: /path/to/your/project/.github/chatmodes/dev.chatmode.md
ℹ️ File up to date: /path/to/your/project/.github/prompts/jest.prompt.md

📊 Summary:
📄 Files created: 13
🔄 Files updated: 0
📦 Package version: 1.0.0 (2025-09-04)
✨ GitHub Copilot configuration completed successfully!
```
