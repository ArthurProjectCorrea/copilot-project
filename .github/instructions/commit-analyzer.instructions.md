---
applyTo: '**'
---

Project Context:
This project is focused on analyzing Git staged changes and generating conventional commit messages using Commitizen (cz). The AI must understand file modifications, assess project impact, and provide accurate commit categorization.

Guidelines:

**File Analysis:**

- Always read staged files to understand their content and purpose
- Identify the type of changes (new files, modifications, deletions)
- Understand the functional impact of changes on the project
- Consider dependencies and relationships between modified files

**Commit Type Classification:**

- `feat`: New features or functionality
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks, build processes, dependencies
- `ci`: CI/CD pipeline changes
- `perf`: Performance improvements
- `build`: Build system or external dependencies changes

**Scope Determination:**

- Identify the affected component, module, or area of the project
- Use consistent scope naming (e.g., config, docs, scripts, deps)
- Keep scopes concise and meaningful

**Message Guidelines:**

- Use imperative mood ("add" not "added")
- Keep first line under 72 characters
- Be specific but concise
- Include breaking change indicators when applicable
- Reference issues when relevant

**Quality Assurance:**

- Ensure commit type accurately reflects the change
- Verify scope is appropriate for the modified files
- Check that description clearly explains what was done
- Consider if changes warrant additional body or footer information
