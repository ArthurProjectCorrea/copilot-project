# 🏗️ Project Architecture

## Overview

Comprehensive architecture documentation for the Copilot Project, covering system design, component interactions, data flow, and technical decisions. This guide is essential for understanding the codebase structure and making architectural decisions.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Copilot Project                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    CLI      │  │   GitHub    │  │   Documentation     │  │
│  │  Interface  │  │ Integration │  │   Sync System       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Copilot    │  │  Framework  │  │    Configuration    │  │
│  │ Chat Modes  │  │ Instructions│  │     Management      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│               NPM Package Distribution                      │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. CLI Interface (`scripts/copilot-cli.js`)

- **Purpose**: Main user interface for the package
- **Responsibilities**: Command parsing, user interaction, orchestration
- **Entry Points**: `copilot-chat`, `copilot-setup` binaries

#### 2. Configuration System (`scripts/copilot-config.js`)

- **Purpose**: Project setup and configuration management
- **Responsibilities**: File generation, project standards, validation

#### 3. Documentation Sync (`scripts/sync-docs.js`)

- **Purpose**: Automated framework documentation synchronization
- **Responsibilities**: GitHub API integration, file processing, caching

#### 4. Copilot Integration (`.github/`)

- **Purpose**: GitHub Copilot Chat enhancement
- **Responsibilities**: Chat modes, instructions, prompts

#### 5. Framework Documentation (`docs/`)

- **Purpose**: Local framework documentation storage
- **Responsibilities**: Cached docs, user guides, developer docs

## Component Architecture

### CLI Architecture

```
┌─────────────────────────────────────────┐
│            copilot-cli.js               │
├─────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │   Command   │ │    Argument         │ │
│  │   Parser    │ │    Validation       │ │
│  └─────────────┘ └─────────────────────┘ │
├─────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │   Setup     │ │    Configuration    │ │
│  │   Handler   │ │    Handler          │ │
│  └─────────────┘ └─────────────────────┘ │
├─────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │  Validation │ │      Demo           │ │
│  │   Handler   │ │     Handler         │ │
│  └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
```

**Command Flow**:

1. **Input Parsing**: Command and arguments processed
2. **Validation**: Input validation and environment checks
3. **Handler Dispatch**: Route to appropriate functionality
4. **Execution**: Core logic execution with error handling
5. **Output**: Formatted results and user feedback

### Documentation Sync Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Documentation Sync System                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   GitHub    │ │    File     │ │     MDX to MD       │   │
│  │ API Client  │ │  Processor  │ │    Converter        │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │    Cache    │ │   Config    │ │      Error          │   │
│  │  Manager    │ │   Parser    │ │     Handler         │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Sync Flow**:

1. **Configuration Loading**: Read `docs-config.json`
2. **GitHub API**: Fetch repository contents
3. **File Processing**: Filter and process markdown files
4. **MDX Conversion**: Convert MDX to standard Markdown
5. **Cache Management**: Store locally for offline access
6. **Error Recovery**: Fallback and retry mechanisms

### Copilot Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Copilot Integration Layer                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│  │    Chat Modes       │ │       Instructions              │ │
│  │  (.chatmode.md)     │ │    (.instructions.md)           │ │
│  └─────────────────────┘ └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│  │     Prompts         │ │    Framework-Specific           │ │
│  │  (.prompt.md)       │ │      Context                    │ │
│  └─────────────────────┘ └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│              Local Documentation Access                     │
└─────────────────────────────────────────────────────────────┘
```

**Integration Flow**:

1. **Mode Selection**: User selects appropriate chat mode
2. **Context Loading**: Load framework-specific instructions
3. **Documentation Access**: Reference local cached docs
4. **Response Generation**: AI generates contextual responses
5. **Quality Assurance**: Built-in validation and consistency

## Data Flow

### Package Installation Flow

```
User runs: npm install -g @copilot-kit/chat-integration
    ↓
NPM downloads package from registry
    ↓
Postinstall script runs (scripts/postinstall.js)
    ↓
CLI binaries linked to system PATH
    ↓
.github/ directory copied to global location
    ↓
