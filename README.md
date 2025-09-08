# 🤖 Copilot Chat Integration Plugin

**Essential npm/pnpm plugin that supercharges GitHub Copilot Chat with intelligent framework documentation, automated commit standards, and seamless development workflow integration.**

Transform your development experience with AI-powered assistance that understands your project's specific frameworks, maintains consistent code quality, and automates tedious setup tasks.

## ✨ Why This Plugin Transforms Your Workflow

### 🚀 **GitHub Copilot Chat Enhancement**

- **🧠 Intelligent Context**: Local framework documentation (Jest, Next.js, NestJS, Prisma, Tailwind CSS) accessible to Copilot Chat
- **📚 Specialized Instructions**: Framework-specific guidance that makes Copilot responses more accurate and relevant
- **💬 Custom Chat Modes**: Pre-configured prompts for commit analysis, changeset generation, and code reviews
- **🎯 Precision Assistance**: AI responses tailored to your exact tech stack and project patterns

### 🛠️ **Complete Development Standardization**

- **🪝 Husky**: Automated git hooks for code quality gates
- **📝 Commitizen**: Interactive commit interface with conventional standards
- **✨ Prettier**: Consistent code formatting across your entire project
- **🔍 ESLint**: Real-time code quality analysis and auto-fixing
- **📦 Changesets**: Semantic versioning with automated changelog generation
- **🎨 Lint-staged**: Pre-commit validation that prevents bad code from entering your repo

### � **Automated Documentation Sync**

- **⚡ Real-time Updates**: Latest framework documentation always available locally
- **🔄 MDX → Markdown**: Seamless conversion for Copilot Chat compatibility
- **⏰ GitHub Actions**: Scheduled automatic updates with zero maintenance
- **🚀 Performance**: Smart caching and incremental updates for lightning-fast sync

## 🚀 Quick Start

### Global Installation (Recommended)

```bash
# Using npm
npm install -g @copilot-kit/chat-integration

# Using pnpm
pnpm add -g @copilot-kit/chat-integration
```

### One-Command Setup

```bash
# Navigate to your project
cd my-awesome-project

# Complete setup with Copilot Chat integration
npx @copilot-kit/chat-integration setup

# Or use the global command
copilot-chat setup
```

### Chat-Only Integration

```bash
# Only configure GitHub Copilot Chat enhancements
npx @copilot-kit/chat-integration config

# Global command
copilot-setup config
```

## 📋 Available Commands

### Main CLI Interface

```bash
npx @copilot-kit/chat-integration <command>
```

| Command            | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `setup`            | Complete project setup (Husky, CommitLint, Prettier, ESLint, Changesets + Copilot) |
| `config`           | Configure only GitHub Copilot Chat enhancements (Instructions, Prompts, Chatmodes) |
| `validate`         | Validate existing configuration and integration status                             |
| `demo`             | Interactive demonstration of all features                                          |
| `sync <framework>` | Sync documentation for specific framework (jest, next, nest, prisma, tailwindcss)  |

### Global Commands

```bash
copilot-chat <command>    # Main CLI
copilot-setup <command>   # Alternative config command
```

### NPM Scripts Available

```bash
npm run setup          # Complete setup
npm run validate       # Validate configuration
npm run demo           # Interactive demo
npm run docs:sync      # Sync all framework documentation
npm run commit         # Commitizen interface
npm run changeset      # Create new changeset
```

## 🎯 Real-World Examples

### 1. New Project with Full Integration

```bash
# Create new project
mkdir my-ai-app && cd my-ai-app
npm init -y

# Install and configure everything
npx @copilot-kit/chat-integration setup

# Make your first standardized commit
git add .
npm run commit  # Interactive Commitizen interface
```

### 2. Existing Project Enhancement

```bash
# Check current configuration
npx @copilot-kit/chat-integration validate

# Add missing integrations
npx @copilot-kit/chat-integration setup

# Test Copilot Chat with enhanced context
# Open GitHub Copilot Chat and ask framework-specific questions
```

### 3. Framework Documentation Sync

```bash
# Sync specific framework docs for Copilot Chat
npx @copilot-kit/chat-integration sync jest
npx @copilot-kit/chat-integration sync tailwindcss

# Sync all supported frameworks
npm run docs:sync:all
```

### 4. Commit & Release Workflow

```bash
# Interactive commit with standards
npm run commit

# Create changeset for release
npm run changeset

# Generate release with automated changelog
npm run changeset:version
npm run changeset:publish
```

## 🔧 Advanced Configuration

### Copilot Chat Customization

The plugin installs specialized `.github/instructions/*.instructions.md` files that enhance GitHub Copilot Chat:

```bash
.github/
  instructions/
    jest.instructions.md           # Jest-specific guidance
    next.instructions.md           # Next.js expertise
    nest.instructions.md           # NestJS patterns
    prisma.instructions.md         # Database operations
    tailwindcss.instructions.md    # Styling utilities
    dev.instructions.md            # General development
    commit-analyzer.instructions.md # Commit standards
    changeset-analyzer.instructions.md # Release management
```

### Custom Copy Rules

Edit `scripts/copy-rules.json` to customize file copying behavior:

````json
{
  ".github": {
    "include": ["instructions/**", "chatmodes/**"],
    "exclude": ["workflows/**"]
  },
  "docs": {
    "include": ["**/*.md"],
    "exclude": ["_*/**"]
  }
}
### Documentation Sync Configuration

Edit `docs-config.json` to add new frameworks for Copilot Chat integration:

```json
{
  "frameworks": {
    "my-framework": {
      "repository": "owner/framework-repo",
      "source": "docs/",
      "destination": "docs/my-framework/",
      "schedule": "0 6 * * 1",
      "enabled": true
    }
  }
}
````

### Environment Variables

```bash
# Optional: Custom GitHub token for private repos
GITHUB_TOKEN=your_token_here

# Optional: Custom documentation paths
DOCS_BASE_PATH=./custom-docs
```

## 🤖 GitHub Copilot Chat Features

### Enhanced Framework Knowledge

Once installed, GitHub Copilot Chat will have access to:

- **📖 Local Documentation**: Framework docs available at `node_modules/@copilot-kit/chat-integration/docs/`
- **🎯 Specialized Instructions**: Context-aware responses for each framework
- **💡 Best Practices**: Curated patterns and examples
- **🔧 Integration Guidance**: How frameworks work together

### Chat Mode Examples

```typescript
// Ask Copilot Chat:
'Help me create a Next.js API route with Prisma database integration';

// Copilot will reference:
// - node_modules/@copilot-kit/chat-integration/docs/next.js/
// - node_modules/@copilot-kit/chat-integration/docs/prisma/
// - .github/instructions/next.instructions.md
// - .github/instructions/prisma.instructions.md
```

### Commit Analysis

```bash
# Stage your changes
git add .

# Ask Copilot Chat:
"Analyze my staged changes and suggest a conventional commit message"

# Copilot will use .github/instructions/commit-analyzer.instructions.md
# to provide precise commit type, scope, and message suggestions
```

## 📊 Supported Frameworks

| Framework    | Documentation | Instructions | Status |
| ------------ | ------------- | ------------ | ------ |
| **Jest**     | ✅            | ✅           | Active |
| **Next.js**  | ✅            | ✅           | Active |
| **NestJS**   | ✅            | ✅           | Active |
| **Prisma**   | ✅            | ✅           | Active |
| **Tailwind** | ✅            | ✅           | Active |

## 🎓 How It Works

### 1. **Intelligent Detection**

The plugin automatically detects:

- **Project Type**: React, Node.js, Next.js, NestJS, etc.
- **Package Manager**: npm, pnpm, yarn compatibility
- **Existing Configuration**: What's already set up vs. what needs installation
- **Framework Usage**: Active frameworks in your project

### 2. **Smart Configuration**

- **Non-Destructive**: Only adds missing configurations, preserves existing setups
- **Framework-Aware**: Adapts configuration based on detected frameworks
- **Best Practices**: Applies industry-standard patterns automatically
- **Customizable**: All configurations can be tweaked post-installation

### 3. **Copilot Chat Enhancement**

- **Local Documentation**: Syncs framework docs to `node_modules/@copilot-kit/chat-integration/docs/`
- **Instruction Files**: Installs specialized `.github/instructions/*.instructions.md`
- **Context Awareness**: Copilot Chat references local docs first for accuracy
- **Framework Expertise**: Each framework gets dedicated AI guidance patterns

### 4. **Continuous Updates**

- **Automated Sync**: GitHub Actions keep documentation current
- **Version Compatibility**: Updates respect your framework versions
- **Zero Maintenance**: Set it once, works continuously

## 🚀 Performance Benefits

### Before vs. After Installation

| Aspect                   | Before Plugin | After Plugin       |
| ------------------------ | ------------- | ------------------ |
| **Copilot Accuracy**     | Generic       | Framework-specific |
| **Setup Time**           | Hours         | Minutes            |
| **Commit Consistency**   | Manual        | Automated          |
| **Code Quality**         | Inconsistent  | Standardized       |
| **Documentation Access** | External      | Local + Current    |
| **Release Management**   | Manual        | Automated          |

## 🤝 Contributing

We welcome contributions! This plugin benefits every developer using GitHub Copilot Chat.

### Adding New Frameworks

1. **Fork the repository**
2. **Add framework configuration** in `docs-config.json`
3. **Create instruction file** following existing patterns
4. **Test documentation sync**
5. **Submit pull request**

### Development Setup

```bash
# Clone and setup
git clone https://github.com/your-username/copilot-chat-integration
cd copilot-chat-integration
npm install

# Test local installation
npm link
npx @copilot-kit/chat-integration setup
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/your-username/copilot-chat-integration/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/copilot-chat-integration/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/copilot-chat-integration/wiki)

---

**Made with ❤️ for the GitHub Copilot community**

_Transform your AI-assisted development workflow today!_

- Instala apenas dependências necessárias
- Configura ferramentas compatíveis
- Evita conflitos com configurações existentes
- Mantém configurações customizadas

### 3. **Integração Contínua**

- Hooks Git automáticos
- Validação em tempo real
- Sync de documentação agendado
- Atualizações automáticas

## 🔍 Validação e Debugging

### Verificar Configuração

```bash
npx copilot-project validate
```

### Demonstração Interativa

```bash
npx copilot-project demo
```

### Debug de Sincronização

```bash
# Ver logs detalhados
DEBUG=* npx copilot-project sync jest
```

## 🤝 Contribuindo

### Desenvolvimento Local

```bash
git clone https://github.com/ArthurProjectCorrea/copilot-project
cd copilot-project
npm install
npm run setup
```

### Adicionando Novos Frameworks

1. Adicionar configuração em `docs-config.json`
2. Criar workflow de sincronização
3. Desenvolver arquivo de instruções
4. Testar integração completa

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/ArthurProjectCorrea/copilot-project/issues)
- **Discussões**: [GitHub Discussions](https://github.com/ArthurProjectCorrea/copilot-project/discussions)
- **Wiki**: [Documentação Completa](https://github.com/ArthurProjectCorrea/copilot-project/wiki)

---

**Desenvolvido para automatizar a excelência em desenvolvimento. 🚀**
