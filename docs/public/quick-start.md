# 🚀 Quick Start Guide

## Overview

Get up and running with @arthurcorreadev/copilot-chat-integration in under 5 minutes. This guide covers the essential steps to enhance your GitHub Copilot Chat experience.

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js 16+** installed
- ✅ **GitHub Copilot** subscription active
- ✅ **VS Code** with GitHub Copilot extension
- ✅ **Git** repository (for project-specific features)

```bash
# Quick verification
node --version && git --version && code --version
```

## 5-Minute Setup

### Step 1: Install the Package

```bash
# Global installation (recommended)
npm install -g @arthurcorreadev/copilot-chat-integration

# Or use pnpm
pnpm add -g @arthurcorreadev/copilot-chat-integration
```

### Step 2: Navigate to Your Project

```bash
# Go to any Git repository
cd your-project-directory

# Or create a new one
mkdir my-copilot-project && cd my-copilot-project
git init
```

### Step 3: Run Setup

```bash
# Complete setup (includes development tools)
copilot-chat setup

# Or just Copilot Chat features
copilot-chat config
```

### Step 4: Verify Installation

```bash
# Check everything is working
copilot-chat validate

# See available features
copilot-chat demo
```

### Step 5: Test Copilot Chat

1. **Open VS Code** in your project directory
2. **Open Copilot Chat** (Ctrl+Shift+I or Cmd+Shift+I)
3. **Try enhanced commands**:
   ```
   @workspace /jest How do I test async functions?
   @workspace /next How do I create API routes?
   ```

## What Just Happened?

### 🗂️ Files Created

The setup created several configuration directories:

```
your-project/
├── .github/
│   ├── chatmodes/          # Copilot Chat mode definitions
│   ├── instructions/       # Framework-specific instructions
│   ├── prompts/           # Custom prompt templates
│   └── workflows/         # Documentation sync automation
├── .husky/                # Git hooks (if setup was used)
├── .prettierrc           # Code formatting config
├── .eslintrc.js          # Linting configuration
└── commitlint.config.js  # Commit message validation
```

### 🧠 Enhanced Copilot Chat

Your GitHub Copilot Chat now has access to:

- **Local framework documentation** for Jest, Next.js, NestJS, Prisma, Tailwind CSS
- **Specialized chat modes** for different development tasks
- **Context-aware responses** based on your project's technology stack

### 🛠️ Development Tools

If you ran `copilot-chat setup`, you also get:

- **Husky** git hooks for code quality
- **Prettier** for consistent formatting
- **ESLint** for code quality checks
- **Commitizen** for standardized commits
- **Changesets** for version management

## Quick Examples

### Enhanced Copilot Chat Usage

```bash
# Framework-specific help
@workspace /jest         # Jest testing assistance
@workspace /next         # Next.js development help
@workspace /nest         # NestJS backend guidance
@workspace /prisma       # Database/ORM assistance
@workspace /tailwindcss  # CSS framework help

# Development workflow
@workspace /commit-analyzer    # Analyze changes for commits
@workspace /changeset-analyzer # Generate version changesets
@workspace /dev               # General development help
```

### CLI Commands

```bash
# Sync latest framework documentation
copilot-chat sync jest
copilot-chat sync next

# Sync all frameworks at once
npm run docs:sync:all

# Interactive commit with standards
npm run commit

# Create version changeset
npm run changeset
```

## Your First Enhanced Workflow

### 1. Make Some Changes

```bash
# Create a test file
echo "test('example', () => { expect(true).toBe(true); });" > example.test.js
```

### 2. Get Copilot Help

Open Copilot Chat and ask:

```
@workspace /jest How can I improve this test? What are Jest best practices?
```

### 3. Commit with Standards

```bash
# Stage your changes
git add .

# Use standardized commit process
npm run commit
# → Interactive prompt guides you through conventional commits
```

### 4. Release Management

```bash
# Create changeset for versioning
npm run changeset
# → Interactive prompt for semantic versioning
```

## Framework-Specific Quick Starts

### For Jest Projects

```bash
# Get Jest documentation locally
copilot-chat sync jest

# Ask Copilot for Jest-specific help
# @workspace /jest How do I mock API calls?
```

### For Next.js Projects

```bash
# Sync Next.js docs
copilot-chat sync next

# Enhanced Next.js guidance
# @workspace /next How do I set up API routes with middleware?
```

### For NestJS Projects

```bash
# Get NestJS documentation
copilot-chat sync nest

# Backend development assistance
# @workspace /nest How do I implement authentication guards?
```

### For Prisma Projects

```bash
# Sync Prisma documentation
copilot-chat sync prisma

# Database/ORM help
# @workspace /prisma How do I create relations between models?
```

### For Tailwind CSS Projects

```bash
# Get Tailwind documentation
copilot-chat sync tailwindcss

# Styling assistance
# @workspace /tailwindcss How do I create responsive layouts?
```

## Common First-Time Tasks

### Setting Up a New Project

```bash
# Initialize new project with all standards
mkdir awesome-project && cd awesome-project
npm init -y
git init

# Install and configure everything
npm install -g @arthurcorreadev/copilot-chat-integration
copilot-chat setup

# Your project now has:
# ✅ Code quality tools
# ✅ Commit standards
# ✅ Enhanced Copilot Chat
# ✅ Automated documentation
```

### Adding to Existing Project

```bash
# Enhance existing project
cd existing-project
copilot-chat config  # Just Copilot features
# OR
copilot-chat setup   # Full development standards

# Verify nothing conflicts
copilot-chat validate
```

### Team Setup

```bash
# Install globally for all team members
npm install -g @arthurcorreadev/copilot-chat-integration

# Add to project for consistency
npm install --save-dev @arthurcorreadev/copilot-chat-integration

# Add to package.json scripts
{
  "scripts": {
    "setup": "copilot-chat setup",
    "commit": "npm run commit",
    "docs:sync": "npm run docs:sync:all"
  }
}
```

## Troubleshooting Quick Fixes

### Copilot Chat Not Working

```bash
# Recreate configuration
copilot-chat config

# Restart VS Code
# Try @workspace /jest in Copilot Chat
```

### Permission Errors

```bash
# Use npx instead of global install
npx @arthurcorreadev/copilot-chat-integration setup
```

### Documentation Not Syncing

```bash
# Check GitHub token
gh auth status

# Manual sync with verbose output
DEBUG=* copilot-chat sync jest
```

## What's Next?

### Immediate Next Steps

1. **Explore Chat Modes**: Try all available `@workspace /mode` commands
2. **Sync Documentation**: Run `npm run docs:sync:all` for latest framework docs
3. **Customize Setup**: Review and adjust configurations in `.github/` folder

### Learn More

- **[API Reference](api-reference.md)** - Complete command documentation
- **[Chat Modes Guide](chat-modes.md)** - Detailed chat mode explanations
- **[Configuration Guide](configuration.md)** - Customize your setup
- **[Framework Integration](framework-integration.md)** - Deep dive into framework support

### Advanced Usage

- **[Examples](examples.md)** - Real-world usage scenarios
- **[Troubleshooting](troubleshooting.md)** - Solutions for common issues

## Community

- **Share your experience**: [GitHub Discussions](https://github.com/ArthurProjectCorrea/copilot-project/discussions)
- **Report issues**: [GitHub Issues](https://github.com/ArthurProjectCorrea/copilot-project/issues)
- **Contribute**: [Contributing Guide](../private/contributing.md)

---

🎉 **Congratulations!** You've successfully enhanced your GitHub Copilot Chat experience. Start exploring the new capabilities and enjoy more intelligent, context-aware AI assistance!