Documentation cache initialized
    ↓
Ready for use: copilot-chat --help
```

### Setup Flow

```
User runs: copilot-chat setup
    ↓
Project detection and analysis
    ↓
Generate .github/chatmodes/ directory
    ↓
Copy framework-specific instructions
    ↓
Configure project standards
    ↓
Initialize documentation sync
    ↓
Validate configuration
    ↓
Success confirmation
```

### Documentation Sync Flow

```
Scheduled or Manual Trigger
    ↓
Load docs-config.json
    ↓
For each framework:
    ↓
    GitHub API: List repository contents
    ↓
    Filter .md and .mdx files
    ↓
    Download file contents
    ↓
    Process MDX → Markdown conversion
    ↓
    Write to local cache (docs/framework/)
    ↓
    Update _SyncInfo.md metadata
    ↓
End for each framework
    ↓
Global cache update complete
```

## File Structure Design

### Package Distribution Structure

```
@copilot-kit/chat-integration/
├── index.js                 # Main entry point (minimal)
├── package.json             # Package metadata
├── README.md               # User documentation
├── CHANGELOG.md            # Version history
├── docs-config.json        # Framework sync configuration
├── scripts/                # Core functionality
│   ├── copilot-cli.js      # Main CLI interface
│   ├── copilot-config.js   # Configuration script
│   ├── sync-docs.js        # Documentation sync
│   ├── postinstall.js      # Post-installation setup
│   └── ...utility scripts
├── .github/                # Copilot integration
│   ├── chatmodes/          # Chat mode definitions
│   ├── instructions/       # Framework instructions
│   ├── prompts/            # Custom prompts
│   └── workflows/          # CI/CD automation
└── docs/                   # Documentation
    ├── public/             # User-facing docs
    ├── private/            # Developer docs
    ├── jest.js/            # Jest framework docs
    ├── nest.js/            # NestJS framework docs
    ├── next.js/            # Next.js framework docs
    ├── prisma/             # Prisma framework docs
    └── tailwindcss/        # Tailwind CSS docs
```

### Runtime File Locations

```
Global Installation:
/usr/local/lib/node_modules/@copilot-kit/chat-integration/

System Binaries:
/usr/local/bin/copilot-chat
/usr/local/bin/copilot-setup

User Projects (after setup):
project-root/.github/chatmodes/
project-root/.github/instructions/
project-root/.copilot-config.json
```

## Design Patterns

### Command Pattern (CLI)

```javascript
// Command interface
class Command {
  execute(args) {
    throw new Error('Command must implement execute method');
  }
}

// Concrete commands
class SetupCommand extends Command {
  execute(args) {
    // Setup implementation
  }
}

class ConfigCommand extends Command {
  execute(args) {
    // Configuration implementation
  }
}

// Command invoker
class CLI {
  constructor() {
    this.commands = new Map();
  }

  register(name, command) {
    this.commands.set(name, command);
  }

  execute(name, args) {
    const command = this.commands.get(name);
    if (command) {
      return command.execute(args);
    }
  }
}
```

### Strategy Pattern (Documentation Processing)

```javascript
// Processing strategies
class MarkdownProcessor {
  process(content) {
    return content; // No processing needed
  }
}

class MDXProcessor {
  process(content) {
    return this.convertMDXToMarkdown(content);
  }
}

// Context
class DocumentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  process(content) {
    return this.strategy.process(content);
  }
}
```

### Factory Pattern (Handler Creation)

```javascript
class HandlerFactory {
  static createHandler(type) {
    switch (type) {
      case 'setup':
        return new SetupHandler();
      case 'config':
        return new ConfigHandler();
      case 'validate':
        return new ValidateHandler();
      case 'demo':
        return new DemoHandler();
      default:
        throw new Error(`Unknown handler type: ${type}`);
    }
  }
}
```

### Observer Pattern (Event Handling)

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }

  emit(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach((callback) => callback(data));
    }
  }
}

// Usage in sync system
const syncEmitter = new EventEmitter();
syncEmitter.on('sync:start', (framework) => console.log(`Starting sync for ${framework}`));
syncEmitter.on('sync:complete', (framework) => console.log(`Sync complete for ${framework}`));
syncEmitter.on('sync:error', (error) => console.error('Sync error:', error));
```

