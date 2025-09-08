# Copy Rules Configuration

O arquivo `scripts/copy-rules.json` permite controlar quais arquivos são copiados durante a instalação do pacote `copilot-project`.

## 📋 Estrutura do Arquivo

```json
{
  "copyRules": {
    "instructions": {
      "enabled": true,
      "files": ["*.instructions.md"],
      "exclude": ["docs-implementer.instructions.md"]
    },
    "prompts": {
      "enabled": true,
      "files": ["*.prompt.md"],
      "exclude": ["docs-implementer.prompt.md"]
    },
    "chatmodes": {
      "enabled": true,
      "files": ["*.chatmode.md"],
      "exclude": []
    }
  },
  "globalExcludes": ["version.json", "*.log", "*.tmp", ".DS_Store"],
  "version": "1.1.0",
  "lastUpdated": "2025-09-07T12:00:00.000Z"
}
```

## 🎯 Configurações Disponíveis

### Por Diretório (`copyRules`)

Cada diretório pode ter suas próprias regras:

- **`enabled`**: `true/false` - Habilita/desabilita cópia para este diretório
- **`files`**: Array de padrões de arquivos para incluir
- **`exclude`**: Array de padrões de arquivos para excluir

### Exclusões Globais (`globalExcludes`)

Arquivos que nunca serão copiados, independente das regras por diretório.

### Padrões Suportados

- `*.md` - Todos os arquivos .md
- `*.instructions.md` - Apenas arquivos de instrução
- `specific-file.md` - Arquivo específico
- `prefix-*` - Arquivos que começam com "prefix-"

## 🚀 Comandos Úteis

```bash
# Visualizar regras atuais
node scripts/copilot-config.js --show-rules

# Obter caminho do arquivo de regras
node scripts/copilot-config.js --edit-rules

# Executar cópia com regras atuais
node scripts/copilot-config.js

# Forçar execução (modo de teste)
node scripts/copilot-config.js --force
```

## 📊 Exemplos de Uso

### Desabilitar arquivos específicos

```json
{
  "copyRules": {
    "instructions": {
      "enabled": true,
      "files": ["*.instructions.md"],
      "exclude": ["docs-implementer.instructions.md", "experimental.instructions.md"]
    }
  }
}
```

### Copiar apenas arquivos básicos

```json
{
  "copyRules": {
    "instructions": {
      "enabled": true,
      "files": ["dev.instructions.md", "jest.instructions.md"],
      "exclude": []
    },
    "prompts": {
      "enabled": false,
      "files": [],
      "exclude": []
    }
  }
}
```

### Incluir arquivos de workflow

```json
{
  "copyRules": {
    "workflows": {
      "enabled": true,
      "files": ["*.yml", "*.yaml"],
      "exclude": ["deploy.yml"]
    }
  }
}
```

## 🔧 Controle de Versão

O sistema mantém versão das regras para rastrear mudanças:

- **`version`**: Versão das regras
- **`lastUpdated`**: Timestamp da última atualização

Quando as regras mudam, o sistema detecta e aplica automaticamente na próxima execução.

## 💡 Dicas

1. **Teste suas regras** com `--force` antes de distribuir
2. **Use padrões específicos** para maior controle
3. **Monitore o log** para ver quais arquivos foram ignorados
4. **Mantenha backup** das regras importantes
5. **Documente mudanças** no campo `version`

## 🚨 Casos de Uso Comuns

### Distribuição Mínima

Para projetos que só querem funcionalidades básicas:

```json
{
  "copyRules": {
    "instructions": {
      "enabled": true,
      "files": ["dev.instructions.md"],
      "exclude": []
    },
    "prompts": { "enabled": false },
    "chatmodes": { "enabled": false }
  }
}
```

### Distribuição Completa (Padrão)

Para máxima funcionalidade:

```json
{
  "copyRules": {
    "instructions": { "enabled": true, "files": ["*.instructions.md"] },
    "prompts": { "enabled": true, "files": ["*.prompt.md"] },
    "chatmodes": { "enabled": true, "files": ["*.chatmode.md"] }
  }
}
```

### Distribuição Personalizada

Para casos específicos com necessidades únicas - edite conforme necessário.
