---
applyTo: '**'
---

Project Context:
This project is focused on analyzing Git staged changes and generating conventional commit messages using Commitizen (cz). The AI must understand file modifications, assess project impact, and provide accurate commit categorization with high precision.

Guidelines:

**File Analysis Strategy:** Always read staged files to understand their content and purpose. Identify the type of changes (new files, modifications, deletions, renames). Understand the functional impact of changes on the project. Consider dependencies and relationships between modified files. Analyze code diffs to understand the exact nature of modifications. Compare file states before and after changes to assess impact severity.

**Enhanced Commit Type Classification:**

- **feat**: New features, functionality additions, new API endpoints, new components, new capabilities
- **fix**: Bug fixes, error corrections, issue resolutions, hotfixes
- **docs**: Documentation changes, README updates, code comments, API documentation
- **style**: Code style changes, formatting, linting fixes, whitespace changes (no functional impact)
- **refactor**: Code refactoring without changing functionality, code structure improvements, performance optimizations
- **test**: Adding or modifying tests, test improvements, test coverage increases
- **chore**: Maintenance tasks, build processes, dependencies updates, configuration changes
- **ci**: CI/CD pipeline changes, GitHub Actions, automation scripts
- **perf**: Performance improvements with measurable impact
- **build**: Build system changes, external dependencies, package.json modifications
- **revert**: Reverting previous commits

**Advanced Scope Determination:** Identify the most specific affected component first, then broader areas if multiple components are affected. Use hierarchical scoping (e.g., api/auth, ui/components, config/eslint). For monorepos, include package names. Common scopes: config, docs, scripts, deps, api, ui, core, utils, types, tests. Prefer specific over generic scopes. Use existing project structure to guide scope naming.

**Breaking Changes Detection:** Systematically check for: API signature changes (function parameters, return types), removed or renamed public functions/classes/interfaces, configuration format changes, environment variable changes, CLI command modifications, peer dependency version changes, database schema changes, public API endpoint modifications. Always provide clear migration instructions for breaking changes.

**Precision Analysis:** Read file contents to understand actual changes rather than assuming from filenames. Differentiate between functional changes and cosmetic changes. Identify if changes affect public APIs vs internal implementation. Consider user-facing impact vs developer-facing impact. Analyze test files to understand what functionality is being tested or modified.

**Complete Form Response:** Provide all required information in standardized order: 1) Type of change (single word, lowercase) 2) Scope of change (component/module affected, lowercase, use hyphens for multi-word) 3) Short description (imperative mood, under 72 chars, no punctuation at end) 4) Long description (single line, no line breaks, detailed explanation with context) 5) Breaking changes (yes/no, if yes provide detailed explanation with migration steps) 6) Issues closed (if applicable, format: "closes #123").

**Message Guidelines:** Use imperative mood consistently ("add" not "added", "fix" not "fixed"). Keep first line under 72 characters. Be specific but concise. Long descriptions must be single line without line breaks. Include breaking change indicators when applicable. Reference issues when relevant. Use consistent terminology throughout the project.

**Quality Assurance:** Ensure commit type accurately reflects the functional nature of change. Verify scope is the most specific appropriate for the modified files. Check that description clearly explains what was changed and why. Analyze for breaking changes comprehensively using multiple criteria. Provide complete form answers formatted for immediate use with cz. Cross-reference with project conventions and existing commit history for consistency.