## Configuration Management

### Configuration Schema

```javascript
// docs-config.json structure
{
  "frameworks": {
    "frameworkName": {
      "name": "Display Name",
      "repository": "owner/repo",
      "sourcePath": "docs/",
      "targetPath": "docs/framework/",
      "convertMdx": true,
      "schedule": "0 2 * * 1",
      "type": "framework|tool|library",
      "enabled": true
    }
  },
  "sync": {
    "parallel": 3,
    "timeout": 30000,
    "retries": 3,
    "cache": true
  },
  "github": {
    "apiUrl": "https://api.github.com",
    "rateLimit": 5000
  }
}
```

### Environment Configuration

```javascript
// Configuration loading hierarchy
const config = {
  // 1. Default configuration
  ...defaultConfig,

  // 2. Package configuration
  ...require('./docs-config.json'),

  // 3. Environment variables
  ...getEnvConfig(),

  // 4. User configuration
  ...getUserConfig(),

  // 5. Project-specific configuration
  ...getProjectConfig(),
};
```

## Error Handling Strategy

### Error Categories

```javascript
class CopilotError extends Error {
  constructor(message, code, category) {
    super(message);
    this.code = code;
    this.category = category;
    this.timestamp = new Date().toISOString();
  }
}

// Error categories
const ErrorCategories = {
  NETWORK: 'network',
  FILE_SYSTEM: 'filesystem',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  CONFIGURATION: 'configuration',
};

// Specific error types
class NetworkError extends CopilotError {
  constructor(message, url) {
    super(message, 'NETWORK_ERROR', ErrorCategories.NETWORK);
    this.url = url;
  }
}

class ValidationError extends CopilotError {
  constructor(message, field) {
    super(message, 'VALIDATION_ERROR', ErrorCategories.VALIDATION);
    this.field = field;
  }
}
```

### Error Recovery

```javascript
class ErrorHandler {
  static async withRetry(operation, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }

        if (this.isRetryable(error)) {
          await this.delay(delay * attempt);
          continue;
        }

        throw error;
      }
    }
  }

  static isRetryable(error) {
    return (
      error.category === ErrorCategories.NETWORK ||
      error.code === 'ECONNRESET' ||
      error.code === 'TIMEOUT'
    );
  }

  static delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
```

## Performance Considerations

### Caching Strategy

```javascript
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.diskCache = new DiskCache('./cache');
  }

  async get(key) {
    // L1: Memory cache
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }

    // L2: Disk cache
    const diskValue = await this.diskCache.get(key);
    if (diskValue) {
      this.memoryCache.set(key, diskValue);
      return diskValue;
    }

    return null;
  }

  async set(key, value, ttl = 3600000) {
    this.memoryCache.set(key, value);
    await this.diskCache.set(key, value, ttl);
  }
}
```

### Parallel Processing

```javascript
class ParallelProcessor {
  constructor(maxConcurrency = 3) {
    this.maxConcurrency = maxConcurrency;
    this.running = 0;
    this.queue = [];
  }

  async process(tasks) {
    return Promise.all(tasks.map((task) => this.processTask(task)));
  }

  async processTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.running >= this.maxConcurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { task, resolve, reject } = this.queue.shift();

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.processQueue();
    }
  }
}
```

## Security Architecture

### Input Validation

```javascript
class InputValidator {
  static validateCommand(command) {
    const allowedCommands = ['setup', 'config', 'validate', 'demo', 'sync'];
    if (!allowedCommands.includes(command)) {
      throw new ValidationError(`Invalid command: ${command}`);
    }
  }

  static validatePath(path) {
    if (path.includes('../') || path.includes('..\\')) {
      throw new ValidationError('Path traversal not allowed');
    }
  }

  static validateGitHubRepo(repo) {
    const repoPattern = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;
    if (!repoPattern.test(repo)) {
      throw new ValidationError('Invalid GitHub repository format');
    }
  }
}
```

