# ⚙️ GitHub Configuration

## Overview

Complete guide for configuring GitHub repository settings, workflows, and integrations for the Copilot Project. This includes security, automation, collaboration features, and best practices for maintaining the repository.

## Repository Settings

### General Configuration

#### Repository Details

```bash
# Repository information
Name: copilot-project
Description: Enhanced GitHub Copilot Chat integration with framework documentation sync
Website: https://github.com/ArthurProjectCorrea/copilot-project
Topics: github, copilot, chat, documentation, ai, development-tools

# Visibility
Visibility: Public
Include in search: Yes
```

#### Features Configuration

```yaml
# Repository features
Features:
  - Issues: Enabled
  - Projects: Enabled
  - Wiki: Disabled (using docs/ instead)
  - Discussions: Enabled
  - Sponsorships: Disabled
  - Security advisories: Enabled
  - Preserve this repository: Yes

# Merge settings
Merge button:
  - Allow merge commits: No
  - Allow squash merging: Yes (default)
  - Allow rebase merging: Yes
  - Auto-delete head branches: Yes
  - Automatically delete head branches: Yes
```

### Branch Protection

#### Main Branch Protection

```yaml
# Branch protection rules for 'main'
Protection Rules:
  Require pull request reviews:
    - Required approving reviews: 2
    - Dismiss stale reviews: Yes
    - Require review from code owners: Yes
    - Restrict pushes that create files: No

  Require status checks:
    - Require branches to be up to date: Yes
    - Status checks required:
        - CI / test (ubuntu-latest, 18)
        - CI / test (ubuntu-latest, 20)
        - CI / test (windows-latest, 18)
        - CI / test (macos-latest, 18)
        - codecov/patch
        - codecov/project

  Restrict pushes:
    - Restrict pushes that create files: No
    - Include administrators: Yes

  Allow force pushes: No
  Allow deletions: No
```

#### Develop Branch Protection

```yaml
# Branch protection rules for 'develop'
Protection Rules:
  Require pull request reviews:
    - Required approving reviews: 1
    - Dismiss stale reviews: Yes
    - Require review from code owners: No

  Require status checks:
    - Require branches to be up to date: Yes
    - Status checks required:
        - CI / test (ubuntu-latest, 18)
        - CI / test (ubuntu-latest, 20)

  Allow force pushes: No
  Allow deletions: No
```

### Security Settings

#### Vulnerability Alerts

```yaml
Security Settings:
  Dependency graph: Enabled
  Dependabot alerts: Enabled
  Dependabot security updates: Enabled
  Dependabot version updates: Enabled

Code scanning:
  CodeQL analysis: Enabled
  Third-party analysis: Enabled

Secret scanning:
  GitHub secret scanning: Enabled
  Push protection: Enabled
  Private vulnerability reporting: Enabled
```

#### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  # NPM dependencies
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
      day: 'monday'
      time: '09:00'
    open-pull-requests-limit: 10
    reviewers:
      - 'ArthurProjectCorrea'
    assignees:
      - 'ArthurProjectCorrea'
    commit-message:
      prefix: 'chore'
      prefix-development: 'chore'
      include: 'scope'

  # GitHub Actions
  - package-ecosystem: 'github-actions'
    directory: '/'
    schedule:
      interval: 'weekly'
      day: 'monday'
      time: '10:00'
    open-pull-requests-limit: 5
    reviewers:
      - 'ArthurProjectCorrea'
```

## GitHub Actions Workflows

### Core Workflows

#### Continuous Integration

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_ENV: test

jobs:
  test:
    name: Test Node.js ${{ matrix.node-version }} on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20]
        include:
          - os: ubuntu-latest
            node-version: 21

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linting
        run: pnpm run lint

      - name: Check TypeScript
        run: pnpm run check-types

      - name: Run tests
        run: pnpm run test:coverage

      - name: Test CLI installation
        run: |
          npm pack
          npm install -g ./copilot-kit-chat-integration-*.tgz
          copilot-chat --version
          copilot-chat --help

      - name: Upload coverage to Codecov
        if: matrix.os == 'ubuntu-latest' && matrix.node-version == '18'
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          fail_ci_if_error: true
```

#### Release Automation

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run validation
        run: pnpm run validate

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
          title: 'chore(release): version packages'
          commit: 'chore(release): version packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Create GitHub Release
        if: steps.changesets.outputs.published == 'true'
        run: |
          TAG=$(node -p "require('./package.json').version")
          gh release create v$TAG \
            --title "Release v$TAG" \
            --notes-file CHANGELOG.md \
            --latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Documentation Sync

