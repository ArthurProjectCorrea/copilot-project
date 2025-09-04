# Configuração do GitHub Actions para Changesets

## Problema Comum: Erro de Permissão 403

Se você encontrar o erro:

```
remote: Permission to ArthurProjectCorrea/copilot-project.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/ArthurProjectCorrea/copilot-project/': The requested URL returned error: 403
```

## Soluções

### 1. Verificar Permissões do Workflow

Certifique-se de que o workflow tenha as permissões corretas:

```yaml
permissions:
  contents: write
  pull-requests: write
  id-token: write
```

### 2. Verificar Configurações do Repositório

1. Vá para as configurações do seu repositório no GitHub
2. Navegue para `Settings` > `Actions` > `General`
3. Em "Workflow permissions", certifique-se de que está selecionado:
   - "Read and write permissions"
   - "Allow GitHub Actions to create and approve pull requests"

### 3. Usar Personal Access Token (Alternativa)

Se as permissões padrão não funcionarem, você pode usar um PAT:

1. Crie um Personal Access Token no GitHub:
   - Vá para `Settings` > `Developer settings` > `Personal access tokens` > `Tokens (classic)`
   - Gere um novo token com permissões: `repo`, `write:packages`

2. Adicione o token como secret no repositório:
   - Vá para `Settings` > `Secrets and variables` > `Actions`
   - Adicione um novo secret chamado `PAT_TOKEN` com o valor do seu token

3. Atualize o workflow para usar o PAT:

```yaml
- name: Create Release Pull Request or Publish to npm
  uses: changesets/action@v1
  with:
    publish: pnpm release
    title: '🚀 Release: Version Packages'
    commit: 'chore(release): publish packages'
    createGithubReleases: true
  env:
    GITHUB_TOKEN: ${{ secrets.PAT_TOKEN }} # Use PAT ao invés do GITHUB_TOKEN
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 4. Verificar Configurações da Branch

Certifique-se de que a branch `main` não tem proteções que impeçam o push do bot:

1. Vá para `Settings` > `Branches`
2. Se houver regras de proteção para `main`, certifique-se de que:
   - "Restrict pushes that create files" está desabilitado
   - Ou adicione `github-actions[bot]` às exceções

## Comandos para Testar Localmente

```bash
# Testar changesets localmente
pnpm changeset

# Verificar versão
pnpm changeset version

# Verificar se o build funciona
pnpm run build

# Testar lint
pnpm run lint
```

## Status dos Changesets

Para verificar o status atual dos changesets:

```bash
pnpm changeset status
```
