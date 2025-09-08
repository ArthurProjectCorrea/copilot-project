# 🛠️ Development Setup

## Overview

Complete guide for setting up a development environment for the Copilot Project. This guide is for contributors and maintainers who want to modify, extend, or contribute to the project.

## Prerequisites

### System Requirements

- **Node.js**: 18.x or higher (LTS recommended)
- **pnpm**: 8.x or higher (preferred package manager)
- **Git**: 2.25 or higher
- **GitHub CLI**: Latest version
- **VS Code**: Latest version (for testing Copilot integration)

### Required Accounts and Access

- **GitHub Account** with access to the repository
- **NPM Account** (for publishing, if contributing)
- **GitHub Copilot Subscription** (for testing chat features)

### Verify Prerequisites

```bash
# Check versions
node --version  # Should be 18.x+
pnpm --version  # Should be 8.x+
git --version   # Should be 2.25+
gh --version    # GitHub CLI
code --version  # VS Code

# Verify GitHub authentication
gh auth status

# Check npm authentication (if needed)
npm whoami
```

## Repository Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/ArthurProjectCorrea/copilot-project.git
cd copilot-project

# Or fork first (recommended for contributors)
gh repo fork ArthurProjectCorrea/copilot-project --clone
cd copilot-project
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm run validate
```

### 3. Setup Development Environment

```bash
# Run development setup
pnpm run setup

# This configures:
# - Git hooks with Husky
# - Commit linting
# - Code formatting
# - Development tools
```

### 4. Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit with your values
# Required for documentation sync features
GITHUB_TOKEN=your_github_token_here
```

## Development Environment Configuration

### Git Configuration

```bash
# Configure Git hooks
pnpm prepare

# Verify hooks are installed
ls -la .husky/

# Test commit linting
git add .
git commit -m "test: verify commit linting works"
```

### Code Editor Setup

#### VS Code Configuration

Install recommended extensions:

```bash
# Install VS Code extensions via CLI
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.exclude": {
    "**/node_modules": true,
    "**/docs/frameworks/jest.js": true,
    "**/docs/frameworks/nest.js": true,
    "**/docs/frameworks/next.js": true,
    "**/docs/frameworks/prisma": true,
    "**/docs/frameworks/tailwindcss": true
  }
}
```

### TypeScript Configuration

The project uses TypeScript for type checking:

```bash
# Check types
pnpm run check-types

# Watch mode for development
pnpm run check-types -- --watch
```

## Project Structure Understanding

### Key Directories

```
copilot-project/
├── .github/                 # GitHub configuration
│   ├── chatmodes/          # Copilot Chat mode definitions
│   ├── instructions/       # Framework-specific instructions
│   ├── prompts/           # Custom prompt templates
│   └── workflows/         # CI/CD and automation
├── docs/                   # Documentation
│   ├── public/            # User-facing docs
│   ├── private/           # Developer docs
│   ├── jest.js/           # Jest framework docs (synced)
│   ├── nest.js/           # NestJS framework docs (synced)
│   ├── next.js/           # Next.js framework docs (synced)
│   ├── prisma/            # Prisma framework docs (synced)
│   └── tailwindcss/       # Tailwind CSS docs (synced)
├── scripts/               # Core functionality
│   ├── copilot-cli.js     # Main CLI interface
│   ├── copilot-config.js  # Configuration script
│   ├── sync-docs.js       # Documentation sync
│   └── ...other scripts
├── package.json           # Package configuration
├── docs-config.json       # Framework sync configuration
└── tsconfig.json          # TypeScript configuration
```

### Important Files

- **`package.json`**: Package metadata, scripts, dependencies
- **`docs-config.json`**: Framework documentation sync configuration
- **`index.js`**: Main entry point (intentionally minimal)
- **`scripts/`**: Core CLI and automation functionality
- **`.github/`**: GitHub-specific configurations and templates

## Development Workflow

### Running Development Scripts

```bash
# Run the CLI locally
node scripts/copilot-cli.js --help

# Test configuration script
node scripts/copilot-config.js

# Run validation
pnpm run validate

# Run interactive demo
pnpm run demo
```

### Testing Changes

```bash
# Test CLI installation globally
npm link
copilot-chat --help

# Test in another project
cd ../test-project
copilot-chat setup

# Clean up
npm unlink -g @copilot-kit/chat-integration
cd ../copilot-project
```

### Code Quality Checks

```bash
# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint -- --fix

# Format code
pnpm run format

# Check formatting
pnpm run format:check

# Type checking
pnpm run check-types
```

### Testing Documentation Sync

