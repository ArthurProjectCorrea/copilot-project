# ⚡ Development Workflow

## Overview

Comprehensive guide to the development processes, workflows, and best practices used in the Copilot Project. This ensures consistency, quality, and efficient collaboration across all contributors and maintainers.

## Development Process

### Git Workflow

We follow a **Git Flow** variant optimized for continuous delivery:

```
main branch (stable releases)
    ↓
develop branch (integration)
    ↓
feature branches (new features)
hotfix branches (urgent fixes)
```

#### Branch Structure

**Main Branch** (`main`):

- Production-ready code only
- Protected branch with required reviews
- Automatic releases via Changesets
- Direct commits prohibited

**Development Branch** (`develop`):

- Integration branch for new features
- Continuous integration testing
- Pre-release testing environment
- Regular merges to main

**Feature Branches** (`feature/description`):

- New features and enhancements
- Branch from `develop`
- Merge back to `develop` via PR
- Delete after merge

**Hotfix Branches** (`hotfix/issue`):

- Critical bug fixes
- Branch from `main`
- Merge to both `main` and `develop`
- Immediate release if needed

### Feature Development Workflow

#### 1. Planning Phase

```bash
# Check current status
git status
git fetch origin

# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/add-new-framework-support
```

#### 2. Development Phase

```bash
# Make changes in small, logical commits
git add src/new-feature.js
git commit -m "feat: add basic framework detection"

git add tests/new-feature.test.js
git commit -m "test: add framework detection tests"

git add docs/framework-support.md
git commit -m "docs: document new framework support"
```

#### 3. Testing Phase

```bash
# Run all quality checks
pnpm run validate

# Run specific tests
pnpm run test:unit
pnpm run test:integration

# Test CLI functionality
npm link
copilot-chat --help
```

#### 4. Documentation Phase

```bash
# Update relevant documentation
git add docs/
git commit -m "docs: update installation guide for new framework"

# Create changeset
pnpm changeset
```

#### 5. Review Phase

```bash
# Push feature branch
git push origin feature/add-new-framework-support

# Create Pull Request
gh pr create \
  --title "feat: Add new framework support" \
  --body "Adds support for XYZ framework with documentation sync and Copilot integration" \
  --base develop
```

## Code Quality Standards

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) with Commitizen:

```bash
# Interactive commit creation
pnpm run commit

# Manual commit format
git commit -m "type(scope): description

Optional longer description

BREAKING CHANGE: description of breaking change
Closes #123"
```

#### Commit Types

- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD pipeline changes
- **perf**: Performance improvements
- **build**: Build system changes

#### Scope Guidelines

- **cli**: CLI interface changes
- **config**: Configuration system
- **sync**: Documentation synchronization
- **docs**: Documentation files
- **github**: GitHub integration
- **deps**: Dependency updates

### Code Formatting

```bash
# Format all code
pnpm run format

# Check formatting without fixing
pnpm run format:check

# Lint with auto-fix
pnpm run lint -- --fix
```

#### Prettier Configuration

```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### ESLint Configuration

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
];
```

### TypeScript Integration

```bash
# Type checking
pnpm run check-types

# Watch mode for development
pnpm run check-types -- --watch
```

TypeScript is used for type checking only (no compilation):

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "node16",
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true
  },
  "include": ["scripts/**/*", "*.js"],
  "exclude": ["node_modules", "docs/**/*"]
}
```

## Testing Strategy

### Test Structure

```
tests/
├── unit/                  # Unit tests for individual modules
│   ├── cli.test.js
│   ├── config.test.js
│   └── sync.test.js
├── integration/           # Integration tests
│   ├── setup-flow.test.js
│   └── sync-flow.test.js
├── fixtures/              # Test data and mock files
│   ├── mock-config.json
│   └── sample-project/
└── helpers/               # Test utilities
    ├── test-utils.js
    └── mock-github-api.js
```

### Testing Levels

#### Unit Tests

```javascript
// tests/unit/config.test.js
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { ConfigManager } from '../../scripts/config-manager.js';

