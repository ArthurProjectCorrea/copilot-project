# Sincronização de Documentação

Est### NestJS Documentation

1. **Clone do Repositório**: Faz clone raso do repositório oficial da documentação do NestJS
2. **Extração de Documentos**: Copia todos os arquivos `.md` e alguns `.json` específicos da pasta:
   - `content/` (documentação principal)
3. **Filtros Aplicados**: Remove arquivos não relevantes como README, package.json, etc.
4. **Formatação**: Executa `pnpm format` para padronizar o código
5. **Limpeza**: Remove repositório temporário
6. **Verificação**: Detecta se houve mudanças na documentação
7. **Commit Automático**: Faz commit apenas se houver alterações

### Workflow Automático

````yaml
# .github/workflows/update-jest-docs.yml
name: Update Jest Documentation

on:
  schedule:
    - cron: "0 2 * * 1" # toda segunda às 02:00 UTC
  workflow_dispatch: # permite execução manual

# .github/workflows/update-nest-docs.yml
name: Update NestJS Documentation

on:
  schedule:
    - cron: "0 3 * * 1" # toda segunda às 03:00 UTC
  workflow_dispatch: # permite execução manual
```antém documentação atualizada de bibliotecas e frameworks importantes através de sincronização automatizada com seus repositórios oficiais.

## 📚 Documentação Disponível

### Jest Documentation (`docs/jest.js/`)

Documentação completa do Jest sincronizada automaticamente do repositório oficial [jestjs/jest](https://github.com/jestjs/jest).

- **Atualização Automática**: Toda segunda-feira às 02:00 UTC
- **Atualização Manual**: `npm run update:jest-docs` ou `npm run docs:jest`
- **Fonte**: https://github.com/jestjs/jest/tree/main/docs

### NestJS Documentation (`docs/nest.js/`)

Documentação completa do NestJS sincronizada automaticamente do repositório oficial [nestjs/docs.nestjs.com](https://github.com/nestjs/docs.nestjs.com).

- **Atualização Automática**: Toda segunda-feira às 03:00 UTC
- **Atualização Manual**: `npm run update:nest-docs` ou `npm run docs:nest`
- **Fonte**: https://github.com/nestjs/docs.nestjs.com/tree/master/content

### Prisma Documentation (`docs/prisma/`)

Documentação completa do Prisma sincronizada automaticamente do repositório oficial [prisma/docs](https://github.com/prisma/docs).

- **Atualização Automática**: Toda segunda-feira às 04:00 UTC
- **Atualização Manual**: `npm run update:prisma-docs` ou `npm run docs:prisma`
- **Fonte**: https://github.com/prisma/docs/tree/main/content
- **Conversão**: MDX → Markdown automática

## 🔄 Como Funciona a Sincronização

### Jest Documentation

1. **Clone do Repositório**: Faz clone raso do repositório oficial do Jest
2. **Extração de Documentos**: Copia todos os arquivos `.md` das pastas:
   - `docs/` (documentação principal)
   - `website/docs/` (documentação do website, se existir)
3. **Filtros Aplicados**: Remove arquivos não relevantes como README, CONTRIBUTING, etc.
4. **Formatação**: Executa `pnpm format` para padronizar o código
5. **Limpeza**: Remove repositório temporário
6. **Verificação**: Detecta se houve mudanças na documentação
7. **Commit Automático**: Faz commit apenas se houver alterações

### NestJS Documentation

1. **Clone do Repositório**: Faz clone raso do repositório oficial da documentação do NestJS
2. **Extração de Documentos**: Copia todos os arquivos `.md` e alguns `.json` específicos da pasta:
   - `content/` (documentação principal)
3. **Filtros Aplicados**: Remove arquivos não relevantes como README, package.json, etc.
4. **Formatação**: Executa `pnpm format` para padronizar o código
5. **Limpeza**: Remove repositório temporário
6. **Verificação**: Detecta se houve mudanças na documentação
7. **Commit Automático**: Faz commit apenas se houver alterações

### Prisma Documentation

1. **Clone do Repositório**: Faz clone raso do repositório oficial da documentação do Prisma
2. **Instalação de Dependências**: Instala automaticamente `unified`, `remark-parse`, `remark-stringify`, `remark-mdx`
3. **Conversão MDX→MD**: Converte todos os arquivos `.mdx` para `.md` usando unified/remark
4. **Extração de Documentos**: Copia arquivos da pasta `content/` incluindo:
   - Documentos `.mdx` convertidos para `.md`
   - Documentos `.md` existentes
   - Imagens e assets (`.png`, `.jpg`, `.svg`)
   - Arquivos de configuração relevantes
5. **Fallback de Conversão**: Se a conversão unified falhar, usa regex simples como fallback
6. **Formatação**: Executa `pnpm format` para padronizar o código
7. **Limpeza**: Remove repositório temporário e dependências temporárias
8. **Verificação**: Detecta se houve mudanças na documentação
9. **Commit Automático**: Faz commit apenas se houver alterações

### Workflow Automático

```yaml
# .github/workflows/update-jest-docs.yml
name: Update Jest Documentation

