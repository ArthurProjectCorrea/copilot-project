# 📦 Installation Guide

## Overview

This guide covers all installation methods for @copilot-kit/chat-integration, system requirements, and troubleshooting common installation issues.

## System Requirements

### Minimum Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher (or equivalent pnpm/yarn)
- **Git**: 2.20.0 or higher
- **GitHub Copilot**: Active subscription and VS Code extension

### Supported Operating Systems

- **Windows**: 10/11
- **macOS**: 10.15 (Catalina) or higher
- **Linux**: Ubuntu 18.04+, CentOS 7+, or equivalent

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version

# Verify GitHub Copilot is active
# Open VS Code and check for Copilot icon in status bar
```

## Installation Methods

### 1. Global Installation (Recommended)

Install globally to use the CLI commands from anywhere:

```bash
# Using npm
npm install -g @copilot-kit/chat-integration

# Using pnpm (recommended)
pnpm add -g @copilot-kit/chat-integration

# Using yarn
yarn global add @copilot-kit/chat-integration
```

**Verification:**

```bash
# Test CLI availability
copilot-chat --help
copilot-setup --help

# Check version
copilot-chat --version
```

### 2. Project-Specific Installation

Install in specific projects for team-wide consistency:

```bash
# Navigate to your project
cd your-project-directory

# Install as dev dependency
npm install --save-dev @copilot-kit/chat-integration

# Or using pnpm
pnpm add -D @copilot-kit/chat-integration
```

**Usage with npx:**

```bash
# Run without global installation
npx @copilot-kit/chat-integration setup
npx @copilot-kit/chat-integration config
```

### 3. CI/CD Installation

For automated environments:

```yaml
# GitHub Actions example
- name: Install Copilot Integration
  run: npm install -g @copilot-kit/chat-integration

# Or as project dependency
- name: Install dependencies
  run: npm ci
```

## Post-Installation Setup

### Automatic Setup

The package includes automatic setup via postinstall hook:

```bash
# This runs automatically after installation
npm install -g @copilot-kit/chat-integration
# → Automatically creates .github/ structure if in a Git repository
```

### Manual Configuration

```bash
# Complete project setup
copilot-chat setup

# Or configure only Copilot Chat features
copilot-chat config
```

### Verification Steps

```bash
# 1. Verify CLI commands work
copilot-chat --help

# 2. Check configuration status
copilot-chat validate

# 3. Run demo to see features
copilot-chat demo

# 4. Test documentation sync
copilot-chat sync jest
```

## Installation Troubleshooting

### Permission Issues

**Problem**: `EACCES` permission denied errors

**Solution for macOS/Linux:**

```bash
# Option 1: Use npx instead of global install
npx @copilot-kit/chat-integration setup

# Option 2: Configure npm to use different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 3: Use Node Version Manager
# Install nvm, then:
nvm install node
npm install -g @copilot-kit/chat-integration
```

**Solution for Windows:**

```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use Windows Subsystem for Linux (WSL)
```

### Network Issues

**Problem**: Package download fails

**Solutions:**

```bash
# Check npm registry
npm config get registry

# Use different registry if needed
npm install -g @copilot-kit/chat-integration --registry https://registry.npmjs.org/

# Clear npm cache
npm cache clean --force

# Verify network connectivity
ping registry.npmjs.org
```

### Version Conflicts

**Problem**: Multiple Node.js versions or conflicting packages

**Solutions:**

```bash
# Check Node.js version
node --version

# Update to latest LTS
nvm install --lts
nvm use --lts

# Clear global packages
npm list -g --depth=0

# Reinstall if needed
npm uninstall -g @copilot-kit/chat-integration
npm install -g @copilot-kit/chat-integration
```

### GitHub Token Issues

**Problem**: Documentation sync fails

**Solutions:**

```bash
# Check if GitHub CLI is installed
gh --version

# Login to GitHub CLI
gh auth login

# Or set token manually
export GITHUB_TOKEN=your_token_here

# Verify token permissions
gh auth status
```

### Copilot Chat Not Working

**Problem**: Chat modes not recognized

**Solutions:**

```bash
# Verify .github structure was created
ls -la .github/chatmodes/

# Recreate configuration
copilot-chat config

# Check VS Code Copilot extension
# 1. Open VS Code
# 2. Check Extensions: GitHub Copilot
# 3. Restart VS Code if needed
# 4. Try @workspace /jest in Copilot Chat
```

## Platform-Specific Notes

### Windows

```powershell
# PowerShell execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Path issues - add to PATH manually if needed
$env:PATH += ";C:\Users\YourName\AppData\Roaming\npm"

# Windows Terminal recommended for better experience
```

### macOS

```bash
# Homebrew users
brew install node

# M1/M2 Macs - ensure native Node.js
arch -arm64 brew install node

# Xcode Command Line Tools may be required
xcode-select --install
```

### Linux

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Arch Linux
sudo pacman -S nodejs npm
```

## Upgrade Instructions

### Upgrading to Latest Version

```bash
# Global upgrade
npm update -g @copilot-kit/chat-integration

# Check new version
copilot-chat --version

# Re-run setup if needed
copilot-chat setup
```

### Migration Between Versions

```bash
# Check current version
copilot-chat --version

# Backup current configuration
cp -r .github .github.backup

# Upgrade
npm update -g @copilot-kit/chat-integration

# Validate after upgrade
copilot-chat validate

# Restore backup if issues occur
mv .github.backup .github
```

## Uninstallation

### Complete Removal

```bash
# Remove global package
npm uninstall -g @copilot-kit/chat-integration

# Remove project-specific installation
npm uninstall @copilot-kit/chat-integration

# Clean up configuration (optional)
rm -rf .github/chatmodes/
rm -rf .github/instructions/
rm -rf .github/prompts/

# Verify removal
copilot-chat --version  # Should show "command not found"
```

## Getting Help

### Diagnostic Information

```bash
# Collect diagnostic info
copilot-chat validate --verbose

# System information
node --version
npm --version
git --version
```

### Support Channels

- **GitHub Issues**: [Report installation problems](https://github.com/ArthurProjectCorrea/copilot-project/issues)
- **Discussions**: [Community support](https://github.com/ArthurProjectCorrea/copilot-project/discussions)
- **Documentation**: [Full documentation](https://github.com/ArthurProjectCorrea/copilot-project/wiki)

### Common Support Information

When reporting issues, please include:

1. Operating system and version
2. Node.js and npm versions
3. Installation method used
4. Complete error messages
5. Output of `copilot-chat validate`

## Next Steps

After successful installation:

1. **[Quick Start Guide](quick-start.md)** - Get up and running quickly
2. **[Configuration Guide](configuration.md)** - Customize your setup
3. **[Chat Modes Guide](chat-modes.md)** - Learn about Copilot Chat enhancements
4. **[Troubleshooting Guide](troubleshooting.md)** - Solutions for common issues