describe('ConfigManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should load configuration from file', async () => {
    const config = await ConfigManager.load('./test-config.json');
    expect(config).toHaveProperty('frameworks');
    expect(config.frameworks).toHaveProperty('jest');
  });

  test('should validate configuration schema', () => {
    const invalidConfig = { frameworks: 'invalid' };
    expect(() => ConfigManager.validate(invalidConfig)).toThrow('Invalid configuration schema');
  });
});
```

#### Integration Tests

```javascript
// tests/integration/setup-flow.test.js
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { execSync } from 'child_process';
import { mkdtemp, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('Setup Flow Integration', () => {
  let testProject;

  beforeAll(async () => {
    testProject = await mkdtemp(join(tmpdir(), 'copilot-test-'));
  });

  afterAll(async () => {
    await rm(testProject, { recursive: true, force: true });
  });

  test('should complete full setup process', async () => {
    // Initialize test project
    execSync('npm init -y', { cwd: testProject });

    // Run setup command
    const result = execSync('copilot-chat setup', {
      cwd: testProject,
      encoding: 'utf8',
    });

    expect(result).toContain('Setup completed successfully');

    // Verify files created
    const files = await readdir(join(testProject, '.github'));
    expect(files).toContain('chatmodes');
    expect(files).toContain('instructions');
  });
});
```

### Test Execution

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm run test:coverage

# Run specific test files
pnpm test -- config.test.js

# Run tests in watch mode
pnpm test -- --watch

# Run integration tests only
pnpm run test:integration
```

### Mock Strategy

```javascript
// tests/helpers/mock-github-api.js
export class MockGitHubAPI {
  constructor() {
    this.repositories = new Map();
  }

  addRepository(owner, repo, contents) {
    this.repositories.set(`${owner}/${repo}`, contents);
  }

  async getRepositoryContents(owner, repo, path = '') {
    const key = `${owner}/${repo}`;
    const repoContents = this.repositories.get(key);

    if (!repoContents) {
      throw new Error(`Repository ${key} not found`);
    }

    return repoContents.filter((item) => item.path.startsWith(path));
  }
}
```

## Code Review Process

### Pull Request Guidelines

#### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] New tests added for new functionality

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Changeset created (if needed)

## Related Issues

Closes #123
```

#### Review Criteria

**Code Quality**:

- Follows established patterns and conventions
- Proper error handling and validation
- Clear variable and function names
- Appropriate comments for complex logic

**Testing**:

- Adequate test coverage for new code
- Tests are meaningful and comprehensive
- Integration tests for user-facing changes
- Manual testing evidence provided

**Documentation**:

- Code changes reflected in documentation
- API changes documented
- Breaking changes clearly explained
- Examples provided for new features

**Security**:

- Input validation implemented
- No sensitive data in commits
- Dependencies are secure and up-to-date
- Token and secret handling follows best practices

### Review Process

#### 1. Automated Checks

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on:
  pull_request:
    branches: [develop, main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run validation
        run: pnpm run validate

      - name: Run tests
        run: pnpm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

#### 2. Manual Review

**Reviewer Checklist**:

- [ ] Code is readable and maintainable
- [ ] Tests are comprehensive and pass
- [ ] Documentation is accurate and complete
- [ ] No breaking changes without justification
- [ ] Security considerations addressed
- [ ] Performance implications considered

#### 3. Approval Process

- **2 approvals required** for main branch
- **1 approval required** for develop branch
- **All checks must pass** before merge
- **Squash and merge** preferred for clean history

## Release Workflow

### Version Management

We use [Changesets](https://github.com/changesets/changesets) for automated version management:

#### Creating Changesets

```bash
# Create changeset for your changes
pnpm changeset

# Example prompts and responses:
? Which packages would you like to include? @arthurcorreadev/copilot-chat-integration
? Which packages should have a major bump? (none)
? Which packages should have a minor bump? @arthurcorreadev/copilot-chat-integration
? Please enter a summary: Add support for new framework documentation sync
```

#### Changeset Content

```yaml
---
'@arthurcorreadev/copilot-chat-integration': minor
---
Add support for Vue.js framework documentation sync with improved error handling and performance optimizations. This includes:
  - Vue.js framework detection
  - Vite configuration integration
  - Component documentation parsing
  - Enhanced CLI commands for Vue projects
```

### Release Process

#### 1. Automated Release (Preferred)

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
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 2. Manual Release

```bash
# Apply changesets and update versions
pnpm changeset version

# Build and test
pnpm run validate
pnpm run test

# Publish to NPM
pnpm release

# Create GitHub release
gh release create v2.1.0 \
  --title "Release v2.1.0" \
  --notes-file CHANGELOG.md
```

### Hotfix Process

For critical bugs requiring immediate release:

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# Make minimal fix
git add .
git commit -m "fix: resolve critical security vulnerability"

# Create changeset
pnpm changeset # Select patch version

# Test thoroughly
pnpm run validate
pnpm run test

# Create PR to main
gh pr create --base main --title "hotfix: critical security fix"

# After approval and merge, release will be automatic
```

## Documentation Workflow

### Documentation Types

**User Documentation** (`docs/public/`):

- Installation guides
- API reference
- Configuration examples
- Troubleshooting guides

**Developer Documentation** (`docs/private/`):

- Architecture overview
- Development setup
- Contribution guidelines
- Build and deployment

**Framework Documentation** (`docs/framework/`):

- Synced from external repositories
- Automatically updated
- Cached locally for offline access

### Documentation Standards

#### Markdown Guidelines

````markdown
# Main Heading (H1) - One per document

## Section Heading (H2)

### Subsection Heading (H3)

#### Detail Heading (H4) - Avoid deeper levels

## Code Examples

```bash
# Use appropriate language tags
npm install @arthurcorreadev/copilot-chat-integration
```
````

```javascript
// Provide complete, runnable examples
const config = require('./docs-config.json');
console.log(config.frameworks);
```

## Lists

- Use consistent list formatting
- One idea per list item
- Parallel structure for similar items

## Tables

| Column 1 | Column 2 | Description       |
| -------- | -------- | ----------------- |
| Value A  | Value B  | Clear explanation |

## Links

[Link text](./relative-path.md) for internal links
[External link](https://example.com) for external links

````

#### Documentation Review

```bash
# Lint documentation
pnpm run docs:lint

# Check links
pnpm run docs:check-links

# Spell check
pnpm run docs:spell-check

# Generate table of contents
pnpm run docs:toc
````

## CI/CD Pipeline

### Continuous Integration

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run tests
        run: pnpm run test:coverage

      - name: Test CLI installation
        run: |
          npm pack
          npm install -g ./copilot-kit-chat-integration-*.tgz
          copilot-chat --version
```

### Continuous Deployment

```yaml
# .github/workflows/cd.yml
name: CD
on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install

      - name: Build package
        run: pnpm run build

      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Performance Monitoring

### Build Performance

```bash
# Measure build time
time pnpm run build

# Analyze package size
npm pack
du -h copilot-kit-chat-integration-*.tgz

# Bundle analysis
npx bundle-analyzer package.json
```

### Runtime Performance

```javascript
// Performance monitoring in code
console.time('sync-operation');
await syncFrameworkDocumentation('jest');
console.timeEnd('sync-operation');

// Memory usage tracking
const memUsage = process.memoryUsage();
console.log('Memory usage:', {
  rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
});
```

## Troubleshooting Development Issues

### Common Problems

**CLI not working after changes**:

```bash
# Unlink and relink
npm unlink -g @arthurcorreadev/copilot-chat-integration
npm link
```

**Tests failing locally**:

```bash
# Clear caches
pnpm run clean
rm -rf node_modules
pnpm install

# Check environment
node --version
pnpm --version
```

**Documentation sync issues**:

```bash
# Debug with verbose logging
DEBUG=copilot-project:* pnpm run docs:sync:jest

# Check GitHub token
gh auth status
```

### Development Tools

```bash
# Interactive debugging
node --inspect-brk scripts/copilot-cli.js setup

# Environment validation
pnpm run validate:env

# Dependency audit
pnpm audit
```

## Next Steps

After understanding the development workflow:

1. **[GitHub Configuration](github-configuration.md)** - Repository and workflow setup
2. **[Contributing Guidelines](contributing.md)** - How to contribute effectively
3. **[Build and Deploy Guide](build-and-deploy.md)** - Release and deployment processes
4. **[Project Architecture](project-architecture.md)** - System design overview
