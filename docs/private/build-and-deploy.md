# 🚀 Build and Deploy Guide

## Overview

Comprehensive guide for building, packaging, and deploying the Copilot Project. This covers the complete release process, from development builds to NPM publication and GitHub releases.

## Build Process

### Understanding the Build System

The Copilot Project uses a minimal build approach:

- **No transpilation**: Node.js native ES modules and CommonJS
- **No bundling**: Direct source distribution
- **Package preparation**: File organization and metadata generation
- **Documentation compilation**: Framework docs and local caching

### Pre-build Validation

```bash
# Run all quality checks
pnpm run validate

# Individual checks
pnpm run lint
pnpm run format:check
pnpm run check-types

# Test functionality
pnpm run test
```

### Development Build

```bash
# Install dependencies
pnpm install

# Prepare development environment
pnpm run setup

# Link for local testing
npm link

# Test CLI globally
copilot-chat --help
```

### Production Build

```bash
# Clean previous builds
rm -rf dist/ *.tgz

# Install production dependencies only
npm ci --production

# Create package tarball
npm pack

# Verify package contents
tar -tzf copilot-kit-chat-integration-*.tgz
```

## Release Process

### Automated Release with Changesets

The project uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases.

#### 1. Create Changeset

```bash
# Generate changeset for your changes
pnpm changeset

# Follow prompts:
# - Select affected packages
# - Choose version bump (patch/minor/major)
# - Write user-facing description
```

Example changeset:

```yaml
---
'@arthurcorreadev/copilot-chat-integration': minor
---
Add support for new framework documentation sync with improved error handling and performance optimizations.
```

#### 2. Version Bump

```bash
# Apply changesets and update versions
pnpm changeset version

# This updates:
# - package.json version
# - CHANGELOG.md
# - Removes consumed changesets
```

#### 3. Automated Release

Releases are triggered automatically via GitHub Actions when changesets are merged to `main`:

```yaml
# .github/workflows/release.yml (simplified)
- name: Create Release Pull Request or Publish
  uses: changesets/action@v1
  with:
    publish: pnpm release
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Manual Release Process

For emergency releases or when automation is unavailable:

#### 1. Prepare Release

```bash
# Update version manually
npm version patch  # or minor/major

# Update CHANGELOG.md manually
# Add release notes and changes

# Commit changes
git add .
git commit -m "chore(release): prepare v1.2.3"
```

#### 2. Build and Validate

```bash
# Run full validation
pnpm run validate

# Create distribution package
npm pack

# Test package installation
npm install -g ./copilot-kit-chat-integration-*.tgz

# Verify functionality
copilot-chat --version
copilot-chat --help
```

#### 3. Publish to NPM

```bash
# Login to NPM (if not already)
npm login

# Publish package
npm publish

# Verify publication
npm view @arthurcorreadev/copilot-chat-integration
```

#### 4. Create GitHub Release

```bash
# Create git tag
git tag v1.2.3

# Push tag to GitHub
git push origin v1.2.3

# Create GitHub release
gh release create v1.2.3 \
  --title "Release v1.2.3" \
  --notes-file CHANGELOG.md \
  --latest
```

## Package Configuration

### package.json Structure

```json
{
  "name": "@arthurcorreadev/copilot-chat-integration",
  "version": "2.0.0",
  "description": "Enhanced GitHub Copilot Chat integration with framework documentation sync",
  "main": "index.js",
  "type": "module",
  "bin": {
    "copilot-chat": "./scripts/copilot-cli.js",
    "copilot-setup": "./scripts/copilot-config.js"
  },
  "files": [
    "index.js",
    "scripts/",
    ".github/",
    "docs/",
    "docs-config.json",
    "README.md",
    "CHANGELOG.md"
  ],
  "engines": {
    "node": ">=18.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ArthurProjectCorrea/copilot-project.git"
  },
  "keywords": ["github", "copilot", "chat", "documentation", "ai", "development-tools"]
}
```

### File Inclusion Strategy

The `files` array controls what gets published to NPM:

- **Core files**: `index.js`, `package.json`, `README.md`
- **CLI scripts**: All files in `scripts/` directory
- **Configuration**: `.github/` directory with chat modes and instructions
- **Documentation**: Local framework docs and user guides
- **Metadata**: `docs-config.json` for framework sync configuration

### Build Artifacts

```bash
# Verify what will be published
npm pack --dry-run

# Extract and inspect
tar -xzf copilot-kit-chat-integration-*.tgz
ls -la package/
```

## Deployment Environments

### NPM Registry

**Public NPM Registry** (default):

- URL: `https://registry.npmjs.org/`
- Package: `@arthurcorreadev/copilot-chat-integration`
- Visibility: Public
- Installation: `npm install -g @arthurcorreadev/copilot-chat-integration`

**GitHub Packages** (alternative):

