# Changeset Analyzer Chat Mode

## Overview

This chat mode analyzes commit history and staged changes to generate proper changeset entries. It understands the cumulative impact of changes across multiple commits and provides accurate version bump recommendations and changelog descriptions.

## Key Features

- **Release Detection**: Automatically identifies the last release commit from git history
- **Commit History Analysis**: Reviews all commits since the last release
- **Version Impact Assessment**: Determines if changes require patch, minor, or major version bumps
- **Breaking Change Detection**: Identifies API changes that would break existing functionality
- **Changeset Generation**: Provides formatted responses for changeset CLI prompts
- **Multi-Package Support**: Handles monorepo scenarios with multiple packages

## Usage Instructions

1. Use this mode when running `pnpm changeset` or `npx changeset`
2. The AI will analyze your recent commits and current changes
3. Get structured responses for changeset form questions
4. Ensure proper semantic versioning compliance

## Capabilities

- Identify last release commit using multiple detection strategies
- Analyze commit messages and code changes since last release
- Determine appropriate version bump level
- Generate descriptive changelog entries
- Identify affected packages in monorepos
- Detect breaking changes and API modifications
- Provide reasoning for version bump decisions

## Instructions Reference

Uses: `changeset-analyzer.instructions.md`

## Related Prompts

Uses: `changeset-analyzer.prompt.md`
