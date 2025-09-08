# 🔐 GitHub Token Setup Guide

Este guia explica como configurar tokens do GitHub para evitar rate limiting ao sincronizar documentação.

## 📊 Rate Limits Comparados

| Contexto             | Token                   | Rate Limit           | Reset       |
| -------------------- | ----------------------- | -------------------- | ----------- |
| **Sem autenticação** | Nenhum                  | 60 requests/hora     | A cada hora |
| **Com GITHUB_TOKEN** | Personal Access Token   | 5.000 requests/hora  | A cada hora |
| **GitHub Actions**   | GITHUB_TOKEN automático | 1.000+ requests/hora | Especial    |

## 🚀 Configuração Local (GITHUB_TOKEN)

### 1. Criar Personal Access Token (Classic)

1. Acesse [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Clique em "Generate new token (classic)"
3. Configure:
   - **Note**: `copilot-docs-sync`
   - **Expiration**: 90 days (ou conforme preferência)
   - **Scopes necessários**:
     - ✅ **`public_repo`** - Acesso completo a repositórios públicos

   **⚠️ Importante**: Apenas o escopo `public_repo` é necessário, pois o script acessa apenas repositórios públicos:
   - `jestjs/jest` (Jest documentation)
   - `nestjs/docs.nestjs.com` (NestJS documentation)
   - `vercel/next.js` (Next.js documentation)
   - `prisma/docs` (Prisma documentation)
   - `tailwindlabs/tailwindcss.com` (Tailwind CSS documentation)

4. Clique em "Generate token"
5. **Copie o token** (você não verá novamente!)

### 2. Configurar Variável de Ambiente

#### Windows PowerShell:

```powershell
# Sessão atual
$env:GITHUB_TOKEN = "seu_token_aqui"

# Permanente (opcional)
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "seu_token_aqui", "User")
```

#### Windows CMD:

```cmd
set GITHUB_TOKEN=seu_token_aqui
```

#### Linux/macOS:

```bash
export GITHUB_TOKEN="seu_token_aqui"

# Para tornar permanente, adicione ao ~/.bashrc ou ~/.zshrc:
echo 'export GITHUB_TOKEN="seu_token_aqui"' >> ~/.bashrc
```

### 3. Testar Configuração

```powershell
# Verificar se o token está configurado
echo $env:GITHUB_TOKEN

# Testar com o script
node scripts/sync-docs.js help
```

## 📋 Alternativa: Configuração via .env

Crie um arquivo `.env` na raiz do projeto:

```bash
# GitHub Personal Access Token para sincronização de documentação
GITHUB_TOKEN=seu_token_aqui
```

**Nota**: Certifique-se de adicionar `.env` ao `.gitignore` para não commitar o token!

```bash
# Verificar se está configurado
node -e "console.log(process.env.PAT_TOKEN ? '✅ PAT_TOKEN configurado' : '❌ PAT_TOKEN não encontrado')"

# Testar sincronização
node scripts/sync-docs.js sync jest
```

## 🤖 GitHub Actions (Automático)

### Configuração nos Secrets

1. Acesse seu repositório → Settings → Secrets and variables → Actions
2. Clique em "New repository secret"
3. Nome: `PAT_TOKEN`
4. Value: Cole seu Personal Access Token
5. Clique em "Add secret"

### Configuração no Workflow

O workflow já está configurado para usar tanto `GITHUB_TOKEN` (automático) quanto `PAT_TOKEN` (opcional):

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Token automático
  PAT_TOKEN: ${{ secrets.PAT_TOKEN }} # Token personalizado (opcional)
```

## 🔍 Detecção Automática de Token

O script automaticamente detecta e usa tokens na seguinte ordem de prioridade:

1. **PAT_TOKEN** (preferência)
2. **GITHUB_TOKEN** (fallback)
3. **Sem token** (limitado a 60 requests/hora)

```javascript
const githubToken = process.env.GITHUB_TOKEN || process.env.PAT_TOKEN;
if (githubToken) {
  headers.Authorization = `token ${githubToken}`;
  console.log(`🔑 Using GitHub token for authentication`);
}
```

## ✅ Verificação de Status

### Comando para verificar rate limit atual:

```powershell
(Invoke-RestMethod -Uri "https://api.github.com/rate_limit").rate
```

### Saída esperada:

```
limit     : 5000  # Com token
remaining : 4999
reset     : 1757295686
used      : 1
resource  : core
```

## 🎯 Benefícios do Token

### ✅ Com PAT_TOKEN configurado:

- **Rate limit**: 5.000 requests/hora
- **Sem bloqueios**: Sincronização completa sem interrupções
- **Acesso privado**: Pode acessar repositórios privados (se configurado)
- **Logs claros**: Mostra `🔑 Using GitHub token for authentication`

### ❌ Sem token:

- **Rate limit**: 60 requests/hora
- **Bloqueios frequentes**: Error 403 após poucas requisições
- **Acesso limitado**: Apenas repositórios públicos
- **Timeouts**: Falhas durante sincronização de frameworks grandes

## 🔒 Segurança

### ✅ Boas práticas:

- **Escopo mínimo**: Use apenas `public_repo` para repositórios públicos
- **Rotação regular**: Renove tokens a cada 90 dias
- **Ambiente seguro**: Nunca commit tokens no código
- **Variáveis de ambiente**: Use sempre variáveis de ambiente

### ❌ Evite:

- Tokens com escopo `repo` (muito permissivo)
- Tokens hardcoded no código
- Compartilhamento de tokens
- Tokens sem expiração

## 🚨 Troubleshooting

### Error 403 "rate limit":

```
❌ Access forbidden (403). You may have hit the GitHub API rate limit.
```

**Solução**: Configure PAT_TOKEN conforme este guia.

### Token não detectado:

```bash
# Verificar variável
echo $PAT_TOKEN  # Linux/macOS
echo $env:PAT_TOKEN  # PowerShell
```

### Token inválido:

- Verifique se o token não expirou
- Confirme os scopes corretos
- Gere um novo token se necessário

## 📚 Recursos Adicionais

- [GitHub API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
- [Creating Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
