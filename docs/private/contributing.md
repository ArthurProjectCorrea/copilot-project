# 🤝 Contributing Guidelines

## Overview

Welcome to the Copilot Project! This guide provides everything you need to know about contributing to the project, from setting up your development environment to submitting your first pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Contribution Types](#contribution-types)
- [Style Guidelines](#style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Review Process](#review-process)
- [Community Guidelines](#community-guidelines)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behaviors include:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**

- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [conduct@copilot-project.com]. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** installed
- **pnpm** package manager
- **Git** configured with your GitHub account
- **GitHub CLI** (optional but recommended)
- **VS Code** with recommended extensions

### Development Setup

```bash
# 1. Fork the repository
gh repo fork ArthurProjectCorrea/copilot-project --clone

# 2. Navigate to the project
cd copilot-project

# 3. Install dependencies
pnpm install

# 4. Run setup
pnpm run setup

# 5. Verify everything works
pnpm run validate
```

### First-Time Contributors

If this is your first contribution to the project:

1. **Read the documentation** - Start with the [README](../README.md) and [Development Setup](development-setup.md)
2. **Check existing issues** - Look for issues labeled `good first issue`
3. **Join the discussion** - Participate in GitHub Discussions
4. **Start small** - Begin with documentation improvements or bug fixes

## Development Process

### Workflow Overview

```
1. Choose/Create Issue → 2. Create Branch → 3. Develop → 4. Test → 5. Submit PR → 6. Review → 7. Merge
```

### Detailed Workflow

#### 1. Issue Selection

```bash
# Find an issue to work on
gh issue list --label "good first issue"
gh issue list --label "help wanted"

# Or create a new issue
gh issue create --title "Feature: Add support for X" --body "Description..."
```

#### 2. Branch Creation

```bash
# Create and switch to feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description

# Or for documentation
git checkout -b docs/update-contributing-guide
```

#### 3. Development

```bash
# Make your changes
# Follow coding standards and best practices

# Commit frequently with meaningful messages
git add .
git commit -m "feat: add basic functionality for X"
```

#### 4. Testing

```bash
# Run all quality checks
pnpm run validate

# Run specific tests
pnpm run test
pnpm run lint
pnpm run check-types

# Test CLI functionality
npm link
copilot-chat --help
```

#### 5. Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create pull request
gh pr create \
  --title "feat: add support for X" \
  --body "Closes #123" \
  --base develop
```

## Contribution Types

### Bug Fixes

**Process:**

1. Check if the bug is already reported
2. Reproduce the issue locally
3. Create a minimal test case
4. Fix the issue
5. Add regression tests
6. Update documentation if needed

**Example:**

```javascript
// Before (buggy code)
function parseConfig(config) {
  return JSON.parse(config); // Throws on invalid JSON
}

// After (fixed code)
function parseConfig(config) {
  try {
    return JSON.parse(config);
  } catch (error) {
    throw new ConfigError(`Invalid JSON configuration: ${error.message}`);
  }
}
```

### New Features

**Process:**

1. Discuss the feature in an issue first
2. Get approval from maintainers
3. Design the feature (API, integration)
4. Implement with tests
5. Document the feature
6. Create examples

**Feature Checklist:**

- [ ] Issue discussion and approval
- [ ] Implementation matches design
- [ ] Comprehensive tests added
- [ ] Documentation updated
- [ ] Examples provided
- [ ] Backward compatibility maintained
- [ ] Performance impact considered

### Documentation Improvements

**Types of documentation contributions:**

- **User guides** - Installation, configuration, usage
- **API documentation** - Function/method references
- **Examples** - Code samples and tutorials
- **Architecture docs** - System design and patterns
- **Troubleshooting** - Common issues and solutions

**Documentation standards:**

````markdown
# Use clear headings

## Second level

### Third level

# Provide complete examples

```bash
# Commands should be copy-pastable
npm install @copilot-kit/chat-integration
```
````

# Include expected output

Expected output:

```
✅ Installation completed successfully
```

# Cross-reference related docs

See also: [Configuration Guide](./configuration.md)

````

### Framework Integration

**Adding new framework support:**

1. **Research phase:**
   - Study the framework's documentation structure
   - Identify official documentation repository
   - Understand documentation organization

2. **Configuration:**
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
````

3. **Implementation:**
   - Add sync script support
   - Create instruction files
   - Add CLI integration
   - Test thoroughly

4. **Documentation:**
   - Update framework list
   - Add usage examples
   - Document any special considerations

## Style Guidelines

### Code Style

#### JavaScript/Node.js

```javascript
// Use modern ES6+ features
const { readFile } = require('fs/promises');

// Prefer async/await over promises
async function loadConfig(path) {
  try {
    const content = await readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new ConfigError(`Failed to load config: ${error.message}`);
  }
}

// Use descriptive names
function syncFrameworkDocumentation(frameworkName) {
  // Implementation
}

// Add JSDoc for public functions
/**
 * Synchronizes documentation for a specific framework
 * @param {string} frameworkName - Name of the framework to sync
 * @param {object} options - Sync options
 * @param {boolean} options.force - Force sync even if up to date
 * @returns {Promise<SyncResult>} Sync operation result
 */
async function syncFramework(frameworkName, options = {}) {
  // Implementation
}
```

#### Error Handling

```javascript
// Create specific error types
class CopilotError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CopilotError';
    this.code = code;
  }
}

class ConfigError extends CopilotError {
  constructor(message) {
    super(message, 'CONFIG_ERROR');
    this.name = 'ConfigError';
  }
}

// Use proper error handling
async function processFile(filePath) {
  try {
    const content = await readFile(filePath);
    return processContent(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new ConfigError(`Configuration file not found: ${filePath}`);
    }
    throw error; // Re-throw unexpected errors
  }
}
```

### Git Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
type(scope): description

[optional body]

[optional footer(s)]

# Examples
feat(cli): add support for Vue.js framework
fix(sync): handle network timeouts gracefully
docs(readme): update installation instructions
test(config): add validation tests
chore(deps): update dependencies

# Breaking changes
feat(api)!: remove deprecated methods

BREAKING CHANGE: The deprecated methods have been removed.
Migrate to the new API documented in the migration guide.
```

#### Commit Types

- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes
- **perf**: Performance improvements
- **build**: Build system changes

#### Scope Guidelines

- **cli**: Command-line interface
- **config**: Configuration system
- **sync**: Documentation synchronization
- **github**: GitHub integration
- **docs**: Documentation files
- **deps**: Dependencies
- **tests**: Test files

## Testing Requirements

### Test Coverage Standards

- **Minimum coverage**: 80% overall
- **Critical paths**: 95% coverage required
- **New features**: Must include comprehensive tests
- **Bug fixes**: Must include regression tests

### Testing Types

#### Unit Tests

```javascript
// tests/unit/config.test.js
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { ConfigManager } from '../../scripts/config-manager.js';

describe('ConfigManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should load valid configuration', async () => {
    const config = await ConfigManager.load('./fixtures/valid-config.json');

    expect(config).toHaveProperty('frameworks');
    expect(config.frameworks).toHaveProperty('jest');
    expect(config.frameworks.jest.name).toBe('Jest');
  });

  test('should throw error for invalid configuration', async () => {
    await expect(ConfigManager.load('./fixtures/invalid-config.json')).rejects.toThrow(ConfigError);
  });

  test('should validate configuration schema', () => {
    const invalidConfig = { frameworks: 'not-an-object' };

    expect(() => ConfigManager.validate(invalidConfig)).toThrow('Invalid configuration schema');
  });
});
```

#### Integration Tests

```javascript
// tests/integration/cli.test.js
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { execSync } from 'child_process';
import { mkdtemp, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('CLI Integration', () => {
  let testProject;

  beforeAll(async () => {
    testProject = await mkdtemp(join(tmpdir(), 'copilot-test-'));
  });

  afterAll(async () => {
    await rm(testProject, { recursive: true, force: true });
  });

  test('should setup project successfully', () => {
    // Initialize test project
    execSync('npm init -y', { cwd: testProject });

    // Run setup command
    const output = execSync('copilot-chat setup', {
      cwd: testProject,
      encoding: 'utf8',
    });

    expect(output).toContain('Setup completed successfully');

    // Verify files created
    const files = readdirSync(join(testProject, '.github'));
    expect(files).toContain('chatmodes');
    expect(files).toContain('instructions');
  });
});
```

### Test Data and Fixtures

```javascript
// tests/fixtures/mock-github-api.js
export class MockGitHubAPI {
  constructor() {
    this.repositories = new Map();
  }

  addRepository(owner, repo, files) {
    const key = `${owner}/${repo}`;
    this.repositories.set(key, files);
  }

  async getRepositoryContents(owner, repo, path = '') {
    const key = `${owner}/${repo}`;
    const files = this.repositories.get(key) || [];

    return files.filter(
      (file) =>
        file.path.startsWith(path) &&
        file.type === 'file' &&
        (file.name.endsWith('.md') || file.name.endsWith('.mdx'))
    );
  }
}
```

## Documentation Standards

### Documentation Types

#### User Documentation

**Purpose**: Help end users install, configure, and use the package

**Location**: `docs/public/`

**Structure**:

```
docs/public/
├── installation-guide.md
├── quick-start.md
├── api-reference.md
├── configuration.md
├── troubleshooting.md
└── examples.md
```

#### Developer Documentation

**Purpose**: Help contributors understand and modify the codebase

**Location**: `docs/private/`

**Structure**:

```
docs/private/
├── development-setup.md
├── project-architecture.md
├── contributing.md
└── build-and-deploy.md
```

### Writing Standards

#### Tone and Voice

- **Clear and concise**: Avoid unnecessary complexity
- **Helpful and encouraging**: Welcome all skill levels
- **Professional but friendly**: Maintain approachable tone
- **Action-oriented**: Use active voice and imperative mood

#### Structure Guidelines

```markdown
# Document Title (H1 - only one per document)

## Overview

Brief description of what this document covers.

## Prerequisites

What users need before following this guide.

## Step-by-step Instructions

### 1. First Step

Detailed instructions with code examples.

### 2. Second Step

Continue with clear, actionable steps.

## Examples

Complete, runnable examples.

## Troubleshooting

Common issues and solutions.

## Next Steps

Links to related documentation.
```

#### Code Examples

````markdown
# Always provide complete, runnable examples

```bash
# Include commands exactly as users should type them
npm install @copilot-kit/chat-integration
copilot-chat setup
```
````

```javascript
// Provide complete code samples
const { ConfigManager } = require('@copilot-kit/chat-integration');

async function main() {
  try {
    const config = await ConfigManager.load();
    console.log('Configuration loaded:', config);
  } catch (error) {
    console.error('Failed to load configuration:', error.message);
  }
}

main();
```

# Always explain what the example does

This example shows how to load and display the configuration.

````

## Review Process

### Pull Request Reviews

#### What Reviewers Look For

**Code Quality**:
- Follows project conventions and style
- Proper error handling and validation
- Clear variable and function names
- Appropriate comments for complex logic

**Functionality**:
- Solves the intended problem
- Handles edge cases appropriately
- Maintains backward compatibility
- Integrates well with existing code

**Testing**:
- Adequate test coverage
- Tests are meaningful and comprehensive
- Integration tests for user-facing changes
- Manual testing evidence provided

**Documentation**:
- Code changes reflected in documentation
- API changes documented appropriately
- Breaking changes clearly explained
- Examples provided for new features

#### Review Guidelines for Contributors

**For Reviewers**:
- Be constructive and helpful
- Ask questions to understand reasoning
- Suggest improvements rather than just pointing out problems
- Acknowledge good practices and clever solutions
- Test the changes locally when possible

**For Authors**:
- Respond to feedback promptly and professionally
- Ask for clarification if feedback is unclear
- Make requested changes or explain why you disagree
- Thank reviewers for their time and effort
- Update the PR description if requirements change

### Review Timeline

- **Initial response**: Within 2 business days
- **Follow-up reviews**: Within 1 business day
- **Final approval**: When all requirements are met
- **Merge**: Immediately after approval (automated)

## Community Guidelines

### Communication Channels

#### GitHub Issues
- **Bug reports**: Use bug report template
- **Feature requests**: Use feature request template
- **Questions**: Use GitHub Discussions instead
- **Security issues**: Use private security reporting

#### GitHub Discussions
- **General questions**: Getting help with usage
- **Ideas and feedback**: Discuss potential improvements
- **Show and tell**: Share your projects using the package
- **Q&A**: Community-driven support

#### Real-time Chat
- **Discord/Slack**: For quick questions and community chat
- **Video calls**: For complex discussions or pair programming

### Recognition and Attribution

#### Contributors

We recognize all types of contributions:
- **Code contributions**: Features, bug fixes, refactoring
- **Documentation**: Guides, examples, API docs
- **Testing**: Writing tests, manual testing, bug reports
- **Design**: UI/UX improvements, graphics, logos
- **Community**: Answering questions, moderating, organizing

#### Attribution

- All contributors are listed in the README
- Major contributors may be invited to join the core team
- Contributors retain copyright for their contributions
- The project uses MIT license for maximum flexibility

### Conflict Resolution

#### Process

1. **Direct communication**: Try to resolve issues privately first
2. **Mediation**: Involve a neutral maintainer if needed
3. **Community input**: Seek broader community perspective
4. **Final decision**: Maintainers make final calls on project direction

#### Escalation

For serious conflicts or code of conduct violations:
1. Contact maintainers privately
2. Provide specific examples and evidence
3. Allow time for investigation and response
4. Respect the final decision of the maintainers

## Getting Help

### Before Asking for Help

1. **Search existing issues** - Your question may already be answered
2. **Check documentation** - Read relevant guides and API references
3. **Try debugging** - Use debug logging and error messages
4. **Create minimal example** - Isolate the problem to its essentials

### How to Ask for Help

#### Good Question Format

```markdown
**Environment**:
- OS: macOS 12.3
- Node.js: 18.17.0
- Package version: 2.0.0

**What I'm trying to do**:
Set up automated documentation sync for my Vue.js project.

**What I've tried**:
1. Ran `copilot-chat setup`
2. Modified docs-config.json to include Vue.js
3. Ran `pnpm run docs:sync:vue`

**What happened**:
Got error: "Framework 'vue' not supported"

**Expected behavior**:
Documentation should sync from Vue.js repository

**Additional context**:
[Include relevant logs, configuration files, etc.]
````

#### Where to Ask

- **GitHub Discussions**: General questions and community support
- **GitHub Issues**: Bug reports and feature requests
- **Discord/Slack**: Quick questions and real-time help

## Thank You

Thank you for considering contributing to the Copilot Project! Your contributions help make this tool better for developers worldwide.

### Next Steps

1. **[Development Setup](development-setup.md)** - Set up your development environment
2. **[Project Architecture](project-architecture.md)** - Understand the codebase structure
3. **[Development Workflow](development-workflow.md)** - Learn the development process
4. **[GitHub Configuration](github-configuration.md)** - Understand repository settings

### Quick Links

- [Report a Bug](https://github.com/ArthurProjectCorrea/copilot-project/issues/new?template=bug_report.yml)
- [Request a Feature](https://github.com/ArthurProjectCorrea/copilot-project/issues/new?template=feature_request.yml)
- [Ask a Question](https://github.com/ArthurProjectCorrea/copilot-project/discussions)
- [Join the Community](https://discord.gg/copilot-project)

We look forward to your contributions! 🚀