```bash
# Test single framework sync
pnpm run docs:sync:jest

# Test all frameworks
pnpm run docs:sync:all

# Debug sync issues
DEBUG=* pnpm run docs:sync:jest
```

## Development Tasks

### Adding New Framework Support

1. **Update Configuration**:

```json
// docs-config.json
{
  "newframework": {
    "name": "New Framework",
    "repository": "owner/repo",
    "sourcePath": "docs/",
    "targetPath": "docs/newframework/",
    "convertMdx": true,
    "schedule": "0 6 * * 1",
    "type": "framework"
  }
}
```

2. **Create Sync Script**:

```bash
# Add to package.json
"docs:sync:newframework": "node scripts/sync-docs.js newframework"
```

3. **Create Instructions File**:

```bash
# Create .github/instructions/newframework.instructions.md
# Following the pattern of existing instruction files
```

4. **Test Integration**:

```bash
pnpm run docs:sync:newframework
pnpm run validate
```

### Modifying CLI Functionality

1. **Edit Core Scripts**:
   - `scripts/copilot-cli.js` - Main CLI interface
   - `scripts/copilot-config.js` - Configuration logic
   - `scripts/setup-project-standards.js` - Setup functionality

2. **Test Changes**:

```bash
# Test locally
node scripts/copilot-cli.js newcommand

# Test via npm link
npm link
copilot-chat newcommand
```

3. **Update Documentation**:
   - Update CLI help text
   - Update README.md
   - Update API reference

### Working with GitHub Actions

```bash
# Test workflow locally (using act)
act -j test

# Validate workflow syntax
gh workflow list
gh workflow view sync-docs.yml
```

## Environment Variables

### Development Variables

Create `.env` file with:

```bash
# Required for documentation sync
GITHUB_TOKEN=ghp_your_token_here

# Optional for debugging
DEBUG=copilot-project:*
NODE_ENV=development

# Optional for testing
TEST_REPO_PATH=/path/to/test/repo
```

### GitHub Token Setup

```bash
# Create token with these permissions:
# - repo (full repository access)
# - read:org (for organization repositories)

# Set token via GitHub CLI
gh auth refresh -h github.com -s repo

# Or set manually
export GITHUB_TOKEN=your_token_here
```

## Testing and Validation

### Manual Testing Checklist

```bash
# 1. CLI functionality
copilot-chat --help
copilot-chat setup --dry-run
copilot-chat config --dry-run
copilot-chat validate
copilot-chat demo

# 2. Documentation sync
pnpm run docs:sync:jest
ls docs/frameworks/jest.js/

# 3. Development tools
pnpm run lint
pnpm run format:check
pnpm run check-types

# 4. Package functionality
npm pack
npm install -g ./copilot-kit-chat-integration-*.tgz
```

### Integration Testing

```bash
# Test in different project types
mkdir test-react && cd test-react
npm init -y
copilot-chat setup

mkdir test-node && cd test-node
npm init -y
copilot-chat config
```

## Debugging

### Common Development Issues

**CLI not found after changes**:

```bash
# Relink package
npm unlink -g @copilot-kit/chat-integration
npm link
```

**Documentation sync failing**:

```bash
# Debug with verbose logging
DEBUG=* pnpm run docs:sync:jest

# Check token permissions
gh auth status
```

**Type checking errors**:

```bash
# Check specific file
npx tsc --noEmit scripts/copilot-cli.js

# Watch for changes
npx tsc --noEmit --watch
```

### Debugging Tools

```bash
# Enable debug logging
export DEBUG=copilot-project:*

# Or for specific modules
export DEBUG=copilot-project:sync

# Node.js debugging
node --inspect scripts/copilot-cli.js setup
```

## Contributing Guidelines

### Code Standards

- Follow existing code style (Prettier + ESLint)
- Use conventional commit messages
- Add JSDoc comments for public functions
- Include error handling and validation
- Write tests for new functionality

### Commit Process

```bash
# Stage changes
git add .

# Use conventional commits
pnpm run commit

# Or manual commit following pattern
git commit -m "feat: add support for new framework"
```

### Pull Request Process

1. Create feature branch
2. Make changes following standards
3. Test thoroughly
4. Update documentation
5. Submit PR with description

## Next Steps

After setting up development environment:

1. **[Environment Variables Guide](environment-variables.md)** - Configure tokens and variables
2. **[Build and Deploy Guide](build-and-deploy.md)** - Understanding release process
3. **[Project Architecture](project-architecture.md)** - System design overview
4. **[Contributing Guide](contributing.md)** - How to contribute effectively