```yaml
# .github/workflows/sync-docs.yml
name: Sync Documentation
on:
  schedule:
    # Every Monday at 2 AM UTC
    - cron: '0 2 * * 1'
  workflow_dispatch:
    inputs:
      framework:
        description: 'Framework to sync (all, jest, nest, next, prisma, tailwindcss)'
        required: false
        default: 'all'

jobs:
  sync-jest:
    name: Sync Jest Documentation
    runs-on: ubuntu-latest
    if: github.event.inputs.framework == 'jest' || github.event.inputs.framework == 'all' || github.event.schedule

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Sync Jest documentation
        run: pnpm run docs:sync:jest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/frameworks/jest.js/
          if git diff --staged --quiet; then
            echo "No changes to commit"
          else
            git commit -m "docs(jest): sync documentation from jestjs/jest"
            git push
          fi

  # Repeat similar jobs for nest, next, prisma, tailwindcss
  sync-nest:
    name: Sync NestJS Documentation
    runs-on: ubuntu-latest
    if: github.event.inputs.framework == 'nest' || github.event.inputs.framework == 'all' || github.event.schedule
    # ... similar structure

  sync-all:
    name: Sync All Documentation
    runs-on: ubuntu-latest
    if: github.event.inputs.framework == 'all' || github.event.schedule
    needs: [sync-jest, sync-nest, sync-next, sync-prisma, sync-tailwindcss]

    steps:
      - name: Summary
        run: echo "All documentation sync completed"
```

#### Security Audit

```yaml
# .github/workflows/security.yml
name: Security Audit
on:
  schedule:
    # Every Sunday at 3 AM UTC
    - cron: '0 3 * * 0'
  workflow_dispatch:

jobs:
  audit:
    name: Security Audit
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run npm audit
        run: npm audit --audit-level moderate

      - name: Run pnpm audit
        run: pnpm audit --audit-level moderate

      - name: Check for known vulnerabilities
        run: |
          npx better-npm-audit audit --level moderate
```

### Workflow Templates

#### Pull Request Template

```markdown
<!-- .github/pull_request_template.md -->

## Description

Brief description of changes and motivation.

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Code style update (formatting, renaming)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Build configuration change
- [ ] 🔨 Development scripts change

## Testing

- [ ] Unit tests pass (`pnpm test`)
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] New tests added for new functionality

## Quality Checklist

- [ ] Code follows project style guidelines (`pnpm run lint`)
- [ ] Code is properly formatted (`pnpm run format:check`)
- [ ] TypeScript types are correct (`pnpm run check-types`)
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Changeset created (if needed: `pnpm changeset`)

## Related Issues

Closes #
Related to #

## Screenshots (if applicable)

## Additional Notes

Any additional information that reviewers should know.
```

#### Issue Templates

```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: 🐛 Bug Report
description: Report a bug to help us improve
title: '[Bug]: '
labels: ['bug', 'triage']
assignees: ['ArthurProjectCorrea']

body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: A clear and concise description of what the bug is.
      placeholder: Describe the bug...
    validations:
      required: true

  - type: textarea
    id: reproduce
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Run command '...'
        2. See error '...'
      value: |
        1. 
        2. 
        3.
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: |
        examples:
          - **OS**: Ubuntu 20.04
          - **Node**: 18.17.0
          - **Package Version**: 2.0.0
      value: |
        - **OS**: 
        - **Node**: 
        - **Package Version**: 
        - **GitHub Copilot**:
      render: markdown
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any additional context, logs, or screenshots
```

```yaml
# .github/ISSUE_TEMPLATE/feature_request.yml
name: ✨ Feature Request
description: Suggest a new feature or enhancement
title: '[Feature]: '
labels: ['enhancement', 'triage']

body:
  - type: textarea
    id: summary
    attributes:
      label: Feature Summary
      description: A brief summary of the feature you'd like to see
    validations:
      required: true

  - type: textarea
    id: motivation
    attributes:
      label: Motivation
      description: Why would this feature be useful?
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: How would you like this feature to work?
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: What other approaches have you considered?

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Any additional context, mockups, or examples
```

## Repository Secrets and Variables

### Required Secrets

```yaml
# Repository Secrets (Settings > Secrets and variables > Actions)
Secrets:
  GITHUB_TOKEN:
    Description: Auto-generated token for GitHub Actions
    Scope: Automatic (provided by GitHub)

  NPM_TOKEN:
    Description: Token for publishing to NPM registry
    Value: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    Scope: Repository

  CODECOV_TOKEN:
    Description: Token for Codecov integration
    Value: xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    Scope: Repository
```

### Personal Access Token (PAT) Setup

**Issue**: Default `GITHUB_TOKEN` cannot create Pull Requests automatically.

**Solution**: Configure a Personal Access Token with enhanced permissions.