### Token Management

```javascript
class TokenManager {
  static getGitHubToken() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    if (!this.validateToken(token)) {
      throw new Error('Invalid GitHub token format');
    }

    return token;
  }

  static validateToken(token) {
    // GitHub personal access token format
    return /^ghp_[a-zA-Z0-9]{36}$/.test(token) || /^github_pat_[a-zA-Z0-9_]{22,255}$/.test(token);
  }

  static maskToken(token) {
    if (!token) return '';
    return token.substring(0, 4) + '...' + token.substring(token.length - 4);
  }
}
```

## Testing Architecture

### Unit Testing Strategy

```javascript
// Mock strategy for external dependencies
jest.mock('fs/promises');
jest.mock('child_process');
jest.mock('./github-api');

describe('DocumentationSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should sync framework documentation', async () => {
    // Setup mocks
    const mockGitHubApi = require('./github-api');
    mockGitHubApi.getRepositoryContents.mockResolvedValue(mockContents);

    // Execute
    const result = await syncFramework('jest');

    // Verify
    expect(result.success).toBe(true);
    expect(mockGitHubApi.getRepositoryContents).toHaveBeenCalled();
  });
});
```

### Integration Testing

```javascript
describe('CLI Integration Tests', () => {
  test('should setup project with all components', async () => {
    const testProject = await createTempProject();

    // Execute CLI command
    const result = await execCLI(['setup'], { cwd: testProject });

    // Verify results
    expect(result.exitCode).toBe(0);
    expect(await fileExists(path.join(testProject, '.github/chatmodes'))).toBe(true);
    expect(await fileExists(path.join(testProject, '.copilot-config.json'))).toBe(true);

    await cleanupTempProject(testProject);
  });
});
```

## Monitoring and Observability

### Logging Strategy

```javascript
class Logger {
  constructor(level = 'info') {
    this.level = level;
    this.levels = ['debug', 'info', 'warn', 'error'];
  }

  log(level, message, meta = {}) {
    if (this.levels.indexOf(level) >= this.levels.indexOf(this.level)) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta,
      };

      console.log(JSON.stringify(logEntry));
    }
  }

  debug(message, meta) {
    this.log('debug', message, meta);
  }
  info(message, meta) {
    this.log('info', message, meta);
  }
  warn(message, meta) {
    this.log('warn', message, meta);
  }
  error(message, meta) {
    this.log('error', message, meta);
  }
}
```

### Metrics Collection

```javascript
class MetricsCollector {
  constructor() {
    this.metrics = new Map();
  }

  increment(metric, tags = {}) {
    const key = this.createKey(metric, tags);
    this.metrics.set(key, (this.metrics.get(key) || 0) + 1);
  }

  timing(metric, duration, tags = {}) {
    const key = this.createKey(metric, tags);
    this.metrics.set(key, duration);
  }

  createKey(metric, tags) {
    const tagString = Object.entries(tags)
      .map(([k, v]) => `${k}:${v}`)
      .join(',');
    return `${metric}${tagString ? `|${tagString}` : ''}`;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}
```

## Migration and Upgrade Strategy

### Version Compatibility

```javascript
class MigrationManager {
  static async migrate(fromVersion, toVersion) {
    const migrations = this.getMigrations(fromVersion, toVersion);

    for (const migration of migrations) {
      await migration.execute();
    }
  }

  static getMigrations(from, to) {
    const allMigrations = [
      { version: '1.1.0', migration: new Migration110() },
      { version: '2.0.0', migration: new Migration200() },
      // Add more migrations as needed
    ];

    return allMigrations
      .filter((m) => this.isVersionBetween(m.version, from, to))
      .map((m) => m.migration);
  }
}
```

## Next Steps

After understanding the project architecture:

1. **[Development Workflow](development-workflow.md)** - Development processes and practices
2. **[GitHub Configuration](github-configuration.md)** - Repository and workflow setup
3. **[Contributing Guidelines](contributing.md)** - How to contribute effectively
4. **[Development Setup](development-setup.md)** - Setting up development environment
