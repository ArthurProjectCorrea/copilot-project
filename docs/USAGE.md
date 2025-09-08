# 📋 Guia de Uso Completo - Copilot Project

## 🚀 Início Rápido

### 1. Projeto Novo (Recomendado)

```bash
# Criar novo projeto
mkdir meu-app && cd meu-app
npm init -y

# Configurar tudo
npx copilot-project setup

# Resultado: Projeto 100% configurado com todas as ferramentas
```

### 2. Projeto Existente

```bash
# Verificar estado atual
npx copilot-project validate

# Configurar o que falta
npx copilot-project setup

# Verificar novamente
npx copilot-project validate
```

## 🔍 Exemplos de Validação

### Antes da Configuração

```
❌ ERROS:
   ❌ commitlint.config.js não encontrado
   ❌ .prettierrc não encontrado
   ❌ eslint.config.mjs não encontrado
   ❌ .husky/commit-msg não encontrado

📈 Taxa de Sucesso: 65%
```

### Após a Configuração

```
✅ SUCESSOS:
   ✅ Todas as ferramentas configuradas
   ✅ Hooks do Git funcionais
   ✅ Dependências instaladas

📈 Taxa de Sucesso: 100%
```

## 📚 Workflows de Desenvolvimento

### 1. Commit com Qualidade

```bash
# Formatar código automaticamente
npm run format

# Verificar qualidade
npm run lint

# Commit interativo (Commitizen)
npm run commit
```

### 2. Release com Changesets

```bash
# Criar changeset para mudanças
npm run changeset

# Versionar pacotes
npm run changeset:version

# Publicar
npm run changeset:publish
```

### 3. Sincronização de Documentação

```bash
# Framework específico
npx copilot-project sync jest
npx copilot-project sync tailwindcss

# Todas as documentações
npm run docs:sync:all
```

## 🛠️ Configurações Avançadas

### Copy Rules Personalizadas

Arquivo: `scripts/copy-rules.json`

```json
{
  ".github": {
    "include": ["instructions/**", "chatmodes/**"],
    "exclude": ["workflows/deploy.yml"]
  },
  "scripts": {
    "include": ["*.js"],
    "exclude": ["test-*.js"]
  }
}
```

### Configuração de Frameworks

Arquivo: `docs-config.json`

```json
{
  "frameworks": {
    "vue": {
      "repository": "vuejs/docs",
      "branch": "main",
      "docsPath": "src",
      "schedule": "0 8 * * 1",
      "convertMdx": true
    }
  }
}
```

## 🎯 Casos de Uso Específicos

### Para Equipes

```bash
# Setup para todos os desenvolvedores
echo "npx copilot-project setup" >> scripts/onboarding.sh

# Validação no CI/CD
npx copilot-project validate
```

### Para Monorepos

```bash
# Configurar workspace raiz
npx copilot-project setup

# Configurar subprojetos
cd packages/api && npx copilot-project config
cd packages/ui && npx copilot-project config
```

### Para Projetos Open Source

```bash
# Configuração completa + documentação
npx copilot-project setup
npm run docs:sync:all

# Automação de releases
npm run changeset
```

## 🔧 Troubleshooting

### Problema: Taxa de Sucesso Baixa

```bash
# Limpar configurações conflitantes
rm -rf .husky node_modules package-lock.json

# Reinstalar
npm install
npx copilot-project setup
```

### Problema: Documentação Não Sincroniza

```bash
# Debug da sincronização
DEBUG=* npx copilot-project sync jest

# Forçar sincronização
rm -rf docs/jest.js
npx copilot-project sync jest
```

### Problema: Hooks Não Funcionam

```bash
# Reconfigurar Husky
npx husky install
npx copilot-project setup
```

## 📊 Métricas de Qualidade

### Validação Completa Inclui:

- ✅ **Git**: Repositório e hooks configurados
- ✅ **Package Manager**: npm/pnpm/yarn detectado
- ✅ **Husky**: Pre-commit e commit-msg hooks
- ✅ **Commitlint**: Validação de commits
- ✅ **Prettier**: Formatação automática
- ✅ **ESLint**: Análise de código
- ✅ **Changesets**: Versionamento semântico
- ✅ **TypeScript**: Configuração opcional
- ✅ **Copilot**: Instruções e chatmodes
- ✅ **Documentação**: Sync local disponível

### Exemplo de Projeto 100% Configurado:

```
📊 Resultados da Validação
========================

✅ Package.json: Arquivo package.json encontrado
✅ Package Manager: Gerenciador: pnpm
✅ Git: Git instalado
✅ Git Repository: Repositório Git inicializado
✅ Husky: Diretório .husky encontrado
✅ Pre-commit Hook: Hook pre-commit configurado
✅ Commit-msg Hook: Hook commit-msg configurado
✅ Commitlint Config: Configuração do Commitlint encontrada
✅ Commitlint Dependencies: Dependências do Commitlint instaladas
✅ Prettier Config: Configuração do Prettier encontrada
✅ Prettier Ignore: Arquivo .prettierignore encontrado
✅ ESLint Config: Configuração do ESLint encontrada
✅ Changesets: Diretório .changeset encontrado
✅ Changesets Config: Configuração do Changesets encontrada
⚠️ TypeScript: Configuração do TypeScript encontrada
✅ Copilot Project: Pacote copilot-project instalado
✅ Copilot Docs: Documentação local disponível
✅ GitHub Directory: Diretório .github encontrado
✅ Copilot Instructions: Instruções do Copilot configuradas
✅ Copilot Chatmodes: Chatmodes do Copilot configurados

📈 Resumo:
Total: 17
✅ Passou: 16
❌ Falhou: 0
⚠️ Avisos: 1

📊 Taxa de Sucesso: 100.0%

🎉 Todas as verificações essenciais passaram!
```

## 🚀 Scripts Automatizados

### Package.json Atualizado

```json
{
  "scripts": {
    "setup": "npx copilot-project setup",
    "validate": "npx copilot-project validate",
    "demo": "npx copilot-project demo",
    "commit": "cz",
    "changeset": "changeset",
    "format": "prettier --write .",
    "lint": "eslint . --fix"
  }
}
```

### CLI Global

```bash
# Após instalação global
npm install -g copilot-project

# Usar em qualquer projeto
copilot-project setup
copilot-project validate
copilot-project sync tailwindcss
```

---

**🎯 Objetivo: Automatizar a excelência em desenvolvimento com zero configuração manual.**