#### Step 1: Create Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Configure the token:
   - **Name**: `Copilot Project Release Token`
   - **Expiration**: Choose appropriate duration (90 days, 1 year, or no expiration)
   - **Scopes**: Select the following permissions:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
     - ✅ `write:packages` (Upload packages to GitHub Package Registry)

#### Step 2: Add Token as Repository Secret

1. Go to repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Configure the secret:
   - **Name**: `GH_PAT`
   - **Secret**: Paste your personal access token
4. Click "Add secret"

#### Step 3: Workflow Configuration

The workflows are configured to use PAT when available:

```yaml
# Enhanced permissions for release workflow
- name: Checkout Repository
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.GH_PAT || secrets.GITHUB_TOKEN }}

- name: Create Release Pull Request or Publish to npm
  uses: changesets/action@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GH_PAT || secrets.GITHUB_TOKEN }}
```

**Fallback Behavior**:

- If `GH_PAT` is configured: Uses personal access token with full permissions
- If `GH_PAT` is not configured: Falls back to default `GITHUB_TOKEN` (limited permissions)

```yaml
# Repository Variables (Settings > Secrets and variables > Actions)
Variables:
  NODE_VERSION:
    Description: Default Node.js version for workflows
    Value: '18'

  REGISTRY_URL:
    Description: NPM registry URL
    Value: 'https://registry.npmjs.org/'
```

### Environment Variables

```yaml
# Repository Environment Variables
Production:
  NODE_ENV: production
  DEBUG: ''
  COPILOT_DISABLE_TELEMETRY: false

Development:
  NODE_ENV: development
  DEBUG: 'copilot-project:*'
  COPILOT_DISABLE_TELEMETRY: true

Testing:
  NODE_ENV: test
  DEBUG: 'copilot-project:test:*'
  TEST_TIMEOUT: '60000'
```

## Labels and Milestones

### Issue Labels

```yaml
# .github/labels.yml
- name: 'bug'
  color: 'd73a4a'
  description: "Something isn't working"

- name: 'enhancement'
  color: 'a2eeef'
  description: 'New feature or request'

- name: 'documentation'
  color: '0075ca'
  description: 'Improvements or additions to documentation'

- name: 'good first issue'
  color: '7057ff'
  description: 'Good for newcomers'

- name: 'help wanted'
  color: '008672'
  description: 'Extra attention is needed'

- name: 'priority: high'
  color: 'd93f0b'
  description: 'High priority issue'

- name: 'priority: medium'
  color: 'fbca04'
  description: 'Medium priority issue'

- name: 'priority: low'
  color: '0e8a16'
  description: 'Low priority issue'

- name: 'framework: jest'
  color: 'c5def5'
  description: 'Related to Jest framework integration'

- name: 'framework: nest'
  color: 'c5def5'
  description: 'Related to NestJS framework integration'

- name: 'area: cli'
  color: 'f9d0c4'
  description: 'Related to CLI functionality'

- name: 'area: sync'
  color: 'f9d0c4'
  description: 'Related to documentation sync'

- name: 'type: breaking'
  color: 'b60205'
  description: 'Breaking change'

- name: 'release'
  color: '0052cc'
  description: 'Related to release process'
```

### Milestones

```yaml
Milestones:
  'v2.1.0':
    Title: 'Enhanced Framework Support'
    Description: 'Add support for Vue.js, Angular, and improved error handling'
    Due Date: '2024-02-15'

  'v2.2.0':
    Title: 'Performance Improvements'
    Description: 'Optimize sync performance and reduce memory usage'
    Due Date: '2024-03-15'

  'v3.0.0':
    Title: 'Major Architecture Refactor'
    Description: 'Plugin system and extensible framework support'
    Due Date: '2024-06-01'
```

## GitHub Apps and Integrations

### Recommended Apps

#### Code Quality

```yaml
# Codecov
Name: Codecov
Purpose: Code coverage reporting
Configuration:
  codecov.yml:
    coverage:
      status:
        project:
          default:
            target: 80%
            threshold: 1%
        patch:
          default:
            target: 70%

# CodeQL
Name: CodeQL
Purpose: Security analysis
Configuration: Auto-enabled for public repos
```

#### Automation

```yaml
# Dependabot
Name: Dependabot
Purpose: Dependency updates
Configuration: .github/dependabot.yml

# Changesets Bot
Name: Changesets Bot
Purpose: Release automation
Configuration: GitHub Actions workflow
```

### Custom GitHub App (Optional)

