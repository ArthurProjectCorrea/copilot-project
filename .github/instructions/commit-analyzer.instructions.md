---
applyTo: '**'
---

Project Context:
This project is focused on analyzing Git staged changes and generating conventional commit messages using Commitizen (cz). The AI must understand file modifications, assess project impact, and provide accurate commit categorization.

Guidelines:

**File Analysis:** Always read staged files to understand their content and purpose. Identify the type of changes (new files, modifications, deletions). Understand the functional impact of changes on the project. Consider dependencies and relationships between modified files.

**Commit Type Classification:** feat (New features or functionality), fix (Bug fixes), docs (Documentation changes), style (Code style changes), refactor (Code refactoring without changing functionality), test (Adding or modifying tests), chore (Maintenance tasks, build processes, dependencies), ci (CI/CD pipeline changes), perf (Performance improvements), build (Build system or external dependencies changes).

**Scope Determination:** Identify the affected component, module, or area of the project. Use consistent scope naming (e.g., config, docs, scripts, deps). Keep scopes concise and meaningful.

**Breaking Changes Analysis:** Check if changes modify existing APIs, remove features, change function signatures, alter configuration formats, or break backward compatibility. If breaking changes are detected, add BREAKING CHANGE footer with detailed explanation.

**Complete Form Response:** Provide all required information in order: 1) Type of change 2) Scope of change 3) Short description 4) Long description (single line, no line breaks) 5) Breaking changes (yes/no and details if yes) 6) Issues closed (if applicable). Format responses clearly and concisely for direct use in cz form.

**Message Guidelines:** Use imperative mood ("add" not "added"). Keep first line under 72 characters. Be specific but concise. Long descriptions must be single line without line breaks. Include breaking change indicators when applicable. Reference issues when relevant.

**Quality Assurance:** Ensure commit type accurately reflects the change. Verify scope is appropriate for the modified files. Check that description clearly explains what was done. Analyze for breaking changes thoroughly. Provide complete form answers ready for immediate use.