on:
  schedule:
    - cron: "0 2 * * 1" # toda segunda às 02:00 UTC
  workflow_dispatch: # permite execução manual

# .github/workflows/update-nest-docs.yml
name: Update NestJS Documentation

on:
  schedule:
    - cron: "0 3 * * 1" # toda segunda às 03:00 UTC
  workflow_dispatch: # permite execução manual

# .github/workflows/update-prisma-docs.yml
name: Update Prisma Documentation

on:
  schedule:
    - cron: "0 4 * * 1" # toda segunda às 04:00 UTC
  workflow_dispatch: # permite execução manual
````

## 🚀 Uso Manual

### Atualizar Documentação do Jest

```bash
# Opção 1
npm run update:jest-docs

# Opção 2
npm run docs:jest

# Diretamente
node scripts/update-jest-docs-manual.js
```

### Atualizar Documentação do NestJS

````bash
# Opção 1
npm run update:nest-docs

# Opção 2
npm run docs:nest

# Diretamente
node scripts/update-nest-docs-manual.js
```

### Atualizar Documentação do Prisma

```bash
# Opção 1
npm run update:prisma-docs

# Opção 2
npm run docs:prisma

# Diretamente
node scripts/update-prisma-docs-manual.js
```### Executar Workflow Manualmente

1. Vá para a aba **Actions** do repositório
2. Selecione **Update Jest Documentation**, **Update NestJS Documentation** ou **Update Prisma Documentation**
3. Clique em **Run workflow**

## 📁 Estrutura de Arquivos

````

scripts/
├── update-jest-docs.js # Script principal de sincronização do Jest
├── update-jest-docs-manual.js # Script para execução manual do Jest
├── update-nest-docs.js # Script principal de sincronização do NestJS
└── update-nest-docs-manual.js # Script para execução manual do NestJS

.github/workflows/
├── update-jest-docs.yml # Workflow de automação do Jest
└── update-nest-docs.yml # Workflow de automação do NestJS

docs/
├── jest.js/ # Documentação do Jest
│ ├── \_TypeScriptExamplesNote.md
│ ├── GettingStarted.md
│ ├── Configuration.md
│ ├── ExpectAPI.md
│ └── ... (outros arquivos)
└── nest.js/ # Documentação do NestJS
├── \_SyncInfo.md
├── introduction.md
├── controllers.md
├── fundamentals/
├── graphql/
└── ... (outros arquivos e pastas)

````

## 🔧 Personalização

### Adicionando Nova Documentação

Para adicionar sincronização de outra biblioteca:

1. **Criar Script**: Baseie-se em `scripts/update-jest-docs.js`
2. **Configurar Workflow**: Crie novo arquivo em `.github/workflows/`
3. **Adicionar npm script**: Inclua comando em `package.json`
4. **Atualizar README**: Documente a nova sincronização

### Configurar Filtros

No script de sincronização, ajuste a função de filtro:

```js
function isDocFile(filePath, fileName) {
  // Personalizar lógica de filtro
  if (!fileName.endsWith('.md')) return false;

  const ignoredFiles = [
    'README.md',
    'CONTRIBUTING.md',
    // adicionar mais arquivos para ignorar
  ];

  return !ignoredFiles.includes(fileName);
}
````

## 🐛 Troubleshooting

### Erro de Permissão Git

Se o workflow falhar por permissão:

1. Verificar se `GITHUB_TOKEN` tem permissões adequadas
2. Verificar configurações de branch protection

### Erro de Dependências

Se o script falhar por dependências:

1. Executar `npm ci` para instalar dependências
2. Verificar versão do Node.js (requer 18+)

### Documentação Não Atualizada

1. Verificar se o repositório fonte mudou estrutura
2. Ajustar caminhos no script de sincronização
3. Verificar logs do workflow para erros específicos

## 📝 Logs e Monitoramento

- **Workflow Logs**: Disponíveis na aba Actions do GitHub
- **Execução Manual**: Output direto no terminal
- **Status**: Indicado por commits automáticos com prefixo `docs:`

## 🤝 Contribuindo

Para melhorar o sistema de sincronização:

1. Fork do repositório
2. Criar branch para sua feature
3. Implementar melhorias
4. Criar Pull Request

### Exemplos de Melhorias

- Adicionar suporte a outros formatos (MDX, RST)
- Implementar cache para evitar downloads desnecessários
- Adicionar validação de links na documentação
- Criar sistema de notificações para falhas
