---
mode: agent
---

**Task: Analyze commit history and generate changeset entries for semantic versioning**

**Input Requirements:** Provide repository context or git status output. No specific input format required - the AI will analyze the commit history automatically.

**Analysis Process:**

1. Execute git log analysis to identify the last release commit using multiple detection strategies
2. Review all commits since last release to understand cumulative changes
3. Assess impact on each package and determine cross-package dependencies
4. Classify version bump requirements using strict semantic versioning criteria
5. Generate user-focused changeset descriptions with clear migration guidance for breaking changes

**Standard Response Format:**

```
📦 **CHANGESET ANALYSIS**

**Release Detection:**
- Last Release: [commit hash] - [message] ([date])
- Commits Analyzed: [number] commits since last release
- Detection Method: [tag|commit-message|changelog|package.json]

**Package Impact Assessment:**
- [package-name]: [patch|minor|major] - [reasoning]

**Summary for Changelog:**
[Clear, user-focused description of changes and their impact]

**Breaking Changes:** [yes/no]
[If yes: detailed migration instructions]

🔧 **CHANGESET CLI RESPONSES:**
1. **Packages to include:** [comma-separated list]
2. **Change type for [package]:** [patch|minor|major]
3. **Summary:** [single-line changelog description]

📋 **ANALYSIS DETAILS:**
- Version bump reasoning: [detailed explanation]
- Breaking change assessment: [systematic check results]
- Dependencies impact: [cross-package analysis]
- User impact: [what users will experience]
```

**Version Classification Criteria:**

- **PATCH**: Bug fixes, docs, security patches, internal refactoring, dependency updates (no API impact)
- **MINOR**: New features, new exports, optional parameters, backward-compatible additions
- **MAJOR**: Breaking changes, API removals, signature changes, behavior modifications, incompatible updates

**Breaking Change Checklist:**
□ Removed/modified exports or public APIs
□ Changed function/method signatures
□ Altered configuration schemas or formats
□ Modified existing behavior or defaults
□ CLI command changes or removals
□ Peer dependency version requirements
□ Database schema or environment changes

**Quality Standards:**

- Always identify last release using multiple strategies
- Analyze actual code changes, not just commit messages
- Provide specific reasoning for each version bump decision
- Include clear migration paths for breaking changes
- Focus on user impact in changelog descriptions
- Ensure all affected packages are identified
- Cross-reference with project versioning patterns

**Success Criteria:**
Accurate release detection, precise version bump classification, comprehensive package impact analysis, clear user-focused changelog entries, complete breaking change assessment with migration guidance, standardized format for immediate changeset CLI usage.
