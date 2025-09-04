# Documentation Implementer Chat Mode

Este chat mode automatiza completamente a implementação de sistemas de sincronização de documentação para novos frameworks e ferramentas.

## Como Usar

Para implementar um novo sistema de documentação, use o comando padrão:

```
implemente a documentação de "https://github.com/owner/repo" usando a documentação na pasta "target-folder"
```

### Exemplos Práticos

```
implemente a documentação de "https://github.com/vitejs/vite" usando a documentação na pasta "vite"
```

```
implemente a documentação de "https://github.com/microsoft/playwright" usando a documentação na pasta "playwright"
```

```
implemente a documentação de "https://github.com/expressjs/express" usando a documentação na pasta "express"
```

## O que o Sistema Faz Automaticamente

1. **Análise do Repositório**: Examina a estrutura de documentação do GitHub
2. **Criação do Workflow**: Gera `.github/workflows/{framework}-docs-sync.yml`
3. **Scripts de Sincronização**: Cria `scripts/sync-{framework}-docs.js` e `scripts/manual-{framework}-sync.js`
4. **Integração Copilot**: Gera `.github/instructions/{framework}.instructions.md` e `.github/prompts/{framework}.prompt.md`
5. **Atualização Universal**: Atualiza `dev.chatmode.md` para incluir o novo framework
6. **Scripts NPM**: Adiciona comandos ao `package.json`

## Características Técnicas

- **Conversão MDX→MD**: Suporte completo com fallback regex
- **Compatibilidade Cross-Platform**: Windows e Unix
- **Agendamento Inteligente**: Evita conflitos com workflows existentes
- **Filtragem de Arquivos**: Apenas .md e .mdx
- **Tratamento de Erros**: Logging comprehensivo
- **Detecção de Framework**: Identificação automática do tipo

## Padrões Seguidos

- Inglês técnico em toda documentação
- Consistência com sistemas existentes (Jest, NestJS, Next.js, Prisma)
- Estrutura de arquivos padronizada
- Tratamento de erros robusto
- Documentação comprehensiva

## Frameworks Suportados

O sistema detecta automaticamente e adapta templates para:

- **Web Frameworks**: React, Vue, Angular, Svelte
- **Backend Frameworks**: Express, Fastify, Koa, Hapi
- **Testing Frameworks**: Jest, Vitest, Cypress, Playwright
- **ORMs/Database**: Prisma, TypeORM, Sequelize, Mongoose
- **Build Tools**: Webpack, Vite, Rollup, Parcel
- **Utility Libraries**: Lodash, Ramda, Date-fns

## Qualidade Assegurada

- Validação de sintaxe do GitHub Actions
- Teste de funcionalidade dos scripts Node.js
- Verificação de formatação dos arquivos Copilot
- Compatibilidade cross-platform
- Integração seamless com infraestrutura existente
