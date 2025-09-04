# GitHub Secrets Configuration

Para publicar automaticamente no npm, você precisa configurar os seguintes secrets no GitHub:

## 📋 Secrets Necessários

### 1. NPM_TOKEN

- **Descrição**: Token de autenticação para publicar no npm
- **Como obter**:
  1. Acesse [npmjs.com](https://www.npmjs.com/) e faça login
  2. Vá em **Profile** → **Access Tokens**
  3. Clique em **Generate New Token**
  4. Selecione **Automation** (recomendado para CI/CD)
  5. Copie o token gerado

### 2. GITHUB_TOKEN

- **Descrição**: Token para operações no GitHub (criação de releases, etc.)
- **Status**: ✅ **Já configurado automaticamente** pelo GitHub Actions

## ⚙️ Como Configurar no GitHub

1. Vá para o repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione cada secret:
   - **Name**: `NPM_TOKEN`
   - **Secret**: Cole o token do npm

## 🔐 Segurança

- ❌ **NUNCA** commite tokens diretamente no código
- ✅ **SEMPRE** use GitHub Secrets para informações sensíveis
- 🔄 **ROTACIONE** tokens periodicamente
- 📝 **DOCUMENTE** quais tokens são necessários

## 🚀 Workflows Disponíveis

### Automático (release.yml)

- **Trigger**: Push para branch `main`
- **Processo**: Changeset automático + publicação
- **Uso**: Para releases normais via changesets

### Manual (manual-publish.yml)

- **Trigger**: Workflow manual
- **Processo**: Publicação imediata com version bump
- **Uso**: Para releases de emergência ou testes

## ✅ Verificação

Para verificar se está configurado corretamente:

1. Execute o workflow manual com `dry_run: true`
2. Verifique se não há erros de autenticação
3. Confirme que o token tem permissões de publicação

## 🆘 Solução de Problemas

### Erro: "401 Unauthorized"

- Verifique se o NPM_TOKEN está correto
- Confirme que o token tem permissões de publicação
- Verifique se o token não expirou

### Erro: "403 Forbidden"

- Confirme que você tem permissão para publicar o pacote
- Verifique se o nome do pacote não está reservado
- Confirme que você é o owner/collaborator do pacote