```javascript
// scripts/github-app.js
const { App } = require('@octokit/app');
const { createAppAuth } = require('@octokit/auth-app');

class CopilotProjectApp {
  constructor() {
    this.app = new App({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId: process.env.GITHUB_INSTALLATION_ID,
    });
  }

  async handleWebhook(event) {
    switch (event.action) {
      case 'pull_request.opened':
        await this.handleNewPR(event.payload);
        break;
      case 'issue.opened':
        await this.handleNewIssue(event.payload);
        break;
    }
  }

  async handleNewPR(payload) {
    // Auto-assign reviewers based on changed files
    const files = payload.pull_request.changed_files;
    const reviewers = this.getReviewersForFiles(files);

    await this.app.octokit.pulls.requestReviewers({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      pull_number: payload.pull_request.number,
      reviewers,
    });
  }
}
```

## Repository Analytics

### GitHub Insights

```yaml
# Metrics to monitor
Traffic:
  - Page views
  - Unique visitors
  - Referring sites
  - Popular content

Engagement:
  - Stars over time
  - Forks over time
  - Issues opened/closed
  - Pull requests opened/merged

Community:
  - Contributors
  - Commit activity
  - Code frequency
  - Dependency insights
```

### Custom Analytics

```javascript
// scripts/analytics.js
class RepositoryAnalytics {
  async generateReport() {
    const stats = {
      releases: await this.getReleaseStats(),
      issues: await this.getIssueStats(),
      pullRequests: await this.getPRStats(),
      community: await this.getCommunityStats(),
    };

    return this.formatReport(stats);
  }

  async getReleaseStats() {
    // Implementation for release analytics
  }

  async getIssueStats() {
    // Implementation for issue analytics
  }
}
```

## Backup and Recovery

### Repository Backup

```bash
# Automated backup script
#!/bin/bash
# scripts/backup-repo.sh

BACKUP_DIR="/backup/copilot-project"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR/$DATE"

# Clone repository with all branches and tags
git clone --mirror https://github.com/ArthurProjectCorrea/copilot-project.git \
  "$BACKUP_DIR/$DATE/repository.git"

# Backup issues and PRs via GitHub API
gh api repos/ArthurProjectCorrea/copilot-project/issues \
  --paginate > "$BACKUP_DIR/$DATE/issues.json"

gh api repos/ArthurProjectCorrea/copilot-project/pulls \
  --paginate --jq '.[] | select(.state == "closed")' \
  > "$BACKUP_DIR/$DATE/pull_requests.json"

# Backup repository settings
gh api repos/ArthurProjectCorrea/copilot-project \
  > "$BACKUP_DIR/$DATE/settings.json"

echo "Backup completed: $BACKUP_DIR/$DATE"
```

### Recovery Procedures

```bash
# Repository recovery process
#!/bin/bash
# scripts/restore-repo.sh

BACKUP_DIR="$1"
NEW_REPO="$2"

if [[ -z "$BACKUP_DIR" || -z "$NEW_REPO" ]]; then
  echo "Usage: $0 <backup-directory> <new-repo-name>"
  exit 1
fi

# Create new repository
gh repo create "$NEW_REPO" --public

# Push backup
cd "$BACKUP_DIR/repository.git"
git push --mirror "https://github.com/$(gh api user --jq .login)/$NEW_REPO.git"

echo "Repository restored to: $NEW_REPO"
```

## Security Best Practices

### Access Control

```yaml
# Team permissions
Teams:
  Maintainers:
    Members: ['ArthurProjectCorrea']
    Permissions: Admin

  Contributors:
    Members: []
    Permissions: Write

  Reviewers:
    Members: []
    Permissions: Triage

# Branch protection bypass
Branch Protection:
  Include administrators: Yes
  Allow force pushes: No
  Allow deletions: No
```

### Secret Scanning

```yaml
# Custom secret patterns
# .github/secret_scanning.yml
patterns:
  - name: 'Custom API Key'
    regex: 'CUSTOM_API_[A-Z0-9]{32}'

  - name: 'Internal Token'
    regex: 'copilot_[a-f0-9]{40}'
```

### Security Policies

```markdown
<!-- .github/SECURITY.md -->

# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

Please report security vulnerabilities to:

- Email: security@copilot-project.com
- GitHub Security Advisory: [Create advisory](https://github.com/ArthurProjectCorrea/copilot-project/security/advisories/new)

**Please do not report security vulnerabilities through public GitHub issues.**

## Response Timeline

- Initial response: Within 24 hours
- Status update: Within 48 hours
- Resolution: Within 7 days for critical issues
```

## Next Steps

After configuring GitHub settings:

1. **[Contributing Guidelines](contributing.md)** - How to contribute effectively
2. **[Repository Migration Guide](repository-migration.md)** - Moving between repositories
3. **[Maintenance Guide](maintenance.md)** - Ongoing repository maintenance
4. **[Development Setup](development-setup.md)** - Setting up development environment
