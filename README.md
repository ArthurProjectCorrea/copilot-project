# 🤖 Copilot Project - Framework Documentation Automation

[![npm version](https://badge.fury.io/js/@copilot-kit%2Fchat-integration.svg)](https://www.npmjs.com/package/@copilot-kit/chat-integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/ArthurProjectCorrea/copilot-project/workflows/CI/badge.svg)](https://github.com/ArthurProjectCorrea/copilot-project/actions)

**Essential npm plugin that supercharges GitHub Copilot Chat with intelligent framework documentation, automated commit standards, and seamless development workflow integration.**

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

### 📚 **Automated Documentation Sync**

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

# Using yarn
yarn global add @copilot-kit/chat-integration
```

### One-Command Setup

```bash
# Navigate to your project
cd my-awesome-project

# Complete setup with Copilot Chat integration
copilot-chat setup

# Or use npx for one-time usage
npx @copilot-kit/chat-integration setup
```

### Chat-Only Integration

```bash
# Only configure GitHub Copilot Chat enhancements
copilot-chat config

# Or using npx
npx @copilot-kit/chat-integration config
```

## 📋 Available Commands

### Main CLI Interface

```bash
copilot-chat <command>
```

| Command    | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| `setup`    | Complete project setup (Husky, CommitLint, Prettier, ESLint, Changesets + Copilot) |
| `config`   | Configure only GitHub Copilot Chat enhancements (Instructions, Prompts, Chatmodes) |
| `validate` | Validate existing configuration and integration status                             |
| `demo`     | Interactive demonstration of all features                                          |
| `sync`     | Sync documentation for frameworks (jest, next, nest, prisma, tailwindcss)          |

### Alternative CLI

```bash
copilot-setup <command>   # Alternative configuration command
```

### NPM Scripts Available

```bash
npm run setup          # Complete setup
npm run validate       # Validate configuration
npm run demo           # Interactive demo
npm run docs:sync:all  # Sync all framework documentation
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
npm install -g @copilot-kit/chat-integration
copilot-chat setup

# Make your first standardized commit
git add .
npm run commit  # Interactive Commitizen interface
```

### 2. Existing Project Enhancement

```bash
# Check current configuration
copilot-chat validate

# Add missing integrations
copilot-chat setup

# Test Copilot Chat with enhanced context
# Open GitHub Copilot Chat and ask framework-specific questions
```

### 3. Framework Documentation Sync

```bash
# Sync specific framework docs for Copilot Chat
copilot-chat sync jest
copilot-chat sync tailwindcss

# Sync all supported frameworks
npm run docs:sync:all
```

### 4. Commit & Release Workflow

```bash
# Interactive commit with standards
npm run commit

# Create changeset for release
npm run changeset

# Automated release (configured in CI/CD)
git push origin main
```

## 🧠 Enhanced Copilot Chat Modes

Access specialized assistance directly in GitHub Copilot Chat:

### Framework-Specific Help

```bash
@workspace /jest        # Jest testing assistance with local docs
@workspace /nest        # NestJS development guidance
@workspace /next        # Next.js framework help
@workspace /prisma      # Prisma ORM assistance
@workspace /tailwindcss # Tailwind CSS styling help
```

### Development Workflow

```bash
@workspace /commit-analyzer      # Analyze staged changes for commit messages
@workspace /changeset-analyzer   # Generate changesets for releases
@workspace /architecture-optimizer # Analyze and optimize project architecture
@workspace /dev                 # General development assistance
```

## 🔧 Configuration

### Automatic Configuration

The plugin automatically creates:

- `.github/chatmodes/` - Copilot Chat mode definitions
- `.github/instructions/` - Framework-specific instruction files
- `.github/prompts/` - Custom prompts for specialized tasks
- `.github/workflows/` - Documentation sync automation
- Development tools configuration (Husky, ESLint, Prettier, etc.)

### Manual Configuration

```bash
# Configure specific frameworks
copilot-chat config

# Validate current setup
copilot-chat validate

# View demonstration of features
copilot-chat demo
```

## 🏗️ Supported Frameworks

| Framework        | Documentation Source         | Local Path                                                                | Chat Mode                 |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------- | ------------------------- |
| **Jest**         | facebook/jest                | `node_modules/@copilot-kit/chat-integration/docs/frameworks/jest.js/`     | `@workspace /jest`        |
| **NestJS**       | nestjs/docs.nestjs.com       | `node_modules/@copilot-kit/chat-integration/docs/frameworks/nest.js/`     | `@workspace /nest`        |
| **Next.js**      | vercel/next.js               | `node_modules/@copilot-kit/chat-integration/docs/frameworks/next.js/`     | `@workspace /next`        |
| **Prisma**       | prisma/docs                  | `node_modules/@copilot-kit/chat-integration/docs/frameworks/prisma/`      | `@workspace /prisma`      |
| **Tailwind CSS** | tailwindlabs/tailwindcss.com | `node_modules/@copilot-kit/chat-integration/docs/frameworks/tailwindcss/` | `@workspace /tailwindcss` |

## 🔄 Documentation Sync

### Automatic Sync

- **Schedule**: Weekly automatic updates via GitHub Actions
- **Conversion**: MDX → Markdown for Copilot Chat compatibility
- **Caching**: Smart incremental updates for performance
- **Sources**: Official framework repositories

### Manual Sync

```bash
# Sync all frameworks
npm run docs:sync:all

# Sync specific framework
npm run docs:sync:jest
npm run docs:sync:nest
npm run docs:sync:next
npm run docs:sync:prisma
npm run docs:sync:tailwindcss
```

## 🛠️ Development Tools Integration

### Code Quality

- **ESLint**: Automatic linting with fix-on-save
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for quality gates
- **Lint-staged**: Pre-commit validation

### Commit Standards

- **Commitizen**: Interactive commit interface
- **Conventional Commits**: Standardized commit messages
- **Commitlint**: Commit message validation

### Release Management

- **Changesets**: Semantic versioning
- **Automated Changelogs**: Generated from commits
- **CI/CD Integration**: Automated releases

## 🔍 Validation and Debugging

### Verify Configuration

```bash
copilot-chat validate
```

### Interactive Demo

```bash
copilot-chat demo
```

### Debug Documentation Sync

```bash
# Verbose logging
DEBUG=* copilot-chat sync jest
```

## 🤝 Contributing

### Development Setup

```bash
git clone https://github.com/ArthurProjectCorrea/copilot-project
cd copilot-project
npm install
npm run setup
```

### Adding New Frameworks

1. Add configuration to `docs-config.json`
2. Create sync workflow in `.github/workflows/`
3. Develop instruction file in `.github/instructions/`
4. Test complete integration

### Code Standards

- Follow existing code style (ESLint + Prettier)
- Write conventional commit messages
- Add tests for new functionality
- Update documentation

## 🚨 Troubleshooting

### Common Issues

**Installation Problems**

```bash
# Clear npm cache
npm cache clean --force

# Check Node.js version (requires 16+)
node --version

# Reinstall with verbose logging
npm install -g @copilot-kit/chat-integration --verbose
```

**Copilot Chat Not Recognizing Modes**

```bash
# Verify configuration
copilot-chat validate

# Recreate configuration
copilot-chat config

# Check file permissions
ls -la .github/chatmodes/
```

**Documentation Sync Failing**

```bash
# Check GitHub token
echo $GITHUB_TOKEN

# Manual sync with debug
DEBUG=* copilot-chat sync jest

# Verify repository access
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/facebook/jest
```

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/ArthurProjectCorrea/copilot-project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ArthurProjectCorrea/copilot-project/discussions)
- **Documentation**: [Project Wiki](https://github.com/ArthurProjectCorrea/copilot-project/wiki)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- GitHub Copilot team for the amazing AI assistance platform
- Framework maintainers for excellent documentation
- Open source community for continuous improvements

---

**Made with ❤️ for the GitHub Copilot community**

_Transform your AI-assisted development workflow today!_
