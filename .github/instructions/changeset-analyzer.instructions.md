---
applyTo: '**'
---

Project Context:
This project uses Changesets for version management and automated releases. The AI must analyze commit history, understand cumulative changes, and generate appropriate changeset entries with correct semantic versioning.

Guidelines:

**Commit History Analysis:** Read recent commits using git log to understand the scope of changes since the last release. Identify the last release commit by looking for patterns like "Release", "Version", "chore(release)", "Releasing using changesets", or version tags. Analyze commit messages, file changes, and their functional impact since that point. Group related commits by feature, fix, or breaking change type. Understand the timeline and relationship between commits. If no previous release is found, analyze all commits from the beginning of the project.

**Release Detection Strategy:** Identify the last release by checking for: 1) Commits with messages containing "Release", "Version", "chore(release)", "Releasing using changesets", "Published packages", or similar release-related keywords. 2) Git tags following semantic versioning (v1.0.0, 1.0.0). 3) Commits that modify package.json version field. 4) Commits from automated release systems (GitHub Actions, Changesets bot). 5) CHANGELOG.md or CHANGELOG updates. Use git log with appropriate flags to find these markers and establish the baseline for analysis.

**Version Bump Classification:** patch (Bug fixes, small improvements, documentation updates, internal refactoring without API changes), minor (New features, new functionality, new exports, backward-compatible API additions), major (Breaking changes, API removals, signature changes, configuration format changes, behavior changes that could break existing code).

**Package Impact Assessment:** Identify which packages are affected by the changes. In monorepos, determine if changes affect multiple packages. Understand dependency relationships between packages. Consider if changes in one package require updates in dependent packages.

**Breaking Change Detection:** Check for removed or modified exports, changed function signatures, altered configuration schemas, modified behavior of existing functionality, removed or renamed CLI commands or options, changes to peer dependencies or minimum versions. Analyze TypeScript interfaces and public API changes.

**Changeset Content Generation:** Create clear, user-facing changelog descriptions that explain what changed and why it matters to users. Use consistent formatting and language. Focus on user impact rather than implementation details. Group related changes logically. Reference issues or PRs when relevant.

**Complete Form Response:** Provide structured answers for changeset CLI prompts: 1) Which packages should be included in this changeset? 2) Which packages would you like to include? (select affected packages) 3) What kind of change is this for [package]? (patch/minor/major) 4) Please enter a summary for this change (appears in changelog). Format responses clearly for direct use in changeset form.

**Semantic Versioning Compliance:** Ensure version bumps follow semantic versioning strictly. When in doubt between minor and patch, choose the more conservative option. For major version bumps, provide clear justification and migration guidance. Consider the public API surface and user-facing impact.

**Quality Assurance:** Verify that all affected packages are included. Ensure version bump levels are appropriate for each package. Check that changelog entries are clear and user-focused. Validate that breaking changes are properly identified and documented. Provide complete changeset information ready for immediate use.