```bash
# Configure GitHub Packages
echo "@copilot-kit:registry=https://npm.pkg.github.com" >> .npmrc

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### Version Strategy

Following [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes, API removals, compatibility breaks
- **MINOR** (1.x.0): New features, framework additions, backward-compatible
- **PATCH** (1.1.x): Bug fixes, documentation, security patches

### Release Channels

**Stable Release**:

```bash
# Latest stable version
npm install -g @arthurcorreadev/copilot-chat-integration@latest
```

**Beta Release**:

```bash
# Beta versions for testing
npm publish --tag beta
npm install -g @arthurcorreadev/copilot-chat-integration@beta
```

**Development Release**:

```bash
# Alpha/development versions
npm publish --tag alpha
npm install -g @arthurcorreadev/copilot-chat-integration@alpha
```

## GitHub Actions Workflows

### Continuous Integration

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run validation
        run: pnpm run validate

      - name: Test package
        run: |
          npm pack
          npm install -g ./copilot-kit-chat-integration-*.tgz
          copilot-chat --version
```

### Release Automation

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Documentation Sync

```yaml
# .github/workflows/sync-docs.yml
name: Sync Documentation
on:
  schedule:
    - cron: '0 2 * * 1' # Weekly on Monday
  workflow_dispatch:

jobs:
  sync-jest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Sync Jest Documentation
        run: pnpm run docs:sync:jest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --production

# Copy application
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S copilot -u 1001

USER copilot

# Expose CLI commands
ENTRYPOINT ["node", "scripts/copilot-cli.js"]
CMD ["--help"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  copilot-project:
    build: .
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - NODE_ENV=production
    volumes:
      - ./config:/app/config
      - ./cache:/app/cache
    command: ['setup', '--config', '/app/config']
```

## Monitoring and Rollback

### Release Monitoring

```bash
# Monitor NPM downloads
npm view @arthurcorreadev/copilot-chat-integration

# Check GitHub releases
gh release list

# Monitor issues and feedback
gh issue list --label "release-feedback"
```

### Rollback Procedures

#### NPM Rollback

```bash
# Deprecate problematic version
npm deprecate @arthurcorreadev/copilot-chat-integration@2.1.0 "Critical bug - use 2.0.0 instead"

# Unpublish if within 24 hours
npm unpublish @arthurcorreadev/copilot-chat-integration@2.1.0

# Promote previous version as latest
npm dist-tag add @arthurcorreadev/copilot-chat-integration@2.0.0 latest
```

#### GitHub Rollback

```bash
# Revert commits
git revert <commit-hash>

# Delete problematic tag
git tag -d v2.1.0
git push origin :refs/tags/v2.1.0

# Edit GitHub release
gh release edit v2.1.0 --prerelease
```

## Security Considerations

### Secrets Management

- **NPM_TOKEN**: Stored in GitHub Secrets, scoped to package
- **GITHUB_TOKEN**: Auto-generated, minimal permissions
- **Environment Variables**: Never committed to repository

### Package Security

```bash
# Audit dependencies
npm audit

# Check for known vulnerabilities
npm audit fix

# Security scan
pnpm audit
```

### Supply Chain Security

- **Dependency pinning**: Exact versions in `pnpm-lock.yaml`
- **Regular updates**: Automated dependency updates
- **Vulnerability scanning**: Automated security checks
- **Code signing**: GitHub verified commits

## Performance Optimization

### Package Size Optimization

```bash
# Analyze package size
npm pack && tar -tzf *.tgz | wc -l

# Check individual file sizes
tar -tzvf copilot-kit-chat-integration-*.tgz

# Optimize by excluding unnecessary files
echo "*.test.js" >> .npmignore
echo "coverage/" >> .npmignore
```

### Documentation Caching

- **Local caching**: Framework docs cached in `node_modules/.cache/`
- **CDN caching**: NPM registry provides global CDN
- **Version-based caching**: Immutable versioned releases

## Troubleshooting Deployment

### Common Issues

**NPM publish fails**:

```bash
# Check authentication
npm whoami

# Verify package name availability
npm view @arthurcorreadev/copilot-chat-integration

# Check for conflicts
npm publish --dry-run
```

**GitHub Actions failing**:

```bash
# Check workflow syntax
gh workflow list

# View workflow runs
gh run list --workflow=release.yml

# Debug specific run
gh run view <run-id> --log
```

**Version conflicts**:

```bash
# Check current version
npm view @arthurcorreadev/copilot-chat-integration version

# Check local version
node -p "require('./package.json').version"

# Resolve conflicts
pnpm changeset version
```

## Next Steps

After understanding build and deployment:

1. **[Project Architecture](project-architecture.md)** - System design and structure
2. **[Development Workflow](development-workflow.md)** - Development processes
3. **[GitHub Configuration](github-configuration.md)** - Repository setup
4. **[Contributing Guidelines](contributing.md)** - How to contribute effectively
